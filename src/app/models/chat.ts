import {ChatMsg} from "./chat-msg";

export interface Chat {
  attachments: string[];
  studentEmail: string;
  createdDate: Date;
  id: string;
  uniqueId: string;
  studentId: string;
  tutorId: string;
  tutorJoinedTime: Date;
  messagesId: string;
  chatStatus: string;
  studentChatLink: string;
  tutorChatLink: string;
  tutorsCount: number;
}
