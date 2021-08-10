import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class ComingBillsService {
    constructor(private apiService: ApiService) {}

    getComingBills(
        pageIndex: number,
        pageSize: number,
        statusNumber: number,
    ): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/ComingBills/GetComingBills` +
                '?pageIndex=' +
                pageIndex +
                '&pageSize=' +
                pageSize +
                '&statusBill=' +
                statusNumber,
        );
    }

    approveBills(billsIds: number[]): Observable<any> {
        return this.apiService.put(
            `${environment.apiRoute}/ComingBills/ApproveBills`,
            billsIds,
        );
    }

    inprogressBills(billsIds: number[]): Observable<any> {
        return this.apiService.put(
            `${environment.apiRoute}/ComingBills/InprogressBills`,
            billsIds,
        );
    }

    rejectBills(billsIds: number[]): Observable<any> {
        return this.apiService.put(
            `${environment.apiRoute}/ComingBills/RejectBills`,
            billsIds,
        );
    }

    payBills(billsIds: number[]): Observable<any> {
        return this.apiService.put(
            `${environment.apiRoute}/ComingBills/PayBills`,
            billsIds,
        );
    }
}
