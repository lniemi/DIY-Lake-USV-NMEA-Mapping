import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../hooks/useLocale';
import { useKnowledgeGraph } from '../../hooks/useKnowledgeGraph';
import { useGraphTransform, filterGraphData } from '../../hooks/useGraphTransform';
import { useGraphFilters } from '../../hooks/useGraphFilters';
import { GraphCanvas } from './GraphCanvas';
import { GraphControls } from './GraphControls';
import { GraphFilters } from './GraphFilters';
import { GraphSearch } from './GraphSearch';
import { GraphLegend } from './GraphLegend';
import { NodeTooltip } from './NodeTooltip';
import { NodeDetail } from './NodeDetail';
import { LoadingSpinner } from '../common/LoadingSpinner';
import type { GraphNode } from '../../types/knowledge-graph';
import type { ForceGraphMethods } from 'react-force-graph-2d';

export function KnowledgeGraph() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { data: graph, loading, error } = useKnowledgeGraph();
  const graphData = useGraphTransform(graph, locale);
  const {
    filters,
    toggleNodeType,
    toggleEdgeType,
    toggleCategory,
    setSearchQuery,
    clearFilters,
    hasActiveFilters,
  } = useGraphFilters();

  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showLabels, setShowLabels] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const graphRef = useRef<ForceGraphMethods>();

  // Track mouse position for tooltip
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Filter graph data
  const filteredData = filterGraphData(graphData, filters);

  // Handlers
  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNode(node);
  }, []);

  const handleNodeHover = useCallback((node: GraphNode | null) => {
    setHoveredNode(node);
  }, []);

  const handleBackgroundClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleZoomIn = useCallback(() => {
    graphRef.current?.zoom(graphRef.current.zoom() * 1.5, 300);
  }, []);

  const handleZoomOut = useCallback(() => {
    graphRef.current?.zoom(graphRef.current.zoom() / 1.5, 300);
  }, []);

  const handleResetView = useCallback(() => {
    graphRef.current?.zoomToFit(400, 50);
    setSelectedNode(null);
  }, []);

  const handleNodeSelect = useCallback((node: GraphNode) => {
    setSelectedNode(node);
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 300);
      graphRef.current.zoom(2, 300);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !graph) {
    return (
      <div className="flex items-center justify-center h-96 text-paper-500">
        {t('graph.error')}
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-200px)] min-h-[500px]">
      {/* Top controls */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <GraphSearch
            nodes={graphData.nodes}
            searchQuery={filters.searchQuery}
            onSearchChange={setSearchQuery}
            onNodeSelect={handleNodeSelect}
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg border transition-colors ${
              showFilters || hasActiveFilters
                ? 'bg-lake-100 border-lake-300 text-lake-700'
                : 'bg-white border-paper-200 text-paper-600 hover:bg-paper-50'
            }`}
            title={t('graph.filters')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>
        <GraphControls
          showLabels={showLabels}
          onToggleLabels={() => setShowLabels(!showLabels)}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetView={handleResetView}
        />
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="absolute top-16 left-4 z-10">
          <GraphFilters
            graph={graph}
            filters={filters}
            onToggleNodeType={toggleNodeType}
            onToggleEdgeType={toggleEdgeType}
            onToggleCategory={toggleCategory}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      )}

      {/* Graph canvas */}
      <GraphCanvas
        data={filteredData}
        selectedNode={selectedNode}
        hoveredNode={hoveredNode}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        onBackgroundClick={handleBackgroundClick}
        showLabels={showLabels}
      />

      {/* Node tooltip */}
      {hoveredNode && !selectedNode && (
        <NodeTooltip node={hoveredNode} position={mousePosition} />
      )}

      {/* Node detail panel */}
      {selectedNode && (
        <div className="absolute top-16 right-4 z-10">
          <NodeDetail
            node={selectedNode}
            links={graphData.links}
            allNodes={graphData.nodes}
            onClose={() => setSelectedNode(null)}
            onNodeSelect={handleNodeSelect}
          />
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10">
        <GraphLegend graph={graph} />
      </div>
    </div>
  );
}
