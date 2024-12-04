import { useEffect, useState, useCallback } from "react";
import { HiSearch } from "react-icons/hi";

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 300,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]); // Added debounce and onChange to the dependency array

  return (
    <div className="flex gap-1 rounded-lg pl-2 items-center w-full">
      <HiSearch size="18" color="#8F9BBA" />
      <input
        {...props}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search "
        className="outline-none placeholder-[#8F9BBA] w-full bg-[#F4F7FE]"
      />
    </div>
  );
}

export default DebouncedInput;
