import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaToHeadLines } from '../pages/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpclient:HttpClient) { }


  getTopHeadLines(){
    // return this.httpclient.get<RespuestaToHeadLines>('https://newsapi.org/v2/everything?domains=wsj.com&apiKey=fc7d9914898440dbbd18848dcadd6851');
    return this.httpclient.get<RespuestaToHeadLines>('https://api.victorsanmartin.com/feriados/en.json');
  }




}
