export interface ChatMsg {
  senderId: string;
  senderEmail: string;
  message: string;
  time: number;
  sentBy: string;
  isAttachment: boolean;
}
