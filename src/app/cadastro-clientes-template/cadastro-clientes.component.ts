import { ConsultaCepService } from './consulta-cep.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/operators';
import 'rxjs/Rx';
 


@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})
export class CadastroClientesComponent implements OnInit {

  constructor(private http: HttpClient, private cepService: ConsultaCepService) { 
 
  }

  ngOnInit() {
    
  }

  onSubmit(form){
    console.log(form.controls);
    //sempre instalar o ' npm install --save rxjs-compat ' para usar o map
    //submetendo os dados ao servidor
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value)).map(res => res)
    .subscribe(dados => console.log(dados));
  }

  //buscando CEP
  

  consultaCEP(cep, form) {
    // Nova variável "cep" somente com dígitos.
    
    cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {
    
      this.resetaDados(form);
    
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados, form));
    }
  }

  populaDadosForm(dados, formulario) {
    
    //passando os dados do formulario
    /*formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });*/

    formulario.form.patchValue({
    
        rua: dados.logradouro,
        // cep: dados.cep,
        bairro: dados.bairro,  
        cidade: dados.localidade,
        estado: dados.uf
    });
  // console.log(form);
  }

  resetaDados(formulario){
    formulario.form.patchValue({

      rua: null,
        // cep: dados.cep,
        bairro: null,  
        cidade: null,
        estado: null
  
      });
  }
 

}
