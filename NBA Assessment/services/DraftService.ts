import Team from "./../models/Team";
import Player from "./../models/Player";

class DraftService {

  teams: Team[] = [];
  team_cache = new Map();

  constructor() {
    this.getAllTeams();
  }

  async getTeamDraft(id: number) : Promise<any>{
    if(this.team_cache.has(id)){
        return this.team_cache.get(id);
    }

    let players = await this.getAllPlayers(id);
    let first=0,second=0;

    players.forEach(x=>{
        if(x.draftRound == 1) first++;
        else if (x.draftRound == 2) second++;
    });

    let team = this.teams.find(x=>{
        if(x.id == id) return x;
    });

    let draft = {
        'Team Name': team?.name,
        'Draft Rounds': {
            '1': first,
            '2': second
        }
     };

    this.team_cache.set(id, draft);

    return draft;
} 

  async getAllPlayers(id: number): Promise<Player[]> {
    let players: any[] = [];
    let jsonData = await this.externalCall(`https://api.balldontlie.io/v1/players?per_page=100&team_ids[]=${id}`)
    
    players = [...players, ...jsonData.data];

    if (jsonData.meta.next_cursor > 0) {
      while (true) {
        jsonData = await this.externalCall(`https://api.balldontlie.io/v1/players?
          per_page=100&cursor=${jsonData?.meta?.next_cursor}&team_ids[]=${id}`)
        players = [...players, ...jsonData.data];
        if (!jsonData?.meta?.next_cursor) break;
      }
    }

    players = players.filter((player:any)=>{
        return player.draft_number? true:false;
    })
    .map((player)=>{
        return {name: player.name,
            draftNumber: player.draft_number,
            draftRound: player.draft_round
        } satisfies Player
    });

    return players;
  }

  async getAllTeams() {
    const jsonData = await this.externalCall("https://api.balldontlie.io/v1/teams");
    this.teams = jsonData.data
      .filter((team: any) => {
        return team.city ? true : false;
      })
      .map((team: any) => {
        return {
            id: team.id,
            name: team.name,
            city: team.city,
        } satisfies Team;
      });
  }

  async externalCall(url:string){
    const response = await fetch(url, {
      headers: { Authorization: process.env.NBA_API_KEY || "" },
    });
    return  await response.json();
  }
}

export default DraftService;
