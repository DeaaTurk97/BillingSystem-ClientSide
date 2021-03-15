export interface Message {
    id: number;
    createBy: number;
    createdDate: Date;
    UpdatedDate: Date;
    UpdatedBy: number;
    senderName?: string;
    SenderPhotoUrl?: string;
    recipientId: number;
    recipientName?: string;
    recipientPhotoUrl?: string;
    messageText: string;
    isRead?: boolean;
    createDate?: Date;
}
