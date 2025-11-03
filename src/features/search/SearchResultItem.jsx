import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import ArticleIcon from "@mui/icons-material/Article";
import Typography from "@mui/material/Typography";
import TagIcon from "@mui/icons-material/Tag";
import ListItemButton from "@mui/material/ListItemButton";

export default function SearchResultItem({result, onClick, branch = 'single', siblings = [], index}) {
    const breadcrumb = result.breadcrumb;
    const isParent = breadcrumb.length === 2;
    const isChild  = breadcrumb.length === 3;

    const previous = index > 0 ? siblings[index - 1] : null;
    const prevSameSection =
        !!previous &&
        previous.breadcrumb?.[1] === breadcrumb[1] &&
        (previous.breadcrumb.length === 2 || previous.breadcrumb.length === 3);

    const showGutter = isChild && prevSameSection;

    let gutter = null;
    if (showGutter) {
        const symbols = { start: '┌', middle: '├', end: '└', single: '-' };
        gutter = (
            <Typography
                component="span"
                sx={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    opacity: 0.6,
                    minWidth: 10,
                    textAlign: 'center'
                }}
            >
                {symbols[branch]}
            </Typography>
        );
    }

    return (
        <ListItemButton
            onClick={() => onClick(result.path)}
            sx={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                p: 1,
                mb: 1,
                cursor: 'pointer',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%'
            }}
        >
            {isParent && (
                <ListItemText
                    primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ArticleIcon fontSize="small" color="action" />
                            <Typography variant="h6">
                                {breadcrumb[1]}
                            </Typography>
                        </Box>
                    }
                />
            )}

            {isChild && (
                <>
                    <ListItemText
                        primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {gutter}
                                <TagIcon fontSize="small" color="action" />
                                <Typography variant="h6">
                                    {breadcrumb[2]}
                                </Typography>
                            </Box>
                        }
                    />
                    <ListItemText
                        primary={<Typography variant="subtitle2">{breadcrumb[1]}</Typography>}
                    />
                </>
            )}
        </ListItemButton>
    );
}
