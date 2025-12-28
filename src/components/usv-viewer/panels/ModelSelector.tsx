import { useTranslation } from 'react-i18next';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const models = [
  { key: 'default', labelKey: 'viewer.modelSelector.large' },
  { key: 'medium', labelKey: 'viewer.modelSelector.medium' },
  { key: 'small', labelKey: 'viewer.modelSelector.small' },
  { key: 'trimaran', labelKey: 'viewer.modelSelector.trimaran' },
];

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-paper-700 mb-3">
        {t('viewer.modelSelector.title')}
      </h3>

      {models.map(({ key, labelKey }) => (
        <label key={key} className="flex items-center gap-2 text-sm text-paper-700 cursor-pointer">
          <input
            type="radio"
            name="usv-model"
            value={key}
            checked={selectedModel === key}
            onChange={() => onModelChange(key)}
            className="w-4 h-4"
          />
          {t(labelKey)}
        </label>
      ))}
    </div>
  );
}
