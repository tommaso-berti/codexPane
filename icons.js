import SettingsIcon from '@mui/icons-material/Settings';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import HttpIcon from '@mui/icons-material/Http';
import PublicIcon from '@mui/icons-material/Public';
import Box from '@mui/material/Box';
import { createElement } from 'react';
import {
    SiGithub,
    SiReact,
    SiCss,
    SiHtml5,
    SiMongodb,
    SiJavascript,
    SiRedux,
    SiJquery,
    SiGit,
    SiGnubash,
    SiMui
} from 'react-icons/si';

const ICON_COLORS = {
    GitHubIcon: '#181717',
    HttpIcon: '#0288d1',
    PublicIcon: '#2e7d32',
    CustomMuiIcon: '#007fff',
    CustomReactIcon: '#61dafb',
    CustomCssIcon: '#264de4',
    CustomHtmlIcon: '#e34f26',
    CustomMongoDbIcon: '#47a248',
    CustomJavascriptIcon: '#f7df1e',
    CustomReduxIcon: '#764abc',
    CustomjQueryIcon: '#0769ad',
    CustomGitIcon: '#f05032',
    CustomBashIcon: '#4eaa25'
};

function toSize(fontSize) {
    if (fontSize === 'small') return 18;
    if (fontSize === 'large') return 28;
    return 22;
}

function asMuiIcon(Icon) {
    return function MuiCompatibleIcon({ fontSize = 'medium', className, sx, ...rest }) {
        return createElement(Box, {
            component: Icon,
            className,
            ...rest,
            sx: {
                fontSize: toSize(fontSize),
                color: 'currentColor',
                flexShrink: 0,
                ...sx,
            },
        });
    };
}

const GitHubIcon = asMuiIcon(SiGithub);
const CustomMuiIcon = asMuiIcon(SiMui);
const CustomReactIcon = asMuiIcon(SiReact);
const CustomCssIcon = asMuiIcon(SiCss);
const CustomHtmlIcon = asMuiIcon(SiHtml5);
const CustomMongoDbIcon = asMuiIcon(SiMongodb);
const CustomJavascriptIcon = asMuiIcon(SiJavascript);
const CustomReduxIcon = asMuiIcon(SiRedux);
const CustomjQueryIcon = asMuiIcon(SiJquery);
const CustomGitIcon = asMuiIcon(SiGit);
const CustomBashIcon = asMuiIcon(SiGnubash);

const ICONS = {
    SettingsIcon,
    GitHubIcon,
    ImageNotSupportedIcon,
    HttpIcon,
    PublicIcon,
    CustomMuiIcon,
    CustomReactIcon,
    CustomCssIcon,
    CustomHtmlIcon,
    CustomMongoDbIcon,
    CustomJavascriptIcon,
    CustomReduxIcon,
    CustomjQueryIcon,
    CustomGitIcon,
    CustomBashIcon
};

export function getIconColor(iconKey) {
    return ICON_COLORS[iconKey];
}

export default ICONS;
