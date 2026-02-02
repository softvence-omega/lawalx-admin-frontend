import { ApiResponse } from "./ApiTypes/ApiResponse";

export interface TicketClient {
  id: string;
  userId: string;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderRole: string;
  message: string;
  file: string | null;
  type: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SupportTicket {
  id: string;
  clientId: string;
  companyName: string | null;
  issueType: string;
  priority: string;
  status: string;
  adminNote: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  client: TicketClient;
  assignments: {
    id: string;
    name: string;
    avatar: string;
  };
  messages: TicketMessage[];
}

export interface GetAllSupportTicketsResponse extends ApiResponse<
  SupportTicket[]
> {
  statusCode: number;
}
