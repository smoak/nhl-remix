import type { LiveGame, ScoringPlay } from "./types";

export const createScoringPlay = (
  overrides?: Partial<ScoringPlay>
): ScoringPlay => {
  return {
    players: [
      {
        player: {
          id: 8477021,
          fullName: "Alexander Kerfoot",
          link: "/api/v1/people/8477021",
        },
        playerType: "Scorer",
        seasonTotal: 2,
      },
      {
        player: {
          id: 8474568,
          fullName: "Luke Schenn",
          link: "/api/v1/people/8474568",
        },
        playerType: "Assist",
        seasonTotal: 1,
      },
      {
        player: {
          id: 8476853,
          fullName: "Morgan Rielly",
          link: "/api/v1/people/8476853",
        },
        playerType: "Assist",
        seasonTotal: 7,
      },
      {
        player: {
          id: 8475683,
          fullName: "Sergei Bobrovsky",
          link: "/api/v1/people/8475683",
        },
        playerType: "Goalie",
      },
    ],
    result: {
      event: "Goal",
      eventCode: "TOR12",
      eventTypeId: "GOAL",
      description:
        "Alexander Kerfoot (2) Wrist Shot, assists: Luke Schenn (1), Morgan Rielly (7)",
      secondaryType: "Wrist Shot",
      strength: {
        code: "EVEN",
        name: "Even",
      },
      emptyNet: false,
    },
    about: {
      period: 1,
      ordinalNum: "1st",
      periodTime: "02:20",
      periodTimeRemaining: "17:40",
      goals: {
        away: 0,
        home: 1,
      },
    },
    coordinates: {
      x: -82.0,
      y: -8.0,
    },
    team: {
      id: 10,
      name: "Toronto Maple Leafs",
      link: "/api/v1/teams/10",
    },
    ...overrides,
  };
};

export const createLiveGame = (overrides?: Partial<LiveGame>): LiveGame => {
  return {
    content: {
      link: "/api/v1/game/2022030212/content",
    },
    gameDate: "2023-05-04T23:00:00Z",
    gamePk: 2022030212,
    gameType: "P",
    linescore: {
      currentPeriod: 3,
      currentPeriodTimeRemaining: "16:02",
      periods: [],
      teams: {
        home: {
          team: {
            id: 10,
            name: "Toronto Maple Leafs",
            link: "/api/v1/teams/10",
          },
          goals: 2,
          shotsOnGoal: 31,
          goaliePulled: false,
          numSkaters: 5,
          powerPlay: false,
        },
        away: {
          team: {
            id: 13,
            name: "Florida Panthers",
            link: "/api/v1/teams/13",
          },
          goals: 3,
          shotsOnGoal: 23,
          goaliePulled: false,
          numSkaters: 5,
          powerPlay: false,
        },
      },
      powerPlayStrength: "Even",
      hasShootout: false,
      powerPlayInfo: {
        situationTimeRemaining: 788,
        situationTimeElapsed: 292,
        inSituation: false,
      },
    },
    link: "/api/v1/game/2022030212/feed/live",
    scoringPlays: [createScoringPlay()],
    season: "20222023",
    status: {
      abstractGameState: "Live",
      codedGameState: "3",
      detailedState: "In Progress",
      statusCode: "3",
      startTimeTBD: false,
    },
    teams: {
      away: {
        leagueRecord: {
          wins: 5,
          losses: 3,
          type: "league",
        },
        score: 3,
        team: {
          id: 13,
          name: "Florida Panthers",
          link: "/api/v1/teams/13",
          conference: {},
          division: {},
          franchise: {},
          venue: {},
          abbreviation: "FLA",
          teamName: "Panthers",
          locationName: "Florida",
          firstYearOfPlay: "1993",
          shortName: "Florida",
          officialSiteUrl: "http://www.floridapanthers.com/",
          franchiseId: 33,
          active: true,
        },
      },
      home: {
        leagueRecord: {
          wins: 4,
          losses: 3,
          type: "league",
        },
        score: 2,
        team: {
          id: 10,
          name: "Toronto Maple Leafs",
          link: "/api/v1/teams/10",
          conference: {},
          division: {},
          franchise: {},
          venue: {},
          abbreviation: "TOR",
          teamName: "Maple Leafs",
          locationName: "Toronto",
          firstYearOfPlay: "1927",
          shortName: "Toronto",
          officialSiteUrl: "http://www.mapleleafs.com/",
          franchiseId: 5,
          active: true,
        },
      },
    },
    venue: {
      name: "Scotiabank Arena",
      link: "/api/v1/venues/null",
    },
    seriesSummary: {
      gameCode: 212,
      gameLabel: "Game 2",
      gameNumber: 2,
      gamePk: 2022030212,
      gameTime: "2023-05-04T23:00:00Z",
      seriesStatus: "Panthers lead 1-0",
      seriesStatusShort: "FLA leads 1-0",
      necessary: true,
      series: {
        matchupTeams: [
          {
            team: {
              id: 10,
            },
            seed: {
              type: "2",
            },
            seriesRecord: {
              wins: 0,
              losses: 1,
            },
          },
          {
            team: {
              id: 13,
            },
            seed: {
              type: "WC2",
            },
            seriesRecord: {
              wins: 1,
              losses: 0,
            },
          },
        ],
        round: {
          number: 2,
        },
        seriesCode: "I",
        seriesNumber: 1,
      },
    },
    ...overrides,
  };
};
