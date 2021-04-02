import { Injectable } from '@angular/core';
import { CountryModel } from '@app/infrastructure/models/project/CountryModel';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    constructor(private apiService: ApiService) {}

    getAllCountries(): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Countries/GetAllCountries`,
        );
    }

    getCountries(pageIndex: number, PageSize: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Countries/GetCountries` +
                '?pageIndex=' +
                pageIndex +
                '&pageSize=' +
                PageSize,
        );
    }

    getCountryId(groupId: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Countries/GetCountryId` +
                '?groupId=' +
                groupId,
        );
    }

    addCountry(countryModel: CountryModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Countries/AddCountry`,
            countryModel,
        );
    }

    updateCountry(countryModel: CountryModel): Observable<CountryModel> {
        return this.apiService.put(
            `${environment.apiRoute}/Countries/UpdateCountry`,
            countryModel,
        );
    }

    deleteCountry(id: number): Observable<any> {
        return this.apiService.delete(
            `${environment.apiRoute}/Countries/DeleteCountry?id=` + id,
        );
    }
}
