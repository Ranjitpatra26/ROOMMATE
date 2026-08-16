import React, { useState } from 'react';
import { Sparkles, Star } from 'lucide-react';
import { Button } from '../foundation/index.js';

export interface ReviewSubmissionFormProps {
  stayTitle: string;
  roommateName: string;
  onSubmitReview: (data: {
    cleanliness: number;
    communication: number;
    respect: number;
    noise: number;
    comment: string;
  }) => void;
  isSubmitting?: boolean;
}

export const ReviewSubmissionForm: React.FC<ReviewSubmissionFormProps> = ({
  stayTitle,
  roommateName,
  onSubmitReview,
  isSubmitting = false,
}) => {
  const [cleanliness, setCleanliness] = useState(5);
  const [communication, setCommunication] = useState(5);
  const [respect, setRespect] = useState(5);
  const [noise, setNoise] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReview({
      cleanliness,
      communication,
      respect,
      noise,
      comment,
    });
  };

  const categories = [
    { label: 'Cleanliness & Shared Order', value: cleanliness, setter: setCleanliness },
    { label: 'Communication & Punctuality', value: communication, setter: setCommunication },
    { label: 'Respect of Space & Privacy', value: respect, setter: setRespect },
    { label: 'Acoustic / Noise Consideration', value: noise, setter: setNoise },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-clay border border-surface-dim rounded-3xl p-6 md:p-10 shadow-lg space-y-8 max-w-2xl mx-auto"
    >
      <div className="space-y-2 border-b border-surface-dim pb-4">
        <span className="font-sans text-[11px] font-bold text-vitality-coral uppercase tracking-widest flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Verified Stay Review
        </span>
        <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
          Review Cohabitation with {roommateName}
        </h3>
        <p className="font-sans text-xs text-secondary">
          Stay context: <strong className="text-earth-indigo">{stayTitle}</strong>
        </p>
      </div>

      {/* Category Sliders */}
      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.label} className="space-y-2">
            <div className="flex justify-between items-center text-xs font-sans">
              <span className="font-bold text-earth-indigo">{cat.label}</span>
              <span className="font-serif font-bold text-sm text-vitality-coral flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                {cat.value}.0
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={cat.value}
              onChange={(e) => cat.setter(Number(e.target.value))}
              className="w-full accent-vitality-coral cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Editorial Comment */}
      <div className="space-y-2">
        <label className="block font-sans text-xs font-bold text-earth-indigo uppercase tracking-wider">
          Living Experience Reflection
        </label>
        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share constructive observations on living habits, cleanliness, and harmony..."
          className="w-full bg-surface-low border border-surface-dim rounded-2xl p-4 font-sans text-xs text-earth-indigo placeholder:text-secondary focus:outline-none focus:border-earth-indigo transition-colors"
          required
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full py-4 bg-vitality-coral hover:bg-vitality-coral/90 text-clay font-bold rounded-xl shadow-lg shadow-vitality-coral/25 uppercase tracking-wider text-xs"
      >
        {isSubmitting ? 'Submitting Verified Feedback...' : 'Submit Verified Review'}
      </Button>
    </form>
  );
};
