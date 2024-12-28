import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nombres: string = '';
  apellidos: string = '';
  correo: string = '';
  codigo_admin: string = '';
  edad: string= ''; 
  sexo: string= ''; 
  contrasena: string = '';
  
  constructor(private userService: UserService, private router: Router, private toastController: ToastController) { }

  onSubmit() {
    console.log('Datos del formulario:', {
      nombres: this.nombres,
      apellidos: this.apellidos,
      correo: this.correo,
      codigo_admin: this.codigo_admin,
      edad: this.edad,
      sexo: this.sexo,
      contrasena: this.contrasena
    }); // Agrega esto para depurar

    this.userService.createAdmin(this.nombres, this.apellidos, this.correo, this.codigo_admin, this.contrasena,  this.edad, this.sexo)
      .subscribe(
        (response: any) => {
          console.log('Administrador registrado con éxito', response);
          this.presentToast('Administrador registrado con éxito');
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error('Error al registrar el usuario', error);
          this.presentToast('Error al registrar el usuario');
        }
      );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
  ngOnInit() {
  }
  

}
