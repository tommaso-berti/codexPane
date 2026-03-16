import { useDocs } from '../contexts/useDocs.js';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu, MenuItem, Button, ListItemIcon, ListItemText } from '@mui/material';
import ICONS from '../../icons.js';

export default function DocMenu() {
    const { docs } = useDocs();
    const [anchorEl, setAnchorEl] = useState(null);
    const [buttonMenu, setButtonMenu] = useState({ iconKey: 'ImageNotSupportedIcon', label: 'Choose topic' });
    const navigate = useNavigate();
    const params = useParams();
    const triggerRef = useRef(null);

    useEffect(() => {
        const found = params.docs ? docs.find(d => d.id === params.docs) : null;
        setButtonMenu(prev => ({
            ...prev,
            label: found?.title || 'Choose topic',
            iconKey: found?.icon || 'ImageNotSupportedIcon'
        }));
    }, [params.docs, docs]);

    useEffect(() => {
        const openTopicMenu = () => {
            if (triggerRef.current) {
                setAnchorEl(triggerRef.current);
            }
        };
        window.addEventListener('open-topic-menu', openTopicMenu);
        return () => window.removeEventListener('open-topic-menu', openTopicMenu);
    }, []);

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
                ref={triggerRef}
                onClick={handleClick}
                sx={{
                    textTransform: 'none',
                    color: 'inherit',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    px: 1.25,
                    py: 0.55,
                    backgroundColor: 'background.paper',
                    minWidth: 140,
                    '&:hover': {
                        borderColor: 'primary.light',
                        backgroundColor: 'action.hover',
                    },
                }}
                startIcon={<SelectedIconComponent fontSize="small" />}
            >
                {buttonMenu.label}
            </Button>

            <Menu
                anchorEl={anchorEl}
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            mt: 0.8,
                            boxShadow: 2,
                        }
                    },
                    list: {
                        sx: {
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 1,
                            p: 1,
                        }
                    }
                }}
                open={open}
                onClose={handleClose}
            >
                {docs.map(({ id, title, icon }) => {
                    const IconComponent = ICONS[icon] || ICONS.ImageNotSupportedIcon;
                    return (
                        <MenuItem key={id} sx={{ justifyContent: 'center', borderRadius: 1.5 }} onClick={() => handleSelect(id, title, icon) }>
                            <ListItemIcon><IconComponent fontSize="small" /></ListItemIcon>
                            <ListItemText primary={title} />
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}
