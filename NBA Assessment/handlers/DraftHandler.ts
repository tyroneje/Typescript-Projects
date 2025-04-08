import DraftService from './../services/DraftService';

class DraftHandler{
    private service: DraftService;
    constructor(){
        this.service = new DraftService();
    }

    async Handle(request:any, response: any):Promise<any>{
        response.send(await this.service.getTeamDraft(request.params.id));
    }
}

export default DraftHandler;