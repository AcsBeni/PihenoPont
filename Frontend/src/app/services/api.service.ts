import { Injectable } from '@angular/core';
import { Resp } from '../interfaces/apiresponse';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  SERVER = 'http://localhost:3000'

  constructor() {
  }
  //Kiválasztás minden
  async selectAll(table: string): Promise<Resp> {
    try {
      const res = await axios.get(`${this.SERVER}/${table}`)
      return {
        status: 200,
        data: res.data

      }
    } catch (err:any) {
      return {
        status: 400,
        message: err.response.data.error,
        data: err
      }

    }
  }
  //Kiválasztás
  async select(table: string, type: number | string): Promise<Resp> {
    try {
      const res = await axios.get(`${this.SERVER}/${table}/${type}`)
      return {
        status: 200,
        data: res.data,
        message: "Sikeres kiválasztás"
      }
    } catch (err:any) {
      return {
        status: 400,
        message: err.response.data.error,
        data: err
      }
    }
  }

  //Profil bejelentkezése
  async login(table: string, data: any) {
    try {
      const res = await axios.post(
        `${this.SERVER}/${table}`,
        data, 
        { headers: { 'Content-Type': 'application/json' } })
      return {
        status: 200,
        message: 'Sikeres bejelentkezés',
        data: res.data
      }
    } catch (err:any) {
      return {
        status: 400,
        message: err.response.data.error,
        data: err
      }
    }
  }

  //Profil regisztráció
  async register(table: string, data: any) {
    try {
      const res = await axios.post(
        `${this.SERVER}/${table}`,
        data, // api kérés
        { headers: { 'Content-Type': 'application/json' } })
      return {
        status: 200,
        message: 'Sikeres regisztráció',
        data: res.data
      }
    } catch (err:any) {
      return {
        status: 400,
        message: err.response.data.error,
        data: err
      }
    }
  }

  // Profil frissítése
  async profileupdate(table: string, id: number, data: any) {
    try {
      const res = await axios.patch(
        `${this.SERVER}/${table}/${id}`,
        data, // api kérés
        { headers: { 'Content-Type': 'application/json' } })
      return {
        status: 200,
        data: res.data,
        message: 'Sikeres profil frissítés!',
      }
    } catch (err:any) {
      return {
        status: 400,
        data: err,
        message: err.response.data.error
      }
    }
  }
  //Email küldése
  async sendEmail(data:any){
    try{
      const response = await axios.post(`${this.SERVER}/email`, data)
      return {
        status: 200,
        message: response.data.message, 
        data: response.data
      };
    }
    catch(err:any){
      console.log(err)
      return{
        status: 500,
        message: err.response.data.error
      };
    }
  }
  //Update
  async update(table: string, id: number, data: any) {
    try {
      const res = await axios.patch(
        `${this.SERVER}/${table}/${id}`,
        data, // api kérés
        { headers: { 'Content-Type': 'application/json' } })
      return {
        status: 200,
        data: res.data,
        message: "Sikeres frissítés",
      }
    } catch (err:any) {
      return {
        status: 400,
        data: err,
        message: err.response.data.error
      }
    }
  }
    async delete(table:string, id:number){
    try{
      const response = await axios.delete(`${this.SERVER}/${table}/${id}`)
      return {
        status: 200,
        message: "Sikeres törlés a táblából"
      };
     
    }
    catch(err:any){
      
      return{
        status: 500,
        message: err.response.data.error
      };
    }
  }
}
