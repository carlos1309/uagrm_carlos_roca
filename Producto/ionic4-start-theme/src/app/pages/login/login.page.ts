import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, MenuController, ToastController, AlertController, LoadingController} from '@ionic/angular';
import {AuthService} from '../../core/services/auth/auth.service';
import {User} from '../../shared/models/user.class';
import {load} from '@angular/core/src/render3';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public user: User = new User();
    public onLoginForm: FormGroup;

    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) {
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }

    ngOnInit() {

        this.onLoginForm = this.formBuilder.group({
            'email': [null, Validators.compose([
                Validators.required
            ])],
            'password': [null, Validators.compose([
                Validators.required
            ])]
        });
    }

    async forgotPass() {
        const alert = await this.alertCtrl.create({
            header: 'Restablecer contraseña',
            message: 'Ingresa tu correo para enviarte un link para restablecer tu contraseña',
            inputs: [
                {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Correo'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Confirm',
                    handler: async () => {
                        const loader = await this.loadingCtrl.create({
                            duration: 2000
                        });

                        loader.present();
                        loader.onWillDismiss().then(async l => {
                            const toast = await this.toastCtrl.create({
                                showCloseButton: true,
                                message: 'Correo enviado.',
                                duration: 3000,
                                position: 'bottom'
                            });

                            toast.present();
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    // // //
    goToRegister() {
        this.navCtrl.navigateRoot('/register');
    }

    goToHome() {
        this.navCtrl.navigateRoot('/home-results');
    }

    async login() {
        const loading = await this.loadingCtrl.create({ message: 'Iniciando sesión ...' });
        await loading.present();
        const userResponse = await this.authService.login(this.user);
        await loading.dismiss();
        console.log(userResponse);
        if (userResponse) {
            this.goToHome();
        } else {
            const alert = await this.alertCtrl.create({
                header: 'Credenciales incorrectos',
                message: 'El correo o la contraseña son incorrectos, por favor intente de nuevo.',
                buttons: ['OK']
            });
            await alert.present();
        }
    }
}
