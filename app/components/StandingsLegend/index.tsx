export const StandingsLegend = () => {
  return (
    <>
      <h2 className="mb-3 text-3xl font-bold">Legend</h2>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="p-4">
          <div className="flex flex-col">
            <span>
              <span className="font-bold">x</span> - Clinched Playoff spot
            </span>
            <span>
              <span className="font-bold">y</span> - Clinched Division
            </span>
            <span>
              <span className="font-bold">p</span> - President's Trophy
            </span>
            <span>
              <span className="font-bold">z</span> - Clinched Conference
            </span>
            <span>
              <span className="font-bold">e</span> - Eliminated from Playoff
              contention
            </span>
            <span>
              <span className="font-bold">GP</span> - Games Played
            </span>
            <span>
              <span className="font-bold">W</span> - Wins (worth two points)
            </span>
            <span>
              <span className="font-bold">L</span> - Losses (worth zero points)
            </span>
            <span>
              <span className="font-bold">OT</span> - OT/Shootout losses (worth
              one point)
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex flex-col">
            <span>
              <span className="font-bold">PTS</span> - Points
            </span>
            <span>
              <span className="font-bold">P%</span> - Points Percentage
            </span>
            <span>
              <span className="font-bold">RW</span> - Regulation Wins
            </span>
            <span>
              <span className="font-bold">ROW</span> - Regulation plus Overtime
              Wins
            </span>
            <span>
              <span className="font-bold">GF</span> - Goals For
            </span>
            <span>
              <span className="font-bold">GA</span> - Goals Against
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex flex-col">
            <span>
              <span className="font-bold">DIFF</span> - Goal Differential
            </span>
            <span>
              <span className="font-bold">HOME</span> - Home record
            </span>
            <span>
              <span className="font-bold">AWAY</span> - Away Record
            </span>
            <span>
              <span className="font-bold">S/O</span> - Record in games decided
              by Shootout
            </span>
            <span>
              <span className="font-bold">L10</span> - Record in last ten games
            </span>
            <span>
              <span className="font-bold">STRK</span> - Streak
            </span>
          </div>
        </div>
        <div className="p-4"></div>
      </div>
    </>
  );
};
