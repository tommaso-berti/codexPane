import { useDocs } from '../contexts/DocsContext.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, Button, ListItemIcon, ListItemText } from '@mui/material';
import ICONS from '../../icons.js'

export default function DocMenu() {
    const { docs } = useDocs();
    const [anchorEl, setAnchorEl] = useState(null);
    const [buttonMenuName, setButtonMenuName] = useState('Choose argument');
    const navigate = useNavigate();

    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleSelect = (id, title) => {
        setAnchorEl(null);
        if(title) setButtonMenuName(title);
        navigate(`/${id}`);
    };

    return (
        <>
            <Button onClick={handleClick}>{buttonMenuName}</Button>
            <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
                {docs.map(({ id, title, icon }) => {
                    const IconComponent = ICONS[icon] || ICONS.SettingsIcon;
                    return (
                        <MenuItem key={id} onClick={() => handleSelect(id, title)}>
                            <ListItemIcon><IconComponent fontSize="small" /></ListItemIcon>
                            <ListItemText>{title}</ListItemText>
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}