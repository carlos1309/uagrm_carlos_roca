import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, MenuController, LoadingController, AlertController} from '@ionic/angular';
import {AuthService} from '../../core/services/auth/auth.service';
import {User} from '../../shared/models/user.class';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    public onRegisterForm: FormGroup;
    public user: User = new User();

    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        public loadingCtrl: LoadingController,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private alertCtrl: AlertController
    ) {
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }

    ngOnInit() {
        this.onRegisterForm = this.formBuilder.group({
            'fullName': [null, Validators.compose([
                Validators.required
            ])],
            'email': [null, Validators.compose([
                Validators.required
            ])],
            'password': [null, Validators.compose([
                Validators.required
            ])]
        });
    }

    async signUp() {
        const loader = await this.loadingCtrl.create({
            message: 'Resgistrando ...'
        });

        await loader.present();
        const userResponse = this.authService.register(this.user);
        await loader.dismiss();
        if (userResponse) {
            const alert = await this.alertCtrl.create({
                header: 'Registro',
                message: 'Usuario registrado correctamente.',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            this.navCtrl.navigateRoot('/home-results');
                        }
                    }
                ]
            });
            await alert.present();
        } else {
            const alert = await this.alertCtrl.create({
                header: 'Error de registro',
                message: 'Error al registrar nuevo usuario, por favor intente más tarde.',
                buttons: ['OK']
            });
            await alert.present();
        }
    }

    // // //
    goToLogin() {
        this.navCtrl.navigateRoot('/');
    }
}
