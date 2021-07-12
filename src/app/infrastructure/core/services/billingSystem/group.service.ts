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

    getAllGroups(): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Groups/GetAllGroups`,
        );
    }

    getGroups(pageIndex: number, PageSize: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Groups/GetGroups` +
                '?pageIndex=' +
                pageIndex +
                '&pageSize=' +
                PageSize,
        );
    }

    getGroupId(groupId: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Groups/getGroupId` + '?groupId=' + groupId,
        );
    }

    addGroup(groupModel: GroupModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Groups/AddGroup`,
            groupModel,
        );
    }

    updateGroup(groupModel: GroupModel): Observable<GroupModel> {
        return this.apiService.put(
            `${environment.apiRoute}/Groups/UpdateGroup`,
            groupModel,
        );
    }

    deleteGroup(id: number): Observable<any> {
        return this.apiService.delete(
            `${environment.apiRoute}/Groups/DeleteGroup?id=` + id,
        );
    }

    getGroupsByUser(): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Groups/GetGroupsByUser`,
        );
    }
}
