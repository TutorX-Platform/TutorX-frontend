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
  dueDate: Date;
  description: string;
  attachments: string[];
  isRefundRequested: boolean;
  chatId: string;
  status: string;
  isPaid: boolean;
  uniqueLink: string;
  questionSalt: string;
  studentUniqueKey: string;
}
