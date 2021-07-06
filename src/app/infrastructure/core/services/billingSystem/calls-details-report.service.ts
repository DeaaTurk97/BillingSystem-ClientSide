import { Injectable } from '@angular/core';
import { ReportFilterModel } from '@app/infrastructure/models/project/reportFilterModel';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CallsDetailsReportService {
    constructor(private apiService: ApiService) {}
    headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    options = { headers: this.headers };
    // getAllPhonesBook(): Observable<any> {
    //     return this.apiService.get(
    //         `${environment.apiRoute}/PhonesBook/getAllPhonesBook`,
    //     );
    // }

    getReport(reportFilterModel: ReportFilterModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Report/GetCallDetailsReport`,
            reportFilterModel,
        );
    }
}
