import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function PreWithCopy(props) {
    const preRef = useRef(null);
    const [copied, setCopied] = useState(false);

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
        <Box sx={{ position: "relative" }} className="pre-with-copy">
            <pre ref={preRef} {...props} />
            <Tooltip title={copied ? "Copied!" : "Copy"} placement="top" arrow>
                <IconButton
                    aria-label="Copy code to clipboard"
                    onClick={onCopy}
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        opacity: 0.7,
                        "&:hover": { opacity: 1 },
                        backgroundColor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    <ContentCopyIcon fontSize="inherit" />
                </IconButton>
            </Tooltip>
        </Box>
    );
}