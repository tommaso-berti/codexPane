import { useParams } from 'react-router-dom';
const ALL_SUBSECTIONS = import.meta.glob("../content/**/introduction.mdx", { eager: true });
import 'github-markdown-css/github-markdown.css';
import '../styles/mdx.css';
import Box from '@mui/material/Box';
import PreWithCopy from "./PreWithCopy.jsx";

export default function TopicPage() {
    const {docs} = useParams();
    const key = `../content/${docs}/introduction.mdx`;
    const mod = ALL_SUBSECTIONS[key];
    const Content = mod && mod?.default;

    return (
        <div className="markdown-body">
            {
                Content && <Content components={{ pre: PreWithCopy }} />
            }
        </div>
    );
}