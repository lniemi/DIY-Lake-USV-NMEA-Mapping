import { LargeUSVModel } from './large';
import { SmallUSVModel } from './small';
import type { USVConfig } from '../../../types/usv-config';

interface USVModelFactoryProps {
  modelType: 'default' | 'small';
  config: USVConfig;
  visibility: Record<string, boolean>;
}

export function USVModelFactory({ modelType, config, visibility }: USVModelFactoryProps) {
  switch (modelType) {
    case 'small':
      return <SmallUSVModel config={config} visibility={visibility} />;
    case 'default':
    default:
      return <LargeUSVModel config={config} visibility={visibility} />;
  }
}
