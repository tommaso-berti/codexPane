import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react'

const ALL_SUBSECTIONS = import.meta.glob("../content/**/*.mdx", { eager: true });
import 'github-markdown-css/github-markdown.css';
import '../styles/mdx.css';

function useScrollToHash(deps = []) {
    const { hash } = useLocation();

    useEffect(() => {
        const t = setTimeout(() => {
            if (hash) {
                const id = decodeURIComponent(hash.slice(1));
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    el.focus?.();
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 0);
        return () => clearTimeout(t);
    }, [hash, ...deps]);
}

export default function SectPage() {
    const {docs, section} = useParams();
    const key = `../content/${docs}/${section}.mdx`;
    const mod = ALL_SUBSECTIONS[key];
    const Content = mod && mod?.default;

    useScrollToHash([key]);

    return (
        <div className="markdown-body">
            <Content />
        </div>
    );
}