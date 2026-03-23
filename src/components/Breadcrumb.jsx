import { useEffect, useMemo } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDocs } from '../contexts/useDocs.js';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Box from '@mui/material/Box';

function toAbsolute(slug) {
    if (!slug) return '/';
    return slug.startsWith('/') ? slug : `/${slug}`;
}

export default function Breadcrumb({ inHeader = false }) {
    const params = useParams();

    const { docs, ensureTopicLoaded } = useDocs() || [];
    useEffect(() => {
        ensureTopicLoaded(params.docs);
    }, [params.docs, ensureTopicLoaded]);

    const doc = docs.find(d => d.id === params.docs) || null;
    const docSection = doc?.sections?.find(s => s.id === params.section) || null;
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

        return items;
    }, [params.section, params.docs, docSection, doc]);

    if (!crumbs.length) return null;

    return (
        <Box sx={{ minWidth: 0, width: '100%' }}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" sx={{ color: 'text.disabled' }} />}
                aria-label="breadcrumb"
                sx={{
                    maxWidth: '100%',
                    '& .MuiBreadcrumbs-ol': { flexWrap: 'nowrap' },
                    '& .MuiBreadcrumbs-li': { lineHeight: 1.1, minWidth: 0 },
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
                                noWrap
                                sx={{
                                    fontSize: inHeader ? '0.78rem' : '0.82rem',
                                    fontWeight: 600,
                                    maxWidth: { xs: 120, md: 200, lg: 280 },
                                }}
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
                            noWrap
                            sx={{
                                fontSize: inHeader ? '0.76rem' : '0.8rem',
                                color: 'text.secondary',
                                maxWidth: { xs: 90, md: 160, lg: 220 },
                                display: 'inline-block',
                            }}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </Box>
    );
}
