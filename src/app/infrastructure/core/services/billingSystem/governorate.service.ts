import { Injectable } from '@angular/core';
import { GovernorateModel } from '@app/infrastructure/models/project/governorate';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class GovernorateService {
    constructor(private apiService: ApiService) {}

    getAllGovernorates(): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Governorates/GetAllGovernorates`,
        );
    }

    getGovernorates(pageIndex: number, PageSize: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Governorates/GetGovernorates` +
                '?pageIndex=' +
                pageIndex +
                '&pageSize=' +
                PageSize,
        );
    }

    getGovernorateId(groupId: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Governorates/getGovernorateId` +
                '?groupId=' +
                groupId,
        );
    }

    addGovernorate(governorateModel: GovernorateModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Governorates/AddGovernorate`,
            governorateModel,
        );
    }

    updateGovernorate(
        governorateModel: GovernorateModel,
    ): Observable<GovernorateModel> {
        return this.apiService.put(
            `${environment.apiRoute}/Governorates/UpdateGovernorate`,
            governorateModel,
        );
    }

    deleteGovernorate(id: number): Observable<any> {
        return this.apiService.delete(
            `${environment.apiRoute}/Governorates/DeleteGovernorate?id=` + id,
        );
    }
}
