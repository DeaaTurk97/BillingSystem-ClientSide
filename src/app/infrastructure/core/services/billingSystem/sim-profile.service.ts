import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class SimProfileService {
    constructor(private apiService: ApiService) {}

    getAllSimProfiles(): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/SimProfiles/GetAllSimProfiles`,
        );
    }
}
