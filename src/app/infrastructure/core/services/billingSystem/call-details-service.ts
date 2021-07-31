import { Injectable } from '@angular/core';
import { ReportFilterModel } from '@app/infrastructure/models/project/reportFilterModel';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { CallDetailsModel } from '@app/infrastructure/models/project/callDetailsModel';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CallDetailsService {
    constructor(private apiService: ApiService) {}

    getCallDetails(reportFilterModel: ReportFilterModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/CallsInfo/GetCallDetails`,
            reportFilterModel,
        );
    }
    getCallSummary(reportFilterModel: ReportFilterModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/CallsInfo/GetCallSummary`,
            reportFilterModel,
        );
    }
    getCallFinance(reportFilterModel: ReportFilterModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/CallsInfo/GetCallFinance`,
            reportFilterModel,
        );
    }

    GetAllUndefinedNumbers(billId: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/BillsDetails/GetAllUndefinedNumbers` +
                '?billId=' +
                billId,
        );
    }

    updateSubmitedBill(billId: number) {
        const params = new HttpParams().set('billId', String(billId));

        return this.apiService.put(
            `${environment.apiRoute}/BillsDetails/UpdateSubmitBill`,
            null,
            { params: params },
        );
    }
}
