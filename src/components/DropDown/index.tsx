import { type ChangeEvent, type FC } from "react";

type Props = {
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  listChoose: { value: string; label: string }[];
  placeholder: string;
};
const DropDown: FC<Props> = ({ handleChange, listChoose, placeholder }) => {
  return (
    <div className="w-full flex flex-row justify-end items-center ">
      {/* filter status */}
      <select
        defaultValue={placeholder}
        className="select w-full border-primary-purple select-sm lg:select-md"
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
