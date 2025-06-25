interface FilterProps {
  filter: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

export const FilterBlock = ({ filter, options, value, onChange }: FilterProps) => (
  <div>
    <label className="block text-sm font-semibold text-slate-300 mb-1">{filter}</label>
    <select
      className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);
