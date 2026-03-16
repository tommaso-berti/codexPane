import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

const variants = {
    tip: {
        severity: 'success',
        title: 'Tip',
        Icon: TipsAndUpdatesOutlinedIcon,
    },
    note: {
        severity: 'info',
        title: 'Note',
        Icon: InfoOutlinedIcon,
    },
    warning: {
        severity: 'warning',
        title: 'Warning',
        Icon: WarningAmberOutlinedIcon,
    },
};

export default function Callout({ variant = 'note', title, children }) {
    const { severity, Icon, title: defaultTitle } = variants[variant] ?? variants.note;
    return (
        <Alert
            icon={<Icon fontSize="small" />}
            severity={severity}
            sx={{
                my: 1.15,
                borderRadius: 2,
                '& .MuiAlert-message': { width: '100%' },
            }}
        >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.3 }}>
                {title || defaultTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {children}
            </Typography>
        </Alert>
    );
}

export function Tip(props) {
    return <Callout variant="tip" {...props} />;
}

export function Note(props) {
    return <Callout variant="note" {...props} />;
}

export function Warning(props) {
    return <Callout variant="warning" {...props} />;
}
