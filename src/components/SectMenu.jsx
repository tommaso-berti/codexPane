import List from '@mui/material/List';
import SectionMenuItem from './SectMenuItem.jsx';
import { useDocs } from '../contexts/DocsContext.jsx';
import { useParams} from "react-router-dom";


export default function SectMenu() {
    const { docs = [] } = useDocs();
    const params = useParams();
    const currentDoc = docs.find(d => d.id === params.docs);
    const currentSections = currentDoc ? currentDoc.sections : [];

    return (
        <List className="flex-1 min-h-0 overflow-y-auto">
            {(currentSections).map(section => {
                const currentSubsections = section?.subSections ?? [];
                return (
                    <SectionMenuItem
                        key={section.id}
                        section={section}
                        subsections={currentSubsections}
                    />
                );
            })}
        </List>
    );
}