import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  public root: any;

  constructor(private http: HttpClient) {
    this.root = environment.API_BASE_URL
  }

  updateUser(bulkquery:any){
    return this.http.post(this.root+'/updateuser',bulkquery)
  }

  deleteUser(rowId:any){
    console.log(rowId)
    return this.http.post(this.root+'/deleteuser',rowId)
  }

  getuserList(){
    return this.http.get(this.root+'/getuserlist')
  }

  addUser(bulkquery:any){
   return this.http.post(this.root+'/adduser', bulkquery)
  }

   checkEmail(mail:any){
    return this.http.post(this.root+'/checkemail',mail)
   }
   
   loginUser(data:any){
    return this.http.post(this.root+'/login', data);
   }

   signupUser(bulkquery:any){
    console.log(bulkquery)
    return this.http.post(this.root+'/signupuser',bulkquery)
  }

}
