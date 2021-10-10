import {NameCodePair} from "./name-code-pair";

export interface Tutor {
  userId: string;
  uniqueKey: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  phoneNumber: string;
  street: string;
  city: string;
  country: string;
  subCategory: string[];
  subjects: NameCodePair[];
  engagedJobs: string[];
  rating: number;
  totalEarnings: number;
  tasksCompleted: number;
  description: number;
  visibleName: string;
  postalCode: string;
  accNo: string;
  bankName: string;
  branchName: string;
  totalRequests: number;
  inprogressCount: number;


}
