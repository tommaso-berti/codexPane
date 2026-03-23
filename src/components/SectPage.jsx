import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import DocContent from './DocContent.jsx';
import { useActiveSectionHash, useDocContent, useDocContentPath } from '../features/docs/useDocContent.js';
import { useDocs } from '../contexts/useDocs.js';

export default function SectPage() {
    const { docs, section } = useParams();
    const { ensureTopicLoaded } = useDocs();
    const path = useDocContentPath({ docs, section });
    const { status, Content, error } = useDocContent(path);
    useActiveSectionHash(path, status === 'ready');

    useEffect(() => {
        ensureTopicLoaded(docs);
    }, [docs, ensureTopicLoaded]);

    return <DocContent status={status} Content={Content} error={error} />;
}
