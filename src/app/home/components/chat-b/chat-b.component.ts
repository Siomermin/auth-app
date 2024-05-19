import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

interface message {
  sender: string;
  email: string;
  text: string;
  date: string;
}

@Component({
  selector: 'app-chat-b',
  templateUrl: './chat-b.component.html',
  styleUrls: ['./chat-b.component.scss'],
})
export class ChatBComponent implements OnInit {
  private authService = inject(AuthService);
  private firestore = inject(FirestoreService);

  loggedUser: any;

  newMessage: message = {
    sender: '',
    email: '',
    text: '',
    date: '',
  };

  showChat: boolean = false;
  message: string = '';
  messageList: message[] = [];

  constructor() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser')!);
  }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser')!);
    this.getMessages();
  }

  sendMessage() {
    if (this.message == '') return;

    let date = new Date();
    const timestamp = new Date(date);

    const username = this.loggedUser.email.split('@')[0]; // Splitting the email at '@' and taking the first part

    let message = {
      sender: this.loggedUser.uid,
      email: username,
      text: this.message,
      date: timestamp,
    };

    this.firestore.save(message, 'chatb');

    setTimeout(() => {
      this.messageList = [];
      this.getMessages();
    }, 10);

    this.message = '';

    setTimeout(() => {
      this.scrollToTheLastElement();
    }, 10);
  }

  async getMessages() {
    const observable = this.firestore.get('chatb');

    observable.subscribe((res) => {
      const updatedMessageList: message[] = [];

      res.forEach((msg) => {
        const timestamp = msg['date']; // Assuming 'date' is a Firestore Timestamp

        // Convert Firestore Timestamp to JavaScript Date
        const date = new Date(
          timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
        );

        msg['date'] = date; // Store the date object in the 'date' field for sorting
        updatedMessageList.push(<message>msg);
      });

      // Sort the messages by date in ascending order (oldest first)
      updatedMessageList.sort((a, b) => {
        const dateA: any = a['date'];
        const dateB: any = b['date'];

        return dateA.getTime() - dateB.getTime(); // Compare by milliseconds (including seconds)
      });

      // Now that the messages are sorted, format the date and time
      updatedMessageList.forEach((msg) => {
        const date: any = msg['date'];

        // Format the date as desired
        const formattedDate = `${date.getDate()}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')} ${date
          .getHours()
          .toString()
          .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

        msg['date'] = formattedDate;
      });

      this.messageList = updatedMessageList; // Update the messageList with the sorted and formatted messages

      // Scroll to the bottom after messages are loaded
      setTimeout(() => {
        this.scrollToTheLastElement();
      }, 10);
    });
  }

  scrollToTheLastElement() {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }
}
