import List from '@mui/material/List';
import SectionMenuItem from './SectMenuItem.jsx';
import { useDocs } from '../contexts/DocsContext.jsx';
import { useParams} from "react-router-dom";
import { useState } from "react";


export default function SectMenu() {
    const { docs = [] } = useDocs();
    const params = useParams();
    const currentDoc = docs.find(d => d.id === params.docs);
    const currentSections = currentDoc ? currentDoc.sections : [];
    const [selected, setSelected] = useState(null);
    const [openSections, setOpenSections] = useState([]);

    return (
        <List dense disablePadding sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
            {(currentSections).map(section => {
                const currentSubsections = section?.subSections ?? [];
                return (
                    <SectionMenuItem
                        key={section.id}
                        section={section}
                        subsections={currentSubsections}
                        selected={selected}
                        setSelected={setSelected}
                        openSections={openSections}
                        setOpenSections={setOpenSections}
                    />
                );
            })}
        </List>
    );
}