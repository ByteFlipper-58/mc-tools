import React from 'react';

interface CoordinateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

function CoordinateInput({ label, value, onChange, placeholder }: CoordinateInputProps) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#1A1C1E] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-400"
        placeholder={placeholder}
      />
    </div>
  );
}

export default CoordinateInput;