import React, { useCallback, useMemo, useRef, useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Chip,
    Divider,
    FormControlLabel,
    List,
    ListItem,
    Paper,
    Stack,
    Switch,
    Typography
} from "@mui/material";

/**
 * DiffingDemo
 * - Shows a list of 10 items you can toggle.
 * - "Memoize items" simulates optimizing renders with React.memo.
 * - Each row displays its own render count so you can see which items re-render.
 */
export default function DiffingDemo() {
    const [checked, setChecked] = useState(() => Array.from({ length: 10 }, () => false));
    const [memoize, setMemoize] = useState(true);

    const toggle = useCallback((i) => {
        setChecked((prev) => {
            const next = prev.slice();
            next[i] = !next[i];
            return next;
        });
    }, []);

    const reset = () => setChecked(Array.from({ length: 10 }, () => false));

    // Create stable data objects so memoization can work effectively
    const rows = useMemo(
        () =>
            checked.map((isOn, i) => ({
                id: i,
                label: `Item ${i + 1}`,
                isOn
            })),
        [checked]
    );

    const Row = memoize ? React.memo(RowBase) : RowBase;

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Virtual DOM diffing simulator</Typography>

            <Stack direction="row" alignItems="center" spacing={2}>
                <FormControlLabel
                    control={<Switch checked={memoize} onChange={(e) => setMemoize(e.target.checked)} />}
                    label="Memoize items"
                />
                <Chip size="small" label={memoize ? "Optimized" : "Naive"} color={memoize ? "success" : "default"} />
                <ButtonGroup size="small" variant="outlined">
                    <Button onClick={() => toggle(0)}>Toggle first item</Button>
                    <Button onClick={reset}>Reset all</Button>
                </ButtonGroup>
            </Stack>

            <Divider />

            <Paper variant="outlined" sx={{ p: 1 }}>
                <List dense>
                    {rows.map((row) => (
                        <Row
                            key={row.id}
                            id={row.id}
                            label={row.label}
                            isOn={row.isOn}
                            onToggle={() => toggle(row.id)}
                        />
                    ))}
                </List>
            </Paper>

            <Box>
                <Typography variant="caption" color="text.secondary">
                    Tip: With memoization ON, toggling one item should primarily re-render only that row.
                </Typography>
            </Box>
        </Stack>
    );
}

function RowBase({ id, label, isOn, onToggle }) {
    const renders = useRef(0);
    renders.current += 1;

    return (
        <ListItem
            secondaryAction={
                <Button size="small" onClick={onToggle} variant={isOn ? "contained" : "outlined"}>
                    {isOn ? "Checked" : "Check"}
                </Button>
            }
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2
            }}
        >
            <Box sx={{ minWidth: 70 }}>
                <Typography variant="body2">{label}</Typography>
            </Box>
            <Chip
                size="small"
                label={`renders: ${renders.current}`}
                color={renders.current === 1 ? "default" : "warning"}
                sx={{ mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
                {isOn ? "✓ selected" : "—"}
            </Typography>
        </ListItem>
    );
}