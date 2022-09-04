import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
 // @ts-ignore
 export class LogService {
  baseUrl: string = environment.apiUrl + 'log/appointment';

  constructor(private http: HttpClient) {
  }

  public logAppointment(appointment: any): Observable<any> {
    console.log(appointment)
    return this.http.post<any>(this.baseUrl, appointment);
  }

}
