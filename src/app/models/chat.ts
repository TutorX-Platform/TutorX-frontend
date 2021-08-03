import {ChatMsg} from "./chat-msg";

export interface Chat {
  createdDate: Date;
  id: string;
  uniqueId: string;
  studentId: string;
  tutorId: string;
  tutorJoinedTime: Date;
  messagesId: string;
  chatStatus: string;
  chatLink: string;
  tutorsCount: number;
}
