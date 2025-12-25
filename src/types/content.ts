export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  file: string;
  tags?: string[];
  readingTime?: number;
}

export interface BlogIndex {
  posts: BlogPost[];
}

export interface DocSection {
  title: string;
  slug: string;
  file?: string;
  children?: DocSection[];
}

export interface DocsIndex {
  sections: DocSection[];
}

export type Locale = 'en' | 'fi';

export interface ContentMeta {
  title: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
}
