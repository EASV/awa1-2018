import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MessageService {

  constructor(private db: AngularFirestore) { }

  getMessages(): Observable<any> {
    return this.db.collection('messages').valueChanges();
  }

  addMessage(time: Date, message: any): Promise<any> {
    const messageCollection = this.db.collection<any>('messages');
    return messageCollection.add({ time: time, message: message });
  }

}
