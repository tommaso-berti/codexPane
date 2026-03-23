import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

function getLanguage(props) {
    const className = props?.children?.props?.className || '';
    const match = className.match(/language-([\w-]+)/);
    if (!match) return 'code';
    return match[1];
}

function getCodeText(props) {
    const raw = props?.children?.props?.children;
    if (typeof raw === 'string') return raw;
    if (Array.isArray(raw)) return raw.join('');
    if (typeof raw === 'number') return String(raw);
    return '';
}

export default function PreWithCopy(props) {
    const preRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const prefs = useSelector((state) => state.uiPrefs);
    const language = getLanguage(props);
    const rawCodeText = getCodeText(props);
    const normalizedText = useMemo(
        () => rawCodeText.replace(/\u00A0/g, ' '),
        [rawCodeText]
    );
    const lines = useMemo(() => normalizedText.replace(/\n$/, '').split('\n'), [normalizedText]);
    const lineCount = lines.length;
    const isLongSnippet = lineCount > 16;
    const showCopy = prefs?.showCopyCodeButton !== false;
    const showLineNumbers = prefs?.showCodeLineNumbers === true;
    const autoExpand = prefs?.autoExpandCodeExamples !== false;
    const preferredLang = prefs?.snippetLanguagePreference || 'js';
    const padY = prefs?.codeBlockStyle === 'spacious' ? 'var(--pre-pad-y, 1.22rem)' : 'var(--pre-pad-y, 0.94rem)';
    const padX = prefs?.codeBlockStyle === 'spacious' ? 'var(--pre-pad-x, 1.18rem)' : 'var(--pre-pad-x, 1.02rem)';
    const shownLanguage = language === 'code' ? preferredLang : language;
    const numberLineHeight = 1.56;
    const numberFontSize = '0.88rem';
    const gutterWidth = 44;

    useEffect(() => {
        setExpanded(autoExpand);
    }, [autoExpand, normalizedText]);

    const onCopy = async (e) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(normalizedText);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    return (
        <Box
            className="pre-with-copy"
            sx={{
                position: "relative",
                borderRadius: 1.75,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'var(--code-bg)',
                boxShadow: '0 10px 24px rgba(15,23,42,0.2)',
                '& pre > code': {
                    display: 'block',
                    margin: 0,
                    padding: 0,
                    lineHeight: numberLineHeight,
                    fontSize: numberFontSize,
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 1.3,
                    py: 0.8,
                    borderBottom: '1px solid',
                    borderColor: 'rgba(148,163,184,0.28)',
                    background: 'rgba(15,23,42,0.85)',
                }}
            >
                <Chip
                    size="small"
                    label={shownLanguage}
                    sx={{ height: 22, fontSize: '0.73rem', textTransform: 'uppercase' }}
                />
                {showCopy ? (
                    <Tooltip title={copied ? "Copied" : "Copy code"} placement="top" arrow>
                        <IconButton
                            aria-label="Copy code to clipboard"
                            onClick={onCopy}
                            size="small"
                            sx={{
                                borderRadius: 1.2,
                                color: copied ? '#38BDF8' : '#cbd5e1',
                                border: '1px solid',
                                borderColor: 'rgba(148,163,184,0.35)',
                                bgcolor: 'rgba(15,23,42,0.55)',
                                '&:hover': { bgcolor: 'rgba(37,99,235,0.22)', color: '#e2e8f0' },
                            }}
                        >
                            {copied ? <CheckIcon fontSize="inherit" /> : <ContentCopyIcon fontSize="inherit" />}
                        </IconButton>
                    </Tooltip>
                ) : null}
            </Box>

            <Box sx={{ position: 'relative' }}>
                {showLineNumbers ? (
                    <Box
                        aria-hidden="true"
                        sx={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: `${gutterWidth}px`,
                            pt: padY,
                            pb: padY,
                            pl: 0.8,
                            pr: 0.9,
                            textAlign: 'right',
                            color: 'rgba(148,163,184,0.78)',
                            borderRight: '1px solid rgba(148,163,184,0.25)',
                            userSelect: 'none',
                            pointerEvents: 'none',
                            fontFamily:
                                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
                            fontSize: numberFontSize,
                            lineHeight: numberLineHeight,
                        }}
                    >
                        {lines.map((_, index) => (
                            <div key={`line-num-${index + 1}`}>{index + 1}</div>
                        ))}
                    </Box>
                ) : null}
                <pre
                    ref={preRef}
                    {...props}
                    style={{
                        ...(props.style || {}),
                        margin: 0,
                        padding: `${padY} ${padX}`,
                        paddingLeft: showLineNumbers
                            ? `calc(${padX} + ${gutterWidth}px + 0.35rem)`
                            : padX,
                        color: 'var(--code-fg)',
                        backgroundColor: 'transparent',
                        maxHeight: !expanded && isLongSnippet ? 360 : 'none',
                        overflowY: !expanded && isLongSnippet ? 'hidden' : 'auto',
                    }}
                >
                    {props.children}
                </pre>
            </Box>
            {isLongSnippet && !autoExpand ? (
                <Box sx={{ px: 1.2, pb: 1 }}>
                    <Button size="small" variant="text" onClick={() => setExpanded((prev) => !prev)}>
                        {expanded ? 'Collapse code' : 'Expand code'}
                    </Button>
                </Box>
            ) : null}
            {copied && (
                <Typography
                    variant="caption"
                    sx={{
                        position: 'absolute',
                        right: 12,
                        bottom: 10,
                        color: '#38BDF8',
                        fontWeight: 700,
                    }}
                >
                    Copied
                </Typography>
            )}
        </Box>
    );
}
