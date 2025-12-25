import { useState, useEffect } from 'react';
import type { Locale } from '../types';

const BASE_URL = import.meta.env.BASE_URL;

export function useContent(path: string, locale: Locale) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}content/${path}.${locale}.md`);
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [path, locale]);

  return { content, loading, error };
}

export function useJsonContent<T>(path: string, locale: Locale) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}content/${path}.${locale}.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`);
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

    fetchData();
  }, [path, locale]);

  return { data, loading, error };
}
