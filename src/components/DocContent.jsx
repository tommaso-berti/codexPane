import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import PreWithCopy from './PreWithCopy.jsx';
import MdxTable from './MdxTable.jsx';

import 'github-markdown-css/github-markdown.css';
import '../styles/mdx.css';

export default function DocContent({ status, Content, error }) {
    if (status === 'loading') {
        return (
            <Box sx={{ py: 4, display: 'grid', placeItems: 'center' }}>
                <CircularProgress size={28} />
            </Box>
        );
    }

    if (status === 'error') {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error || 'Unable to load the document.'}
            </Alert>
        );
    }

    if (status === 'not-found' || !Content) {
        return (
            <Box sx={{ py: 2 }}>
                <Typography variant="h6">Document not found</Typography>
                <Typography variant="body2" color="text.secondary">
                    The requested page does not exist in the content folder.
                </Typography>
            </Box>
        );
    }

    return (
        <div className="markdown-body">
            <Content
                components={{
                    pre: PreWithCopy,
                    table: MdxTable,
                }}
            />
        </div>
    );
}

