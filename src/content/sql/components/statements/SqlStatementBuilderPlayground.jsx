import { useMemo, useState } from "react";
import { Alert, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function SqlStatementBuilderPlayground() {
    const INITIAL_COMMAND = "SELECT";
    const INITIAL_TABLE = "users";
    const INITIAL_WHERE = "id = 42";
    const [commandDraft, setCommandDraft] = useState(INITIAL_COMMAND);
    const [tableDraft, setTableDraft] = useState(INITIAL_TABLE);
    const [whereDraft, setWhereDraft] = useState(INITIAL_WHERE);
    const [command, setCommand] = useState(INITIAL_COMMAND);
    const [tableName, setTableName] = useState(INITIAL_TABLE);
    const [whereClause, setWhereClause] = useState(INITIAL_WHERE);

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
                            value={commandDraft}
                            onChange={(event) => setCommandDraft(event.target.value)}
                        >
                            <MenuItem value="SELECT">SELECT</MenuItem>
                            <MenuItem value="UPDATE">UPDATE</MenuItem>
                            <MenuItem value="DELETE">DELETE</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField size="small" label="Table name" value={tableDraft} onChange={(event) => setTableDraft(event.target.value)} />
                    <TextField
                        size="small"
                        label="WHERE clause (optional)"
                        value={whereDraft}
                        onChange={(event) => setWhereDraft(event.target.value)}
                    />
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setCommand(commandDraft);
                                setTableName(tableDraft);
                                setWhereClause(whereDraft);
                            }}
                        >
                            Apply
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setCommandDraft(INITIAL_COMMAND);
                                setTableDraft(INITIAL_TABLE);
                                setWhereDraft(INITIAL_WHERE);
                                setCommand(INITIAL_COMMAND);
                                setTableName(INITIAL_TABLE);
                                setWhereClause(INITIAL_WHERE);
                            }}
                        >
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
            code={
                <pre>
{`switch (command) {
  case "SELECT": return \`SELECT * FROM \${table} WHERE ...;\`;
  case "UPDATE": return \`UPDATE \${table} SET ... WHERE ...;\`;
  default:       return \`DELETE FROM \${table} WHERE ...;\`;
}`}
                </pre>
            }
            note="Treat SQL statements as structured templates: command, table target, optional filters, and terminator."
        />
    );
}
