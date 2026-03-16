import { useParams } from 'react-router-dom';
import DocContent from './DocContent.jsx';
import { useActiveSectionHash, useDocContent, useDocContentPath } from '../features/docs/useDocContent.js';

export default function SectPage() {
    const { docs, section } = useParams();
    const path = useDocContentPath({ docs, section });
    const { status, Content, error } = useDocContent(path);
    useActiveSectionHash(path, status === 'ready');

    return <DocContent status={status} Content={Content} error={error} />;
}
