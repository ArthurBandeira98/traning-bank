import { CadastroDataDrivenComponent } from './cadastro-data-driven/cadastro-data-driven.component';
import { CadastroClientesComponent } from './cadastro-clientes-template/cadastro-clientes.component';
import { ContentComponent } from './content/content.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: 'cadastro-clientes', component: CadastroClientesComponent },
  { path: '', component: ContentComponent },
  { path: 'cadastro-data-driven', component: CadastroDataDrivenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
