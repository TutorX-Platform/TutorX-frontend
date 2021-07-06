export interface Chat {
  id: string;
  uniqueId: string;
  studentId: string;
  tutorId:string;
  tutorJoinedTime:Date;
  sentBy:string;
  sentTime:Date;
  message:string;
  isAttachment:boolean;
  chatSaltSecret:string;
  chatStatus:string;
  chatLink:string;
}
