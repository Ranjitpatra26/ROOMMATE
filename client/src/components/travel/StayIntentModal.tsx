import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  X,
  MessageSquare,
  FileText,
  Home,
  ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatINR } from '../../utils/localization.js';
import { DemoDestinationItem } from '../../data/indianDemoData.js';

export interface StayIntentModalProps {
  destination: DemoDestinationItem;
  isOpen: boolean;
  onClose: () => void;
}

export const StayIntentModal: React.FC<StayIntentModalProps> = ({
  destination,
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [arrivalDate, setArrivalDate] = useState('2026-09-01');
  const [departureDate, setDepartureDate] = useState('2026-09-15');
  const [neighborhood, setNeighborhood] = useState(destination.neighborhoods[0]?.name || 'Indiranagar');
  const [purpose, setPurpose] = useState<'relocation' | 'work' | 'trial_stay'>('trial_stay');
  const [budget, setBudget] = useState(24000);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-clay dark:bg-surface-low border border-surface-dim rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-dim/40 flex items-center justify-center text-secondary hover:text-earth-indigo cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          /* Confirmation Success State */
          <div className="py-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-trust-teal/15 text-trust-teal flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="font-sans text-[10px] font-bold text-trust-teal uppercase tracking-widest block">
                Stay Intent Registered
              </span>
              <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
                Your Living Trial in {destination.city} is Ready!
              </h3>
              <p className="font-sans text-xs text-secondary max-w-sm mx-auto leading-relaxed">
                We’ve matched your dates ({arrivalDate} &rarr; {departureDate}) with verified resident openings in {neighborhood}.
              </p>
            </div>

            <div className="p-4 bg-surface-low dark:bg-surface-container rounded-2xl border border-surface-dim text-left space-y-2 text-xs font-sans">
              <div className="flex justify-between font-bold">
                <span className="text-secondary">Target Hub:</span>
                <span className="text-earth-indigo">{neighborhood}, {destination.city}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-secondary">Est. Budget:</span>
                <span className="text-vitality-coral">{formatINR(budget)} / mo</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-secondary">Trust Guarantee:</span>
                <span className="text-trust-teal">Tier-1 Living Protocol</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 font-sans text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/messages/conversation-ananya');
                }}
                className="w-full py-3.5 bg-vitality-coral hover:bg-vitality-coral/90 text-white rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Local Flatmate in Chat</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate(`/rooms/${destination.curatedRoomId}`);
                }}
                className="w-full py-3 bg-clay dark:bg-surface-high border border-surface-dim hover:border-earth-indigo text-earth-indigo rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Home className="w-4 h-4 text-vitality-coral" />
                <span>Explore Curated Room</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/stay/agreement/builder');
                }}
                className="w-full py-3 bg-surface-low border border-surface-dim hover:border-earth-indigo text-secondary hover:text-earth-indigo rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Review Living Agreement Standards</span>
              </button>
            </div>
          </div>
        ) : (
          /* Input Form */
          <form onSubmit={handleSubmit} className="space-y-5 font-sans text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-vitality-coral" />
                <span className="text-[10px] font-bold text-vitality-coral uppercase tracking-widest">
                  Plan a Living Trial
                </span>
              </div>
              <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
                Explore Staying in {destination.city}
              </h3>
              <p className="text-secondary text-xs">
                Set your arrival timeline to explore available shared suites and connect with cohabitants.
              </p>
            </div>

            {/* Target Neighborhood */}
            <div>
              <label className="block font-bold text-secondary uppercase text-[10px] mb-1.5">
                Target Neighborhood
              </label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full px-4 py-3 bg-surface-low dark:bg-surface-container border border-surface-dim rounded-xl font-sans text-xs font-bold text-earth-indigo focus:outline-none focus:border-earth-indigo"
              >
                {destination.neighborhoods.map((n) => (
                  <option key={n.id} value={n.name}>
                    {n.name} ({n.rentRange})
                  </option>
                ))}
              </select>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-secondary uppercase text-[10px] mb-1.5">
                  Arrival Date
                </label>
                <input
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-surface-low dark:bg-surface-container border border-surface-dim rounded-xl font-sans text-xs text-earth-indigo focus:outline-none focus:border-earth-indigo"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-secondary uppercase text-[10px] mb-1.5">
                  Departure Date
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-surface-low dark:bg-surface-container border border-surface-dim rounded-xl font-sans text-xs text-earth-indigo focus:outline-none focus:border-earth-indigo"
                  required
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="block font-bold text-secondary uppercase text-[10px] mb-1.5">
                Stay Purpose
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'trial_stay', label: 'Residency Trial' },
                  { id: 'relocation', label: 'Relocation' },
                  { id: 'work', label: 'Remote Work' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPurpose(item.id as any)}
                    className={`py-2 px-2 text-center rounded-xl font-bold transition-all text-[11px] cursor-pointer ${
                      purpose === item.id
                        ? 'bg-earth-indigo text-clay shadow-sm'
                        : 'bg-surface-low border border-surface-dim text-secondary hover:text-earth-indigo'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Budget Slider */}
            <div>
              <div className="flex justify-between font-bold text-[10px] uppercase text-secondary mb-1.5">
                <span>Monthly Rent Budget</span>
                <span className="text-vitality-coral text-xs">{formatINR(budget)} / mo</span>
              </div>
              <input
                type="range"
                min="10000"
                max="60000"
                step="2000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-vitality-coral cursor-pointer"
              />
            </div>

            <div className="p-3.5 bg-surface-low dark:bg-surface-container rounded-xl border border-surface-dim flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-trust-teal shrink-0" />
              <span className="text-[11px] text-secondary">
                Includes verified roommate quiet hours guarantee & Aadhaar identity checks.
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-3 border border-surface-dim rounded-xl font-bold text-secondary hover:text-earth-indigo cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-bold rounded-xl shadow-md cursor-pointer uppercase tracking-wider"
              >
                Confirm Stay Intent
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
