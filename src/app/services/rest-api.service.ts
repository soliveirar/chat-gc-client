import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestMessage } from '../shared/model/requestMessage';
import { ResponseMessage } from '../shared/model/responseMessage';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private apiURL = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {}
  
  sendMessage(request: RequestMessage): Observable<ResponseMessage> {
   /* const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your-token-goes-here'
    });*/
    //return this.http.post<ResponseMessage>(this.apiURL, request, {headers});
    return this.http.post<ResponseMessage>(this.apiURL, request);
  }
}
