import { useNavigate } from "@remix-run/react";
import { ArrowIcon } from "../ArrowIcon";

export const BackButton = () => {
  const navigate = useNavigate();
  const handleBackButton = () => navigate(-1);

  return (
    <div
      className="flex max-w-fit items-center py-5 transition-all duration-200 hover:cursor-pointer hover:opacity-60"
      onClick={handleBackButton}
    >
      <ArrowIcon size={16} />
      <span className="pl-3 text-xl">Back</span>
    </div>
  );
};
