import { useState } from "react";
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
    const activeMode = useSelector((state) => state.theme);
console.log(activeMode);

    const handleClick = (index, mode) => {
        setActive(index);
        if (mode !== activeMode)
            dispatch(toggleTheme());
    }

    return (
        <SwipeableDrawer
            anchor="right"
            open={open}
            onClose={onClose}
            onOpen={() => {}}
        >
            <ButtonGroup variant="outlined" aria-label="dark theme settings" >
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