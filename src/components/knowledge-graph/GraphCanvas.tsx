import { useCallback, useEffect, useState, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import type { GraphData, GraphNode, GraphLink } from '../../types/knowledge-graph';
import { getConnectedNodeIds } from '../../hooks/useGraphTransform';

interface GraphCanvasProps {
  data: GraphData;
  selectedNode: GraphNode | null;
  hoveredNode: GraphNode | null;
  onNodeClick: (node: GraphNode) => void;
  onNodeHover: (node: GraphNode | null) => void;
  onBackgroundClick: () => void;
  showLabels: boolean;
}

export function GraphCanvas({
  data,
  selectedNode,
  hoveredNode,
  onNodeClick,
  onNodeHover,
  onBackgroundClick,
  showLabels,
}: GraphCanvasProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Get connected nodes for highlighting
  const connectedNodes = selectedNode
    ? getConnectedNodeIds(selectedNode.id, data.links)
    : null;

  // Custom node rendering
  const paintNode = useCallback(
    (node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const isSelected = selectedNode?.id === node.id;
      const isConnected = connectedNodes?.has(node.id);
      const isHovered = hoveredNode?.id === node.id;
      const isDimmed = selectedNode && !isConnected;

      // Node size based on type
      const baseSize = node.type === 'document' ? 8 : 6;
      const size = isSelected || isHovered ? baseSize * 1.3 : baseSize;

      // Draw node circle
      ctx.beginPath();
      ctx.arc(node.x!, node.y!, size, 0, 2 * Math.PI);
      ctx.fillStyle = isDimmed
        ? `${node.color}33`
        : node.color;
      ctx.fill();

      // Border for document nodes or selected/hovered
      if (node.type === 'document' || isSelected || isHovered) {
        ctx.strokeStyle = isSelected
          ? '#0F4C5C'
          : isHovered
          ? '#1B6B7A'
          : `${node.color}${isDimmed ? '33' : 'CC'}`;
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.stroke();
      }

      // Draw label if enabled and zoomed in enough
      if (showLabels && globalScale > 0.7) {
        const label = node.label;
        const fontSize = Math.max(12 / globalScale, 10);
        ctx.font = `${fontSize}px IBM Plex Sans, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = isDimmed ? '#9CA3AF' : '#374151';
        ctx.fillText(label, node.x!, node.y! + size + 4);
      }
    },
    [selectedNode, hoveredNode, connectedNodes, showLabels]
  );

  // Custom link rendering
  const paintLink = useCallback(
    (link: GraphLink, ctx: CanvasRenderingContext2D) => {
      const source = link.source as GraphNode;
      const target = link.target as GraphNode;

      if (!source.x || !source.y || !target.x || !target.y) return;

      const isConnectedToSelected =
        selectedNode &&
        (source.id === selectedNode.id || target.id === selectedNode.id);
      const isDimmed = selectedNode && !isConnectedToSelected;

      ctx.beginPath();
      ctx.strokeStyle = isDimmed ? '#E5E7EB' : '#9CA3AF';
      ctx.lineWidth = isConnectedToSelected ? 2 : 1;

      // Set line style
      if (link.style === 'dashed') {
        ctx.setLineDash([5, 5]);
      } else if (link.style === 'dotted') {
        ctx.setLineDash([2, 4]);
      } else {
        ctx.setLineDash([]);
      }

      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw arrow for directed links
      if (link.directed && !isDimmed) {
        const angle = Math.atan2(target.y - source.y, target.x - source.x);
        const arrowLength = 8;
        const targetNodeSize = (target as GraphNode).type === 'document' ? 8 : 6;
        const arrowX = target.x - Math.cos(angle) * (targetNodeSize + 4);
        const arrowY = target.y - Math.sin(angle) * (targetNodeSize + 4);

        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(
          arrowX - arrowLength * Math.cos(angle - Math.PI / 6),
          arrowY - arrowLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          arrowX - arrowLength * Math.cos(angle + Math.PI / 6),
          arrowY - arrowLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fillStyle = '#9CA3AF';
        ctx.fill();
      }
    },
    [selectedNode]
  );

  // Zoom to fit on initial load
  useEffect(() => {
    if (graphRef.current && data.nodes.length > 0) {
      setTimeout(() => {
        graphRef.current?.zoomToFit(400, 50);
      }, 500);
    }
  }, [data.nodes.length]);

  // Center on selected node
  useEffect(() => {
    if (graphRef.current && selectedNode) {
      graphRef.current.centerAt(selectedNode.x, selectedNode.y, 300);
      graphRef.current.zoom(2, 300);
    }
  }, [selectedNode]);

  return (
    <div ref={containerRef} className="w-full h-full bg-paper-50 rounded-lg">
      <ForceGraph2D
        ref={graphRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={data}
        nodeCanvasObject={paintNode as any}
        linkCanvasObject={paintLink as any}
        onNodeClick={(node) => onNodeClick(node as GraphNode)}
        onNodeHover={(node) => onNodeHover(node as GraphNode | null)}
        onBackgroundClick={onBackgroundClick}
        nodePointerAreaPaint={(node, color, ctx) => {
          const size = (node as GraphNode).type === 'document' ? 10 : 8;
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, size, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.fill();
        }}
        cooldownTicks={100}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        linkDirectionalParticles={0}
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
      />
    </div>
  );
}
