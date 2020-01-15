import { AuthService } from './login/auth.service';
import { Component } from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'traning-bank';

  mostrarMenu: boolean = false;

  constructor(public dialog: MatDialog, private authService: AuthService){
  }

  openDialog(){
    const dialogRef = this.dialog.open(AppComponent, {
      height: '450px'
    });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
  }

  //chamando o mostra Menu
  ngOnInit(){
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }

}


