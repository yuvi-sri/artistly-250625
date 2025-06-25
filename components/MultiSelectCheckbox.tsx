'use client';

interface Props {
  label: string;
  options: string[];
  selected: string[];
  onChange: (updated: string[]) => void;
}

export const MultiSelectCheckbox = ({ label, options, selected, onChange }: Props) => {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="mb-4">
      <p className="font-medium text-slate-300 mb-2">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-slate-200">
            <input
              type="checkbox"
              className="accent-blue-600"
              checked={selected.includes(opt)}
              onChange={() => toggle(opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
};
