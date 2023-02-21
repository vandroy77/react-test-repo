import "./style.css";
export const TextInput = ({ handleOnChange, searchValue }) => {
  return <input className="text-input" onChange={handleOnChange} value={searchValue} type="search" />;
};
