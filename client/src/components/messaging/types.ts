export type MessageType =
  | 'text'
  | 'image'
  | 'room_card'
  | 'expense_card'
  | 'agreement_card'
  | 'system_event';

export interface RoomCardPayload {
  roomId: string;
  title: string;
  price: string;
  neighborhood: string;
  city: string;
  imageUrl: string;
  deposit?: string;
}

export interface ExpenseCardPayload {
  expenseId: string;
  title: string;
  totalAmount: number;
  yourShare: number;
  paidBy: string;
  category: 'utilities' | 'groceries' | 'wifi' | 'cleaning' | 'other';
  status: 'pending' | 'settled';
}

export interface AgreementCardPayload {
  agreementId?: string;
  ruleTitle: string;
  ruleDescription: string;
  category: 'quiet_hours' | 'cleaning' | 'guests' | 'expenses';
  version?: string;
}

export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  body?: string;
  type?: MessageType;
  roomPayload?: RoomCardPayload;
  expensePayload?: ExpenseCardPayload;
  agreementPayload?: AgreementCardPayload;
  imageUrl?: string;
  replyTo?: {
    id: string;
    senderName: string;
    text: string;
  };
  reactions?: MessageReaction[];
  createdAt: string;
  rawTimestamp?: number;
  deliveryStatus?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  isMe: boolean;
}

export interface ConversationParticipant {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  isOnline: boolean;
  compatibilityScore: number;
  tags: string[];
  city?: string;
}

export interface ConversationItem {
  id: string;
  participant: ConversationParticipant;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
  isPinned?: boolean;
  isMuted?: boolean;
  roomContext?: {
    title: string;
    price: string;
    imageUrl: string;
  };
}
