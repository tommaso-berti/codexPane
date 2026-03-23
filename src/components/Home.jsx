import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useDocs } from '../contexts/useDocs.js';


export default function Home() {
    const { docs = [] } = useDocs();
    const featured = docs.slice(0, 4);

    return (
        <Box sx={{ color: 'text.primary', py: 2 }}>
            <Paper sx={{ p: { xs: 2.2, md: 3.8 }, borderRadius: 3 }}>
                <Chip label="Documentation Platform" color="primary" variant="outlined" sx={{ mb: 1.4 }} />
                <Typography variant="h2" component="h1" sx={{ maxWidth: 860 }}>
                    Build faster with a clean, searchable developer knowledge hub.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mt: 1.2 }}>
                    CodexPane combines MDX documentation, interactive examples, and structured navigation in a refined SaaS-style interface.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} sx={{ mt: 2.6 }}>
                    <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => window.dispatchEvent(new CustomEvent('open-topic-menu'))}
                    >
                        Start browsing docs
                    </Button>
                    <Button
                        variant="outlined"
                        component={Link}
                        href="https://github.com/tommaso-berti/codexPane"
                        target="_blank"
                        rel="noreferrer"
                        startIcon={<GitHubIcon />}
                        underline="none"
                    >
                        View repository
                    </Button>
                </Stack>
            </Paper>

            <Box sx={{ mt: 2.5 }}>
                <Typography variant="h6" sx={{ mb: 1.1 }}>
                    Popular topics
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1.2 }}>
                    {featured.map((item) => (
                        <Paper key={item.id} sx={{ p: 1.5, borderRadius: 2.4, backgroundColor: 'background.paper' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 650 }}>
                                {item.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {item.sectionCount ?? item.sections?.length ?? 0} sections
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2.3 }}>
                Need to suggest an improvement or report an issue? Open a ticket{' '}
                <Link href="https://github.com/tommaso-berti/codexPane/issues" target="_blank" rel="noreferrer" underline="hover">
                    on GitHub
                </Link>
                .
            </Typography>
        </Box>
    );
}
