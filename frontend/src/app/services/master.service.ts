import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get(environment.baseUrl + '/list').pipe(map(data => data))
  }
  insertData( data: Product ): Observable<any>{
    return this.http.post(environment.baseUrl +'/input', data).pipe(map(data => data))
  }

  updateProduct( data: Product ): Observable<any>{
    return this.http.post(environment.baseUrl +'/update', data).pipe(map(data => data))
  }

  getProductById( id: number): Observable<any>{
    return this.http.get(environment.baseUrl + '/findById/'+id)
      .pipe(map(data => data))
  }
  deleteProduct(id:any){
    return this.http.delete(environment.baseUrl+ '/delete/' + id)
  }
}
