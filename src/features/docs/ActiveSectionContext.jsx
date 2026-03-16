import { useMemo, useState } from 'react';
import { ActiveSectionContext } from './activeSectionState.js';

export function ActiveSectionProvider({ children }) {
    const [activeSectionId, setActiveSectionId] = useState('');

    const value = useMemo(
        () => ({ activeSectionId, setActiveSectionId }),
        [activeSectionId]
    );

    return (
        <ActiveSectionContext.Provider value={value}>
            {children}
        </ActiveSectionContext.Provider>
    );
}
