import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ConfigurationService } from '../configuration/configuration.service';
import { Color } from 'src/app/models/color';
import { Material } from 'src/app/models/material';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  product: Product = new Product();
  constructor(private http: HttpClient, private config: ConfigurationService) { }

  getProduct(product_id: string): Observable<Product> {
    return this.http.get<Product>(this.config.getApiHost() + `/products/${product_id}`);
  }

  // input a list of image ids
  // output a list of paths to those images
  getProductImageUrls(image_ids: string[]): string[] {
    let imagePaths: string[] = [];
    for(let i = 0; i < image_ids.length; i++){
      imagePaths.push(`${this.config.getApiHost()}/imagefile/${image_ids[i]}`);
    }
    return imagePaths;
  }

  // input: color_id
  // output, color resource stream
  getColor(color_id: string): Observable<Color> {
    return this.http.get<Product>(this.config.getApiHost() + `/colors/${color_id}`);
  }

  // input: material_id
  // output, color resource stream
  getMaterial(material_id: string): Observable<Material> {
    return this.http.get<Product>(this.config.getApiHost() + `/materials/${material_id}`);
  }
}
