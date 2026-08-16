import React, { useState } from 'react';
import { Search, Pin, VolumeX, Sparkles, MessageSquare, X } from 'lucide-react';
import { ConversationItem } from './types.js';

export interface ConversationListProps {
  conversations: ConversationItem[];
  activeId: string;
  onSelectConversation: (id: string) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  className?: string;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeId,
  onSelectConversation,
  searchQuery,
  onSearchChange,
  className = '',
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'cohabitants' | 'unread'>('all');

  const filteredConversations = conversations.filter((conv) => {
    // Tab filter
    if (filterTab === 'unread' && (!conv.unreadCount || conv.unreadCount === 0)) {
      return false;
    }
    if (filterTab === 'cohabitants' && !conv.isPinned) {
      return false;
    }

    // Search query filter
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      conv.participant.name.toLowerCase().includes(q) ||
      conv.lastMessage.toLowerCase().includes(q) ||
      conv.participant.role.toLowerCase().includes(q)
    );
  });

  return (
    <aside
      className={`w-full lg:w-[360px] xl:w-[400px] bg-clay dark:bg-surface-low border-r border-surface-dim flex flex-col h-full shrink-0 transition-colors ${className}`}
    >
      {/* Header */}
      <div className="p-5 border-b border-surface-dim flex justify-between items-center shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-headline-sm font-bold text-earth-indigo">Messages</h2>
            <span className="px-2 py-0.5 rounded-full bg-surface-low border border-surface-dim font-sans text-[10px] font-bold text-vitality-coral">
              {conversations.length} Active
            </span>
          </div>
          <p className="font-sans text-[11px] text-secondary mt-0.5">
            Cohabitant chats & living ledgers
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-4 shrink-0 space-y-3 border-b border-surface-dim/40">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search messages, flatmates, spaces..."
            className="w-full pl-10 pr-9 py-2.5 bg-surface-low dark:bg-surface-container border border-surface-dim rounded-xl font-sans text-xs text-earth-indigo placeholder:text-secondary focus:outline-none focus:border-earth-indigo transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-surface-dim/50 flex items-center justify-center text-secondary hover:text-earth-indigo cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Filter Quick Pills */}
        <div className="flex items-center gap-1.5 font-sans text-xs">
          <button
            type="button"
            onClick={() => setFilterTab('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filterTab === 'all'
                ? 'bg-earth-indigo text-clay shadow-sm'
                : 'bg-surface-low border border-surface-dim text-secondary hover:text-earth-indigo'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('cohabitants')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterTab === 'cohabitants'
                ? 'bg-earth-indigo text-clay shadow-sm'
                : 'bg-surface-low border border-surface-dim text-secondary hover:text-earth-indigo'
            }`}
          >
            <Pin className="w-3 h-3" />
            <span>Flatmates</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('unread')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterTab === 'unread'
                ? 'bg-earth-indigo text-clay shadow-sm'
                : 'bg-surface-low border border-surface-dim text-secondary hover:text-earth-indigo'
            }`}
          >
            <span>Unread</span>
            {conversations.some((c) => (c.unreadCount || 0) > 0) && (
              <span className="w-2 h-2 rounded-full bg-vitality-coral" />
            )}
          </button>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <MessageSquare className="w-8 h-8 mx-auto text-secondary/50" />
            <h4 className="font-serif text-sm font-bold text-earth-indigo">No conversations found</h4>
            <p className="font-sans text-xs text-secondary max-w-xs mx-auto">
              {searchQuery ? `No results for "${searchQuery}"` : 'Start a chat from Discover or Room details.'}
            </p>
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const isActive = conv.id === activeId;
            return (
              <button
                key={conv.id}
                type="button"
                onClick={() => onSelectConversation(conv.id)}
                className={`w-full flex items-start gap-3.5 p-3.5 rounded-2xl text-left transition-all cursor-pointer relative group ${
                  isActive
                    ? 'bg-earth-indigo text-clay shadow-md border border-earth-indigo'
                    : 'hover:bg-surface-low text-earth-indigo border border-transparent'
                }`}
              >
                {/* Avatar with Online Badge */}
                <div className="relative shrink-0">
                  <img
                    src={conv.participant.avatarUrl}
                    alt={conv.participant.name}
                    className="w-12 h-12 rounded-full object-cover border border-surface-dim shrink-0"
                  />
                  {conv.participant.isOnline ? (
                    <div
                      className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-clay dark:border-surface-low"
                      title="Online"
                    />
                  ) : (
                    <div
                      className="absolute bottom-0 right-0 w-3 h-3 bg-neutral-400 rounded-full border-2 border-clay dark:border-surface-low"
                      title="Offline"
                    />
                  )}
                </div>

                {/* Conversation Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <div className="flex items-center gap-1.5 truncate">
                      <span
                        className={`font-serif font-bold text-xs truncate ${
                          isActive ? 'text-clay' : 'text-earth-indigo'
                        }`}
                      >
                        {conv.participant.name}
                      </span>
                      {conv.isPinned && (
                        <Pin
                          className={`w-3 h-3 shrink-0 ${
                            isActive ? 'text-vitality-coral' : 'text-vitality-coral'
                          }`}
                        />
                      )}
                    </div>
                    <span
                      className={`font-sans text-[10px] whitespace-nowrap ml-1 shrink-0 ${
                        isActive ? 'text-clay/75' : 'text-secondary'
                      }`}
                    >
                      {conv.lastMessageTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <p
                      className={`font-sans text-xs truncate flex-1 leading-relaxed ${
                        isActive
                          ? 'text-clay/85'
                          : (conv.unreadCount || 0) > 0
                          ? 'text-earth-indigo font-bold'
                          : 'text-secondary'
                      }`}
                    >
                      {conv.lastMessage}
                    </p>
                    {conv.isMuted && (
                      <VolumeX
                        className={`w-3 h-3 shrink-0 ${
                          isActive ? 'text-clay/50' : 'text-secondary/60'
                        }`}
                      />
                    )}
                    {(conv.unreadCount || 0) > 0 && (
                      <span className="px-2 py-0.5 bg-vitality-coral text-white font-sans text-[10px] font-bold rounded-full shrink-0 shadow-sm">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>

                  {/* Compatibility Micro Tag */}
                  <div className="mt-1 flex items-center gap-1.5">
                    <span
                      className={`font-sans text-[10px] font-bold flex items-center gap-1 ${
                        isActive ? 'text-vitality-coral' : 'text-trust-teal'
                      }`}
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{conv.participant.compatibilityScore}% Resonance</span>
                    </span>
                    {conv.participant.city && (
                      <span
                        className={`font-sans text-[10px] truncate ${
                          isActive ? 'text-clay/60' : 'text-secondary/60'
                        }`}
                      >
                        • {conv.participant.city}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};
