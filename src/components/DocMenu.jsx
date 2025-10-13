import { useDocs } from '../contexts/DocsContext.jsx';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu, MenuItem, Button, ListItemIcon, ListItemText } from '@mui/material';
import ICONS from '../../icons.js'

export default function DocMenu() {
    const { docs } = useDocs();
    const [anchorEl, setAnchorEl] = useState(null);
    const [buttonMenuName, setButtonMenuName] = useState('');
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if(params.docs) {
            setButtonMenuName(docs.find(d => d.id === params.docs)?.title || 'Choose argument');
        }
    }, [params.docs, docs]);

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
            <Button onClick={handleClick} className="!text-xl !">{buttonMenuName}</Button>
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