import { LargeUSVModel } from './large';
import { MediumUSVModel } from './medium';
import { SmallUSVModel } from './small';
import { TrimaranUSVModel } from './trimaran';
import type { USVConfig } from '../../../types/usv-config';

interface USVModelFactoryProps {
  modelType: 'default' | 'medium' | 'small' | 'trimaran';
  config: USVConfig;
  visibility: Record<string, boolean>;
}

export function USVModelFactory({ modelType, config, visibility }: USVModelFactoryProps) {
  switch (modelType) {
    case 'medium':
      return <MediumUSVModel config={config} visibility={visibility} />;
    case 'small':
      return <SmallUSVModel config={config} visibility={visibility} />;
    case 'trimaran':
      return <TrimaranUSVModel config={config} visibility={visibility} />;
    case 'default':
    default:
      return <LargeUSVModel config={config} visibility={visibility} />;
  }
}
