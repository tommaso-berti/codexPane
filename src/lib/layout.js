export const HEADER_HEIGHT_DEFAULT = 72;
export const HEADER_HEIGHT_DOCS = 104;

export function getHeaderHeight(isDocsPage) {
    return isDocsPage ? HEADER_HEIGHT_DOCS : HEADER_HEIGHT_DEFAULT;
}

