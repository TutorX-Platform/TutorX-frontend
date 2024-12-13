import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as constants from "../models/constants";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private http: HttpClient) {
  }
  validateCors() {
    return this.http.get(constants.backend_url.concat(constants.backend_api_resource.validate), {});
  }
}
