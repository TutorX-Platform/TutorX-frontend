import {ChatMsg} from "./chat-msg";
import {Attachment} from "./Attachment";

export interface Chat {
  attachments: Attachment[];
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
