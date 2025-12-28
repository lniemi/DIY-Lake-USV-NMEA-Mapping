import { Hull } from './Hull';
import { MotorMount } from './MotorMount';
import { SensorBracket } from './SensorBracket';
import { ElectronicsHousing } from './ElectronicsHousing';
import { BatteryCompartment } from './BatteryCompartment';
import { GNSSModule } from './GNSSModule';
import type { USVConfig } from '../../../../types/usv-config';

interface MediumUSVModelProps {
  config: USVConfig;
  visibility: Record<string, boolean>;
}

export function MediumUSVModel({ config, visibility }: MediumUSVModelProps) {
  return (
    <group>
      <Hull
        config={config.components.hull}
        material={config.materials.hull}
        visible={visibility.hull}
      />
      <MotorMount
        config={config.components.motorMount}
        material={config.materials.mounts}
        visible={visibility.motorMount}
      />
      <SensorBracket
        config={config.components.sensorBracket}
        material={config.materials.mounts}
        visible={visibility.sensorBracket}
      />
      <ElectronicsHousing
        config={config.components.electronicsHousing}
        material={config.materials.electronics}
        visible={visibility.electronics}
      />
      <BatteryCompartment
        config={config.components.batteryCompartment}
        material={config.materials.electronics}
        visible={visibility.battery}
      />
      {config.components.gnssModule && (
        <GNSSModule
          config={config.components.gnssModule}
          material={config.materials.electronics}
          visible={visibility.gnss}
        />
      )}
    </group>
  );
}
