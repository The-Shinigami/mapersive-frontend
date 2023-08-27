import { Injectable } from '@angular/core';
import axios from 'axios';
import Insurance from '../shared/model/insurance';
import ResponseHandler from '../shared/model/response';

const URL_BASE = "http://localhost:8080/api/"
@Injectable({
  providedIn: 'root'
})

export class InsuranceService {
  api = axios.create({ baseURL: URL_BASE })
  insurances:Insurance[] = []
  totalElements:number = 0
  constructor() { }
  async getAll(page = '0',size ='5',sort={column:'id',direction:'asc'}):Promise<[Insurance[],number]> {

  await this.api.get("insurance?page="+page+"&size="+size+"&sort="+sort.column+","+sort.direction,{})
      .then(
        (response) => {
          this.insurances = response.data.content;
          this.totalElements = response.data.totalElements
      }
    )

    return [this.insurances,this.totalElements];

  }

  async remove(row:Insurance){
  let res :ResponseHandler = {status:'',payload:''};

    await this.api.delete("insurance/"+row.insuranceId.toString()).then(
      (response) => {
        res = response.data
    }
    )
    return res;
  }

  async saveInsert(row:Insurance){
    let res :ResponseHandler = {status:'',payload:''};
       await this.api.post("insurance",row).then(
         (response) => {
          res = response.data
       }
       )
       return res;
     }

     async saveUpdate(row:Insurance){
      let res :ResponseHandler = {status:'',payload:''};
      await this.api.put("insurance",row).then(
        (response) => {
          res = response.data
      }
      )
      return res;
    }
  
}
