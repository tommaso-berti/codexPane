export interface SubsectionNode {
  id: string;
  title: string;
  slug: string;
  order: number;
}

export interface SectionNode {
  id: string;
  title: string;
  slug: string;
  order: number;
  filePath: string;
  subSections: SubsectionNode[];
}

export interface DocNode {
  id: string;
  title: string;
  icon: string;
  slug: string;
  order: number;
  introPath: string;
  sections: SectionNode[];
}

export interface DocsManifest {
  version: number;
  docs: DocNode[];
}
