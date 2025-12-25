import type { Locale } from './content';

// Localized string map for bilingual content
export interface LocalizedString {
  en: string;
  fi: string;
}

// Optional localized string array for aliases
export interface LocalizedStringArray {
  en?: string[];
  fi?: string[];
}

// Node types in the graph
export type KnowledgeNodeType = 'concept' | 'document';

// Edge relationship types
export type EdgeType = 'hierarchical' | 'references' | 'prerequisite' | 'covers' | 'conceptual';

// Base node interface
export interface KnowledgeNodeBase {
  id: string;
  type: KnowledgeNodeType;
  labels: LocalizedString;
  descriptions: LocalizedString;
  category: string;
}

// Concept node - abstract knowledge entity
export interface ConceptNode extends KnowledgeNodeBase {
  type: 'concept';
  aliases?: LocalizedStringArray;
  semanticTags: string[];
}

// Document node - actual documentation page
export interface DocumentNode extends KnowledgeNodeBase {
  type: 'document';
  slug: string;
  file: LocalizedString;
}

// Union type for all nodes
export type KnowledgeNode = ConceptNode | DocumentNode;

// Edge definition
export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  type: EdgeType;
  labels: LocalizedString;
  weight?: number;
}

// Category definition with color
export interface Category {
  labels: LocalizedString;
  color: string;
}

// Edge type style definition
export interface EdgeTypeStyle {
  labels: LocalizedString;
  style: 'solid' | 'dashed' | 'dotted';
  directed?: boolean;
}

// Full knowledge graph schema
export interface KnowledgeGraph {
  version: string;
  meta: {
    projectName: string;
    description: LocalizedString;
    generatedAt?: string;
  };
  concepts: ConceptNode[];
  documents: DocumentNode[];
  edges: KnowledgeEdge[];
  categories: Record<string, Category>;
  edgeTypes: Record<EdgeType, EdgeTypeStyle>;
}

// Transformed graph data for react-force-graph
export interface GraphNode {
  id: string;
  type: KnowledgeNodeType;
  label: string;
  description: string;
  category: string;
  color: string;
  slug?: string;
  val?: number;
  // Position for force-graph
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  type: EdgeType;
  label: string;
  style: 'solid' | 'dashed' | 'dotted';
  directed?: boolean;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// Filter state for the graph UI
export interface GraphFilters {
  nodeTypes: KnowledgeNodeType[];
  edgeTypes: EdgeType[];
  categories: string[];
  searchQuery: string;
}

// Helper to get localized value
export function getLocalized(localized: LocalizedString, locale: Locale): string {
  return localized[locale] || localized.en;
}
