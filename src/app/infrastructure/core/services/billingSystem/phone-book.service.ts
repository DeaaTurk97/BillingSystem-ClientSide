import { Injectable } from '@angular/core';
import { PhoneBookModel } from '@app/infrastructure/models/project/phoneBook';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class PhoneBookService {
    constructor(private apiService: ApiService) {}

    getAllPhonesBook(): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/PhonesBook/getAllPhonesBook`,
        );
    }

    getPhonesBook(pageIndex: number, PageSize: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/PhonesBook/GetPhonesBook` +
                '?pageIndex=' +
                pageIndex +
                '&pageSize=' +
                PageSize,
        );
    }

    getPhoneBookId(phoneBookId: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/PhonesBook/GetPhoneBookId` +
                '?phoneBookId=' +
                phoneBookId,
        );
    }

    addPhoneBook(phoneBookModel: PhoneBookModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/PhonesBook/AddPhoneBook`,
            phoneBookModel,
        );
    }

    isNumberAdded(phoneNumber: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/PhonesBook/IsNumberAdded` +
                '?phoneNumber=' +
                phoneNumber,
        );
    }

    updatePhoneBook(
        phoneBookModel: PhoneBookModel,
    ): Observable<PhoneBookModel> {
        return this.apiService.put(
            `${environment.apiRoute}/PhonesBook/UpdatePhoneBook`,
            phoneBookModel,
        );
    }

    deletePhoneBook(id: number): Observable<any> {
        return this.apiService.delete(
            `${environment.apiRoute}/PhonesBook/DeletePhoneBook?id=` + id,
        );
    }
}
