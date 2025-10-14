import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react'
const ALL_SUBSECTIONS = import.meta.glob("../content/**/*.mdx", { eager: true });

function useScrollToHash(deps = []) {
    const { hash } = useLocation();

    useEffect(() => {
        if (!hash) return;
        const id = decodeURIComponent(hash.slice(1));
        const t = setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                el.focus?.();
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
        <main className="p-6">
            <Content />
        </main>
    );
}