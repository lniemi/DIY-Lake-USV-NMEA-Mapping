import { LargeUSVModel } from './large';
import { SmallUSVModel } from './small';
import { TrimaranUSVModel } from './trimaran';
import type { USVConfig } from '../../../types/usv-config';

interface USVModelFactoryProps {
  modelType: 'default' | 'small' | 'trimaran';
  config: USVConfig;
  visibility: Record<string, boolean>;
}

export function USVModelFactory({ modelType, config, visibility }: USVModelFactoryProps) {
  switch (modelType) {
    case 'small':
      return <SmallUSVModel config={config} visibility={visibility} />;
    case 'trimaran':
      return <TrimaranUSVModel config={config} visibility={visibility} />;
    case 'default':
    default:
      return <LargeUSVModel config={config} visibility={visibility} />;
  }
}
