import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USER_TOKEN = 'USER_TOKEN';

  constructor() {}

  public signUp(loginDetails): Observable < boolean > {
      this.doSignUpUser(loginDetails);
      return of(true);
  }

  public isSignedUp() {
      return !!this.getUser();
  }

  private doSignUpUser(token: string) {
      this.storeTokens(token);
  }

  private storeTokens(token: string) {
      sessionStorage.setItem(this.USER_TOKEN, token);
  }

  private getUser(): string {
      return sessionStorage.getItem(this.USER_TOKEN);
  }


}