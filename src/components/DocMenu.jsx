import React from 'react';
import { useState, useEffect } from 'react';
import { Menu, MenuItem, Button, ListItemIcon, ListItemText } from '@mui/material';
import ICONS from '../../icons.js'

export default function DocMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [buttonMenuName, setButtonMenuName] = useState('Choose argument');

    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = (title) => {
        setAnchorEl(null);
        if(title)
            setButtonMenuName(title)
    }

    //import all files within a folder
    const docs = import.meta.glob('../content/**/structure.json', { eager: true });
    const [docsMetadata, setDocsMetadata] = useState([]);
    useEffect(() => {
        const entries = Object.entries(docs);
        console.log('entries', entries);
        const newDocsMetadata = entries.map(([key, value]) => ({
            doc: value.doc,
            title: value.title,
            icon: value.icon,
        }));
        setDocsMetadata(newDocsMetadata);
    }, []);

    console.log(docsMetadata)

    return (
        <>
            <Button onClick={handleClick}>{buttonMenuName}</Button>
            <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
                {docsMetadata.map(({ doc, title, icon }) => {
                    const IconComponent = ICONS[icon] || ICONS.SettingsIcon;
                    return (
                        <MenuItem key={doc} onClick={() => handleClose(title)}>
                            <ListItemIcon><IconComponent fontSize="small" /></ListItemIcon>
                            <ListItemText>{title}</ListItemText>
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}