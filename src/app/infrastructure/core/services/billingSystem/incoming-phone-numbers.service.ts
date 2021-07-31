import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class IncomingPhoneNumbersService {
    constructor(private apiService: ApiService) {}

    getComingNumbers(
        pageIndex: number,
        pageSize: number,
        statusNumber: number,
    ): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/ComingNumbers/GetComingNumbers` +
                '?pageIndex=' +
                pageIndex +
                '&pageSize=' +
                pageSize +
                '&statusNumber=' +
                statusNumber,
        );
    }

    approvePhoneNumbers(phoneNumberId: number[]): Observable<any> {
        return this.apiService.put(
            `${environment.apiRoute}/ComingNumbers/ApprovePhoneNumbers`,
            phoneNumberId,
        );
    }

    inprogressPhoneNumbers(phoneNumbersIds: number[]): Observable<any> {
        return this.apiService.put(
            `${environment.apiRoute}/ComingNumbers/InprogressPhoneNumbers`,
            phoneNumbersIds,
        );
    }

    rejectPhoneNumbers(phoneNumbersIds: number[]): Observable<any> {
        return this.apiService.put(
            `${environment.apiRoute}/ComingNumbers/RejectPhoneNumbers`,
            phoneNumbersIds,
        );
    }
}
