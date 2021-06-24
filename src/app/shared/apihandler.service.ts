import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ApihandlerService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient, public router: Router,) { }

  emailcheck(data) : Observable<any>{
    return this.http.get(this.API_URL + "manager?email="+data.email);
  }

  loginrequest(data){
    return this.http.get(this.API_URL + "manager?email="+data.email+"&password="+data.password);
  }
  postrequest(url, data) : Observable<any> { 
    return this.http.post(this.API_URL + url, data);
  }

  getrequest(url): Observable<any> {
    return this.http.get(this.API_URL + url);
  }

  deleterequest(url,id) {
    console.log("id:: ", id);
    return this.http.delete(this.API_URL+url+id)
  }
  updaterequest(url,id,updatedata) { 

    let data= {
      "id": id,
      "first_name": updatedata.first_name,
      "last_name": updatedata.last_name,
      "address": updatedata.address,
      "birth_date": updatedata.birth_date,
      "mobile": updatedata.mobile,
      "city": updatedata.city,

    }
    return this.http.put(this.API_URL+url+id,data)    
  }
}
