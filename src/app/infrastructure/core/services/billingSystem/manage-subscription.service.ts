import { Injectable } from '@angular/core';
import { HistoryModel } from '@app/infrastructure/models/project/historyModel';
import { UserModel } from '@app/infrastructure/models/project/UserModel';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class ManageSubscriptionService {
    constructor(private apiService: ApiService) {}

    getUserByPhoneNumber(phoneNumber: string): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/User/GetUsersByPhoneNumber/${phoneNumber}`,
        );
    }

    getHistoriesByPhoneNumber(phoneNumber: string): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/History/GetHistoriesByPhoneNumber/${phoneNumber}`,
        );
    }

    updateUserName(usersForm: UserModel): Observable<any> {
        return this.apiService.put(
            `${environment.apiRoute}/User/UpdateUserName`,
            usersForm,
        );
    }

    addHistroy(historyForm: HistoryModel) {
        return this.apiService.post(
            `${environment.apiRoute}/History/AddHistory`,
            historyForm,
        );
    }
}
