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
Object.defineProperty(exports, "__esModule", { value: true });
class DraftService {
    constructor() {
        this.teams = [];
        this.team_cache = new Map();
        this.getAllTeams();
    }
    getTeamDraft(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.team_cache.has(id)) {
                return this.team_cache.get(id);
            }
            let players = yield this.getAllPlayers(id);
            let first = 0, second = 0;
            players.forEach(x => {
                if (x.draftRound == 1)
                    first++;
                else if (x.draftRound == 2)
                    second++;
            });
            let team = this.teams.find(x => {
                if (x.id == id)
                    return x;
            });
            let draft = {
                'Team Name': team === null || team === void 0 ? void 0 : team.name,
                'Draft Rounds': {
                    '1': first,
                    '2': second
                }
            };
            this.team_cache.set(id, draft);
            return draft;
        });
    }
    getAllPlayers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            let players = [];
            let jsonData = yield this.externalCall(`https://api.balldontlie.io/v1/players?per_page=100&team_ids[]=${id}`);
            players = [...players, ...jsonData.data];
            if (jsonData.meta.next_cursor > 0) {
                while (true) {
                    jsonData = yield this.externalCall(`https://api.balldontlie.io/v1/players?
          per_page=100&cursor=${(_a = jsonData === null || jsonData === void 0 ? void 0 : jsonData.meta) === null || _a === void 0 ? void 0 : _a.next_cursor}&team_ids[]=${id}`);
                    players = [...players, ...jsonData.data];
                    if (!((_b = jsonData === null || jsonData === void 0 ? void 0 : jsonData.meta) === null || _b === void 0 ? void 0 : _b.next_cursor))
                        break;
                }
            }
            players = players.filter((player) => {
                return player.draft_number ? true : false;
            })
                .map((player) => {
                return { name: player.name,
                    draftNumber: player.draft_number,
                    draftRound: player.draft_round
                };
            });
            return players;
        });
    }
    getAllTeams() {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonData = yield this.externalCall("https://api.balldontlie.io/v1/teams");
            this.teams = jsonData.data
                .filter((team) => {
                return team.city ? true : false;
            })
                .map((team) => {
                return {
                    id: team.id,
                    name: team.name,
                    city: team.city,
                };
            });
        });
    }
    externalCall(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url, {
                headers: { Authorization: process.env.NBA_API_KEY || "" },
            });
            return yield response.json();
        });
    }
}
exports.default = DraftService;
