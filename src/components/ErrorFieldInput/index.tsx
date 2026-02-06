import { type FC } from "react";
import { cn } from "../../utils/cn";

type Props = {
  errorMessage?: string;
};
const ErrorFieldInput: FC<Props> = ({ errorMessage }) => {
  return (
    <div className="w-full h-4">
      <span
        className={cn(
          "text-xs text-error transition-opacity duration-200 ease-in-out",
          errorMessage ? "opacity-100" : "opacity-0",
        )}
      >
        {errorMessage}
      </span>
    </div>
  );
};

export default ErrorFieldInput;
