import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { toggleTheme } from "../store/themeSlice.js";

export default function SettingsDrawer({open, onClose}) {
    const buttons = [{label: 'Light', mode: 'light', icon: <LightModeIcon /> }, {label: 'Dark', mode: 'dark', icon: <DarkModeIcon />}, {label: 'System', mode: 'system', icon: <SettingsBrightnessIcon />}];
    const [active, setActive] = useState(null)
    const dispatch = useDispatch();
    const { mode: activeMode, fromSystem } = useSelector(state => state.theme);
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const handleClick = (index, mode) => {
        let system = false;
        if(mode === 'system') {
            mode = prefersDarkMode ? 'dark' : 'light';
            system = true;
        }
        if(mode === 'dark' || mode === 'light') {
            setActive(index);
        }
        dispatch(toggleTheme({ mode, fromSystem: system }));
    }

    useEffect(() => {
        buttons.forEach(({mode}, index) => {
            if(fromSystem) {
                setActive(index);
            }
            if(mode === activeMode && !fromSystem) {
                setActive(index);
            }
        })}, [])

    return (
        <SwipeableDrawer
            anchor="right"
            open={open}
            onClose={onClose}
            onOpen={() => {}}
        >
            <ButtonGroup variant="outlined" aria-label="dark theme settings" sx={{m:2, display: 'flex', flexDirection: 'row'}}>
                {buttons.map(({label,mode, icon}, index) => {
                    return (
                        <Button
                            key={icon}
                            startIcon={icon}
                            onClick={() => handleClick(index, mode)}
                            sx={{
                                bgcolor: active === index ? "primary.main" : "transparent",
                                color: active === index ? "white" : "text.primary",
                                "&:hover": { bgcolor: active === index ? "primary.dark" : "action.hover" }
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