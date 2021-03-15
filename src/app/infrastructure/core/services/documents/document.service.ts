import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../api/api.service';
import { environment } from '@env/environment';
import { FileService } from '../file.service';
import { IUploadedDocument } from '@app/infrastructure/models/uploaded-document';

@Injectable({
    providedIn: 'root',
})
export class DocumentService {
    private url: string = `${environment.apiRoute}`;

    constructor(
        private apiService: ApiService,
        private fileService: FileService,
    ) {}

    public getUploadedDocument(documentKey: string): Observable<string> {
        const endpoint = `${this.url}/documents?filePath=${documentKey}`;

        return this.apiService.get(endpoint);
    }

    public uploadDocuments(
        fileList: FileList,
    ): Observable<IUploadedDocument[]> {
        const endpoint = `${this.url}/documents`;
        const payload = this.fileService.buildFormData(fileList);
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');

        return this.apiService.post<IUploadedDocument[], FormData>(
            endpoint,
            payload,
            { headers },
        );
    }
}
