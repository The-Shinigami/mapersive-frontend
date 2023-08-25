import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

const URL_BASE = "http://localhost:9090/api/"

export class InsuranceService {
  api = axios.create({ baseURL: URL_BASE + "insurance" })
  insurances
  constructor() { }
  async getAll() {

  await this.api.get("",{})
      .then(
        (response) => {
          this.clients = response.data;
      }
    )

  }
  getClients() {
    return this.clients;
  }
}
