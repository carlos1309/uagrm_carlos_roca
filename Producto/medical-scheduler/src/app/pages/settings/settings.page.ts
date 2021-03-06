import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../core/services/auth/auth.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    lang: any;
    enableNotifications: any;
    paymentMethod: any;
    currency: any;
    enablePromo: any;
    enableHistory: any;

    languages: any = ['English', 'Portuguese', 'French'];
    paymentMethods: any = ['Paypal', 'Credit Card'];
    currencies: any = ['USD', 'BRL', 'EUR'];

    constructor(public navCtrl: NavController, private authService: AuthService) {
    }

    ngOnInit() {
    }

    editProfile() {
        this.navCtrl.navigateForward('edit-profile');
    }

    logout() {
        this.authService.logout();
        this.navCtrl.navigateRoot('/');
    }

}
