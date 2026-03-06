import type { ElementType, FC } from "react";
import paper from "../../assets/icons/paper.webp";
import { Plus } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
  onAction?: () => void;
  iconData?: ElementType;
};

const DataEmpty: FC<Props> = ({
  title = "Data Tidak Tersedia",
  description = "Belum ada data yang dapat ditampilkan saat ini.",
  onAction,
  iconData: Icon,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
      {/* Icon ring */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-base-200 border-2 border-dashed border-base-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-base-100 flex items-center justify-center shadow-inner">
            {Icon ? (
              <Icon className="size-6 text-primary-black" />
            ) : (
              <img
                src={paper}
                alt="paper"
                className="w-8 h-8"
                width={100}
                height={100}
              />
            )}
          </div>
        </div>
      </div>

      {/* Text */}
      <h3 className="text-sm lg:text-base font-semibold text-base-content mb-1 tracking-tight">
        {title}
      </h3>
      <p className="text-xs lg:text-sm text-base-content/55 max-w-xs leading-relaxed">
        {description}
      </p>

      {/* Action button */}
      {onAction && (
        <div className="w-full flex flex-row justify-center items-center mt-4">
          <button
            className="rounded-full w-10 h-10 flex justify-center items-center hover-overlay bg-primary-purple"
            onClick={onAction}
          >
            <Plus className="size-5 text-primary-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DataEmpty;
