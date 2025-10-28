import { useState, useMemo } from "react";
import {
    Button,
    Stack,
    Snackbar,
    Alert,
    Typography,
    Chip,
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    Tooltip
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

function randomTask(label, ms = 600) {
    return new Promise(async (resolve, reject) => {
        await sleep(ms);
        Math.random() < 0.6 ? resolve(`${label} ✓`) : reject(new Error(`${label} ✗`));
    });
}

const EXAMPLES = {
    resolve: `// Resolving promise
new Promise(res => setTimeout(() => res("Resolved value"), 700))
  .then(v => console.log("then:", v))
  .catch(e => console.log("catch:", e.message));`,
    reject: `// Rejecting promise
new Promise((_, rej) => setTimeout(() => rej(new Error("Boom")), 700))
  .then(v => console.log("then:", v))
  .catch(e => console.log("catch:", e.message));`,
    chain: `// Chaining with return
new Promise(res => setTimeout(() => res(2), 400))
  .then(x => { console.log("then1:", x); return x * 3; })
  .then(y => { console.log("then2:", y); return sleep(300).then(() => y + 4); })
  .then(z => console.log("then3 final:", z))
  .catch(e => console.log("catch:", e.message));`,
    all: `// Promise.all with 3 concurrent tasks
Promise.all([randomTask("A", 500), randomTask("B", 700), randomTask("C", 900)])
  .then(vals => console.log("all resolved:", vals))
  .catch(e => console.log("all rejected:", e.message));`
};

export default function PromisesPlayground() {
    const [log, setLog] = useState([]);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState("idle");
    const [example, setExample] = useState(null); // 'resolve' | 'reject' | 'chain' | 'all'

    const add = (msg) =>
        setLog((l) => [`${new Date().toLocaleTimeString()}: ${msg}`, ...l].slice(0, 12));

    const copyCode = async () => {
        if (!example) return;
        try {
            await navigator.clipboard.writeText(EXAMPLES[example]);
            setOpen(true);
        } catch {
            /* ignore */
        }
    };

    const runResolve = () => {
        setExample("resolve");
        setStatus("pending");
        add("Started a promise that resolves");
        new Promise((res) => setTimeout(() => res("Resolved value"), 700))
            .then((v) => {
                add(`then: ${v}`);
                setStatus("fulfilled");
                setOpen(true);
            })
            .catch((e) => {
                add(`catch: ${e.message}`);
                setStatus("rejected");
                setOpen(true);
            });
    };

    const runReject = () => {
        setExample("reject");
        setStatus("pending");
        add("Started a promise that rejects");
        new Promise((_, rej) => setTimeout(() => rej(new Error("Boom")), 700))
            .then((v) => {
                add(`then: ${v}`);
                setStatus("fulfilled");
                setOpen(true);
            })
            .catch((e) => {
                add(`catch: ${e.message}`);
                setStatus("rejected");
                setOpen(true);
            });
    };

    const runChain = () => {
        setExample("chain");
        setStatus("pending");
        add("Chain: first → second");
        new Promise((res) => setTimeout(() => res(2), 400))
            .then((x) => {
                add(`then1: got ${x}`);
                return x * 3;
            })
            .then((y) => {
                add(`then2: got ${y}`);
                return sleep(300).then(() => y + 4);
            })
            .then((z) => {
                add(`then3: final ${z}`);
                setStatus("fulfilled");
            })
            .catch((e) => {
                add(`catch: ${e.message}`);
                setStatus("rejected");
            })
            .finally(() => setOpen(true));
    };

    const runAll = () => {
        setExample("all");
        setStatus("pending");
        add("Promise.all: running three tasks");
        Promise.all([randomTask("A", 500), randomTask("B", 700), randomTask("C", 900)])
            .then((vals) => {
                add(`all resolved: ${vals.join(", ")}`);
                setStatus("fulfilled");
            })
            .catch((e) => {
                add(`all rejected: ${e.message}`);
                setStatus("rejected");
            })
            .finally(() => setOpen(true));
    };

    const color =
        status === "fulfilled"
            ? "success"
            : status === "rejected"
                ? "error"
                : status === "pending"
                    ? "warning"
                    : "default";

    const code = useMemo(() => (example ? EXAMPLES[example] : "// Choose an example to run…"), [example]);

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Experiment with promises</Typography>

            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <Button variant="contained" onClick={runResolve}>Resolve</Button>
                <Button variant="outlined" onClick={runReject}>Reject</Button>
                <Button variant="contained" onClick={runChain}>Chain</Button>
                <Button variant="contained" color="secondary" onClick={runAll}>Promise.all</Button>
                <Chip label={status} color={color} variant="filled" />
            </Stack>

            <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardHeader
                    title="Currently running code"
                    subheader={example ? `Example: ${example}` : "Pick an action to preview and run the code"}
                    action={
                        <Tooltip title="Copy code">
              <span>
                <IconButton onClick={copyCode} disabled={!example} size="small">
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </span>
                        </Tooltip>
                    }
                />
                <Divider />
                <CardContent>
          <pre
              style={{
                  margin: 0,
                  background: "#0B1020",
                  color: "#E6EDF3",
                  borderRadius: 12,
                  padding: "14px 16px",
                  overflowX: "auto",
                  fontSize: 13,
                  lineHeight: 1.45,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
              }}
          >
            <code>{code}</code>
          </pre>
                    <Typography variant="body2" sx={{ mt: 1.5 }} color="text.secondary">
                        The snippet above mirrors exactly what this playground executes when you click a button.
                    </Typography>
                </CardContent>
            </Card>

            <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardHeader title="Logs" subheader="Latest first" />
                <Divider />
                <CardContent>
                    <Stack spacing={0.5}>
                        {log.length === 0 ? (
                            <Typography color="text.secondary">Logs will appear here…</Typography>
                        ) : (
                            log.map((line, i) => (
                                <Typography key={i} sx={{ fontFamily: "ui-monospace, SF Mono, Menlo, monospace" }}>
                                    {line}
                                </Typography>
                            ))
                        )}
                    </Stack>
                </CardContent>
            </Card>

            <Snackbar open={open} autoHideDuration={1600} onClose={() => setOpen(false)}>
                <Alert
                    severity={status === "fulfilled" ? "success" : status === "rejected" ? "error" : "info"}
                    variant="filled"
                >
                    {status === "fulfilled" ? "Fulfilled" : status === "rejected" ? "Rejected" : "Pending / Copied"}
                </Alert>
            </Snackbar>
        </Stack>
    );
}