import { type FC } from "react";

type Props = {
  list: { id: number; label: string }[];
  handleRemoveList: (id: number) => void;
  label: string;
};
const DaftarPilihanInput: FC<Props> = ({ list, handleRemoveList, label }) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-1">
      <p className="text-sm">{label}</p>
      {list.length > 0 ? (
        list.map((item, index) => (
          <div
            key={item.id}
            className="w-full flex flex-row justify-between items-center gap-2 px-4 py-2.5 mt-2 card bg-white shadow-sm"
          >
            {/* keterangan */}
            <div className="w-3/4 flex flex-row justify-start items-center gap-2">
              {/* number */}
              <span className="text-sm font-medium">{index + 1}.</span>

              {/* label */}
              <p className="text-sm">{item.label}</p>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveList(item.id)}
              className="pl-1 text-sm text-error hover:underline"
            >
              Hapus
            </button>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-row justify-center items-center mt-4">
          <span className="text-xs text-primary-black/50">
            Tidak ada anggota
          </span>
        </div>
      )}
    </div>
  );
};

export default DaftarPilihanInput;
