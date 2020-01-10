import { Estados } from './../cadastro-data-driven/estados';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(){
    //pegando conteudo do jSON no assets
    return this.http.get<Estados[]>('assets/dados/estadosbr.json').pipe(
      map(res => res));


  }

}
