import { useState, useEffect } from 'react';
import type { USVConfig } from '../types/usv-config';

export function useUSVConfig(configName: string = 'default') {
  const [config, setConfig] = useState<USVConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const basePath = import.meta.env.BASE_URL || '/';
    fetch(`${basePath}content/usv-configs/${configName}.json`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load config: ${configName}`);
        return res.json();
      })
      .then(data => {
        setConfig(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [configName]);

  return { config, loading, error, setConfig };
}
