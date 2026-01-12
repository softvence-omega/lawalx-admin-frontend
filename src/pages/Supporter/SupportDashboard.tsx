/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Loader2 } from "lucide-react";
import {
  useGetMyTicketsQuery,
  useLazyGetTicketMessagesByIdQuery,
} from "@/store/Api/SupportersApi/SupportersApi";
import { useAppSelector } from "@/hooks/useRedux";

// Sub-components
import TicketList from "./Components/TicketList";
import ChatHeader from "./Components/ChatHeader";
import MessageList from "./Components/MessageList";
import MessageInput from "./Components/MessageInput";
import { Ticket, Message } from "./Components/types";

// --- CONFIGURATION ---
const SOCKET_URL = "https://gfwndvfv-8080.inc1.devtunnels.ms";

const SupportDashboard = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const selectedTicketRef = useRef<Ticket | null>(null);
  
  // Keep ref in sync
  useEffect(() => {
    selectedTicketRef.current = selectedTicket;
  }, [selectedTicket]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useGetMyTicketsQuery({});
  const [
    getTicketMessages,
    { data: messagesData, isFetching: isFetchingMessages },
  ] = useLazyGetTicketMessagesByIdQuery();

  const tickets = data?.data;
  const accessToken = useAppSelector((state) => state.auth.user?.accessToken);

  // Initialize Socket
  useEffect(() => {
    if (!accessToken || !SOCKET_URL) return;

    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
      auth: { token: `${accessToken}` },
      timeout: 20000,
      reconnection: true,
      reconnectionAttempts: 5,
    });

    newSocket.on("connect", () => {
      console.log("🔌 Connected to socket ID:", newSocket.id);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [accessToken]);

  // Socket Listeners
  useEffect(() => {
    if (!socket) return;

    const onNewMessage = (msg: any) => {
      // Use String() to handle potential number/string ID mismatches
      if (String(msg.ticketId) !== String(selectedTicket?.id)) {
        return;
      }

      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [
          ...prev,
          {
            id: msg.id,
            ticketId: msg.ticketId,
            text: msg.message || "",
            fileUrl: msg.file,
            sender: msg.senderRole === "CLIENT" ? "CLIENT" : "SUPPORTER",
            timestamp: msg.createdAt,
            senderName: msg.sender?.name,
          },
        ];
      });
    };

    const onTyping = (data: { isTyping: boolean; ticketId: string }) => {
      if (String(data.ticketId) === String(selectedTicket?.id)) {
        setIsTyping(data.isTyping);
      }
    };

    socket.on("new_chat_message", onNewMessage);
    socket.on("display_typing", onTyping);

    return () => {
      socket.off("new_chat_message", onNewMessage);
      socket.off("display_typing", onTyping);
    };
  }, [socket, selectedTicket?.id]);

  // Handle Ticket Selection
  const handleSelectTicket = async (ticket: Ticket) => {
    setSelectedTicket(ticket);
    if (ticket && socket) {
      setIsChatLoading(true);
      setMessages([]);
      console.log("📤 Emitting joinTicket for ID:", ticket.id);
      socket.emit("joinTicket", { ticketId: ticket.id }, (response: any) => {
        console.log("📩 Received joinTicket response:", response);
      });
      await getTicketMessages(ticket.id);
      setIsChatLoading(false);
    }
  };

  // Sync REST Messages
  useEffect(() => {
    if (!messagesData || !selectedTicket) return;
    const normalizedMessages = messagesData.data.messages
      .filter((msg: any) => msg.ticketId === selectedTicket.id)
      .map((msg: any) => ({
        id: msg.id,
        ticketId: msg.ticketId,
        text: msg.message,
        fileUrl: msg.file,
        sender:
          msg.senderRole === "supporter"
            ? "SUPPORTER"
            : msg.senderRole === "client"
              ? "CLIENT"
              : msg.senderRole,
        timestamp: msg.createdAt,
        senderName: msg.sender?.name,
      }));
    setMessages(normalizedMessages);
  }, [messagesData, selectedTicket]);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handlers
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputValue.trim() && !selectedFile) || !socket || !selectedTicket)
      return;

    let fileUrl = "";
    if (selectedFile) {
      fileUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(selectedFile);
      });
    }

    const messagePayload: any = {
      ticketId: selectedTicket.id,
      message: inputValue || null,
      fileUrl: fileUrl || null,
    };

    socket.emit("sendMessage", messagePayload);

    setInputValue("");
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setFilePreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setFilePreview("file");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (socket && selectedTicket) {
      socket.emit("typing", {
        ticketId: selectedTicket.id,
        isTyping: e.target.value.length > 0,
      });
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (isLoading)
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  return (
    <div className="flex h-screen overflow-hidden border border-gray-200 rounded-xl">
      <TicketList
        tickets={tickets}
        selectedTicket={selectedTicket}
        onSelectTicket={handleSelectTicket}
      />

      <div
        className={`lg:w-[450px] border-l border-gray-200 bg-white flex flex-col transition-all ${
          selectedTicket ? "w-full lg:w-[450px]" : "hidden"
        }`}
      >
        {selectedTicket && (
          <>
            <ChatHeader
              onBack={() => setSelectedTicket(null)}
              onClose={() => setSelectedTicket(null)}
            />

            <MessageList
              messages={messages}
              isChatLoading={isChatLoading}
              isFetchingMessages={isFetchingMessages}
              isTyping={isTyping}
              chatEndRef={chatEndRef}
            />

            <MessageInput
              inputValue={inputValue}
              onInputChange={handleInputChange}
              onSendMessage={handleSendMessage}
              filePreview={filePreview}
              selectedFile={selectedFile}
              onRemoveFile={removeFile}
              onFileClick={() => fileInputRef.current?.click()}
              fileInputRef={fileInputRef}
              onFileChange={handleFileChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SupportDashboard;
