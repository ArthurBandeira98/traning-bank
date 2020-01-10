import { Estados } from './estados';
import { DropdownService } from './../service/dropdown.service';
import { ConsultaCepService } from './consulta-cep.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-data-driven',
  templateUrl: './cadastro-data-driven.component.html',
  styleUrls: ['./cadastro-data-driven.component.css']
})
export class CadastroDataDrivenComponent implements OnInit {

  //necessario importa o ReactiveFormsModule no app.module
  form: FormGroup;
  estados: Estados[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cepService: ConsultaCepService,
    private dropdownService: DropdownService
    ) { }

  ngOnInit() {

    this.dropdownService.getEstadosBr().subscribe(dados => this.estados = dados);

    //realizando a instancia dos campos do formulario
    /*this.form = new FormGroup({
      nome: new FormControl(null),
      cpf: new FormControl(null),
      email: new FormControl(null),
      telefone: new FormControl(null),
      cep: new FormControl(null),
      estado: new FormControl(null),
      cidade: new FormControl(null),
      bairro: new FormControl(null),
      rua: new FormControl(null),
      numero: new FormControl(null)
    });*/

    //realizando instancia dos campos com FormBuilder
    //Validações aplicadas com Validators
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      cpf: [null, [Validators.required, Validators.min(8), Validators.max(13)]],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, Validators.required],
      cep: [null, Validators.required],
      estado: [null, Validators.required],
      cidade: [null, Validators.required],
      bairro: [null, Validators.required],
      rua: [null, Validators.required],
      numero: [null, Validators.required]
      })
    }

  //dando o submit e passando os dados do formulario
  onSubmit(){

    //submetendo os dados ao console
    console.log(this.form.value)

    if(this.form.valid){

    //passando para o json
    this.http.post('https://httpbin.org/post', JSON.stringify(this.form.value)).map(res => res)
    .subscribe(dados => {
      console.log(dados);
      //resetando dados do formulario
      this.form.reset();
    });
    } else {
      console.log('formulario invalido');
      //validando formulario após envio
      this.verificaValidacoesForm(this.form);

    }

  }

  verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();

      //verifica se o objeto controle é um formGroup
      if(controle instanceof FormGroup){
        this.verificaValidacoesForm(controle);
      }


    });
  }



  resetar(){
    this.form.reset();
  }

  verificaValidTouched(campo: string){

    return (!this.form.get(campo).valid && (this.form.get(campo).touched || this.form.get(campo).dirty)
    );
  }

  aplicaErro(campo){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }

  }

  consultaCep() {
    // Nova variável "cep" somente com dígitos.

    //declarando uma variavel
    let cep = this.form.get('endereco.cep').value;

    cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {

      this.resetaDados();

      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  resetaDados(){
    this.form.patchValue({

      rua: null,
        // cep: dados.cep,
        bairro: null,
        cidade: null,
        estado: null

      });
  }

  populaDadosForm(dados) {

    //passando os dados do formulario

    this.form.patchValue({

        rua: dados.logradouro,
        // cep: dados.cep,
        bairro: dados.bairro,
        cidade: dados.localidade,
        //estado: dados.uf
    });

  }


}
