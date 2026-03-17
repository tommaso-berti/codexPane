import { useMemo, useState } from "react";
import {
    Alert,
    Button,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function MemoryGraphDemo() {
    const [hasARef, setHasARef] = useState(true);
    const [hasBRef, setHasBRef] = useState(false);
    const [shareRef, setShareRef] = useState(false);

    const state = useMemo(() => {
        const reachableFromA = hasARef;
        const reachableFromB = hasBRef;
        const totalRefs = (hasARef ? 1 : 0) + (hasBRef ? 1 : 0);

        return {
            totalRefs,
            collectible: totalRefs === 0,
            description:
                totalRefs === 0
                    ? "No references remain: object is eligible for garbage collection."
                    : `Object is still reachable through ${totalRefs} reference${totalRefs > 1 ? "s" : ""}.`,
            relation: shareRef && hasARef && hasBRef ? "A and B point to the same heap object." : "References are independent or missing."
        };
    }, [hasARef, hasBRef, shareRef]);

    return (
        <PlaygroundShell
            title="Memory Reachability Playground"
            goal="Understand when heap objects become collectible based on active references."
            status={{ color: state.collectible ? "success" : "warning", label: `${state.totalRefs} refs` }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 640 }}>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                        <Button variant={hasARef ? "contained" : "outlined"} onClick={() => setHasARef((v) => !v)}>Toggle ref A</Button>
                        <Button variant={hasBRef ? "contained" : "outlined"} onClick={() => setHasBRef((v) => !v)}>Toggle ref B</Button>
                        <Button variant={shareRef ? "contained" : "outlined"} onClick={() => setShareRef((v) => !v)}>Toggle shared ref</Button>
                    </Stack>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setHasARef(true);
                            setHasBRef(false);
                            setShareRef(false);
                        }}
                        sx={{ width: "fit-content" }}
                    >
                        Reset
                    </Button>
                </Stack>
            }
            preview={
                <Paper
                    variant="outlined"
                    sx={(theme) => ({
                        p: 1.3,
                        borderRadius: 2,
                        bgcolor: theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.04) : alpha(theme.palette.common.black, 0.02)
                    })}
                >
                    <Typography variant="caption" color="text.secondary">Reference graph</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        A =&gt; {hasARef ? "object" : "null"} | B =&gt; {hasBRef ? (shareRef && hasARef ? "same object" : "object") : "null"}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={state.collectible ? "success" : "warning"} variant="outlined">{state.description}</Alert>
                    <Alert severity="info" variant="outlined">{state.relation}</Alert>
                </Stack>
            }
            note="Garbage collection depends on reachability, not on whether a variable name still exists in source code."
        />
    );
}
