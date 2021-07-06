export interface Questions {
  id: string;
  uniqueId: string;
  createdDate: Date;
  fee: number;
  studentId: string;
  tutorId: string;
  questionTitle: string;
  subjectCategory: string;
  dueDate: Date;
  description: Date;
  attachments: string[];
  isRefundRequested: boolean;
  chatId: string;
  status: string;
  isPaid: boolean;
  uniqueLink: string;
  questionSalt: string;
}
