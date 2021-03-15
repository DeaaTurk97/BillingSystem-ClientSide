import { Injectable } from '@angular/core';
import { GroupModel } from '@app/infrastructure/models/project/groupModel';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class GroupService {
    constructor(private apiService: ApiService) {}

    getGroups(pageIndex: number, PageSize: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Groups/Get` +
                '?pageIndex=' +
                pageIndex +
                '&pageSize=' +
                PageSize,
        );
    }

    addGroup(groupModel: GroupModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Groups`,
            groupModel,
        );
    }

    updateGroup(id: number, JobsForm: any): Observable<any> {
        return this.apiService.put(
            `${environment.apiRoute}/Groups` + '?id=' + id,
            JobsForm,
        );
    }

    deleteGroup(id: number): Observable<any> {
        return this.apiService.delete(
            `${environment.apiRoute}/Groups?id=` + id,
        );
    }
}
