import React from "react";
interface SearchInputProps {
  onChange: (value: string) => void;
}
const SearchInput: React.FC<SearchInputProps> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (props.onChange) {
      props.onChange(value);
    }
  };
  return (
    <input
      onChange={handleChange}
      type="text"
      placeholder="Search Pokemon"
      className="pl-4 rounded-md h-10 border text-black w-full"
    />
  );
};

export default SearchInput;
