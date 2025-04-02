export class Tarefa {
    _id : string | undefined ;
    descricao: string;
    statusRealizada: boolean;
    constructor(_descricao: string, _statusRealizada: boolean) {
    this.descricao = _descricao;
    this.statusRealizada = _statusRealizada;
    }
   }
   