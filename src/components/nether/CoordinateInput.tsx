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
      <label className="block text-sm text-muted-100 dark:text-light-300 mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-base"
        placeholder={placeholder}
      />
    </div>
  );
}

export default CoordinateInput;