import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GMH } from '../models/Gmh.model';
import { productToGmh } from '../models/productToGMH.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProducts(mygmh:GMH):Observable<productToGmh[]> {
    return this.http.post<productToGmh[]>(environment.url+'products/getProducts',mygmh);
  }
  getProduct(ptg:productToGmh):Observable<Product>{
    return this.http.post<Product>(environment.url+'products/getProduct',ptg);
  }
  saveChange(product:productToGmh):Observable<boolean>{
    return this.http.post<boolean>(environment.url+'products/saveChange',product);
  }
  addProduct( fd:FormData):Observable<boolean>{
    console.log(fd);
    
       return this.http.post<boolean>(environment.url+'products/add',fd);
  }
  delete( p:productToGmh):Observable<boolean>{
    return this.http.post<boolean>(environment.url+'products/delete',p);
}
//postImage(fd : FormData): Observable<string>{
//  return this.http.post<string>(environment.url+'products/postImg', fd );
//}

getImage(): Observable<Blob> {
  return this.http.get( environment.url+'products/getImg', { responseType: 'blob' })      
}
}
