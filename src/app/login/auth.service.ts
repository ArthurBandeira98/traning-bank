import { Usuario } from './usuario';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  //para tirar o menu da tela de login
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario){
    if(usuario.nome === 'usuario@email.com' && usuario.senha === '1234'){

      this.usuarioAutenticado = true;

      //se o usuario for autenticado, se deve mostrar o menu
      this.mostrarMenuEmitter.emit(true);

      //nagevando para a homePage
      this.router.navigate(['']);

    }
    else{

      this.usuarioAutenticado = false;

      //caso não seja autenticado, não mostrar
      this.mostrarMenuEmitter.emit(false);


    }
  }

  //metodo para autenticar usuario e verificar rotas
  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }


}
