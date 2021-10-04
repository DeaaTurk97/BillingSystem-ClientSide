import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class AllocatedServicesService {
    constructor(private apiService: ApiService) {}

    getAllocatedServices(userId: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/AllocatedServices/GetAllAllocatedServices` +
                '?userId=' +
                userId,
        );
    }
}
