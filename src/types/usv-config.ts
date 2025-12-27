export interface LocalizedString {
  en: string;
  fi: string;
}

export interface HullConfig {
  type: 'catamaran' | 'monohull' | 'trimaran';
  length: number;
  width: number;
  height: number;
  hullSpacing?: number;
  hullDiameter?: number;
  centerHullDiameter?: number;
  deckThickness: number;
  material: string;
}

export interface MotorMountConfig {
  type: string;
  width: number;
  height: number;
  depth: number;
  mountHoleSpacing: number;
  motorShaftDiameter: number;
}

export interface SensorBracketConfig {
  type: string;
  armLength: number;
  armWidth: number;
  depthBelowHull: number;
  transducerDiameter: number;
  angleAdjustment: {
    min: number;
    max: number;
  };
}

export interface ElectronicsHousingConfig {
  type: string;
  length: number;
  width: number;
  height: number;
  wallThickness: number;
  lidSealThickness: number;
}

export interface BatteryCompartmentConfig {
  type: string;
  length: number;
  width: number;
  height: number;
  batteryType: string;
}

export interface GNSSModuleConfig {
  type: string;
  baseWidth: number;
  baseHeight: number;
  antennaDiameter: number;
  antennaHeight: number;
}

export interface MaterialConfig {
  color: string;
  opacity: number;
  roughness: number;
  metalness: number;
}

export interface MaterialsConfig {
  hull: MaterialConfig;
  mounts: MaterialConfig;
  electronics: MaterialConfig;
}

export interface USVComponentsConfig {
  hull: HullConfig;
  motorMount: MotorMountConfig;
  sensorBracket: SensorBracketConfig;
  electronicsHousing: ElectronicsHousingConfig;
  batteryCompartment: BatteryCompartmentConfig;
  gnssModule?: GNSSModuleConfig;
}

export interface USVConfig {
  version: string;
  name: string;
  description: LocalizedString;
  units: string;
  components: USVComponentsConfig;
  materials: MaterialsConfig;
}
