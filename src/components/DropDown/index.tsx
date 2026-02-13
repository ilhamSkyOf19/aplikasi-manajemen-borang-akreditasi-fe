import { type ChangeEvent, type FC } from "react";

type Props = {
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  listChoose: { value: string; label: string }[];
  placeholder: string;
};
const DropDown: FC<Props> = ({ handleChange, listChoose, placeholder }) => {
  return (
    <div className="w-80 h-10 overflow-hidden border border-primary-purple rounded-md focus-within:ring-1 focus-within:ring-primary-purple transition-all duration-200 ease-in-out">
      {/* filter status */}
      <select
        defaultValue={placeholder}
        className="select w-full border-none outline-none rounded-md"
        onChange={handleChange}
      >
        <option disabled={true}>{placeholder}</option>
        {listChoose.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
