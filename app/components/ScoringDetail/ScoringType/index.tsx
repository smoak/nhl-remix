import type { GoalType } from "~/components/types";

type ScoringTypeProps = {
  readonly goalType: GoalType;
};

const goalTypeToText: Record<"sh" | "pp" | "en", string> = {
  pp: "PP",
  sh: "SHG",
  en: "EN",
};

export const ScoringType = ({ goalType }: ScoringTypeProps) => {
  if (goalType === "ev") {
    return null;
  }

  return (
    <div className="flex flex-col">
      Type
      <div className="font-bold">{goalTypeToText[goalType]}</div>
    </div>
  );
};
