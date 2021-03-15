import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ChangeDetectorRef,
    ElementRef,
    AfterViewChecked,
    ViewChild,
    Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { TokenService } from '@app/infrastructure/core/services/token.service';
import { Message } from '@app/infrastructure/models/message';

@Component({
    selector: 'app-chatting',
    templateUrl: './chatting.component.html',
    styleUrls: ['./chatting.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChattingComponent implements OnInit, AfterViewChecked {
    @Input() recipientId: number;
    messages: Message[] = [];
    frmAddNew: FormGroup;
    @ViewChild('chatBox') chatBox: ElementRef<any>;

    constructor(
        private notificationService: NotificationService,
        private cdr: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private tokenService: TokenService,
    ) {
        // just for set recipientId
        this.tokenService.getUserId().subscribe((recipientId) => {
            this.recipientId = recipientId == 1 ? 2 : 1;
        });

        this.notificationService.dataChange.subscribe((data) => {
            if (data) {
                this.messages.push(data);
                this.cdr.detectChanges();
            }
        });
    }

    ngAfterViewChecked() {
        this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    }

    ngOnInit(): void {
        this.ngInitialControlForm();
        this.loadMessages();
    }

    ngInitialControlForm() {
        this.frmAddNew = this.formBuilder.group({
            MessageText: ['', Validators.required],
            RecipientId: [this.recipientId],
        });
    }

    loadMessages() {
        this.notificationService.getConversation(this.recipientId).subscribe(
            (data: Array<Message>) => {
                this.messages = data.reverse();
                this.cdr.detectChanges();
            },
            (error) => {
                this.notificationService.showTranslateMessage(
                    'ErrorLoadingConversations',
                );
            },
        );
    }

    OnSubmit() {
        this.notificationService.sendMessage(this.frmAddNew.value).subscribe(
            (data: Message) => {
                this.messages.push(data);
                this.notificationService.invokeNewMessage(
                    data,
                    this.recipientId,
                );
                this.resetFormBuilder();
            },
            (error) => {
                this.notificationService.showTranslateMessage(
                    'ErrorSendMessage',
                );
            },
        );
    }

    resetFormBuilder() {
        this.frmAddNew.reset();
        this.frmAddNew.controls.RecipientId.setValue(this.recipientId);
    }
}
