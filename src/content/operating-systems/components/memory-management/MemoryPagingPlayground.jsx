import { useMemo, useState } from "react";
import { Alert, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function MemoryPagingPlayground() {
  const [processMb, setProcessMb] = useState("74");
  const [pageKb, setPageKb] = useState("4");
  const result = useMemo(() => {
    const p = Number(processMb);
    const k = Number(pageKb);
    if (!Number.isFinite(p) || !Number.isFinite(k) || p <= 0 || k <= 0) return null;
    const pages = Math.ceil((p * 1024) / k);
    const allocatedKb = pages * k;
    const internalFragKb = allocatedKb - p * 1024;
    return { pages, allocatedKb, internalFragKb };
  }, [processMb, pageKb]);

  return (
    <PlaygroundShell
      title="Paging Capacity Playground"
      goal="Estimate page count and internal fragmentation from process size and page size."
      status={{ color: result ? "info" : "warning", label: result ? `${result.pages} pages` : "invalid input" }}
      controls={<Stack spacing={1.2} sx={{ maxWidth: 520 }}>
        <TextField size="small" label="Process size (MB)" value={processMb} onChange={(e) => setProcessMb(e.target.value)} />
        <TextField size="small" label="Page size (KB)" value={pageKb} onChange={(e) => setPageKb(e.target.value)} />
        <Stack direction="row" spacing={1}><Button variant="outlined" onClick={() => { setProcessMb("74"); setPageKb("4"); }}>Reset</Button></Stack>
      </Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Allocation summary</Typography><Typography variant="body2" sx={{ mt: 0.8 }}>{result ? `Pages: ${result.pages} | Allocated: ${result.allocatedKb} KB` : "Provide positive numeric values"}</Typography></Paper>}
      output={<Alert severity={result ? "info" : "error"} variant="outlined">{result ? `Estimated internal fragmentation: ${result.internalFragKb} KB.` : "Cannot compute paging metrics with invalid values."}</Alert>}
      note="Paging reduces external fragmentation but can introduce internal fragmentation."
    />
  );
}
