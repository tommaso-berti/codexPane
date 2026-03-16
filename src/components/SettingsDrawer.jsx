import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { toggleTheme } from "../store/themeSlice.js";

const BUTTONS = [
    { label: 'Light', mode: 'light', icon: <LightModeIcon /> },
    { label: 'Dark', mode: 'dark', icon: <DarkModeIcon /> },
    { label: 'System', mode: 'system', icon: <SettingsBrightnessIcon /> },
];

export default function SettingsDrawer({open, onClose}) {
    const dispatch = useDispatch();
    const { mode: activeMode, fromSystem } = useSelector(state => state.theme);
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

    return (
        <SwipeableDrawer
            anchor="right"
            open={open}
            onClose={onClose}
            onOpen={() => {}}
        >
            <ButtonGroup variant="outlined" aria-label="dark theme settings" sx={{m:2, display: 'flex', flexDirection: 'row'}}>
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
        </SwipeableDrawer>
    )
}
