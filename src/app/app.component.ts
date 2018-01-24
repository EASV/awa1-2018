import { Component } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {MessageService} from './message/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Morse App';
  messages: any[];
  latest: any;
  message = '';
  humanReadableMessage = '';
  reverseMorseAlphabet = this.getReverseMorseAlphabet();
  time: number;
  constructor(private messageService: MessageService) {
    messageService.getMessages().subscribe(messages => {
      this.messages = messages;
      this.latest = messages.sort(function(a: any, b: any) {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
      })[0];
    });
  }

  send() {
    const time = new Date();
    this.messageService.addMessage(time, this.message ).then(done => {
      console.log(done);
    });
    this.clear();
  }

  morse(active) {
    if (active) {
      this.time = (new Date()).getTime();
    } else {
      const clickTime = (new Date()).getTime() - this.time;
      if (clickTime > 120) {
        this.message += '-';
      } else {
        this.message += '.';
      }
      this.time = -1;
    }
  }

  space() {
    this.message += '/';
    this.humanReadableMessage = this.convertToText(this.message);
  }

  next() {
    this.message += ' ';
    this.humanReadableMessage = this.convertToText(this.message);
  }

  clear() {
    this.message = '';
    this.humanReadableMessage = '';
  }

  convertToText(morse: string): string {
    let text = '';
    const words = morse.toString().split('/');
    for (const word of words) {
      const chars = word.split(' ');
      for (const char of chars) {
        const letter = this.reverseMorseAlphabet[char.toUpperCase()];
        if (letter !== undefined) {
          text += letter;
        } else {
          text += char;
        }
      }
      text += ' ';
    }

    return text;
  }

  getReverseMorseAlphabet() {
    return {
      '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
      '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
      '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
      '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
      '-.--': 'Y', '--..': 'Z', '/': ' ',

      '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
      '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9'
    };
  }
}
