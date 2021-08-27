export interface Payment {
  id: string;
  payRefNo: string;
  payStatus: string;
  questionId: string;
  fee: number;
  paidBy: string;
  paidTime: Date;
  paidCurrency: string;
  tutorId: string;
}
