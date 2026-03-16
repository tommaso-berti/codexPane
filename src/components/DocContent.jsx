import { Children, cloneElement, isValidElement, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import PreWithCopy from './PreWithCopy.jsx';
import MdxTable from './MdxTable.jsx';
import { useDocs } from '../contexts/useDocs.js';
import { Note, Tip, Warning } from './Callout.jsx';

import 'github-markdown-css/github-markdown.css';
import '../styles/mdx.css';

function toText(node) {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (!isValidElement(node)) return '';
    return Children.toArray(node.props?.children).map(toText).join('');
}

function parseVariant(raw) {
    const label = raw.trim().replace(/[:*]/g, '').toLowerCase();
    if (label === 'tip') return 'tip';
    if (label === 'note' || label === 'attention') return 'note';
    if (label === 'warning') return 'warning';
    return null;
}

function stripPrefixedTitle(children, titleNode) {
    const nodes = Children.toArray(children);
    if (!nodes.length) return children;
    const first = nodes[0];
    if (!isValidElement(first) || first.type !== 'p') return children;

    const firstChildren = Children.toArray(first.props.children);
    const titleIndex = firstChildren.findIndex((node) => node === titleNode);
    if (titleIndex < 0) return children;

    const remaining = firstChildren.filter((_, idx) => idx !== titleIndex);
    if (typeof remaining[0] === 'string') {
        remaining[0] = remaining[0].replace(/^[:\s-]+/, '');
    }

    nodes[0] = cloneElement(first, { children: remaining });
    return nodes;
}

function MdxBlockquote({ children }) {
    const nodes = Children.toArray(children);
    const first = nodes[0];
    if (!isValidElement(first) || first.type !== 'p') {
        return <blockquote>{children}</blockquote>;
    }

    const firstChildren = Children.toArray(first.props.children);
    const labelNode = firstChildren.find(
        (node) => isValidElement(node) && (node.type === 'strong' || node.type === 'em')
    );
    if (!labelNode) {
        return <blockquote>{children}</blockquote>;
    }

    const label = toText(labelNode);
    const variant = parseVariant(label);
    if (!variant) {
        return <blockquote>{children}</blockquote>;
    }

    const content = stripPrefixedTitle(children, labelNode);
    if (variant === 'tip') return <Tip>{content}</Tip>;
    if (variant === 'warning') return <Warning>{content}</Warning>;
    return <Note>{content}</Note>;
}

function HeadingAnchor({ as = 'h2', id, children, ...props }) {
    const [copied, setCopied] = useState(false);
    const label = toText(children) || 'section';

    const onCopyLink = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!id) return;

        const targetHash = `#${encodeURIComponent(id)}`;
        const shareUrl = `${window.location.origin}${window.location.pathname}${targetHash}`;
        window.history.replaceState(window.history.state, '', `${window.location.pathname}${targetHash}`);

        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1200);
        } catch {
            // Keep native anchor behavior as fallback even if clipboard access is blocked.
            window.location.hash = targetHash;
        }
    };

    return (
        <Box component={as} id={id} {...props} className="doc-heading">
            <span className="doc-heading__label">{children}</span>
            {id && (
                <Tooltip title={copied ? 'Link copied' : 'Copy section link'} placement="top" arrow>
                    <IconButton
                        component="a"
                        href={`#${id}`}
                        onClick={onCopyLink}
                        className="doc-heading__anchor"
                        size="small"
                        aria-label={`Copy link to section ${label}`}
                    >
                        <LinkRoundedIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
}

export default function DocContent({ status, Content, error }) {
    const { docs: docsParam, section: sectionParam } = useParams();
    const { docs = [] } = useDocs();
    const pageMeta = useMemo(() => {
        const doc = docs.find((item) => item.id === docsParam);
        const docSection = doc?.sections?.find((item) => item.id === sectionParam);
        const title = docSection?.title || doc?.title || 'Documentation';
        const subtitle = docSection
            ? `Part of ${doc?.title || 'this topic'}`
            : doc
                ? `${doc.sections?.length || 0} sections available`
                : 'Developer documentation and guides';
        return { title, subtitle, hasDocs: Boolean(doc || docSection) };
    }, [docs, docsParam, sectionParam]);

    if (status === 'loading') {
        return (
            <Box sx={{ py: 4, display: 'grid', placeItems: 'center' }}>
                <CircularProgress size={28} />
            </Box>
        );
    }

    if (status === 'error') {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error || 'Unable to load the document.'}
            </Alert>
        );
    }

    if (status === 'not-found' || !Content) {
        return (
            <Box sx={{ py: 2 }}>
                <Typography variant="h6">Document not found</Typography>
                <Typography variant="body2" color="text.secondary">
                    The requested page does not exist in the content folder.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ pb: 6 }}>
            {pageMeta.hasDocs && (
                <Box sx={{ mb: 3.5, pt: 0.6 }}>
                    <Typography variant="h3" component="h1" sx={{ mt: 0.2, mb: 0.4 }}>
                        {pageMeta.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {pageMeta.subtitle}
                    </Typography>
                </Box>
            )}
            <div className="markdown-body" data-doc-content="true">
            <Content
                components={{
                    pre: PreWithCopy,
                    table: MdxTable,
                    blockquote: MdxBlockquote,
                    h2: (props) => <HeadingAnchor as="h2" {...props} />,
                    h3: (props) => <HeadingAnchor as="h3" {...props} />,
                    Tip,
                    Note,
                    Warning,
                }}
            />
            </div>
        </Box>
    );
}
