import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

function getLanguage(props) {
    const className = props?.children?.props?.className || '';
    const match = className.match(/language-([\w-]+)/);
    if (!match) return 'code';
    return match[1];
}

export default function PreWithCopy(props) {
    const preRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const language = getLanguage(props);

    const onCopy = async (e) => {
        e.stopPropagation();
        try {
            const el = preRef.current;
            const code = el?.querySelector("code");
            const text = code?.innerText ?? el?.innerText ?? "";
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    return (
        <Box
            className="pre-with-copy"
            sx={{
                position: "relative",
                borderRadius: 1.75,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'var(--code-bg)',
                boxShadow: '0 10px 24px rgba(15,23,42,0.2)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 1.3,
                    py: 0.8,
                    borderBottom: '1px solid',
                    borderColor: 'rgba(148,163,184,0.28)',
                    background: 'rgba(15,23,42,0.85)',
                }}
            >
                <Chip size="small" label={language} sx={{ height: 22, fontSize: '0.73rem', textTransform: 'uppercase' }} />
                <Tooltip title={copied ? "Copied" : "Copy code"} placement="top" arrow>
                    <IconButton
                        aria-label="Copy code to clipboard"
                        onClick={onCopy}
                        size="small"
                        sx={{
                            borderRadius: 1.2,
                            color: copied ? '#38BDF8' : '#cbd5e1',
                            border: '1px solid',
                            borderColor: 'rgba(148,163,184,0.35)',
                            bgcolor: 'rgba(15,23,42,0.55)',
                            '&:hover': { bgcolor: 'rgba(37,99,235,0.22)', color: '#e2e8f0' },
                        }}
                    >
                        {copied ? <CheckIcon fontSize="inherit" /> : <ContentCopyIcon fontSize="inherit" />}
                    </IconButton>
                </Tooltip>
            </Box>

            <pre
                ref={preRef}
                {...props}
                style={{
                    ...(props.style || {}),
                    margin: 0,
                    padding: '1rem 1.05rem',
                    color: 'var(--code-fg)',
                    backgroundColor: 'transparent',
                }}
            />
            {copied && (
                <Typography
                    variant="caption"
                    sx={{
                        position: 'absolute',
                        right: 12,
                        bottom: 10,
                        color: '#38BDF8',
                        fontWeight: 700,
                    }}
                >
                    Copied
                </Typography>
            )}
        </Box>
    );
}
