import {Injectable, Input} from '@angular/core';
import {isNullOrUndefined} from "util";
import {HttpClient} from "@angular/common/http";
import * as decode from 'jwt-decode';
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import {repeat} from "rxjs/internal/operators";

//npm install --save-dev jwt-decode

interface User {
    result: {
        "id": number,
        "name": string,
        "email": string,
        "email_verified_at": null,
        "firstname": string,
        "lastname": string,
        "role": number,
        "created_at": Date,
        "updated_at": Date
    }
}

@Injectable()
export class AuthService {
    //über dependency injection instanz von client geholt
    private user : User;
    private repeat : boolean;

    private api = 'http://bookstore19.s1610456009.student.kwmhgb.at/api/auth';


    constructor(private http: HttpClient) {
    }

    //wir schicken in payload als json mit
    //postrequest bei dem er das an rest service schickt, da sollten wir dann token zurückbekommen
    login(email: string, password: string) {
        return this.http.post(`${this.api}/login`, {
            'email': email,
            'password': password
        });
    }

    //setzt vorraus wir sind eingeloggt
    public setCurrentUserId() {
        //aktuell eingeloggten Benutzer holen
        //Benutzer in local storage speichern
        this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res => {
            this.user = res;
            localStorage.setItem('userId', res.result.id.toString());
            localStorage.setItem('role', res.result.role.toString());
            //console.log("give user in authservice");
            //console.log(res.result.id.toString());
        });
    }

    //userid aus localstorage holen

    public getCurrentUserId(){
        return parseInt(localStorage.getItem("userId"));
    }

    public getCurrentUser(){
        return parseInt(localStorage.getItem("role"));

    }

    //Token in localStorage speichern
    public setLocalStorage(token: string) {
        const decodedToken = decode(token);
        localStorage.setItem('token', token);
        this.setCurrentUserId();
    }

    //abmelden in Frontend
    //zerstört aktuellen Webtoken
    logout() {
        this.http.post(`${this.api}/logout`, {});
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("tax");
    }

    //Helfermethode die schaut ob es token gibt
    public isLoggedIn() {
        if (!isNullOrUndefined(localStorage.getItem("token"))) {
            let token: string = localStorage.getItem("token");
            const decodedToken = decode(token);
            let expirationDate: Date = new Date(0);
            expirationDate.setUTCSeconds(decodedToken.exp);
            if (expirationDate < new Date()) {
                console.log("token expired");
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("role");
                localStorage.removeItem("tax");
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

    //controlling the BE and FE View
    public isBackendUser(){
        if (this.getCurrentUser() == 1){
            return true;
        }
        else {
            return false;
        }

    }

    //gegenteil

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    private errorHandler ( error:Error | any) : Observable<any> {
        return throwError(error);
    }
}