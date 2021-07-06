import {NameCodePair} from "./name-code-pair";

export interface Tutor {
  userId: string;
  uniqueKey: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  subjects: NameCodePair[];
  engagedJobs: string[];
  rating: number;
  totalEarnings: number;
}
