import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class BillsSummaryService {
    constructor(private apiService: ApiService) {}

    getbillSummary(pageIndex: number, PageSize: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/BillsSummary/GetBillsSummary` +
                '?pageIndex=' +
                pageIndex +
                '&pageSize=' +
                PageSize,
        );
    }

    updatePaybill(billId: number): Observable<any> {
        const params = new HttpParams()
            .set('billId', String(billId))
            .set('isPaid', 'true');

        return this.apiService.put(
            `${environment.apiRoute}/BillsSummary/UpdatePayBill`,
            null,
            { params: params },
        );
    }
}
