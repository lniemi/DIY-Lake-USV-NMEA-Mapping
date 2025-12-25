import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { GraphNode } from '../../types/knowledge-graph';

interface GraphSearchProps {
  nodes: GraphNode[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNodeSelect: (node: GraphNode) => void;
}

export function GraphSearch({
  nodes,
  searchQuery,
  onSearchChange,
  onNodeSelect,
}: GraphSearchProps) {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter nodes based on search query
  const filteredNodes = searchQuery
    ? nodes.filter(
        (node) =>
          node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          node.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (node: GraphNode) => {
    onNodeSelect(node);
    onSearchChange('');
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={t('graph.searchPlaceholder')}
          className="w-64 pl-10 pr-4 py-2 text-sm rounded-lg border border-paper-200 focus:border-lake-500 focus:ring-1 focus:ring-lake-500 outline-none"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-paper-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-paper-400 hover:text-paper-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isFocused && filteredNodes.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-paper-200 overflow-hidden z-50"
        >
          {filteredNodes.map((node) => (
            <button
              key={node.id}
              onClick={() => handleSelect(node)}
              className="w-full px-4 py-2 text-left hover:bg-paper-50 transition-colors flex items-center gap-2"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: node.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-paper-800 truncate">{node.label}</div>
                <div className="text-xs text-paper-500 truncate">{node.description}</div>
              </div>
              <span className="text-xs text-paper-400 capitalize flex-shrink-0">
                {node.type}
              </span>
            </button>
          ))}
        </div>
      )}

      {isFocused && searchQuery && filteredNodes.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-paper-200 p-4 text-sm text-paper-500 text-center">
          {t('graph.noResults')}
        </div>
      )}
    </div>
  );
}
