import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { alpha } from '@mui/material/styles';

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

    const severityPalette = {
        success: 'success',
        info: 'info',
        warning: 'warning',
    };

    return (
        <Alert
            className="doc-callout"
            icon={<Icon fontSize="small" />}
            severity={severity}
            sx={(theme) => {
                const paletteKey = severityPalette[severity] ?? 'info';
                const paletteColor = theme.palette[paletteKey].main;
                const isDark = theme.palette.mode === 'dark';

                return {
                    my: 1.15,
                    borderRadius: 2,
                    border: `1px solid ${alpha(paletteColor, isDark ? 0.65 : 0.3)}`,
                    backgroundColor: isDark
                        ? alpha(paletteColor, 0.18)
                        : alpha(paletteColor, 0.1),
                    color: theme.palette.text.primary,
                    '& .MuiAlert-message': { width: '100%' },
                    '& .MuiAlert-icon': {
                        color: isDark ? alpha(paletteColor, 0.95) : paletteColor,
                    },
                };
            }}
        >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.3 }}>
                {title || defaultTitle}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
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
