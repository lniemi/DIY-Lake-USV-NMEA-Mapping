import { useTranslation } from 'react-i18next';

interface ComponentListProps {
  visibility: Record<string, boolean>;
  onToggle: (key: string) => void;
}

export function ComponentList({ visibility, onToggle }: ComponentListProps) {
  const { t } = useTranslation();

  const components = [
    { key: 'hull', label: t('viewer.components.hull') },
    { key: 'motorMount', label: t('viewer.components.motorMount') },
    { key: 'sensorBracket', label: t('viewer.components.sensorBracket') },
    { key: 'electronics', label: t('viewer.components.electronics') },
    { key: 'battery', label: t('viewer.components.battery') },
    { key: 'gnss', label: t('viewer.components.gnss') },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-paper-700 mb-3">
        {t('viewer.components.title')}
      </h3>

      {components.map(({ key, label }) => (
        <label key={key} className="flex items-center gap-2 text-sm text-paper-700 cursor-pointer">
          <input
            type="checkbox"
            checked={visibility[key]}
            onChange={() => onToggle(key)}
            className="w-4 h-4"
          />
          {label}
        </label>
      ))}
    </div>
  );
}
