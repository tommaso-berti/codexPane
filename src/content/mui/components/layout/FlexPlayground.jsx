import * as React from "react";
import {
    Stack,
    Box,
    Slider,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    Divider,
    Paper
} from "@mui/material";

export default function FlexPlayground() {
    const [direction, setDirection] = React.useState("row");
    const [justify, setJustify] = React.useState("center");
    const [align, setAlign] = React.useState("center");
    const [gap, setGap] = React.useState(16);
    const [wrap, setWrap] = React.useState("nowrap");

    const item = (label) => (
        <Box
            key={label}
            sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                px: 1.25,
                py: 0.75,
                borderRadius: 1,
                minWidth: 64,
                textAlign: "center"
            }}
        >
            {label}
        </Box>
    );

    const code = `import { Box } from "@mui/material";

export default function Example() {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "${direction}",
      justifyContent: "${justify}",
      alignItems: "${align}",
      gap: "${gap}px",
      flexWrap: "${wrap}",
      p: 2,
      borderRadius: 2,
      minHeight: 120,
      outline: "1px dashed rgba(0,0,0,.2)"
    }}>
      {["A","B","C","D","E"].map(label => (
        <Box key={label} sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          px: 1.25,
          py: 0.75,
          borderRadius: 1,
          minWidth: 64,
          textAlign: "center"
        }}>{label}</Box>
      ))}
    </Box>
  );
}`;

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Flex controls</Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <ToggleButtonGroup
                    size="small"
                    exclusive
                    color="primary"
                    value={direction}
                    onChange={(_, v) => v && setDirection(v)}
                    aria-label="direction"
                >
                    <ToggleButton value="row">row</ToggleButton>
                    <ToggleButton value="row-reverse">row-reverse</ToggleButton>
                    <ToggleButton value="column">column</ToggleButton>
                    <ToggleButton value="column-reverse">column-reverse</ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup
                    size="small"
                    exclusive
                    color="primary"
                    value={wrap}
                    onChange={(_, v) => v && setWrap(v)}
                    aria-label="wrap"
                >
                    <ToggleButton value="nowrap">nowrap</ToggleButton>
                    <ToggleButton value="wrap">wrap</ToggleButton>
                    <ToggleButton value="wrap-reverse">wrap-reverse</ToggleButton>
                </ToggleButtonGroup>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <ToggleButtonGroup
                    size="small"
                    exclusive
                    color="primary"
                    value={justify}
                    onChange={(_, v) => v && setJustify(v)}
                    aria-label="justify-content"
                >
                    <ToggleButton value="flex-start">flex-start</ToggleButton>
                    <ToggleButton value="center">center</ToggleButton>
                    <ToggleButton value="flex-end">flex-end</ToggleButton>
                    <ToggleButton value="space-between">space-between</ToggleButton>
                    <ToggleButton value="space-around">space-around</ToggleButton>
                    <ToggleButton value="space-evenly">space-evenly</ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup
                    size="small"
                    exclusive
                    color="primary"
                    value={align}
                    onChange={(_, v) => v && setAlign(v)}
                    aria-label="align-items"
                >
                    <ToggleButton value="stretch">stretch</ToggleButton>
                    <ToggleButton value="flex-start">flex-start</ToggleButton>
                    <ToggleButton value="center">center</ToggleButton>
                    <ToggleButton value="flex-end">flex-end</ToggleButton>
                    <ToggleButton value="baseline">baseline</ToggleButton>
                </ToggleButtonGroup>
            </Stack>

            <Stack sx={{ maxWidth: 360 }}>
                <Typography variant="body2">Gap</Typography>
                <Slider
                    size="small"
                    value={gap}
                    min={0}
                    max={48}
                    step={4}
                    valueLabelDisplay="auto"
                    onChange={(_, v) => setGap(v)}
                />
            </Stack>

            <Divider />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: direction,
                    justifyContent: justify,
                    alignItems: align,
                    gap: `${gap}px`,
                    flexWrap: wrap,
                    outline: "1px dashed rgba(0,0,0,.2)",
                    p: 2,
                    borderRadius: 2,
                    minHeight: 120
                }}
            >
                {["A", "B", "C", "D", "E"].map(item)}
            </Box>

            <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                <Typography variant="overline">Code</Typography>
                <pre style={{ margin: 0, overflowX: "auto" }}>
      <code>{code}</code>
    </pre>
            </Paper>
        </Stack>
    );
}