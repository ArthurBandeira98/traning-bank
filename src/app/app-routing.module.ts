import { LoginComponent } from './login/login.component';
import { CadastroDataDrivenComponent } from './cadastro-data-driven/cadastro-data-driven.component';
import { CadastroClientesComponent } from './cadastro-clientes-template/cadastro-clientes.component';
import { ContentComponent } from './content/content.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


//canActive realiza a guarda de rotas da aplicação
const routes: Routes = [
  { path: 'cadastro-clientes', component: CadastroClientesComponent, canActivate: [AuthGuard] },
  { path: '', component: ContentComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-data-driven', component: CadastroDataDrivenComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
