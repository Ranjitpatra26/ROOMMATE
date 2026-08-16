import React, { useState, useRef } from 'react';
import {
  Send,
  Plus,
  Smile,
  X,
  Home,
  Receipt,
  FileText,
} from 'lucide-react';
import { ChatMessage, RoomCardPayload, ExpenseCardPayload, AgreementCardPayload } from './types.js';

export interface MessageComposerProps {
  onSendMessage: (text: string, replyTo?: ChatMessage['replyTo']) => void;
  onSendRoomCard?: (room: RoomCardPayload) => void;
  onSendExpenseCard?: (expense: ExpenseCardPayload) => void;
  onSendAgreementCard?: (agreement: AgreementCardPayload) => void;
  onTypingStart?: () => void;
  onTypingStop?: () => void;
  replyingTo?: ChatMessage | null;
  onCancelReply?: () => void;
  disabled?: boolean;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  onSendMessage,
  onSendRoomCard,
  onSendExpenseCard,
  onSendAgreementCard,
  onTypingStart,
  onTypingStop,
  replyingTo,
  onCancelReply,
  disabled = false,
}) => {
  const [text, setText] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showEmojiBar, setShowEmojiBar] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  // Expense modal state
  const [expenseTitle, setExpenseTitle] = useState('Airtel 1 Gbps Fiber & OTT');
  const [expenseAmount, setExpenseAmount] = useState('1499');
  const [expenseCategory] = useState<'wifi' | 'utilities' | 'groceries'>('wifi');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const emojis = ['☕', '✨', '🏠', '👍', '🙌', '❤️', '🔥', '😊', '🤝', '🌿', '🌙'];

  // Handle typing indicator debouncing
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);

    if (onTypingStart) {
      onTypingStart();
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (onTypingStop) {
        onTypingStop();
      }
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;

    const replyPayload = replyingTo
      ? {
          id: replyingTo.id,
          senderName: replyingTo.senderName,
          text: replyingTo.body || 'Attachment',
        }
      : undefined;

    onSendMessage(text.trim(), replyPayload);
    setText('');
    if (onCancelReply) onCancelReply();
    if (onTypingStop) onTypingStop();
    setShowEmojiBar(false);
    setShowAttachMenu(false);
  };

  const handleCreateExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = parseFloat(expenseAmount) || 1200;
    if (onSendExpenseCard) {
      onSendExpenseCard({
        expenseId: `exp-${Date.now()}`,
        title: expenseTitle,
        totalAmount: total,
        yourShare: Math.round(total / 2),
        paidBy: 'You',
        category: expenseCategory,
        status: 'pending',
      });
    }
    setShowExpenseModal(false);
    setShowAttachMenu(false);
  };

  const handleShareRoom = () => {
    if (onSendRoomCard) {
      onSendRoomCard({
        roomId: 'the-indiranagar-studio',
        title: 'The Indiranagar Garden Studio',
        price: '₹24,000 / mo',
        neighborhood: 'Indiranagar',
        city: 'Bengaluru',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
      });
    }
    setShowAttachMenu(false);
  };

  const handleShareAgreement = () => {
    if (onSendAgreementCard) {
      onSendAgreementCard({
        ruleTitle: 'Quiet Hours Standard (10:30 PM – 7:30 AM)',
        ruleDescription:
          'Common area volume remains low and peaceful; personal calls in private bedroom.',
        category: 'quiet_hours',
        version: 'v2.1 Certified',
      });
    }
    setShowAttachMenu(false);
  };

  return (
    <div className="p-3 sm:p-4 bg-clay dark:bg-surface-low border-t border-surface-dim shrink-0 transition-colors relative">
      {/* Reply Banner */}
      {replyingTo && (
        <div className="max-w-4xl mx-auto mb-2 p-2.5 bg-surface-low dark:bg-surface-high rounded-xl border border-surface-dim flex items-center justify-between font-sans text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-vitality-coral">Replying to {replyingTo.senderName}:</span>
            <span className="text-secondary truncate">{replyingTo.body}</span>
          </div>
          <button
            type="button"
            onClick={onCancelReply}
            className="w-5 h-5 rounded-full hover:bg-surface-dim/40 flex items-center justify-center text-secondary hover:text-earth-indigo cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Quick Emoji Bar */}
      {showEmojiBar && (
        <div className="max-w-4xl mx-auto mb-2 p-2 bg-clay dark:bg-surface-high border border-surface-dim rounded-2xl shadow-lg flex items-center gap-2 overflow-x-auto">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => {
                setText((prev) => prev + emoji);
                setShowEmojiBar(false);
              }}
              className="text-lg p-1.5 rounded-lg hover:bg-surface-low transition-transform hover:scale-125 cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Attachment Popover */}
      {showAttachMenu && (
        <div className="absolute bottom-20 left-4 sm:left-8 z-30 w-72 bg-clay dark:bg-surface-high border border-surface-dim rounded-2xl shadow-2xl p-2 space-y-1 font-sans text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="px-3 py-2 border-b border-surface-dim font-bold text-secondary text-[10px] uppercase">
            Roommate Actions
          </div>
          <button
            type="button"
            onClick={handleShareRoom}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-low text-earth-indigo transition-colors text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-vitality-coral/15 text-vitality-coral flex items-center justify-center">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold">Share Room Space</div>
              <div className="text-[10px] text-secondary">The Indiranagar Studio</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setShowExpenseModal(true);
              setShowAttachMenu(false);
            }}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-low text-earth-indigo transition-colors text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-trust-teal/15 text-trust-teal flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold">Split Shared Expense</div>
              <div className="text-[10px] text-secondary">Create 50/50 household split</div>
            </div>
          </button>

          <button
            type="button"
            onClick={handleShareAgreement}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-low text-earth-indigo transition-colors text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold">Living Agreement Standard</div>
              <div className="text-[10px] text-secondary">Quiet hours & kitchen protocol</div>
            </div>
          </button>
        </div>
      )}

      {/* Main Composer Bar */}
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto flex items-center gap-2 bg-surface-low dark:bg-surface-container border border-surface-dim rounded-2xl px-3 py-2 focus-within:border-earth-indigo transition-all shadow-sm"
      >
        {/* Plus Attachment Toggle */}
        <button
          type="button"
          onClick={() => setShowAttachMenu(!showAttachMenu)}
          className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
            showAttachMenu
              ? 'bg-earth-indigo text-clay'
              : 'hover:bg-surface-dim/40 text-secondary hover:text-earth-indigo'
          }`}
          title="Roommate Quick Actions"
        >
          <Plus className={`w-5 h-5 transition-transform ${showAttachMenu ? 'rotate-45' : ''}`} />
        </button>

        {/* Emoji Bar Toggle */}
        <button
          type="button"
          onClick={() => setShowEmojiBar(!showEmojiBar)}
          className="w-9 h-9 shrink-0 rounded-xl hover:bg-surface-dim/40 flex items-center justify-center text-secondary hover:text-earth-indigo transition-colors cursor-pointer"
          title="Insert Emoji"
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Input Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Write a message to your cohabitant..."
          rows={1}
          disabled={disabled}
          className="w-full bg-transparent border-none focus:outline-none resize-none font-sans text-xs text-earth-indigo py-2 max-h-32 placeholder:text-secondary leading-relaxed"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() || disabled}
          className="w-10 h-10 shrink-0 rounded-xl bg-vitality-coral text-white flex items-center justify-center hover:bg-vitality-coral/90 disabled:opacity-40 disabled:hover:bg-vitality-coral transition-all shadow-md cursor-pointer disabled:cursor-not-allowed"
          title="Send (Enter)"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* In-Chat Split Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-clay dark:bg-surface-low border border-surface-dim rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-surface-dim pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-vitality-coral/15 text-vitality-coral flex items-center justify-center">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-earth-indigo">
                    Split Shared Household Expense
                  </h3>
                  <span className="font-sans text-[10px] text-secondary">
                    Posts live split card to chat
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowExpenseModal(false)}
                className="w-8 h-8 rounded-full bg-surface-dim/40 flex items-center justify-center text-secondary hover:text-earth-indigo cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateExpenseSubmit} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block font-bold text-secondary uppercase text-[10px] mb-1.5">
                  Expense Description
                </label>
                <input
                  type="text"
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  placeholder="e.g. Airtel Fiber, Groceries, Maid"
                  className="w-full px-4 py-3 bg-surface-low border border-surface-dim rounded-xl font-sans text-earth-indigo focus:outline-none focus:border-earth-indigo"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-secondary uppercase text-[10px] mb-1.5">
                  Total Bill Amount (₹ INR)
                </label>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="1499"
                  className="w-full px-4 py-3 bg-surface-low border border-surface-dim rounded-xl font-sans text-earth-indigo focus:outline-none focus:border-earth-indigo font-bold"
                  required
                />
              </div>

              {/* Split Breakdown Preview */}
              <div className="p-4 bg-surface-low rounded-xl border border-surface-dim space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-secondary">Your 50% Share:</span>
                  <span className="text-earth-indigo">
                    ₹{Math.round((parseFloat(expenseAmount) || 0) / 2)}
                  </span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-secondary">Flatmate Share:</span>
                  <span className="text-vitality-coral">
                    ₹{Math.round((parseFloat(expenseAmount) || 0) / 2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowExpenseModal(false)}
                  className="w-1/2 py-3 border border-surface-dim rounded-xl font-bold text-secondary hover:text-earth-indigo cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Post to Chat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
