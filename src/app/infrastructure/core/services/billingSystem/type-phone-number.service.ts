import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class TypePhoneNumberService {
    constructor(private apiService: ApiService) {}

    getAllTypesPhoneNumber(): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/TypePhonesNumber/GetAllTypesPhoneNumber`,
        );
    }
}