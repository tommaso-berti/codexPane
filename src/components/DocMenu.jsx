import { useDocs } from '../constexts/DocsContext.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, Button, ListItemIcon, ListItemText } from '@mui/material';
import ICONS from '../../icons.js'

export default function DocMenu() {
    const { docs } = useDocs();
    console.log(docs);
    const [anchorEl, setAnchorEl] = useState(null);
    const [buttonMenuName, setButtonMenuName] = useState('Choose argument');
    const navigate = useNavigate();

    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleSelect = (doc, title) => {
        setAnchorEl(null);
        if(title) setButtonMenuName(title);
        navigate(`/${doc}`);
    };

    return (
        <>
            <Button onClick={handleClick}>{buttonMenuName}</Button>
            <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
                {docs.map(({ doc, title, icon }) => {
                    const IconComponent = ICONS[icon] || ICONS.SettingsIcon;
                    return (
                        <MenuItem key={doc} onClick={() => handleSelect(doc, title)}>
                            <ListItemIcon><IconComponent fontSize="small" /></ListItemIcon>
                            <ListItemText>{title}</ListItemText>
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}