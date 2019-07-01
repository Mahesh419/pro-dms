import { Injectable } from '@angular/core';

import { User } from '../classes/user';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() { }


  public loginUser(userInfo:User){
    
    if(userInfo.username === 'admin' && userInfo.password === '12345'){
      return true;
    }

    return false;
  }


}
