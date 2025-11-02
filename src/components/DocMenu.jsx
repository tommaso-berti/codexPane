import { useDocs } from '../contexts/DocsContext.jsx';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu, MenuItem, Button, ListItemIcon, ListItemText } from '@mui/material';
import ICONS from '../../icons.js';

export default function DocMenu() {
    const { docs } = useDocs();
    const [anchorEl, setAnchorEl] = useState(null);
    const [buttonMenu, setButtonMenu] = useState({ iconKey: 'ImageNotSupportedIcon', label: 'Choose topic' });
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const found = params.docs ? docs.find(d => d.id === params.docs) : null;
        setButtonMenu(prev => ({
            ...prev,
            label: found?.title || 'Choose topic',
            iconKey: found?.icon || 'ImageNotSupportedIcon'
        }));
    }, [params.docs, docs]);

    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleSelect = (id, title, iconKey) => {
        setAnchorEl(null);
        setButtonMenu(prev => ({ ...prev, iconKey, label: title }));
        const slug = docs.find(d => d.id === id)?.slug;
        if (slug) navigate(`/${slug}`);
    };

    const SelectedIconComponent = buttonMenu.iconKey ? (ICONS[buttonMenu.iconKey] || ICONS.ImageNotSupportedIcon) : ICONS.ImageNotSupportedIcon;

    return (
        <>
            <Button
                onClick={handleClick}
                className="!text-xl"
                sx={{
                    textTransform: 'none',
                    color: 'inherit',
                }}
                startIcon={<SelectedIconComponent fontSize="small" />}
            >
                {buttonMenu.label}
            </Button>

            <Menu
                anchorEl={anchorEl}
                slotProps={{
                    list: {
                        sx: {
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 1,
                        }
                    }
                }}
                open={open}
                onClose={handleClose}
            >
                {docs.map(({ id, title, icon }) => {
                    const IconComponent = ICONS[icon] || ICONS.ImageNotSupportedIcon;
                    return (
                        <MenuItem key={id} sx={{justifyContent: 'center'}} onClick={() => handleSelect(id, title, icon) }>
                            <ListItemIcon><IconComponent fontSize="small" /></ListItemIcon>
                            <ListItemText primary={title} />
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}
