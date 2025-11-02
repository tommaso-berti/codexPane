import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';


export default function Home() {
    return (
        <Box sx={{ color: 'text.primary' }}>
            <Typography
                variant="h4"
                component="h1"
                fontWeight={700}
                gutterBottom
            >
                Welcome to my React project!
            </Typography>
            <Typography variant="body1" component="p">
                This application is built with modern web technologies, including{' '}
                <Box component="strong" sx={{ fontWeight: 700, display: 'inline' }}>React</Box>,{' '}
                <Box component="strong" sx={{ fontWeight: 700, display: 'inline' }}>Vite</Box>,{' '}
                <Box component="strong" sx={{ fontWeight: 700, display: 'inline' }}>Tailwind CSS</Box>, and{' '}
                <Box component="strong" sx={{ fontWeight: 700, display: 'inline' }}>Material UI</Box>.
            </Typography>
            <List component="ul" sx={{ listStyleType: 'disc', pl: 3, my: 2 }}>
                <ListItem component="li" sx={{ display: 'list-item', py: 0 }}>
                    Explore the documentation
                </ListItem>
                <ListItem component="li" sx={{ display: 'list-item', py: 0 }}>
                    Browse the lessons
                </ListItem>
                <ListItem component="li" sx={{ display: 'list-item', py: 0 }}>
                    Discover how we use Markdown and MDX to create interactive content
                </ListItem>
                <ListItem component="li" sx={{ display: 'list-item', py: 0 }}>
                    Choose a topic and start exploring the documentation
                </ListItem>
                <ListItem component="li" sx={{ display: 'list-item', py: 0 }}>
                    Do you have any suggestion or do you need to report a bug? Create a ticket{' '}
                    <Link href="" underline="hover">here</Link>
                </ListItem>
            </List>
            <Typography variant="body1">Happy coding!</Typography>
        </Box>
    );
}
