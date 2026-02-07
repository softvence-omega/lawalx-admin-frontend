export interface SupporterUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Supporter {
  id: string;
  userId: string;
  supporterRole: string;
  skills: string[];
  workload: null | number;
  workItems: any[];
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt: null | string;
  user: SupporterUser;
}

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
