import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnDefinedNumberModel } from '@app/infrastructure/models/project/UnDefinedNumberModel';
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
            `${environment.apiRoute}/TypePhonesNumber/GetAllTypesWithoutFreeType`,
        );
    }

    addingNewNumbers(
        unDefinedNumber: UnDefinedNumberModel[],
        billId: number,
    ): Observable<any> {
        const params = new HttpParams().set('billId', String(billId));

        return this.apiService.post(
            `${environment.apiRoute}/BillsDetails/DefinitionNewNumbers`,
            unDefinedNumber,
            { params: params },
        );
    }
}
