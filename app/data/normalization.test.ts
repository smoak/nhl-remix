import type { ScheduleGame /* , GamecenterResponse */ } from "~/api/types";
import { normalizeGames /* , normalizeGameDetails */ } from "./normalization";
// import finishedGameDetailsResponse from "../../mocks/gamecenter-2023020180-landing.json";

describe("normalization", () => {
  describe("#normalizeGames", () => {
    const games: ScheduleGame[] = [
      {
        id: 2023020180,
        season: 20232024,
        gameType: 2,
        venue: { default: "PNC Arena" },
        neutralSite: false,
        startTimeUTC: "2023-11-08T00:00:00Z",
        easternUTCOffset: "-05:00",
        venueUTCOffset: "-05:00",
        venueTimezone: "US/Eastern",
        gameState: "OFF",
        gameScheduleState: "OK",
        tvBroadcasts: [
          {
            id: 28,
            market: "A",
            countryCode: "US",
            network: "MSG-B",
          },
          { id: 375, market: "H", countryCode: "US", network: "BSSO" },
        ],
        awayTeam: {
          id: 7,
          placeName: { default: "Buffalo" },
          abbrev: "BUF",
          logo: "https://assets.nhle.com/logos/nhl/svg/BUF_light.svg",
          darkLogo: "https://assets.nhle.com/logos/nhl/svg/BUF_dark.svg",
          awaySplitSquad: false,
          // score: 2,
        },
        homeTeam: {
          id: 12,
          placeName: { default: "Carolina", fr: "Caroline" },
          abbrev: "CAR",
          logo: "https://assets.nhle.com/logos/nhl/svg/CAR_light.svg",
          darkLogo: "https://assets.nhle.com/logos/nhl/svg/CAR_dark.svg",
          homeSplitSquad: false,
          // score: 3,
        },
        periodDescriptor: { number: 4, periodType: "OT" },
        gameOutcome: { lastPeriodType: "OT" },
        winningGoalie: {
          playerId: 8477293,
          firstInitial: { default: "A." },
          lastName: { default: "Raanta" },
        },
        winningGoalScorer: {
          playerId: 8480039,
          firstInitial: { default: "M." },
          lastName: { default: "Necas" },
        },
        threeMinRecap:
          "/video/recap-sabres-at-hurricanes-11-7-23-6340708398112",
        gameCenterLink: "/gamecenter/buf-vs-car/2023/11/07/2023020180",
      },
      {
        id: 2023020182,
        season: 20232024,
        gameType: 2,
        venue: { default: "UBS Arena" },
        neutralSite: false,
        startTimeUTC: "2023-11-08T00:30:00Z",
        easternUTCOffset: "-05:00",
        venueUTCOffset: "-05:00",
        venueTimezone: "America/New_York",
        gameState: "FINAL",
        gameScheduleState: "OK",
        tvBroadcasts: [
          { id: 361, market: "A", countryCode: "US", network: "BSN" },
          {
            id: 363,
            market: "A",
            countryCode: "US",
            network: "BSWI",
          },
          {
            id: 409,
            market: "H",
            countryCode: "US",
            network: "MSGSN",
          },
        ],
        awayTeam: {
          id: 30,
          placeName: { default: "Minnesota" },
          abbrev: "MIN",
          logo: "https://assets.nhle.com/logos/nhl/svg/MIN_light.svg",
          darkLogo: "https://assets.nhle.com/logos/nhl/svg/MIN_dark.svg",
          awaySplitSquad: false,
          // score: 4,
        },
        homeTeam: {
          id: 2,
          placeName: { default: "New York" },
          abbrev: "NYI",
          logo: "https://assets.nhle.com/logos/nhl/svg/NYI_light.svg",
          darkLogo: "https://assets.nhle.com/logos/nhl/svg/NYI_dark.svg",
          homeSplitSquad: false,
          // score: 2,
        },
        periodDescriptor: { number: 3, periodType: "REG" },
        gameOutcome: { lastPeriodType: "REG" },
        winningGoalie: {
          playerId: 8470594,
          firstInitial: { default: "M." },
          lastName: { default: "Fleury" },
        },
        winningGoalScorer: {
          playerId: 8478864,
          firstInitial: { default: "K." },
          lastName: { default: "Kaprizov" },
        },
        threeMinRecap: "/video/recap-wild-at-islanders-11-7-23-6340708168112",
        gameCenterLink: "/gamecenter/min-vs-nyi/2023/11/07/2023020182",
      },
      {
        id: 2023020183,
        season: 20232024,
        gameType: 2,
        venue: { default: "Madison Square Garden" },
        neutralSite: false,
        startTimeUTC: "2023-11-08T00:30:00Z",
        easternUTCOffset: "-05:00",
        venueUTCOffset: "-05:00",
        venueTimezone: "America/New_York",
        gameState: "FINAL",
        gameScheduleState: "OK",
        tvBroadcasts: [
          { id: 284, market: "N", countryCode: "CA", network: "SN1" },
          { id: 287, market: "N", countryCode: "CA", network: "SNE" },
          { id: 288, market: "N", countryCode: "CA", network: "SNO" },
          { id: 290, market: "N", countryCode: "CA", network: "SNP" },
          { id: 385, market: "N", countryCode: "US", network: "TNT" },
          { id: 519, market: "N", countryCode: "US", network: "MAX" },
        ],
        awayTeam: {
          id: 17,
          placeName: { default: "Detroit" },
          abbrev: "DET",
          logo: "https://assets.nhle.com/logos/nhl/svg/DET_light.svg",
          darkLogo: "https://assets.nhle.com/logos/nhl/svg/DET_dark.svg",
          awaySplitSquad: false,
          // score: 3,
        },
        homeTeam: {
          id: 3,
          placeName: { default: "New York" },
          abbrev: "NYR",
          logo: "https://assets.nhle.com/logos/nhl/svg/NYR_light.svg",
          darkLogo: "https://assets.nhle.com/logos/nhl/svg/NYR_dark.svg",
          homeSplitSquad: false,
          // score: 5,
        },
        periodDescriptor: { number: 3, periodType: "REG" },
        gameOutcome: { lastPeriodType: "REG" },
        winningGoalie: {
          playerId: 8471734,
          firstInitial: { default: "J." },
          lastName: { default: "Quick" },
        },
        winningGoalScorer: {
          playerId: 8478550,
          firstInitial: { default: "A." },
          lastName: { default: "Panarin" },
        },
        threeMinRecap:
          "/video/recap-red-wings-at-rangers-11-7-23-6340707764112",
        gameCenterLink: "/gamecenter/det-vs-nyr/2023/11/07/2023020183",
      },
      {
        id: 2023020184,
        season: 20232024,
        gameType: 2,
        venue: { default: "Enterprise Center" },
        neutralSite: false,
        startTimeUTC: "2023-11-08T01:00:00Z",
        easternUTCOffset: "-05:00",
        venueUTCOffset: "-06:00",
        venueTimezone: "US/Central",
        gameState: "FINAL",
        gameScheduleState: "OK",
        tvBroadcasts: [
          {
            id: 292,
            market: "A",
            countryCode: "CA",
            network: "TSN3",
          },
          { id: 357, market: "H", countryCode: "US", network: "BSMW" },
        ],
        awayTeam: {
          id: 52,
          placeName: { default: "Winnipeg" },
          abbrev: "WPG",
          logo: "https://assets.nhle.com/logos/nhl/svg/WPG_light.svg",
          darkLogo: "https://assets.nhle.com/logos/nhl/svg/WPG_dark.svg",
          awaySplitSquad: false,
          // score: 5,
        },
        homeTeam: {
          id: 19,
          placeName: { default: "St. Louis" },
          abbrev: "STL",
          logo: "https://assets.nhle.com/logos/nhl/svg/STL_light.svg",
          darkLogo: "https://assets.nhle.com/logos/nhl/svg/STL_dark.svg",
          homeSplitSquad: false,
          // score: 2,
        },
        periodDescriptor: { number: 3, periodType: "REG" },
        gameOutcome: { lastPeriodType: "REG" },
        winningGoalie: {
          playerId: 8476945,
          firstInitial: { default: "C." },
          lastName: { default: "Hellebuyck" },
        },
        winningGoalScorer: {
          playerId: 8478398,
          firstInitial: { default: "K." },
          lastName: { default: "Connor" },
        },
        gameCenterLink: "/gamecenter/wpg-vs-stl/2023/11/07/2023020184",
      },
      {
        id: 2023020185,
        season: 20232024,
        gameType: 2,
        venue: { default: "Mullett Arena" },
        neutralSite: false,
        startTimeUTC: "2023-11-08T02:00:00Z",
        easternUTCOffset: "-05:00",
        venueUTCOffset: "-07:00",
        venueTimezone: "America/Phoenix",
        gameState: "LIVE",
        gameScheduleState: "OK",
        tvBroadcasts: [
          {
            id: 386,
            market: "A",
            countryCode: "US",
            network: "ROOT-NW",
          },
          {
            id: 521,
            market: "H",
            countryCode: "US",
            network: "SCRIPPS",
          },
        ],
        awayTeam: {
          id: 55,
          placeName: { default: "Seattle" },
          abbrev: "SEA",
          logo: "https://assets.nhle.com/logos/nhl/svg/SEA_light.svg",
          darkLogo: "https://assets.nhle.com/logos/nhl/svg/SEA_dark.svg",
          awaySplitSquad: false,
          // radioLink:
          //   "https://d2igy0yla8zi0u.cloudfront.net/SEA/20232024/SEA-radio.m3u8",
          score: 2,
        },
        homeTeam: {
          id: 53,
          placeName: { default: "Arizona" },
          abbrev: "ARI",
          logo: "https://assets.nhle.com/logos/nhl/svg/ARI_light.svg",
          darkLogo: "https://assets.nhle.com/logos/nhl/svg/ARI_dark.svg",
          homeSplitSquad: false,
          // radioLink:
          //   "https://d2igy0yla8zi0u.cloudfront.net/ARI/20232024/ARI-radio.m3u8",
          score: 2,
        },
        periodDescriptor: { number: 2, periodType: "REG" },
        gameCenterLink: "/gamecenter/sea-vs-ari/2023/11/07/2023020185",
      },
      {
        id: 2023020189,
        season: 20232024,
        gameType: 2,
        venue: { default: "SAP Center at San Jose" },
        neutralSite: false,
        startTimeUTC: "2023-11-08T03:30:00Z",
        easternUTCOffset: "-05:00",
        venueUTCOffset: "-08:00",
        venueTimezone: "US/Pacific",
        gameState: "PRE",
        gameScheduleState: "OK",
        tvBroadcasts: [
          {
            id: 314,
            market: "H",
            countryCode: "US",
            network: "NBCSCA",
          },
          {
            id: 322,
            market: "A",
            countryCode: "US",
            network: "NBCSP",
          },
        ],
        awayTeam: {
          id: 4,
          placeName: { default: "Philadelphia", fr: "Philadelphie" },
          abbrev: "PHI",
          logo: "https://assets.nhle.com/logos/nhl/svg/PHI_light.svg",
          darkLogo: "https://assets.nhle.com/logos/nhl/svg/PHI_dark.svg",
          awaySplitSquad: false,
          // radioLink:
          //   "https://d2igy0yla8zi0u.cloudfront.net/PHI/20232024/PHI-radio.m3u8",
          // odds: [
          //   { providerId: 4, value: "1.4500" },
          //   { providerId: 2, value: "-136.0000" },
          //   { providerId: 3, value: "4.7400" },
          //   { providerId: 8, value: "-214.0000" },
          // ],
        },
        homeTeam: {
          id: 28,
          placeName: { default: "San Jose" },
          abbrev: "SJS",
          logo: "https://assets.nhle.com/logos/nhl/svg/SJS_light.svg",
          darkLogo: "https://assets.nhle.com/logos/nhl/svg/SJS_dark.svg",
          homeSplitSquad: false,
          // radioLink:
          //   "https://d2igy0yla8zi0u.cloudfront.net/SJS/20232024/SJS-radio.m3u8",
          // odds: [
          //   { providerId: 4, value: "2.7000" },
          //   { providerId: 2, value: "280.0000" },
          //   { providerId: 3, value: "4.7400" },
          //   { providerId: 8, value: "172.0000" },
          // ],
        },
        periodDescriptor: { number: 1, periodType: "REG" },
        ticketsLink:
          "https://www.ticketmaster.com/event/1C005ED5EA3E711C?brand=nhl&wt.mc_id=NHL_LEAGUE_SJS_SCHED_PAGE_LINK_GM7&utm_source=nhl.com&utm_medium=client&utm_campaign=NHL_LEAGUE_SJS&utm_content=SCHED_PAGE_LINK_GM7",
        gameCenterLink: "/gamecenter/phi-vs-sjs/2023/11/07/2023020189",
      },
    ];
    let normalized: ReturnType<typeof normalizeGames>;

    beforeEach(() => {
      normalized = normalizeGames(games);
    });

    it("should normalize them", () => {
      expect(normalized).toHaveLength(6);
    });
  });

  // describe("#normalizeGameDetails", () => {
  //   describe("with a finished game", () => {
  //     let normalized: ReturnType<typeof normalizeGameDetails>;

  //     beforeEach(() => {
  //       normalized = normalizeGameDetails(
  //         finishedGameDetailsResponse as GamecenterResponse
  //       );
  //     });

  //     it("should normalize", () => {
  //       expect(normalized.game.id).toEqual(2023020180);
  //     });
  //   });
  // });
});
