import Box from '@mui/material/Box';

const MIN_HIGHLIGHT_QUERY_LENGTH = 2;

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getParts(text, query) {
    const sourceText = String(text || '');
    const normalizedQuery = String(query || '').trim();

    if (!sourceText || normalizedQuery.length < MIN_HIGHLIGHT_QUERY_LENGTH) {
        return [{ text: sourceText, match: false }];
    }

    const matcher = new RegExp(`(${escapeRegExp(normalizedQuery)})`, 'ig');
    const splitParts = sourceText.split(matcher).filter(Boolean);

    return splitParts.map((part) => ({
        text: part,
        match: part.toLowerCase() === normalizedQuery.toLowerCase(),
    }));
}

export default function HighlightedText({ text, query }) {
    const parts = getParts(text, query);
    if (parts.length === 1 && !parts[0].match) return parts[0].text;

    return parts.map((part, index) =>
        part.match ? (
            <Box
                key={`${part.text}-${index}`}
                component="mark"
                sx={(theme) => ({
                    backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(96, 165, 250, 0.26)'
                        : 'rgba(37, 99, 235, 0.16)',
                    color: 'inherit',
                    px: 0.18,
                    py: 0.02,
                    borderRadius: 0.75,
                })}
            >
                {part.text}
            </Box>
        ) : (
            <Box key={`${part.text}-${index}`} component="span">
                {part.text}
            </Box>
        )
    );
}
