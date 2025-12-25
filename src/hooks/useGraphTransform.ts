import { useMemo } from 'react';
import type { Locale } from '../types/content';
import type {
  KnowledgeGraph,
  GraphData,
  GraphNode,
  GraphLink,
} from '../types/knowledge-graph';

export function useGraphTransform(
  graph: KnowledgeGraph | null,
  locale: Locale
): GraphData {
  return useMemo(() => {
    if (!graph) {
      return { nodes: [], links: [] };
    }

    const nodes: GraphNode[] = [
      // Transform concept nodes
      ...graph.concepts.map((concept) => ({
        id: concept.id,
        type: concept.type,
        label: concept.labels[locale] || concept.labels.en,
        description: concept.descriptions[locale] || concept.descriptions.en,
        category: concept.category,
        color: graph.categories[concept.category]?.color || '#6B7280',
        val: 1,
      })),
      // Transform document nodes (larger)
      ...graph.documents.map((doc) => ({
        id: doc.id,
        type: doc.type,
        label: doc.labels[locale] || doc.labels.en,
        description: doc.descriptions[locale] || doc.descriptions.en,
        category: doc.category,
        color: graph.categories[doc.category]?.color || '#6B7280',
        slug: doc.slug,
        val: 1.5,
      })),
    ];

    const links: GraphLink[] = graph.edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
      type: edge.type,
      label: edge.labels[locale] || edge.labels.en,
      style: graph.edgeTypes[edge.type]?.style || 'solid',
      directed: graph.edgeTypes[edge.type]?.directed ?? false,
    }));

    return { nodes, links };
  }, [graph, locale]);
}

// Get connected node IDs for a given node
export function getConnectedNodeIds(
  nodeId: string,
  links: GraphLink[]
): Set<string> {
  const connected = new Set<string>();
  connected.add(nodeId);

  links.forEach((link) => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;

    if (sourceId === nodeId) {
      connected.add(targetId);
    }
    if (targetId === nodeId) {
      connected.add(sourceId);
    }
  });

  return connected;
}

// Filter graph data based on filters
export function filterGraphData(
  data: GraphData,
  filters: {
    nodeTypes: string[];
    edgeTypes: string[];
    categories: string[];
    searchQuery: string;
  }
): GraphData {
  let filteredNodes = data.nodes;

  // Filter by node types
  if (filters.nodeTypes.length > 0) {
    filteredNodes = filteredNodes.filter((node) =>
      filters.nodeTypes.includes(node.type)
    );
  }

  // Filter by categories
  if (filters.categories.length > 0) {
    filteredNodes = filteredNodes.filter((node) =>
      filters.categories.includes(node.category)
    );
  }

  // Filter by search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filteredNodes = filteredNodes.filter(
      (node) =>
        node.label.toLowerCase().includes(query) ||
        node.description.toLowerCase().includes(query)
    );
  }

  // Get IDs of filtered nodes
  const nodeIds = new Set(filteredNodes.map((n) => n.id));

  // Filter links to only include those between visible nodes
  let filteredLinks = data.links.filter((link) => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;
    return nodeIds.has(sourceId) && nodeIds.has(targetId);
  });

  // Filter by edge types
  if (filters.edgeTypes.length > 0) {
    filteredLinks = filteredLinks.filter((link) =>
      filters.edgeTypes.includes(link.type)
    );
  }

  return { nodes: filteredNodes, links: filteredLinks };
}
