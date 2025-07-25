import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestMessage } from '../shared/model/requestMessage';
import { ResponseMessage } from '../shared/model/responseMessage';
import { DocumentResponse } from '../shared/model/documentResponse';
import { Metadata } from '../shared/model/metadata';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private urlChat = 'http://localhost:8080/api/chat';
  private urlDocs = 'http://localhost:8080/api/data'

  constructor(private http: HttpClient) {}
  
  sendMessage(request: RequestMessage): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(this.urlChat, request);
  }

  uplodadDocument(formData : FormData) : Observable<DocumentResponse> {
    console.log(formData);

    return this.http.post<DocumentResponse>(this.urlDocs, formData);
  }
}
