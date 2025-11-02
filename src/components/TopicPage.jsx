import { useParams } from 'react-router-dom';
const ALL_SUBSECTIONS = import.meta.glob("../content/**/introduction.mdx", { eager: true });
import 'github-markdown-css/github-markdown.css';
import '../styles/mdx.css';
import PreWithCopy from "./PreWithCopy.jsx";
import MdxTable from "./MdxTable.jsx";

export default function TopicPage() {
    const {docs} = useParams();
    const key = `../content/${docs}/introduction.mdx`;
    const mod = ALL_SUBSECTIONS[key];
    const Content = mod && mod?.default;

    return (
        <div className="markdown-body">
            {Content && (
                <Content
                    components={{
                        pre: PreWithCopy,
                        table: MdxTable,
                    }}
                />
            )}
        </div>
    );
}