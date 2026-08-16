import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Home,
  Navigation,
  Compass,
  MessageSquare,
} from 'lucide-react';
import { RoomMapItem } from './types.js';
import { formatINR } from '../../utils/localization.js';

export interface RoomPreviewCardProps {
  room: RoomMapItem;
  onClose: () => void;
  onDirections?: (room: RoomMapItem) => void;
  onExploreNeighborhood?: (neighborhoodName: string) => void;
}

export const RoomPreviewCard: React.FC<RoomPreviewCardProps> = ({
  room,
  onClose,
  onDirections,
  onExploreNeighborhood,
}) => {
  const navigate = useNavigate();

  const handleViewRoom = () => {
    navigate(`/rooms/${room.id}`);
  };

  const handleChatWithHost = () => {
    navigate(`/messages/room-${room.id}`);
  };

  return (
    <>
      {/* Mobile Bottom Sheet (390px - 768px) */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-[#1e2433]/90 dark:bg-[#121620]/95 backdrop-blur-2xl border-t border-white/20 rounded-t-3xl p-5 space-y-4 animate-in slide-in-from-bottom duration-300 pointer-events-auto text-white text-left font-sans shadow-2xl">
        {/* Dismiss drag handle */}
        <div className="flex justify-center -mt-2 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <button
              type="button"
              onClick={() => onExploreNeighborhood && onExploreNeighborhood(room.neighborhood)}
              className="flex items-center gap-1.5 font-sans text-[10px] font-bold text-vitality-coral uppercase tracking-wider mb-0.5 hover:underline cursor-pointer"
            >
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{room.neighborhood}, {room.city}</span>
            </button>
            <h3 className="font-serif text-base font-bold text-white truncate">
              {room.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer transition-colors border border-white/10"
            title="Close Preview"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Thumbnail & Meta */}
        <div className="flex gap-3.5 items-center">
          {room.imageUrl ? (
            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-earth-indigo border border-white/15">
              <img
                src={room.imageUrl}
                alt={room.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
              <Home className="w-6 h-6 text-slate-300" />
            </div>
          )}

          <div className="flex-1 min-w-0 space-y-1 text-left font-sans">
            <div className="font-serif text-base font-bold text-white">
              {formatINR(room.monthlyRent)} <span className="text-[10px] font-normal text-slate-300">/ month</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-trust-teal">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Available for Co-Living</span>
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-2 leading-snug">
              {room.description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-1 font-sans text-xs font-bold">
          <button
            type="button"
            onClick={handleChatWithHost}
            className="py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/15 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider transition-all"
            title="Chat with Host / Roommates"
          >
            <MessageSquare className="w-3.5 h-3.5 text-trust-teal" />
            <span>Chat</span>
          </button>

          {onDirections && (
            <button
              type="button"
              onClick={() => onDirections(room)}
              className="py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/15 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider transition-all"
              title="Directions"
            >
              <Navigation className="w-3.5 h-3.5 text-vitality-coral" />
              <span>Route</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleViewRoom}
            className="py-3 bg-vitality-coral hover:bg-vitality-coral/90 text-white rounded-xl shadow-lg shadow-vitality-coral/30 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider transition-all"
          >
            <span>View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Desktop Floating Preview Card (>= 768px) */}
      <div className="hidden md:block fixed top-24 right-8 z-40 w-88 bg-[#1e2433]/85 dark:bg-[#121620]/90 backdrop-blur-2xl border border-white/20 rounded-3xl p-5 space-y-4 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto text-left text-white shadow-2xl font-sans">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-vitality-coral/20 text-vitality-coral font-sans text-[10px] font-bold border border-vitality-coral/30">
            <Home className="w-3 h-3" />
            <span>Available Room</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer transition-colors border border-white/10"
            title="Close Preview"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {room.imageUrl && (
          <div className="w-full h-36 rounded-2xl overflow-hidden relative shadow-inner bg-earth-indigo border border-white/10">
            <img
              src={room.imageUrl}
              alt={room.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <button
              type="button"
              onClick={() => onExploreNeighborhood && onExploreNeighborhood(room.neighborhood)}
              className="absolute bottom-2.5 left-3 text-white font-sans text-[10px] font-bold flex items-center gap-1 bg-black/50 hover:bg-black/70 px-2.5 py-0.5 rounded-full backdrop-blur-md transition-colors cursor-pointer border border-white/20"
            >
              <Compass className="w-3 h-3 text-vitality-coral" />
              <span>Explore {room.neighborhood}</span>
            </button>
          </div>
        )}

        <div className="space-y-1">
          <h4 className="font-serif text-base font-bold text-white leading-snug truncate">
            {room.title}
          </h4>
          <p className="font-sans text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {room.description}
          </p>
        </div>

        <div className="pt-3 border-t border-white/15 flex items-center justify-between font-sans">
          <div>
            <span className="text-[10px] text-slate-300 block">Monthly Rent</span>
            <span className="font-serif text-base font-bold text-white">
              {formatINR(room.monthlyRent)} <span className="text-[10px] font-normal text-slate-300">/ mo</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-sans text-xs font-bold">
            <button
              type="button"
              onClick={handleChatWithHost}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/15 flex items-center gap-1 cursor-pointer transition-all hover:border-trust-teal"
              title="Chat with Host / Roommates"
            >
              <MessageSquare className="w-3.5 h-3.5 text-trust-teal" />
              <span>Chat</span>
            </button>

            {onDirections && (
              <button
                type="button"
                onClick={() => onDirections(room)}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/15 flex items-center gap-1 cursor-pointer transition-all hover:border-vitality-coral"
                title="Get Directions to this room"
              >
                <Navigation className="w-3.5 h-3.5 text-vitality-coral" />
                <span>Route</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleViewRoom}
              className="px-3.5 py-2 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-sans text-xs font-bold rounded-xl shadow-md flex items-center gap-1 cursor-pointer uppercase tracking-wider transition-all hover:scale-105"
            >
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
