import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUploadedDocument } from '@app/infrastructure/models/uploaded-document';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class UploadBillsLebanonService {
    constructor(private apiService: ApiService) {}

    uploadCallsAndRoaming(
        filesUploaded: IUploadedDocument[],
        billType: string,
    ): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Bills/UploadCallsAndRoamingLebanon`,
            filesUploaded,
            {
                params: new HttpParams().set('billType', billType),
            },
        );
    }

    uploadDataRoaming(filesUploaded: IUploadedDocument[]): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Bills/UploadDataRoamingLebanon`,
            filesUploaded,
        );
    }

    uploadData(filesUploaded: IUploadedDocument[]): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Bills/UploadDataLebanon`,
            filesUploaded,
        );
    }

    sendNotificationsAddedBills(): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Bills/ReminderUsersAddedBills`,
        );
    }
}
