import { expect, test, vi } from "vitest";
import DraftService from "./DraftService";

let ds = new DraftService();

test("Get Players, Returns one player", async () => {
  vi.spyOn(ds, "externalCall").mockImplementation(async (url) => {
    return {
      data: [
        {
          id: 19,
          first_name: "Stephen",
          last_name: "Curry",
          position: "G",
          height: "6-2",
          weight: "185",
          jersey_number: "30",
          college: "Davidson",
          country: "USA",
          draft_year: 2009,
          draft_round: 1,
          draft_number: 7,
          team: {
            id: 10,
            conference: "West",
            division: "Pacific",
            city: "Golden State",
            name: "Warriors",
            full_name: "Golden State Warriors",
            abbreviation: "GSW",
          },
        },
      ],
      meta: {
        next_cursor: 0,
      },
    };
  });

  let players = await ds.getAllPlayers(1);
  expect(players.length).toBe(1);
});

test("Get Players, Returns no players", async () => {
  vi.spyOn(ds, "externalCall").mockImplementation(async (url) => {
    return {
      data: [],
      meta: {
        next_cursor: 0,
      },
    };
  });

  let players = await ds.getAllPlayers(1);
  expect(players.length).toBe(0);
});

test("Get Team Draft, Return first round picks", async () => {
  vi.spyOn(ds, "getAllPlayers").mockImplementation(async (id) => {
    return [
      {
        name: "Bob Bobbit",
        draftNumber: 10,
        draftRound: 1,
      },
      {
        name: "Tom Thomas",
        draftNumber: 1,
        draftRound: 1,
      },
      {
        name: "Bill Billington",
        draftNumber: 2,
        draftRound: 1,
      },
    ];
  });

  ds.team_cache = new Map();
  ds.teams = [
    {
      id: 1,
      name: "Hawks",
      city: "Atlanta",
    },
  ];

  let draft = await ds.getTeamDraft(1);

  expect(draft["Draft Rounds"]["1"]).toBe(3);
  expect(draft["Draft Rounds"]["2"]).toBe(0);
});

test("Get Team Draft, Return second round picks", async () => {
  vi.spyOn(ds, "getAllPlayers").mockImplementation(async (id) => {
    return [
      {
        name: "Bob Bobbit",
        draftNumber: 10,
        draftRound: 2,
      },
      {
        name: "Tom Thomas",
        draftNumber: 1,
        draftRound: 2,
      },
      {
        name: "Bill Billington",
        draftNumber: 2,
        draftRound: 2,
      },
    ];
  });

  ds.team_cache = new Map();
  ds.teams = [
    {
      id: 1,
      name: "Hawks",
      city: "Atlanta",
    },
  ];

  let draft = await ds.getTeamDraft(1);

  expect(draft["Draft Rounds"]["2"]).toBe(3);
  expect(draft["Draft Rounds"]["1"]).toBe(0);
});

test("Get Team Draft, Return no first round or second round picks, Third round picks", async () => {
  vi.spyOn(ds, "getAllPlayers").mockImplementation(async (id) => {
    return [
      {
        name: "Bob Bobbit",
        draftNumber: 10,
        draftRound: 3,
      },
      {
        name: "Tom Thomas",
        draftNumber: 1,
        draftRound: 3,
      },
      {
        name: "Bill Billington",
        draftNumber: 2,
        draftRound: 3,
      },
    ];
  });

  ds.team_cache = new Map();
  ds.teams = [
    {
      id: 1,
      name: "Hawks",
      city: "Atlanta",
    },
  ];

  let draft = await ds.getTeamDraft(1);
  console.log(draft);
  expect(draft["Draft Rounds"]["2"]).toBe(0);
  expect(draft["Draft Rounds"]["1"]).toBe(0);
});

test("Get Team Draft, Return no first round or second round picks, Empty player list", async () => {
  vi.spyOn(ds, "getAllPlayers").mockImplementation(async (id) => {
    return [];
  });

  ds.team_cache = new Map();
  ds.teams = [
    {
      id: 1,
      name: "Hawks",
      city: "Atlanta",
    },
  ];

  let draft = await ds.getTeamDraft(1);
  console.log(draft);
  expect(draft["Draft Rounds"]["2"]).toBe(0);
  expect(draft["Draft Rounds"]["1"]).toBe(0);
});
