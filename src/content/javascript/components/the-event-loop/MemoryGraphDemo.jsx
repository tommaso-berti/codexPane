import React, { useMemo, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

function makePerson(name) {
    return { name };
}

export default function MemoryGraphDemo() {
    const [log, setLog] = useState([]);
    const [personRefA, setPersonRefA] = useState(null);
    const [personRefB, setPersonRefB] = useState(null);
    const [primitiveA, setPrimitiveA] = useState("Hi");
    const [primitiveB, setPrimitiveB] = useState("Hi");

    const heap = useMemo(() => {
        const entries = [];
        if (personRefA) entries.push({ id: "obj1", label: JSON.stringify(personRefA) });
        if (personRefB && personRefB === personRefA) {
            // same object — do not duplicate in list
        } else if (personRefB) {
            entries.push({ id: "obj2", label: JSON.stringify(personRefB) });
        }
        return entries;
    }, [personRefA, personRefB]);

    function append(msg) {
        setLog((l) => [...l, msg]);
    }

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Stack vs heap quick demo</Typography>

            <Box>
                <Typography variant="subtitle2">Primitives copy by value</Typography>
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setPrimitiveB(primitiveA); // copy current value
                            append(`primitiveB = "${primitiveA}" (copied)`);
                        }}
                    >
                        copy primitive
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setPrimitiveA((s) => s + "!");
                            append("primitiveA mutated (B unaffected)");
                        }}
                    >
                        mutate A
                    </Button>
                </Stack>
                <Typography variant="body2">A: {primitiveA} — B: {primitiveB}</Typography>
            </Box>

            <Box>
                <Typography variant="subtitle2">Objects copy references</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Button
                        variant="contained"
                        onClick={() => {
                            const p = makePerson("Aaliyah");
                            setPersonRefA(p);
                            append("created obj and stored reference in A");
                        }}
                    >
                        new object → A
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setPersonRefB(personRefA);
                            append("B now references the same object as A");
                        }}
                        disabled={!personRefA}
                    >
                        B = A
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            if (personRefA) {
                                personRefA.name = "Sarah";
                                setPersonRefA({ ...personRefA }); // re-render
                                if (personRefB) setPersonRefB({ ...personRefA });
                                append("mutated heap object via A (B sees change if same ref)");
                            }
                        }}
                        disabled={!personRefA}
                    >
                        mutate object
                    </Button>
                    <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => {
                            setPersonRefA(null);
                            append("A dropped its reference (object collectible if no others)");
                        }}
                        disabled={!personRefA}
                    >
                        drop A
                    </Button>
                    <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => {
                            setPersonRefB(null);
                            append("B dropped its reference");
                        }}
                        disabled={!personRefB}
                    >
                        drop B
                    </Button>
                </Stack>

                <Box sx={{ mt: 1, p: 2, bgcolor: "#f9fafb", borderRadius: 2 }}>
                    <Typography variant="subtitle2">Heap objects</Typography>
                    {heap.length === 0 ? (
                        <Typography variant="body2">∅ (no reachable objects)</Typography>
                    ) : (
                        heap.map((n) => (
                            <Typography key={n.id} variant="body2">• {n.label}</Typography>
                        ))
                    )}
                </Box>
            </Box>

            <Box sx={{ mt: 1, p: 2, bgcolor: "#fff7ed", borderRadius: 2 }}>
                <Typography variant="subtitle2">Log</Typography>
                <Box component="pre" sx={{ whiteSpace: "pre-wrap", fontSize: 12, m: 0 }}>
                    {log.map((l, i) => `${i + 1}. ${l}`).join("\n")}
                </Box>
            </Box>

            <Typography variant="caption" color="text.secondary">
                Tip: clear intervals and remove listeners when not needed to avoid leaks.
            </Typography>
        </Stack>
    );
}