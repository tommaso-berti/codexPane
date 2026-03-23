import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { toggleTheme } from "../store/themeSlice.js";
import { resetUiPrefs, setUiPref } from '../store/uiPrefsSlice.js';

const BUTTONS = [
    { label: 'Light', mode: 'light', icon: <LightModeIcon /> },
    { label: 'Dark', mode: 'dark', icon: <DarkModeIcon /> },
    { label: 'System', mode: 'system', icon: <SettingsBrightnessIcon /> },
];

export default function SettingsDrawer({open, onClose}) {
    const dispatch = useDispatch();
    const { mode: activeMode, fromSystem } = useSelector(state => state.theme);
    const uiPrefs = useSelector((state) => state.uiPrefs);
    const prefersDarkMode = useMemo(
        () => window.matchMedia('(prefers-color-scheme: dark)').matches,
        []
    );

    const activeIndex = useMemo(() => {
        if (fromSystem) {
            return BUTTONS.findIndex((button) => button.mode === 'system');
        }
        return BUTTONS.findIndex((button) => button.mode === activeMode);
    }, [activeMode, fromSystem]);

    const handleClick = (mode) => {
        let system = false;
        if(mode === 'system') {
            mode = prefersDarkMode ? 'dark' : 'light';
            system = true;
        }
        dispatch(toggleTheme({ mode, fromSystem: system }));
    };

    const setPref = (key) => (_, value) => {
        if (value === null || value === undefined) return;
        dispatch(setUiPref({ key, value }));
    };

    const setSwitch = (key) => (event) => {
        dispatch(setUiPref({ key, value: event.target.checked }));
    };

    const Section = ({ title, subtitle, children }) => (
        <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2.2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{title}</Typography>
            {subtitle ? (
                <Typography variant="caption" color="text.secondary">
                    {subtitle}
                </Typography>
            ) : null}
            <Stack spacing={1.3} sx={{ mt: 1.1 }}>
                {children}
            </Stack>
        </Paper>
    );

    return (
        <SwipeableDrawer
            anchor="right"
            open={open}
            onClose={onClose}
            onOpen={() => {}}
        >
            <Box sx={{ width: { xs: 350, md: 390 }, p: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Settings
                    </Typography>
                    <Button
                        size="small"
                        startIcon={<RestartAltIcon />}
                        onClick={() => dispatch(resetUiPrefs())}
                    >
                        Reset
                    </Button>
                </Stack>

                <Section title="Theme" subtitle="Keep the visual system consistent across sessions.">
                    <ButtonGroup variant="outlined" aria-label="theme settings" sx={{ display: 'flex', flexDirection: 'row' }}>
                        {BUTTONS.map(({label, mode, icon}, index) => {
                            return (
                                <Button
                                    key={mode}
                                    startIcon={icon}
                                    onClick={() => handleClick(mode)}
                                    sx={{
                                        bgcolor: activeIndex === index ? "primary.main" : "transparent",
                                        color: activeIndex === index ? "white" : "text.primary",
                                        "&:hover": { bgcolor: activeIndex === index ? "primary.dark" : "action.hover" }
                                    }}
                                >
                                    {label}
                                </Button>
                            )
                        })}
                    </ButtonGroup>
                </Section>

                <Stack spacing={1.2} sx={{ mt: 1.2 }}>
                    <Section title="Personalizzazione UX" subtitle="Optimize readability without changing page structure.">
                        <Typography variant="caption" color="text.secondary">Font size</Typography>
                        <ToggleButtonGroup size="small" exclusive value={uiPrefs.fontSize} onChange={setPref('fontSize')}>
                            <ToggleButton value="small">Small</ToggleButton>
                            <ToggleButton value="medium">Medium</ToggleButton>
                            <ToggleButton value="large">Large</ToggleButton>
                        </ToggleButtonGroup>

                        <Typography variant="caption" color="text.secondary">Content width</Typography>
                        <ToggleButtonGroup size="small" exclusive value={uiPrefs.contentWidth} onChange={setPref('contentWidth')}>
                            <ToggleButton value="narrow">Narrow</ToggleButton>
                            <ToggleButton value="wide">Wide</ToggleButton>
                        </ToggleButtonGroup>

                        <Typography variant="caption" color="text.secondary">Line spacing</Typography>
                        <ToggleButtonGroup size="small" exclusive value={uiPrefs.lineSpacing} onChange={setPref('lineSpacing')}>
                            <ToggleButton value="compact">Compact</ToggleButton>
                            <ToggleButton value="comfortable">Comfortable</ToggleButton>
                        </ToggleButtonGroup>

                        <Typography variant="caption" color="text.secondary">Code block style</Typography>
                        <ToggleButtonGroup size="small" exclusive value={uiPrefs.codeBlockStyle} onChange={setPref('codeBlockStyle')}>
                            <ToggleButton value="compact">Compact</ToggleButton>
                            <ToggleButton value="spacious">Spacious</ToggleButton>
                        </ToggleButtonGroup>

                        <Typography variant="caption" color="text.secondary">Accent palette</Typography>
                        <ToggleButtonGroup size="small" exclusive value={uiPrefs.accentPalette} onChange={setPref('accentPalette')}>
                            <ToggleButton value="blue">Blue</ToggleButton>
                            <ToggleButton value="teal">Teal</ToggleButton>
                            <ToggleButton value="indigo">Indigo</ToggleButton>
                            <ToggleButton value="slate">Slate</ToggleButton>
                        </ToggleButtonGroup>
                    </Section>

                    <Section title="Dev-oriented settings" subtitle="Fine tune code blocks and interactive examples.">
                        <FormControlLabel
                            control={<Switch checked={uiPrefs.showCodeLineNumbers} onChange={setSwitch('showCodeLineNumbers')} />}
                            label="Show line numbers"
                        />
                        <FormControlLabel
                            control={<Switch checked={uiPrefs.showCopyCodeButton} onChange={setSwitch('showCopyCodeButton')} />}
                            label="Show copy code button"
                        />
                        <FormControlLabel
                            control={<Switch checked={uiPrefs.autoExpandCodeExamples} onChange={setSwitch('autoExpandCodeExamples')} />}
                            label="Auto-expand code examples"
                        />
                        <FormControlLabel
                            control={<Switch checked={uiPrefs.enableInteractiveExamples} onChange={setSwitch('enableInteractiveExamples')} />}
                            label="Enable interactive examples"
                        />
                        <Typography variant="caption" color="text.secondary">Snippet language preference</Typography>
                        <ToggleButtonGroup
                            size="small"
                            exclusive
                            value={uiPrefs.snippetLanguagePreference}
                            onChange={setPref('snippetLanguagePreference')}
                        >
                            <ToggleButton value="js">JS</ToggleButton>
                            <ToggleButton value="ts">TS</ToggleButton>
                            <ToggleButton value="python">Python</ToggleButton>
                        </ToggleButtonGroup>
                    </Section>

                    <Section title="Advanced modes" subtitle="Reading-centric modes for focus, demos and deep work.">
                        <ToggleButtonGroup size="small" exclusive value={uiPrefs.advancedMode} onChange={setPref('advancedMode')}>
                            <ToggleButton value="default">Default</ToggleButton>
                            <ToggleButton value="focus">Focus</ToggleButton>
                            <ToggleButton value="zen">Zen</ToggleButton>
                            <ToggleButton value="presentation">Presentation</ToggleButton>
                        </ToggleButtonGroup>
                        <Divider />
                        <FormControlLabel
                            control={<Switch checked={uiPrefs.showReadingTime} onChange={setSwitch('showReadingTime')} />}
                            label="Reading time indicator"
                        />
                    </Section>
                </Stack>
            </Box>
        </SwipeableDrawer>
    )
}
