import * as React from "react";
import {
    ThemeProvider,
    createTheme,
    ScopedCssBaseline,
    Stack,
    Box,
    Paper,
    Slider,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    Button
} from "@mui/material";

const hues = [
    { name: "Blue", main: "#1976d2" },
    { name: "Purple", main: "#7c4dff" },
    { name: "Teal", main: "#009688" },
    { name: "Pink", main: "#d81b60" },
    { name: "Orange", main: "#f57c00" }
];

export default function ThemePlayground() {
    const [mode, setMode] = React.useState("light");
    const [hueIndex, setHueIndex] = React.useState(0);
    const [radius, setRadius] = React.useState(10);

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: { mode, primary: { main: hues[hueIndex].main } },
                shape: { borderRadius: radius },
                typography: {
                    fontFamily: '"Inter", system-ui, Arial, sans-serif',
                    button: { textTransform: "none", fontWeight: 600 }
                }
            }),
        [mode, hueIndex, radius]
    );

    return (
        <ThemeProvider theme={theme}>
            <ScopedCssBaseline>
                <Stack spacing={2}>
                    <Typography variant="h6">Theme controls</Typography>

                    <ToggleButtonGroup
                        size="small"
                        color="primary"
                        exclusive
                        value={mode}
                        onChange={(_, v) => v && setMode(v)}
                        aria-label="color scheme"
                    >
                        <ToggleButton value="light">Light</ToggleButton>
                        <ToggleButton value="dark">Dark</ToggleButton>
                    </ToggleButtonGroup>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ flexWrap: "wrap" }}>
                        {hues.map((h, i) => (
                            <Button
                                key={h.name}
                                variant={i === hueIndex ? "contained" : "outlined"}
                                onClick={() => setHueIndex(i)}
                                sx={{ minWidth: 88 }}
                            >
                                {h.name}
                            </Button>
                        ))}
                    </Stack>

                    <Stack spacing={1} sx={{ maxWidth: 360 }}>
                        <Typography variant="body2">Border radius</Typography>
                        <Slider
                            size="small"
                            value={radius}
                            min={4}
                            max={24}
                            step={2}
                            valueLabelDisplay="auto"
                            onChange={(_, v) => setRadius(v)}
                        />
                    </Stack>

                    <Paper sx={{ p: 2 }}>
                        <Typography variant="overline">Preview</Typography>
                        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(3, 1fr)", mt: 1 }}>
                            {[1, 2, 3].map((i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        bgcolor: "primary.main",
                                        color: "primary.contrastText",
                                        borderRadius: 2,
                                        p: 2,
                                        textAlign: "center"
                                    }}
                                >
                                    Card {i}
                                </Box>
                            ))}
                        </Box>
                    </Paper>

                    <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                        <Typography variant="overline">Theme snippet</Typography>
                        <pre style={{ margin: 0, overflowX: "auto" }}>
{`createTheme({
  palette: { mode: "${mode}", primary: { main: "${hues[hueIndex].main}" } },
  shape: { borderRadius: ${radius} },
})`}
            </pre>
                    </Paper>
                </Stack>
            </ScopedCssBaseline>
        </ThemeProvider>
    );
}