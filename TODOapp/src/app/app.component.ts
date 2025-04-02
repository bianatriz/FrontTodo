import { Component } from '@angular/core';
import { ComponentRef } from '../../node_modules/@angular/core/index';
import { Tarefa} from "./tarefa";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TODOapp';

  arrayDeTarefas: Tarefa[] = [];
  apiURL : string;


  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost:3000';
  this.READ_tarefas();
  }

  CREATE_tarefa(descricaoNovaTarefa: HTMLInputElement) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa.value, false);
    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe(
    resultado => { console.log(resultado); this.READ_tarefas(); });
     

    descricaoNovaTarefa.value = "";
    }   

  READ_tarefas() {
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe(
    resultado => this.arrayDeTarefas=resultado);
  }

  DELETE_tarefa(tarefaAserRemovida : Tarefa){
    var indice = this.arrayDeTarefas.indexOf(tarefaAserRemovida);
    var id = this.arrayDeTarefas[indice]._id;
    this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe(
    resultado => { console.log(resultado); this.READ_tarefas(); });
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    var indice = this.arrayDeTarefas.indexOf(tarefaAserModificada);
    var id = this.arrayDeTarefas[indice]._id;
    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`,
    tarefaAserModificada).subscribe(
    resultado => { console.log(resultado); this.READ_tarefas(); });
   }
 
}
