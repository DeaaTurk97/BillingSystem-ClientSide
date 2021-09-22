import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class CommingServicesNeedApprovedService {
    constructor(private apiService: ApiService) {}

    getComingServices(
        pageIndex: number,
        pageSize: number,
        statusNumber: number,
    ): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/ComingServices/GetComingServices` +
                '?pageIndex=' +
                pageIndex +
                '&pageSize=' +
                pageSize +
                '&statusNumber=' +
                statusNumber,
        );
    }

    approveServices(phoneNumberId: number[]): Observable<any> {
        return this.apiService.put(
            `${environment.apiRoute}/ComingServices/ApproveServices`,
            phoneNumberId,
        );
    }

    inprogressServices(phoneNumbersIds: number[]): Observable<any> {
        return this.apiService.put(
            `${environment.apiRoute}/ComingServices/InprogressServices`,
            phoneNumbersIds,
        );
    }

    rejectServices(phoneNumbersIds: number[]): Observable<any> {
        return this.apiService.put(
            `${environment.apiRoute}/ComingServices/RejectServices`,
            phoneNumbersIds,
        );
    }
}
