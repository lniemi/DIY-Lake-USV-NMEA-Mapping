import { useState, useEffect } from 'react';
import type { KnowledgeGraph } from '../types/knowledge-graph';

const BASE_URL = import.meta.env.BASE_URL;

export function useKnowledgeGraph() {
  const [data, setData] = useState<KnowledgeGraph | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGraph = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}content/knowledge-graph.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch knowledge graph: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGraph();
  }, []);

  return { data, loading, error };
}
