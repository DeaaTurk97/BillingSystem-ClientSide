import { Injectable } from '@angular/core';
import { ReportFilterModel } from '@app/infrastructure/models/project/reportFilterModel';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { CallDetailsModel } from '@app/infrastructure/models/project/callDetailsModel';
import { HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ExportReportService {
    constructor(private apiService: ApiService) {}

    exportCallDetails(reportFilterModel: ReportFilterModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Report/CallDetailsReport`,
            reportFilterModel,
        );
    }

    exportCallSummary(reportFilterModel: ReportFilterModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Report/CallSummaryReport`,
            reportFilterModel,
        );
    }

    exportCallFinance(reportFilterModel: ReportFilterModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Report/CallFinanceReport`,
            reportFilterModel,
        );
    }
}
