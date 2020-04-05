import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureService {

  constructor(
    private socket: Socket
  ) { }

  public newUser = () => {
    return new Observable((observer) => {
      this.socket.on('new-user', (response: any) => {
        observer.next(response);
      });
    });
  }

  public serverError = () => {
    return new Observable((observer) => {
      this.socket.on('server-error', (response: any) => {
        observer.next(response);
      });
    });
  }
}
