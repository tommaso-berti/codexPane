import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import ReactMarkdown from 'react-markdown';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { APP_VERSION } from '../lib/version.js';
import { extractNotesFor } from '../lib/changelog.js';

export default function ReleaseNotesModal({ open, onClose }) {
    const notes = extractNotesFor(APP_VERSION);
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <div className="flex items-center justify-between">
                <DialogTitle>Release notes - v{APP_VERSION.replace(/^v/,'')}</DialogTitle>
                <IconButton onClick={onClose} sx={{ marginRight: '16px' }}><CloseIcon /></IconButton>
            </div>
            <DialogContent dividers>
                {<ReactMarkdown>{notes}</ReactMarkdown>}
            </DialogContent>
        </Dialog>
    )
}