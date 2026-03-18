import { useMemo, useState } from "react";
import {
    Alert,
    FormControlLabel,
    Paper,
    Stack,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const rows = [
    { period: "Morning", saturday: 73, sunday: 68 },
    { period: "Afternoon", saturday: 78, sunday: 74 },
    { period: "Evening", saturday: 70, sunday: 67 }
];

export default function TablePlayground() {
    const [showCaption, setShowCaption] = useState(true);
    const [showHead, setShowHead] = useState(true);
    const [showFoot, setShowFoot] = useState(true);
    const [useScope, setUseScope] = useState(true);

    const anatomy = useMemo(() => {
        const active = [];
        if (showCaption) active.push("caption");
        if (showHead) active.push("thead");
        active.push("tbody");
        if (showFoot) active.push("tfoot");
        return active;
    }, [showCaption, showHead, showFoot]);

    const total = rows.reduce((acc, row) => acc + row.saturday + row.sunday, 0);

    return (
        <PlaygroundShell
            title="Table Playground"
            goal="Understand the semantic anatomy of a table: caption, head, body, and footer."
            controls={
                <Stack spacing={0.4}>
                    <FormControlLabel
                        control={<Switch checked={showCaption} onChange={(event) => setShowCaption(event.target.checked)} />}
                        label="Show caption"
                    />
                    <FormControlLabel
                        control={<Switch checked={showHead} onChange={(event) => setShowHead(event.target.checked)} />}
                        label="Show thead"
                    />
                    <FormControlLabel
                        control={<Switch checked={showFoot} onChange={(event) => setShowFoot(event.target.checked)} />}
                        label="Show tfoot"
                    />
                    <FormControlLabel
                        control={<Switch checked={useScope} onChange={(event) => setUseScope(event.target.checked)} />}
                        label='Use scope="col" and scope="row" on header cells'
                    />
                </Stack>
            }
            preview={
                <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                    <Table
                        size="small"
                        sx={{
                            "& .MuiTableCell-root": {
                                color: "text.primary",
                                borderColor: "divider",
                                bgcolor: "background.paper"
                            }
                        }}
                    >
                        {showCaption ? (
                            <caption
                                style={{
                                    captionSide: "top",
                                    textAlign: "left",
                                    padding: "12px 16px",
                                    color: "var(--callout-muted-fg)",
                                    fontWeight: 600
                                }}
                            >
                                Weekend temperatures (°F)
                            </caption>
                        ) : null}
                        {showHead ? (
                            <TableHead sx={{ bgcolor: "action.hover" }}>
                                <TableRow>
                                    <TableCell />
                                    <TableCell {...(useScope ? { scope: "col" } : {})}>Saturday</TableCell>
                                    <TableCell {...(useScope ? { scope: "col" } : {})}>Sunday</TableCell>
                                </TableRow>
                            </TableHead>
                        ) : null}
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.period}>
                                    <TableCell
                                        component="th"
                                        {...(useScope ? { scope: "row" } : {})}
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {row.period}
                                    </TableCell>
                                    <TableCell>{row.saturday}</TableCell>
                                    <TableCell>{row.sunday}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {showFoot ? (
                            <TableFooter sx={{ bgcolor: "action.hover" }}>
                                <TableRow>
                                    <TableCell component="th" sx={{ fontWeight: 700 }}>
                                        Total
                                    </TableCell>
                                    <TableCell colSpan={2}>{total}</TableCell>
                                </TableRow>
                            </TableFooter>
                        ) : null}
                    </Table>
                </TableContainer>
            }
            output={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                        Current table anatomy
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {anatomy.map((part) => `<${part}>`).join(" + ")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Header scope attributes: {useScope ? 'enabled (`scope="col"` / `scope="row"`).' : "disabled."}
                    </Typography>
                    <Alert severity="info" variant="outlined" sx={{ mt: 1.2 }}>
                        `rowspan` and `colspan` are intentionally excluded here to keep the semantic structure focused.
                    </Alert>
                </Paper>
            }
            code={
                <pre>{`<table>
  ${showCaption ? "<caption>Weekend temperatures (°F)</caption>" : ""}
  ${showHead ? "<thead>...</thead>" : ""}
  <tbody>...</tbody>
  ${showFoot ? "<tfoot>...</tfoot>" : ""}
</table>

// header cells scope
${useScope ? 'scope="col" / scope="row"' : "no scope attributes"}`}</pre>
            }
            note="Toggle one section at a time and observe how semantics change even when visual layout looks similar."
        />
    );
}
