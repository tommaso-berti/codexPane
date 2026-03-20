import { useMemo, useState } from "react";
import { Alert, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function SqlStatementBuilderPlayground() {
    const [command, setCommand] = useState("SELECT");
    const [tableName, setTableName] = useState("users");
    const [whereClause, setWhereClause] = useState("id = 42");

    const sql = useMemo(() => {
        const table = tableName.trim() || "table_name";
        const where = whereClause.trim();
        if (command === "SELECT") return `SELECT * FROM ${table}${where ? ` WHERE ${where}` : ""};`;
        if (command === "UPDATE") return `UPDATE ${table}\nSET column_name = 'new_value'${where ? `\nWHERE ${where}` : ""};`;
        return `DELETE FROM ${table}${where ? ` WHERE ${where}` : ""};`;
    }, [command, tableName, whereClause]);

    const hasSemicolon = sql.trim().endsWith(";");

    return (
        <PlaygroundShell
            title="SQL Statement Builder Playground"
            goal="Practice SQL statement shape by switching command and clause inputs."
            status={{ color: hasSemicolon ? "success" : "warning", label: command }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel id="sql-command-label">Command</InputLabel>
                        <Select
                            labelId="sql-command-label"
                            label="Command"
                            value={command}
                            onChange={(event) => setCommand(event.target.value)}
                        >
                            <MenuItem value="SELECT">SELECT</MenuItem>
                            <MenuItem value="UPDATE">UPDATE</MenuItem>
                            <MenuItem value="DELETE">DELETE</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField size="small" label="Table name" value={tableName} onChange={(event) => setTableName(event.target.value)} />
                    <TextField
                        size="small"
                        label="WHERE clause (optional)"
                        value={whereClause}
                        onChange={(event) => setWhereClause(event.target.value)}
                    />
                    <Stack direction="row" spacing={1}>
                        <Button variant="outlined" onClick={() => { setCommand("SELECT"); setTableName("users"); setWhereClause("id = 42"); }}>
                            Reset
                        </Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Generated statement</Typography>
                    <Typography component="pre" variant="body2" sx={{ mt: 0.8, mb: 0, whiteSpace: "pre-wrap", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {sql}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={hasSemicolon ? "success" : "warning"} variant="outlined">
                        {hasSemicolon ? "Statement terminator is present (;)." : "Statement should end with ';'."}
                    </Alert>
                    <Alert severity="info" variant="outlined">
                        Clause check: {command} + FROM + optional WHERE.
                    </Alert>
                </Stack>
            }
            note="Treat SQL statements as structured templates: command, table target, optional filters, and terminator."
        />
    );
}
