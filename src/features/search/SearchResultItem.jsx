import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import ArticleIcon from "@mui/icons-material/Article";
import Typography from "@mui/material/Typography";
import TagIcon from "@mui/icons-material/Tag";
import ListItemButton from "@mui/material/ListItemButton";

export default function SearchResultItem({result, onClick, branch = 'single'}) {
    const hasTwo = result.breadcrumb.length <= 2;

    const Gutter = branch === 'none' ? null : (
        <Typography
            component="span"
            sx={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                opacity: 0.6,
                minWidth: 10,
                textAlign: 'center'
            }}
        >
            {{
                start: '┌',
                middle: '├',
                end: '└',
                single: '-'
            }[branch]}
        </Typography>
    );

    return (
        <ListItemButton
            key={result.id}
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
            {
                hasTwo ? (
                    <ListItemText
                        primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {Gutter}
                                <ArticleIcon fontSize="small" color="action" />
                                <Typography variant="h6">{result.breadcrumb[1]}</Typography>
                            </Box>
                        }
                    />
                ) : (
                    <Box>
                        <ListItemText
                            primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {Gutter}
                                    <TagIcon fontSize="small" color="action" />
                                    <Typography variant="h6">{result.breadcrumb[2]}</Typography>
                                </Box>
                            }
                        />
                        <ListItemText
                            primary={<Typography variant="subtitle2">{result.breadcrumb[1]}</Typography>}
                        />
                    </Box>
                )
            }
        </ListItemButton>
    )
}