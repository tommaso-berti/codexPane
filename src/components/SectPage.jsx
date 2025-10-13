import { useParams } from 'react-router-dom';
const ALL_SUBSECTIONS = import.meta.glob("../content/**/*.mdx", { eager: true });

export default function SectPage() {
    const {docs, subSection} = useParams();
    const key = `../content/${docs}/${subSection}.mdx`;
    const mod = ALL_SUBSECTIONS[key];
    const Content = mod && mod.default;

    return (
        <main className="p-6">
            <Content />
        </main>
    );
}