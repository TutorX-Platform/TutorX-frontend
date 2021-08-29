export interface Refund {
  id: string;
  studentId: string;
  studentName:string;
  tutorName:string;
  tutorId: string;
  title: string;
  message: string;
  questionId: string;
  refundAmount: number;
  isApproved:false;
  isRefunded:false;
}
