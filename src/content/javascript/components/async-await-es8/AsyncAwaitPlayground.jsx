import { useMemo, useState } from "react";
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

const ms = (n) => new Promise((r) => setTimeout(r, n));

function task(label, time, ok = 0.8) {
    return new Promise(async (resolve, reject) => {
        await ms(time);
        Math.random() < ok ? resolve(`${label} ✓ (${time}ms)`) : reject(new Error(`${label} ✗ (${time}ms)`));
    });
}

const EXAMPLES = {
    sequential: `// Sequential: waits for t1 then starts t2 (total ≈ t1 + t2)
async function run() {
  const v1 = await task("T1", 600);
  const v2 = await task("T2", 800);
  console.log("sequential:", v1, "|", v2);
}
run();`,
    concurrent: `// Concurrent: starts both, waits for both (total ≈ max(t1,t2))
async function run() {
  const p1 = task("T1", 600);
  const p2 = task("T2", 800);
  console.log("concurrent:", await p1, "|", await p2);
}
run();`,
    trycatch: `// Try/catch in async function
async function run() {
  try {
    const v = await task("MayFail", 700, 0.5);
    console.log("ok:", v);
  } catch (e) {
    console.error("caught:", e.message);
  }
}
run();`,
    all: `// Await Promise.all (fails fast)
async function run() {
  try {
    const results = await Promise.all([
      task("A", 500, 0.9),
      task("B", 700, 0.9),
      task("C", 900, 0.9)
    ]);
    console.log("all resolved:", results);
  } catch (e) {
    console.error("one failed:", e.message);
  }
}
run();`
};

export default function AsyncAwaitPlayground() {
    const [log, setLog] = useState([]);
    const [status, setStatus] = useState("idle"); // idle | pending | fulfilled | rejected
    const [open, setOpen] = useState(false);
    const [example, setExample] = useState(null); // 'sequential' | 'concurrent' | 'trycatch' | 'all'

    const add = (msg) =>
        setLog((l) => [`${new Date().toLocaleTimeString()}: ${msg}`, ...l].slice(0, 14));

    const copyCode = async () => {
        if (!example) return;
        try {
            await navigator.clipboard.writeText(EXAMPLES[example]);
            setOpen(true);
        } catch {}
    };

    const runSequential = async () => {
        setExample("sequential");
        setStatus("pending");
        add("Sequential: start T1, then T2 after T1 finishes");
        try {
            const v1 = await task("T1", 600);
            add(`then: ${v1}`);
            const v2 = await task("T2", 800);
            add(`then: ${v2}`);
            setStatus("fulfilled");
        } catch (e) {
            add(`catch: ${e.message}`);
            setStatus("rejected");
        } finally {
            setOpen(true);
        }
    };

    const runConcurrent = async () => {
        setExample("concurrent");
        setStatus("pending");
        add("Concurrent: start T1 and T2 together");
        try {
            const p1 = task("T1", 600);
            const p2 = task("T2", 800);
            const v1 = await p1;
            add(`then: ${v1}`);
            const v2 = await p2;
            add(`then: ${v2}`);
            setStatus("fulfilled");
        } catch (e) {
            add(`catch: ${e.message}`);
            setStatus("rejected");
        } finally {
            setOpen(true);
        }
    };

    const runTryCatch = async () => {
        setExample("trycatch");
        setStatus("pending");
        add("Try/catch demo: may fail");
        try {
            const v = await task("MayFail", 700, 0.5);
            add(`then: ${v}`);
            setStatus("fulfilled");
        } catch (e) {
            add(`catch: ${e.message}`);
            setStatus("rejected");
        } finally {
            setOpen(true);
        }
    };

    const runAll = async () => {
        setExample("all");
        setStatus("pending");
        add("Promise.all: run A, B, C together");
        try {
            const results = await Promise.all([
                task("A", 500, 0.9),
                task("B", 700, 0.9),
                task("C", 900, 0.9)
            ]);
            add(`all resolved: ${results.join(" | ")}`);
            setStatus("fulfilled");
        } catch (e) {
            add(`all rejected: ${e.message}`);
            setStatus("rejected");
        } finally {
            setOpen(true);
        }
    };

    const color =
        status === "fulfilled"
            ? "success"
            : status === "rejected"
                ? "error"
                : status === "pending"
                    ? "warning"
                    : "default";

    const code = useMemo(
        () => (example ? EXAMPLES[example] : "// Choose an example to run…"),
        [example]
    );

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Async/await experiments</Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
                <Button variant="contained" onClick={runSequential}>Sequential</Button>
                <Button variant="contained" onClick={runConcurrent}>Concurrent</Button>
                <Button variant="contained" onClick={runTryCatch}>Try/catch</Button>
                <Button variant="contained" color="secondary" onClick={runAll}>Promise.all</Button>
                <Chip label={status} color={color} />
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
                  fontFamily:
                      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
              }}
          >
            <code>{code}</code>
          </pre>
                    <Typography variant="body2" sx={{ mt: 1.5 }} color="text.secondary">
                        The snippet above mirrors exactly what runs when you click a button.
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