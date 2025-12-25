import { useState, useCallback } from 'react';
import type { GraphFilters, KnowledgeNodeType, EdgeType } from '../types/knowledge-graph';

const defaultFilters: GraphFilters = {
  nodeTypes: [],
  edgeTypes: [],
  categories: [],
  searchQuery: '',
};

export function useGraphFilters(initialFilters: Partial<GraphFilters> = {}) {
  const [filters, setFilters] = useState<GraphFilters>({
    ...defaultFilters,
    ...initialFilters,
  });

  const toggleNodeType = useCallback((type: KnowledgeNodeType) => {
    setFilters((prev) => ({
      ...prev,
      nodeTypes: prev.nodeTypes.includes(type)
        ? prev.nodeTypes.filter((t) => t !== type)
        : [...prev.nodeTypes, type],
    }));
  }, []);

  const toggleEdgeType = useCallback((type: EdgeType) => {
    setFilters((prev) => ({
      ...prev,
      edgeTypes: prev.edgeTypes.includes(type)
        ? prev.edgeTypes.filter((t) => t !== type)
        : [...prev.edgeTypes, type],
    }));
  }, []);

  const toggleCategory = useCallback((category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const hasActiveFilters =
    filters.nodeTypes.length > 0 ||
    filters.edgeTypes.length > 0 ||
    filters.categories.length > 0 ||
    filters.searchQuery.length > 0;

  return {
    filters,
    toggleNodeType,
    toggleEdgeType,
    toggleCategory,
    setSearchQuery,
    clearFilters,
    hasActiveFilters,
  };
}
