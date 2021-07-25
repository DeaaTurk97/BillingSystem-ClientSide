import { Injectable } from '@angular/core';
import { IUploadedDocument } from '@app/infrastructure/models/uploaded-document';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class UploadBillsService {
    constructor(private apiService: ApiService) {}

    getAllBillsUploaded(): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/PhonesBook/getAllPhonesBook`,
        );
    }

    uploadMTNBills(filesUploaded: IUploadedDocument[]): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Bills/UploadMTNBills`,
            filesUploaded,
        );
    }

    uploadSyriaTelBills(filesUploaded: IUploadedDocument[]): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Bills/UploadSyriaTelBills`,
            filesUploaded,
        );
    }
}
