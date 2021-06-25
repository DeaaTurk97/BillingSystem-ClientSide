import { Injectable } from '@angular/core';
import { ServiceTypeModel } from '@app/infrastructure/models/project/serviceTypeModel';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class ServiceTypeService {
    constructor(private apiService: ApiService) {}

    getAllServicesTypes(): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/ServicesTypes/GetAllServicesTypes`,
        );
    }

    getServicesTypes(pageIndex: number, PageSize: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/ServicesTypes/GetServicesTypes` +
                '?pageIndex=' +
                pageIndex +
                '&pageSize=' +
                PageSize,
        );
    }

    getServiceTypeId(serviceTypeId: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/ServicesTypes/GetServiceTypeId` +
                '?ServiceTypeId=' +
                serviceTypeId,
        );
    }

    addServiceType(serviceTypeModel: ServiceTypeModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/ServicesTypes/AddServiceType`,
            serviceTypeModel,
        );
    }

    updateServiceType(
        serviceTypeModel: ServiceTypeModel,
    ): Observable<ServiceTypeModel> {
        return this.apiService.put(
            `${environment.apiRoute}/ServicesTypes/UpdateServiceType`,
            serviceTypeModel,
        );
    }

    deleteServiceType(id: number): Observable<any> {
        return this.apiService.delete(
            `${environment.apiRoute}/ServicesTypes/DeleteServiceType?id=` + id,
        );
    }
}
