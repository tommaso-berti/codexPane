import { useMemo, useState } from "react";
import {
    Alert,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const SCENARIOS = {
    library: {
        label: "Library package",
        project: "awesome-utils",
        description: "Small utility helpers for frontend projects.",
        install: true,
        usage: true,
        license: true
    },
    app: {
        label: "Web app",
        project: "focus-board",
        description: "Kanban board for personal task planning.",
        install: true,
        usage: true,
        license: false
    }
};

export default function ReadmeStructurePlayground() {
    const [scenario, setScenario] = useState("library");
    const [project, setProject] = useState(SCENARIOS.library.project);
    const [description, setDescription] = useState(SCENARIOS.library.description);
    const [includeInstall, setIncludeInstall] = useState(SCENARIOS.library.install);
    const [includeUsage, setIncludeUsage] = useState(SCENARIOS.library.usage);
    const [includeLicense, setIncludeLicense] = useState(SCENARIOS.library.license);

    const readmePreview = useMemo(() => {
        const lines = [
            "# " + (project || "project-name"),
            "",
            description || "Short project description."
        ];

        if (includeInstall) {
            lines.push("", "## Installation", "```bash", "npm install", "```");
        }
        if (includeUsage) {
            lines.push("", "## Usage", "```bash", "npm run dev", "```");
        }
        if (includeLicense) {
            lines.push("", "## License", "MIT");
        }

        return lines.join("\n");
    }, [description, includeInstall, includeLicense, includeUsage, project]);

    const checklist = [
        { ok: Boolean(project.trim()), label: "Project title is present" },
        { ok: Boolean(description.trim()), label: "Description is present" },
        { ok: includeInstall || includeUsage, label: "At least one practical section exists" }
    ];

    const passed = checklist.filter((item) => item.ok).length;

    return (
        <PlaygroundShell
            title="README Structure Playground"
            goal="Build a clear README skeleton with essential sections and quick quality checks."
            status={{ color: passed === checklist.length ? "success" : "warning", label: passed + "/" + checklist.length + " checks pass" }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <FormControl size="small">
                        <InputLabel id="readme-scenario-label">Scenario</InputLabel>
                        <Select
                            labelId="readme-scenario-label"
                            label="Scenario"
                            value={scenario}
                            onChange={(event) => {
                                const next = SCENARIOS[event.target.value];
                                setScenario(event.target.value);
                                setProject(next.project);
                                setDescription(next.description);
                                setIncludeInstall(next.install);
                                setIncludeUsage(next.usage);
                                setIncludeLicense(next.license);
                            }}
                        >
                            {Object.entries(SCENARIOS).map(([key, value]) => (
                                <MenuItem key={key} value={key}>{value.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        size="small"
                        label="Project name"
                        value={project}
                        onChange={(event) => setProject(event.target.value)}
                    />
                    <TextField
                        size="small"
                        label="One-line description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                        <FormControlLabel control={<Switch checked={includeInstall} onChange={(event) => setIncludeInstall(event.target.checked)} />} label="Installation" />
                        <FormControlLabel control={<Switch checked={includeUsage} onChange={(event) => setIncludeUsage(event.target.checked)} />} label="Usage" />
                        <FormControlLabel control={<Switch checked={includeLicense} onChange={(event) => setIncludeLicense(event.target.checked)} />} label="License" />
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">README preview</Typography>
                    <pre style={{ margin: "8px 0 0", fontSize: 12, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{readmePreview}</pre>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {checklist.map((item) => (
                        <Alert key={item.label} severity={item.ok ? "success" : "warning"} variant="outlined">{item.label}</Alert>
                    ))}
                </Stack>
            }
            note="A strong README explains what the project is, how to run it, and where to find practical usage details."
        />
    );
}
