"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const DraftService_1 = __importDefault(require("./DraftService"));
let ds = new DraftService_1.default();
(0, vitest_1.test)("Get Players, Returns one player", () => __awaiter(void 0, void 0, void 0, function* () {
    vitest_1.vi.spyOn(ds, "externalCall").mockImplementation((url) => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
    let players = yield ds.getAllPlayers(1);
    (0, vitest_1.expect)(players.length).toBe(1);
}));
(0, vitest_1.test)("Get Players, Returns no players", () => __awaiter(void 0, void 0, void 0, function* () {
    vitest_1.vi.spyOn(ds, "externalCall").mockImplementation((url) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            data: [],
            meta: {
                next_cursor: 0,
            },
        };
    }));
    let players = yield ds.getAllPlayers(1);
    (0, vitest_1.expect)(players.length).toBe(0);
}));
(0, vitest_1.test)("Get Team Draft, Return first round picks", () => __awaiter(void 0, void 0, void 0, function* () {
    vitest_1.vi.spyOn(ds, "getAllPlayers").mockImplementation((id) => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
    ds.team_cache = new Map();
    ds.teams = [
        {
            id: 1,
            name: "Hawks",
            city: "Atlanta",
        },
    ];
    let draft = yield ds.getTeamDraft(1);
    (0, vitest_1.expect)(draft["Draft Rounds"]["1"]).toBe(3);
    (0, vitest_1.expect)(draft["Draft Rounds"]["2"]).toBe(0);
}));
(0, vitest_1.test)("Get Team Draft, Return second round picks", () => __awaiter(void 0, void 0, void 0, function* () {
    vitest_1.vi.spyOn(ds, "getAllPlayers").mockImplementation((id) => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
    ds.team_cache = new Map();
    ds.teams = [
        {
            id: 1,
            name: "Hawks",
            city: "Atlanta",
        },
    ];
    let draft = yield ds.getTeamDraft(1);
    (0, vitest_1.expect)(draft["Draft Rounds"]["2"]).toBe(3);
    (0, vitest_1.expect)(draft["Draft Rounds"]["1"]).toBe(0);
}));
(0, vitest_1.test)("Get Team Draft, Return no first round or second round picks, Third round picks", () => __awaiter(void 0, void 0, void 0, function* () {
    vitest_1.vi.spyOn(ds, "getAllPlayers").mockImplementation((id) => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
    ds.team_cache = new Map();
    ds.teams = [
        {
            id: 1,
            name: "Hawks",
            city: "Atlanta",
        },
    ];
    let draft = yield ds.getTeamDraft(1);
    console.log(draft);
    (0, vitest_1.expect)(draft["Draft Rounds"]["2"]).toBe(0);
    (0, vitest_1.expect)(draft["Draft Rounds"]["1"]).toBe(0);
}));
(0, vitest_1.test)("Get Team Draft, Return no first round or second round picks, Empty player list", () => __awaiter(void 0, void 0, void 0, function* () {
    vitest_1.vi.spyOn(ds, "getAllPlayers").mockImplementation((id) => __awaiter(void 0, void 0, void 0, function* () {
        return [];
    }));
    ds.team_cache = new Map();
    ds.teams = [
        {
            id: 1,
            name: "Hawks",
            city: "Atlanta",
        },
    ];
    let draft = yield ds.getTeamDraft(1);
    console.log(draft);
    (0, vitest_1.expect)(draft["Draft Rounds"]["2"]).toBe(0);
    (0, vitest_1.expect)(draft["Draft Rounds"]["1"]).toBe(0);
}));
