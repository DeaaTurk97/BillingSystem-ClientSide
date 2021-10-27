import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { MessageSnackbarComponent } from '@shared/components/message-snackbar/message-snackbar.component';
import { Message } from '@app/infrastructure/models/message';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from '@env/environment';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api/api.service';
import { SystemNotification } from '@app/infrastructure/shared/Services/CommonMemmber';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    public hubConnection: HubConnection;
    dataChange = new BehaviorSubject<Message>(null);
    notificationSubject = new BehaviorSubject<SystemNotification[]>([]);

    constructor(
        private snackBar: MatSnackBar,
        private zone: NgZone,
        private apiService: ApiService,
        private translate: TranslateService,
    ) {
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }

    public showSuccess(message: string[]): void {
        const configSuccess: MatSnackBarConfig<MessageSnackbarComponent> = {
            panelClass: 'success',
            verticalPosition: 'bottom',
            duration: 3000,
        };
        this.openSnackbar(message, configSuccess);
    }

    showTranslateMessage(
        messageKey: string,
        isErrorMessage: boolean = true,
    ): void {
        void this.translate
            .get(messageKey)
            .toPromise()
            .then((message: string) =>
                isErrorMessage
                    ? this.showError([message])
                    : this.showSuccess([message]),
            );
    }

    public showError(message: string[]): void {
        const configError: MatSnackBarConfig<MessageSnackbarComponent> = {
            panelClass: 'error',
            verticalPosition: 'top',
            duration: 10000,
        };
        this.openSnackbar(message, configError);
    }

    public openSnackbar(
        message: string[],
        config: MatSnackBarConfig<MessageSnackbarComponent>,
    ): void {
        // Wrap snackbar call in zone invocation to fix rendering inconsistencies
        this.zone.run(() => {
            this.snackBar.openFromComponent(MessageSnackbarComponent, {
                data: message,
                ...config,
            });
        });
    }

    public getConversation(recipientId: number) {
        return this.apiService.get(
            `${environment.apiRoute}/Chat/GetAllChattingMassage?recipientId=` +
                recipientId,
        );
    }

    public sendMessage(messageModel: Message) {
        return this.apiService.post(
            `${environment.apiRoute}/Chat/AddNewMessage`,
            messageModel,
        );
    }

    public createConnection(): void {
        const authToken = sessionStorage.getItem('authToken');
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(environment.hubRoute + '/chathub', {
                accessTokenFactory: () => authToken,
            })
            .build();
    }

    public startConnection(): void {
        this.hubConnection
            .start()
            .then(() => {
                console.log('Hub connection started');
            })
            .catch((err) => {
                console.log(
                    'Error while establishing connection, retrying...' +
                        JSON.stringify(err),
                );
                setTimeout(() => {
                    this.startConnection();
                }, 5000);
            });
    }

    public registerOnServerEvents(): void {
        // this.hubConnection.on('SendNewMessageRefresh', (data: Message) => {
        //     this.dataChange.next(data);
        // });

        // this.hubConnection.on('UnreadChattingMessages', () => {
        //     this.loadUnreadNotification().subscribe();
        // });

        this.hubConnection.on('ApprovalsCycleNumbersAndBills', () => {
            this.loadUnreadNotification().subscribe();
        });
    }

    public loadAllNotifications(): Observable<
        [SystemNotification[], SystemNotification[]]
    > {
        return combineLatest([
            this.loadAddingNewNumbersAndBillsByRoleId(),
            this.loadUnreadNotification(),
        ]).pipe(
            tap(
                ([NumbersAndBills, ApprovalsCycleNumbersAndBills]: [
                    SystemNotification[],
                    SystemNotification[],
                ]) => {
                    this.notificationSubject.next(
                        [
                            ...NumbersAndBills,
                            ...ApprovalsCycleNumbersAndBills,
                        ].reverse(),
                    );
                },
            ),
        );
    }

    // public invokeNewMessage(data: Message, receivedId: number): Promise<any> {
    //     return Promise.all([
    //         //this (SendNewMessageRefresh) invoke from sever,same function name in ChatHub class.
    //         this.hubConnection.invoke('SendNewMessageRefresh', data),
    //         this.hubConnection.invoke('UnreadchattingMessages', receivedId),
    //     ]);
    // }

    public invokeApprovalsCycleNumbersAndBills(usersId: Array<string>): any {
        if (!this.hubConnection.state) {
            this.hubConnection.start().then(() => {
                return this.hubConnection.invoke(
                    'ApprovalsCycleNumbersAndBills',
                    usersId,
                );
            });
        } else {
            return this.hubConnection.invoke(
                'ApprovalsCycleNumbersAndBills',
                usersId,
            );
        }
    }

    public loadUnreadNotification(): Observable<SystemNotification[]> {
        return this.apiService
            .get(`${environment.apiRoute}/Notification/GetUnreadNotification`)
            .pipe(
                tap((data: SystemNotification[]) => {
                    this.notificationSubject.next(data.reverse());
                }),
            );
    }

    public loadAddingNewNumbersAndBillsByRoleId(): Observable<
        SystemNotification[]
    > {
        return this.apiService
            .get(
                `${environment.apiRoute}/Notification/GetNewNumbersAndBillsByRoleId`,
            )
            .pipe(
                tap((data: SystemNotification[]) => {
                    this.notificationSubject.next(data.reverse());
                }),
            );
    }

    UpdateReadNewNumbersAndBills(notificationInfo: any): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Notification/UpdateReadNewNumbersAndBills`,
            notificationInfo,
        );
    }

    updateReadNewNotification(
        notificationInfo: Partial<SystemNotification>,
    ): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Notification/UpdateReadNewNotification`,
            notificationInfo,
        );
    }
}
