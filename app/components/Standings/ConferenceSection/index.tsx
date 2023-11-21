import { TeamLogo } from "~/components/TeamLogo";
import type { StandingsRecord } from "~/components/types";

type ConferenceSectionProps = {
  readonly label: string;
  readonly standings: StandingsRecord[];
};

type CellProps = {
  readonly children: React.ReactNode;
};

const Cell = ({ children }: CellProps) => {
  return (
    <div className="table-cell border-b border-black align-middle">
      {children}
    </div>
  );
};

export const ConferenceSection = ({
  label,
  standings,
}: ConferenceSectionProps) => {
  return (
    <div>
      <h5 className="text-2xl font-bold">{label}</h5>
      <section className="table w-full">
        <header className="table-header-group h-8 bg-black text-center text-white">
          <div className="table-row">
            <div className="table-cell align-middle font-bold">Rank</div>
            <div className="table-cell align-middle font-bold">Team</div>
            <div className="table-cell align-middle font-bold">GP</div>
            <div className="table-cell align-middle font-bold">W</div>
            <div className="table-cell align-middle font-bold">L</div>
            <div className="table-cell align-middle font-bold">OT</div>
            <div className="table-cell align-middle font-bold">PTS</div>
          </div>
        </header>
        <div className="table-row-group">
          {standings.map((s, index) => (
            <div className="table-row h-14 text-center" key={s.teamAbbrev}>
              <Cell>{index + 1}</Cell>
              <Cell>
                <div className="flex max-w-xs items-center gap-2">
                  <TeamLogo
                    teamAbbreviation={s.teamAbbrev}
                    teamName={s.teamName}
                    size="sm"
                  />
                  <span>{s.teamName}</span>
                </div>
              </Cell>
              <Cell>{s.gamesPlayed}</Cell>
              <Cell>{s.wins}</Cell>
              <Cell>{s.losses}</Cell>
              <Cell>{s.otLosses}</Cell>
              <Cell>{s.points}</Cell>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
