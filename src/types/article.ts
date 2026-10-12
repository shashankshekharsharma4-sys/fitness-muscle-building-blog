export type ArticleCategory =
  | 'Hypertrophy'
  | 'Nutrition'
  | 'Training Splits'
  | 'Recovery'
  | 'Supplements'
  | 'Form & Biomechanics';

export interface TableOfContentsItem {
  id: string;
  title: string;
}

export interface ArticleSection {
  heading: string;
  content: string[];
  callout?: {
    type: 'science' | 'tip' | 'protocol';
    title: string;
    text: string;
  };
  table?: {
    caption?: string;
    headers: string[];
    rows: (string | number)[][];
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  tags: string[];
  readTimeMinutes: number;
  publishDate: string;
  author: {
    name: string;
    role: string;
    credentials: string;
    avatarInitials: string;
  };
  summary: string;
  keyTakeaways: string[];
  sections: ArticleSection[];
  references: string[];
  visualTheme: {
    accentColor: string; // e.g., 'amber', 'emerald', 'sky', 'rose', 'violet', 'cyan'
    pattern: 'barbell' | 'dna' | 'timer' | 'graph' | 'plate' | 'molecule';
  };
}
