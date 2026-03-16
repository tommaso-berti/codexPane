import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function extractHeadings() {
    const container = document.querySelector('[data-doc-content="true"]');
    if (!container) return [];
    return [...container.querySelectorAll('h2[id], h3[id]')].map((node) => ({
        id: node.id,
        text: node.textContent?.trim() || '',
        level: node.tagName.toLowerCase(),
    }));
}

export default function DocsToc({ enabled }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [headings, setHeadings] = useState([]);
    const [active, setActive] = useState('');

    useEffect(() => {
        if (!enabled) {
            setHeadings([]);
            return;
        }

        const update = () => setHeadings(extractHeadings());
        update();

        const container = document.querySelector('[data-doc-content="true"]');
        if (!container) return;
        const observer = new MutationObserver(update);
        observer.observe(container, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, [enabled, location.pathname]);

    useEffect(() => {
        if (!enabled || !headings.length) {
            setActive('');
            return;
        }
        const scroller = document.querySelector('[data-scroller="content"]');
        const elements = headings
            .map((heading) => document.getElementById(heading.id))
            .filter(Boolean);
        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
                if (visible?.target?.id) {
                    setActive(visible.target.id);
                }
            },
            { root: scroller || null, rootMargin: '-20% 0px -65% 0px', threshold: [0, 1] }
        );

        elements.forEach((element) => observer.observe(element));
        return () => observer.disconnect();
    }, [enabled, headings, location.pathname]);

    const items = useMemo(() => headings.filter((h) => !!h.text), [headings]);
    if (!enabled || !items.length) return null;

    const jumpTo = (id) => (event) => {
        event.preventDefault();
        navigate(`${location.pathname}#${encodeURIComponent(id)}`);
    };

    return (
        <Box
            sx={{
                position: 'sticky',
                top: 90,
                maxHeight: 'calc(100dvh - 110px)',
                overflowY: 'auto',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                bgcolor: 'background.paper',
                p: 1.5,
            }}
        >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'text.secondary' }}>
                On this page
            </Typography>
            <Box sx={{ display: 'grid', gap: 0.25 }}>
                {items.map((item) => {
                    const isActive = active === item.id;
                    return (
                        <Link
                            key={item.id}
                            href={`#${item.id}`}
                            underline="none"
                            onClick={jumpTo(item.id)}
                            sx={{
                                fontSize: '0.86rem',
                                pl: item.level === 'h3' ? 1.2 : 0.45,
                                py: 0.4,
                                borderLeft: '2px solid',
                                borderLeftColor: isActive ? 'primary.main' : 'transparent',
                                color: isActive ? 'text.primary' : 'text.secondary',
                                bgcolor: isActive ? 'action.selected' : 'transparent',
                                borderRadius: 1,
                                fontWeight: isActive ? 600 : 500,
                                '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
                            }}
                        >
                            {item.text}
                        </Link>
                    );
                })}
            </Box>
        </Box>
    );
}

