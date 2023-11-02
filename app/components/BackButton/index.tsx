import { useNavigate } from "@remix-run/react";
import { ArrowIcon } from "../ArrowIcon";

export const BackButton = () => {
  const navigate = useNavigate();
  const handleBackButton = () => navigate(-1);

  return (
    <div
      className="flex max-w-fit items-center py-5 transition-all duration-200 hover:cursor-pointer hover:opacity-60"
      onClick={handleBackButton}
      role="button"
      aria-labelledby="back-button-text"
    >
      <ArrowIcon size={16} />
      <span id="back-button-text" className="pl-3 text-xl">
        Back
      </span>
    </div>
  );
};
