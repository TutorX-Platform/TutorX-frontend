export interface ChatMsg {
  isTutorJoinMessage:boolean;
  senderId: string;
  senderEmail: string;
  message: string;
  time: number;
  sentBy: string;
  isAttachment: boolean;
}
