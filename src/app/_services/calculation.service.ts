import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import {Calculation} from '../_models/calculation';
import axios from "axios";

@Injectable()
export class CalculationService {
 calcsLength:String;
  
 constructor(private http: HttpClient) { }
  baseUrl: string = '/api/v2/';

  getCalculations() {    
    return this.http.get(this.baseUrl+ 'calculations');
  }

  getCalculationById(id: number){
    return this.http.get<Calculation>(this.baseUrl + 'calculations' + id);
    }

  createCalculation(object:Object) {
    
    
   
    return this.http.post(this.baseUrl +'calculations',object,{headers: new HttpHeaders()
      .set('Content-Type', 'application/json'),observe: 'response' });
  }

  updateCalculation(calculation: Calculation) {
    return this.http.put(this.baseUrl +'calculations'+ calculation.id, calculation);
  }

  deleteCalculation(id: number) {
    return this.http.delete(this.baseUrl + 'calculations' + id);


}
getCalculationTypes()
{
   return this.http.get(this.baseUrl + 'calculations/types');
}
getCalculationInfos()
{
   return this.http.get(this.baseUrl + 'calculations/infos');
}

}

