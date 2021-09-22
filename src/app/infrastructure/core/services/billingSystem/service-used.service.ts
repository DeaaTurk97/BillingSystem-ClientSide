import { Injectable } from '@angular/core';
import { ServiceUsedModel } from '@app/infrastructure/models/project/serviceUsedModel';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class ServiceUsedService {
    constructor(private apiService: ApiService) {}

    getAllServicesUsed(): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/ServicesUsed/GetAllServicesUsed`,
        );
    }

    getServicesUsed(pageIndex: number, PageSize: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/ServicesUsed/GetServicesUsed` +
                '?pageIndex=' +
                pageIndex +
                '&pageSize=' +
                PageSize,
        );
    }

    getServiceUsedId(serviceUsedId: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/ServicesUsed/GetServiceUsedId` +
                '?ServiceUsedId=' +
                serviceUsedId,
        );
    }

    addServiceUsed(serviceUsedModel: ServiceUsedModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/ServicesUsed/AddServiceUsed`,
            serviceUsedModel,
        );
    }

    updateServiceUsed(
        serviceUsedModel: ServiceUsedModel,
    ): Observable<ServiceUsedModel> {
        return this.apiService.put(
            `${environment.apiRoute}/ServicesUsed/UpdateServiceUsed`,
            serviceUsedModel,
        );
    }

    deleteServiceUsed(id: number): Observable<any> {
        return this.apiService.delete(
            `${environment.apiRoute}/ServicesUsed/DeleteServiceUsed?id=` + id,
        );
    }
}
