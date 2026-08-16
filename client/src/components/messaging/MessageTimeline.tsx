import React, { useRef, useEffect } from 'react';
import {
  Check,
  CheckCheck,
  Clock,
  AlertCircle,
  Home,
  Receipt,
  FileText,
  Sparkles,
  Reply,
  Copy,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChatMessage } from './types.js';
import { formatINR } from '../../utils/localization.js';

export interface MessageTimelineProps {
  messages: ChatMessage[];
  isTyping?: boolean;
  participantName: string;
  participantAvatar: string;
  onReplyMessage?: (msg: ChatMessage) => void;
  onReactMessage?: (msgId: string, emoji: string) => void;
  onSettleExpense?: (expenseId: string) => void;
  searchHighlight?: string;
}

export const MessageTimeline: React.FC<MessageTimelineProps> = ({
  messages,
  isTyping = false,
  participantName,
  participantAvatar,
  onReplyMessage,
  onReactMessage,
  onSettleExpense,
}) => {
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new message arrives
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickReactions = ['❤️', '😂', '👍', '🔥', '☕', '🙌'];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 flex flex-col bg-surface-low/30 dark:bg-surface-low transition-colors">
      {/* Date Header Separator */}
      <div className="flex justify-center my-2 sticky top-0 z-10">
        <span className="font-sans text-[10px] font-bold text-secondary uppercase tracking-widest px-3.5 py-1 bg-clay/90 dark:bg-surface-high/90 backdrop-blur-md rounded-full border border-surface-dim shadow-sm">
          Today
        </span>
      </div>

      {/* Message Sequence */}
      {messages.map((msg, index) => {
        const prevMsg = index > 0 ? messages[index - 1] : null;
        const nextMsg = index < messages.length - 1 ? messages[index + 1] : null;

        const isSameSenderAsPrev = prevMsg && prevMsg.senderId === msg.senderId;
        const isSameSenderAsNext = nextMsg && nextMsg.senderId === msg.senderId;

        const isFirstInGroup = !isSameSenderAsPrev;
        const isLastInGroup = !isSameSenderAsNext;

        // System Event Message
        if (msg.type === 'system_event') {
          return (
            <div key={msg.id || index} className="flex justify-center my-3">
              <div className="px-4 py-2 rounded-full bg-clay dark:bg-surface-container border border-surface-dim font-sans text-xs font-bold text-secondary flex items-center gap-2 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-vitality-coral" />
                <span>{msg.body}</span>
              </div>
            </div>
          );
        }

        return (
          <div
            key={msg.id || index}
            className={`flex flex-col group relative ${
              msg.isMe ? 'items-end' : 'items-start'
            } ${isSameSenderAsPrev ? 'mt-1' : 'mt-3'}`}
          >
            {/* Sender Name for first in group from flatmate */}
            {!msg.isMe && isFirstInGroup && (
              <span className="font-serif text-[11px] font-bold text-earth-indigo mb-1 ml-10">
                {msg.senderName}
              </span>
            )}

            <div className={`flex items-end gap-2 max-w-[85%] sm:max-w-[75%] md:max-w-[70%] ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar on flatmate side */}
              {!msg.isMe && (
                <div className="w-8 h-8 shrink-0 mb-0.5">
                  {isLastInGroup ? (
                    <img
                      src={msg.senderAvatar || participantAvatar}
                      alt={msg.senderName}
                      className="w-8 h-8 rounded-full object-cover border border-surface-dim"
                    />
                  ) : (
                    <div className="w-8 h-8" />
                  )}
                </div>
              )}

              {/* Message Bubble Container */}
              <div className="flex flex-col space-y-1 relative">
                {/* Replying quote preview */}
                {msg.replyTo && (
                  <div
                    className={`p-2 rounded-xl text-xs border mb-1 flex flex-col font-sans ${
                      msg.isMe
                        ? 'bg-vitality-coral/20 border-vitality-coral/40 text-earth-indigo dark:text-clay'
                        : 'bg-surface-low border-surface-dim text-secondary'
                    }`}
                  >
                    <span className="font-bold text-[10px] text-vitality-coral">
                      Replying to {msg.replyTo.senderName}
                    </span>
                    <span className="line-clamp-1 opacity-90 text-[11px]">{msg.replyTo.text}</span>
                  </div>
                )}

                {/* Bubble by Message Type */}
                {msg.type === 'room_card' && msg.roomPayload ? (
                  /* 1. ROOM CARD MESSAGE */
                  <div
                    onClick={() => navigate(`/rooms/${msg.roomPayload?.roomId || 'the-indiranagar-studio'}`)}
                    className="w-72 sm:w-80 bg-clay dark:bg-surface-high border border-surface-dim rounded-2xl overflow-hidden shadow-md hover:border-earth-indigo transition-all cursor-pointer group"
                  >
                    <div className="h-36 w-full relative bg-surface-dim overflow-hidden">
                      <img
                        src={msg.roomPayload.imageUrl}
                        alt={msg.roomPayload.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white font-sans text-[10px] font-bold flex items-center gap-1">
                        <Home className="w-3 h-3 text-vitality-coral" /> Room Details
                      </div>
                    </div>
                    <div className="p-3.5 space-y-1.5">
                      <div className="font-sans text-[10px] font-bold text-vitality-coral uppercase">
                        {msg.roomPayload.neighborhood}, {msg.roomPayload.city}
                      </div>
                      <h4 className="font-serif text-xs font-bold text-earth-indigo line-clamp-1">
                        {msg.roomPayload.title}
                      </h4>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-serif text-xs font-bold text-earth-indigo">
                          {msg.roomPayload.price}
                        </span>
                        <span className="font-sans text-[11px] font-bold text-trust-teal flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>View Space</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ) : msg.type === 'expense_card' && msg.expensePayload ? (
                  /* 2. SHARED EXPENSE CARD MESSAGE */
                  <div className="w-72 sm:w-80 bg-clay dark:bg-surface-high border border-surface-dim rounded-2xl p-4 shadow-md space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-surface-dim">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-vitality-coral/15 flex items-center justify-center text-vitality-coral">
                          <Receipt className="w-4 h-4" />
                        </div>
                        <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-vitality-coral">
                          Shared Expense
                        </span>
                      </div>
                      <span
                        className={`font-sans text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          msg.expensePayload.status === 'settled'
                            ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600'
                            : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700'
                        }`}
                      >
                        {msg.expensePayload.status === 'settled' ? '✓ Settled' : 'Pending Split'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-serif text-sm font-bold text-earth-indigo">
                        {msg.expensePayload.title}
                      </h4>
                      <div className="flex justify-between font-sans text-xs pt-1">
                        <span className="text-secondary">Total Bill:</span>
                        <span className="font-bold text-earth-indigo">
                          {formatINR(msg.expensePayload.totalAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between font-sans text-xs">
                        <span className="text-secondary">Your 50% Share:</span>
                        <span className="font-bold text-vitality-coral">
                          {formatINR(msg.expensePayload.yourShare)}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      {msg.expensePayload.status !== 'settled' ? (
                        <button
                          type="button"
                          onClick={() => onSettleExpense && onSettleExpense(msg.expensePayload!.expenseId)}
                          className="flex-1 py-2 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-sans text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm text-center"
                        >
                          Settle via UPI
                        </button>
                      ) : (
                        <div className="flex-1 py-2 bg-surface-low border border-surface-dim font-sans text-xs font-bold text-emerald-600 rounded-xl text-center">
                          Payment Cleared
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => navigate('/stay/expenses')}
                        className="px-3 py-2 bg-surface-low border border-surface-dim hover:border-earth-indigo text-earth-indigo font-sans text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Ledger &rarr;
                      </button>
                    </div>
                  </div>
                ) : msg.type === 'agreement_card' && msg.agreementPayload ? (
                  /* 3. LIVING AGREEMENT CARD MESSAGE */
                  <div className="w-72 sm:w-80 bg-clay dark:bg-surface-high border border-surface-dim rounded-2xl p-4 shadow-md space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-surface-dim">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-trust-teal" />
                        <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-trust-teal">
                          House Agreement Standard
                        </span>
                      </div>
                      <span className="font-sans text-[10px] text-secondary">
                        {msg.agreementPayload.version || 'v2.1'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-serif text-sm font-bold text-earth-indigo">
                        {msg.agreementPayload.ruleTitle}
                      </h4>
                      <p className="font-sans text-xs text-secondary leading-relaxed">
                        {msg.agreementPayload.ruleDescription}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate('/stay/agreement/builder')}
                      className="w-full py-2 bg-surface-low border border-surface-dim hover:border-earth-indigo text-earth-indigo font-sans text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1 mt-1"
                    >
                      <span>Review Full Agreement</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  /* 4. STANDARD TEXT / ATTACHMENT MESSAGE */
                  <div
                    className={`px-4 py-3 rounded-2xl font-sans text-xs leading-relaxed shadow-sm transition-all relative ${
                      msg.isMe
                        ? `bg-vitality-coral text-white ${
                            isFirstInGroup ? 'rounded-tr-2xl' : 'rounded-tr-md'
                          } ${isLastInGroup ? 'rounded-br-sm' : 'rounded-br-md'}`
                        : `bg-clay dark:bg-surface-container border border-surface-dim text-earth-indigo ${
                            isFirstInGroup ? 'rounded-tl-2xl' : 'rounded-tl-md'
                          } ${isLastInGroup ? 'rounded-bl-sm' : 'rounded-bl-md'}`
                    }`}
                  >
                    {msg.body}
                  </div>
                )}

                {/* Reactions counter pills below bubble */}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className={`flex flex-wrap gap-1 mt-1 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                    {msg.reactions.map((r, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => onReactMessage && onReactMessage(msg.id, r.emoji)}
                        className={`px-2 py-0.5 rounded-full border text-[11px] font-sans font-bold flex items-center gap-1 cursor-pointer transition-transform hover:scale-110 ${
                          r.users.includes('user-current')
                            ? 'bg-vitality-coral/20 border-vitality-coral/40 text-vitality-coral'
                            : 'bg-clay dark:bg-surface-high border-surface-dim text-secondary'
                        }`}
                      >
                        <span>{r.emoji}</span>
                        <span>{r.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Hover Quick Actions Bar */}
              <div
                className={`opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 self-center bg-clay dark:bg-surface-high border border-surface-dim p-1 rounded-xl shadow-md ${
                  msg.isMe ? 'mr-1' : 'ml-1'
                }`}
              >
                {/* Quick emoji popover */}
                <div className="flex items-center gap-0.5">
                  {quickReactions.slice(0, 3).map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => onReactMessage && onReactMessage(msg.id, emoji)}
                      className="w-6 h-6 rounded-md hover:bg-surface-low text-xs flex items-center justify-center cursor-pointer transition-transform hover:scale-125"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onReplyMessage && onReplyMessage(msg)}
                  className="w-6 h-6 rounded-md hover:bg-surface-low flex items-center justify-center text-secondary hover:text-earth-indigo cursor-pointer"
                  title="Reply"
                >
                  <Reply className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => msg.body && navigator.clipboard?.writeText(msg.body)}
                  className="w-6 h-6 rounded-md hover:bg-surface-low flex items-center justify-center text-secondary hover:text-earth-indigo cursor-pointer"
                  title="Copy"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Compact Delivery Status on sequence end */}
            {isLastInGroup && (
              <div
                className={`font-sans text-[10px] text-secondary flex items-center gap-1 mt-1 ${
                  msg.isMe ? 'mr-2 justify-end' : 'ml-11 justify-start'
                }`}
              >
                <span>{msg.createdAt}</span>
                {msg.isMe && (
                  <span className="ml-1">
                    {msg.deliveryStatus === 'sending' ? (
                      <Clock className="w-3 h-3 text-secondary animate-pulse" />
                    ) : msg.deliveryStatus === 'failed' ? (
                      <AlertCircle className="w-3 h-3 text-red-500" />
                    ) : msg.deliveryStatus === 'read' ? (
                      <CheckCheck className="w-3.5 h-3.5 text-trust-teal" />
                    ) : msg.deliveryStatus === 'delivered' ? (
                      <CheckCheck className="w-3.5 h-3.5 text-secondary" />
                    ) : (
                      <Check className="w-3 h-3 text-secondary" />
                    )}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-end gap-2.5 max-w-[70%] mt-2">
          <img
            src={participantAvatar}
            alt={participantName}
            className="w-7 h-7 rounded-full object-cover shrink-0 mb-1 border border-surface-dim"
          />
          <div className="bg-clay dark:bg-surface-container border border-surface-dim px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-2">
            <span className="font-sans text-[11px] text-secondary">{participantName} is typing</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-vitality-coral animate-bounce" />
              <div className="w-1.5 h-1.5 rounded-full bg-vitality-coral animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 rounded-full bg-vitality-coral animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};
