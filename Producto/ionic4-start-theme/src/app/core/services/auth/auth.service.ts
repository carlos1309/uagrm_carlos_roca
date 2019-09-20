import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../../../shared/models/user.class';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public isLogged = null;

    constructor(public angularFireAuth: AngularFireAuth) {
        angularFireAuth.authState.subscribe(user => (this.isLogged = user));
    }

    async login(user: User) {
        try {
            return await this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
        } catch (e) {
            console.dir(e);
        }
    }

    async register(user: User) {
        try {
            return await this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
        } catch (e) {
            console.dir(e);
        }
    }

    async logout() {
        try {
            return await this.angularFireAuth.auth.signOut();
        } catch (e) {
            console.dir(e);
        }
    }
}
