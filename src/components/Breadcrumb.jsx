import { useMemo } from 'react';
import { useParams, useLocation, Link as RouterLink } from 'react-router-dom';
import { useDocs } from '../contexts/useDocs.js';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function toAbsolute(slug) {
    if (!slug) return '/';
    return slug.startsWith('/') ? slug : `/${slug}`;
}

export default function Breadcrumb() {
    const params = useParams();
    const { hash } = useLocation();
    const anchor = hash ? decodeURIComponent(hash.slice(1)) : null;

    const { docs } = useDocs() || [];
    const doc = docs.find(d => d.id === params.docs) || null;
    const docSection = doc?.sections?.find(s => s.id === params.section) || null;
    const subsection = docSection?.subSections?.find(sub => sub.id === anchor) || null;
    const crumbs = useMemo(() => {
        const items = [{ label: 'Home', href: '/' }];

        if (doc) {
            items.push({
                label: doc.title ?? params.docs,
                href: toAbsolute(doc.slug),
                key: doc.id
            });
        }

        if (docSection) {
            items.push({
                label: docSection.title ?? params.section,
                href: toAbsolute(docSection.slug),
                key: docSection.id
            });
        }

        if (subsection) {
            items.push({
                label: subsection.title ?? anchor,
                href: toAbsolute(subsection.slug),
                key: subsection.id
            });
        }

        return items;
    }, [params.section, params.docs, anchor, docSection, subsection, doc]);

    if (!crumbs.length) return null;

    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" sx={{ color: 'text.disabled' }} />}
            aria-label="breadcrumb"
            sx={{
                '& .MuiBreadcrumbs-li': { lineHeight: 1.1 },
            }}
        >
            {crumbs.map((item, idx) => {
                const isLast = idx === crumbs.length - 1;
                if (isLast) {
                    return (
                        <Typography
                            key={item.key ?? item.href}
                            color="text.primary"
                            aria-current="page"
                            sx={{ fontSize: '0.82rem', fontWeight: 600 }}
                        >
                            {item.label}
                        </Typography>
                    );
                }
                return (
                    <Link
                        key={item.key ?? item.href}
                        component={RouterLink}
                        underline="hover"
                        color="inherit"
                        to={item.href}
                        sx={{ fontSize: '0.8rem', color: 'text.secondary' }}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
}
