import { useMemo } from 'react';
import { useParams, useLocation, Link as RouterLink } from 'react-router-dom';
import { useDocs } from '../contexts/DocsContext.jsx';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Breadcrumb() {
    const params = useParams();
    const { hash } = useLocation();
    const anchor = hash ? decodeURIComponent(hash.slice(1)) : null;

    const { docs } = useDocs() || [];
    console.log({ docs });
    const doc = docs.find(d => d.id === params.docs) || null;
    const docSection = doc?.sections?.find(s => s.id === params.section) || null;
    const subsection = docSection?.subSections?.find(sub => sub.id === anchor) || null;

    console.log({ params, anchor, doc, docSection, subsection });

    const crumbs = useMemo(() => {
        const items = [{ label: 'Home', href: '/' }];

        if (doc) {
            items.push({
                label: doc.title ?? params.docs,
                href: doc.slug,
                key: doc.id
            });
        }

        if (docSection) {
            items.push({
                label: docSection.title ?? params.section,
                href: docSection.slug,
                key: docSection.id
            });
        }

        if (subsection) {
            items.push({
                label: subsection.title ?? anchor,
                href: subsection.slug,
                key: subsection.id
            });
        }

        return items;
    }, [params.section, params.docs, anchor, docSection, subsection, doc]);

    if (!crumbs.length) return null;

    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {crumbs.map((item, idx) => {
                const isLast = idx === crumbs.length - 1;
                if (isLast) {
                    return (
                        <Typography key={item.id} color="text.primary" aria-current="page">
                            {item.label}
                        </Typography>
                    );
                }
                return (
                    <Link
                        key={item.id}
                        component={RouterLink}
                        underline="hover"
                        color="inherit"
                        to={item.href}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
}
