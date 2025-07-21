import { Component, ElementRef, ViewChild } from '@angular/core';
import { RestApiService } from '../services/rest-api.service';
import { Message } from '../shared/model/message';
import { RequestMessage } from '../shared/model/requestMessage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule, FormsModule
  ],
  providers: [DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  
  constructor(private api: RestApiService, private datePipe: DatePipe) { }

  @ViewChild('scrollbar') private myScrollContainer !: ElementRef;

  //Messages
  messages: Message[] = [];
  messageText : string = '';

  //User id
  userId !: string;


  ngOnInit(): void {
   
  }

   ngAfterViewChecked() {  
   this.scrollToBottom();
  }

  sendMessage():void{
    let request : RequestMessage = {
      userId : "bM5A7UIez1RCbLtkYhwU",
      message : this.messageText,
      time: this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss') || ''
    };
    console.log(request);

    this.api.sendMessage(request).subscribe(response => {
      console.log(response);
      this.messages.push({
        content : response.response,
        from: 'assistant',
        date: response.time
      });
      console.log(this.messages);
      console.log(response.documents);
     
    });

   
    this.messages.push({
      content : request.message,
      from: 'user',
      date: request.time
    });
     this.messageText = '';

  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = 
          this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

  ngOnDestroy(): void {
  }
}
