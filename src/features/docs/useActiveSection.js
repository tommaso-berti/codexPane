import { useContext } from 'react';
import { ActiveSectionContext } from './activeSectionState.js';

export function useActiveSection() {
    const context = useContext(ActiveSectionContext);
    if (!context) {
        return {
            activeSectionId: '',
            setActiveSectionId: () => {},
        };
    }
    return context;
}
