import {Attachment} from "./Attachment";

export interface Questions {
  id: string;
  uniqueId: string;
  studentEmail: string;
  createdDate: number;
  fee: number;
  studentId: string;
  tutorId: string;
  questionTitle: string;
  subjectCategory: string;
  subCategory: string;
  dueDate: Date;
  description: string;
  attachments: Attachment[];
  isRefundRequested: boolean;
  chatId: string;
  status: string;
  isPaid: boolean;
  uniqueLink: string;
  questionSalt: string;
  studentUniqueKey: string;
  studentName: string;
  tutorName: string;
  tutorImage: string;
  sort: number;
  lastAssignedTutorName: string;
  lastAssignedTutorImage: string;
  isQuoteSend: boolean;
  isQuoteApproved: boolean;
  byLoggedUser: boolean;
}
