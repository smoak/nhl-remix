import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "@remix-run/react";

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
      <ArrowLeftIcon className="w-4 text-black" title="Back" />
      <span id="back-button-text" className="pl-3 text-xl">
        Back
      </span>
    </div>
  );
};
