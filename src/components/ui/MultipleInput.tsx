"use client";

import React, { useState } from "react";

interface SpecializationInputProps {
  value: string[];
  onChange: (newValue: string[]) => void;
  label?: string;
}

const MultipleInput: React.FC<SpecializationInputProps> = ({
  value,
  onChange,
  label,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (chip: string) => {
    onChange(value.filter((item) => item !== chip));
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Input + Add Button */}
      <div className="flex gap-2">
        <input
          className="border border-gray-300 rounded-md p-2 flex-1"
          type="text"
          placeholder={label}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleAdd}
        >
          +
        </button>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {value.map((chip) => (
          <div
            key={chip}
            className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full text-sm"
          >
            {chip}
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleRemove(chip)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleInput;
