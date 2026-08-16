import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Award,
  Compass,
  Check,
  Receipt,
  AlertTriangle,
  FileText,
  Plus,
  PhoneCall,
  UserX,
  LifeBuoy,
  Trash2,
  Edit2,
  X,
  MapPin,
  Home,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { TrustScoreBadge, TrustHistoryTimeline, ReviewSubmissionForm } from '../components/trust/index.js';
import {
  DestinationCard,
  NeighborhoodGrid,
  LivingItinerary,
  CitySnapshot,
  StayIntentModal,
} from '../components/travel/index.js';
import { Button } from '../components/foundation/index.js';
import { PageTransition } from '../components/motion/index.js';
import { getSocket } from '../services/index.js';
import { formatINR, formatIndianDate } from '../utils/localization.js';
import {
  INITIAL_INDIAN_EXPENSES,
  DemoExpenseItem,
  INDIAN_DEMO_DESTINATIONS,
  INDIAN_DEMO_ROOMS,
  INDIAN_DEMO_PROFILES,
} from '../data/indianDemoData.js';

// ============================================================================
// 1. TRUST PROFILE (/trust/:userId)
// ============================================================================
export const TrustProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1 && window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/discover');
    }
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6 md:p-12 space-y-8">
      <div className="flex items-center justify-between border-b border-surface-dim pb-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 font-sans text-xs font-semibold text-secondary hover:text-earth-indigo transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="font-serif text-headline-sm font-bold text-earth-indigo">
          Trust & Reputation Ledger
        </span>
      </div>

      <TrustScoreBadge
        score={960}
        tier="kinship_certified"
        verifiedStaysCount={4}
        governmentIdVerified={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-clay border border-surface-dim rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[10px] font-bold text-secondary uppercase tracking-wider">
              Government Identity
            </span>
            <ShieldCheck className="w-4 h-4 text-trust-teal" />
          </div>
          <div className="font-serif text-sm font-bold text-earth-indigo">Aadhaar & KYC Verified</div>
          <p className="font-sans text-xs text-secondary">
            Biometric cryptography match verified with 100% confidence.
          </p>
        </div>

        <div className="bg-clay border border-surface-dim rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[10px] font-bold text-secondary uppercase tracking-wider">
              Employment Proof
            </span>
            <CheckCircle2 className="w-4 h-4 text-trust-teal" />
          </div>
          <div className="font-serif text-sm font-bold text-earth-indigo">Corporate Verified</div>
          <p className="font-sans text-xs text-secondary">
            Active professional affiliation verified in Indiranagar design studio.
          </p>
        </div>

        <div className="bg-clay border border-surface-dim rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[10px] font-bold text-secondary uppercase tracking-wider">
              UPI Credit Confidence
            </span>
            <Award className="w-4 h-4 text-trust-teal" />
          </div>
          <div className="font-serif text-sm font-bold text-earth-indigo">100% On-Time Ledger</div>
          <p className="font-sans text-xs text-secondary">
            Zero delayed utility splits across all verified Indian co-living stays.
          </p>
        </div>
      </div>

      <div className="bg-earth-indigo text-clay rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <h3 className="font-serif text-headline-sm font-bold text-clay">
            Chronological Trust History
          </h3>
          <p className="font-sans text-xs text-surface-dim">
            Inspect all past verified cohabitation reviews, registered rental agreements, and ledger records.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate(`/trust/${userId || 'user-ananya'}/history`)}
          className="bg-vitality-coral text-clay hover:bg-vitality-coral/90 font-bold px-6 py-3 rounded-xl shadow-lg shadow-vitality-coral/25 uppercase text-xs tracking-wider shrink-0 cursor-pointer"
        >
          View Full Timeline
        </Button>
      </div>
    </div>
  );
};

// ============================================================================
// 2. TRUST HISTORY (/trust/:userId/history)
// ============================================================================
export const TrustHistoryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1 && window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/trust/user-ananya');
    }
  };

  const events: any[] = [
    {
      id: 'event-1',
      type: 'stay_completed',
      title: 'Completed 14-Month Stay: The Indiranagar Garden Flat',
      date: 'June 2026',
      rating: 5.0,
      badge: 'Verified Resident',
      summary:
        'Flawlessly maintained shared kitchen, zero acoustic disruptions after 10:30 PM, and always prompt on monthly Bescom and grocery splits.',
      cohabitants: ['Ananya Sharma (Verified)', 'Rohan Patil (Verified)'],
    },
    {
      id: 'event-2',
      type: 'stay_completed',
      title: 'Completed 8-Month Stay: The Baner Foothill Sanctuary',
      date: 'November 2025',
      rating: 4.9,
      badge: 'Verified Resident',
      summary:
        'Consistently punctual on all utility splits, respectful of early morning work focus, and wonderful to coordinate household logistics with.',
      cohabitants: ['Aarav Mehta (Verified)'],
    },
    {
      id: 'event-3',
      type: 'identity_verified',
      title: 'Aadhaar Government Identity & Biometrics Cleared',
      date: 'January 2025',
      badge: 'Verified Identity',
      summary:
        'Aadhaar KYC and cryptographic tenancy background check passed with 100% confidence.',
    },
  ];

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6 md:p-12 space-y-8">
      <div className="flex items-center justify-between border-b border-surface-dim pb-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 font-sans text-xs font-semibold text-secondary hover:text-earth-indigo transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Trust Profile</span>
        </button>
        <span className="font-serif text-headline-sm font-bold text-earth-indigo">
          Verified Timeline
        </span>
      </div>

      <div className="space-y-2">
        <span className="font-sans text-[11px] font-bold text-vitality-coral uppercase tracking-widest">
          Chronological Audit
        </span>
        <h1 className="font-serif text-headline-lg-mobile md:text-headline-md font-bold text-earth-indigo">
          Verified Stay Records
        </h1>
        <p className="font-sans text-xs text-secondary leading-relaxed max-w-lg">
          Every milestone represents a real rental agreement, verified stay, and authentic flatmate review.
        </p>
      </div>

      <TrustHistoryTimeline events={events} />
    </div>
  );
};

// ============================================================================
// 3. VERIFIED REVIEW (/reviews/:stayId)
// ============================================================================
export const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [submittedReview, setSubmittedReview] = useState<any | null>(null);

  const handleBack = () => {
    if (window.history.length > 1 && window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/stay');
    }
  };

  const handleReviewSubmit = (data: any) => {
    setSubmittedReview(data);
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6 md:p-12 space-y-8">
      <div className="flex items-center justify-between border-b border-surface-dim pb-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 font-sans text-xs font-semibold text-secondary hover:text-earth-indigo transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="font-serif text-headline-sm font-bold text-earth-indigo">
          Verified Review
        </span>
      </div>

      {submittedReview ? (
        <div className="bg-clay border border-surface-dim rounded-3xl p-10 text-center space-y-4 max-w-md mx-auto shadow-lg">
          <div className="w-16 h-16 rounded-full bg-trust-teal/15 text-trust-teal flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-headline-sm font-bold text-earth-indigo">
            Review Published to Trust Ledger
          </h2>
          <p className="font-sans text-xs text-secondary leading-relaxed">
            Your verified review rating ({submittedReview.cleanliness}/5 cleanliness) has been recorded to the community trust index.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Button
              variant="primary"
              onClick={() => navigate('/trust/user-ananya')}
              className="w-full py-3.5 bg-earth-indigo text-clay font-bold rounded-xl"
            >
              View Trust Profile
            </Button>
            <Button
              variant="secondary"
              onClick={() => setSubmittedReview(null)}
              className="w-full py-2.5 font-bold text-xs"
            >
              Edit Submission
            </Button>
          </div>
        </div>
      ) : (
        <ReviewSubmissionForm
          stayTitle="The Indiranagar Sanctuary (14-Month Stay)"
          roommateName="Ananya Sharma"
          onSubmitReview={handleReviewSubmit}
        />
      )}
    </div>
  );
};

// ============================================================================
// 4. ACTIVE STAY / LIVING OS DASHBOARD (/stay)
// ============================================================================
interface HouseholdTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  isUrgent?: boolean;
}

export const StayDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<HouseholdTask[]>([
    {
      id: 'task-kitchen',
      title: 'Kitchen & Countertop Deep Clean',
      description: 'Wipe quartz island, rinse French press, clear common area counters before 10 PM.',
      assignedTo: "Ananya's Turn",
      isUrgent: false,
    },
    {
      id: 'task-bescom',
      title: 'Bescom Electricity Bill',
      description: '₹2,850 total. Splitting ₹950 equally across Ananya, Rohan, and You.',
      assignedTo: 'Shared Split',
      isUrgent: true,
    },
    {
      id: 'task-groceries',
      title: 'BigBasket Grocery Staples',
      description: 'Filter coffee grounds, oat milk, cold-pressed sunflower oil, organic dish wash.',
      assignedTo: "Rohan's Turn",
      isUrgent: false,
    },
  ]);

  const [completedTasks, setCompletedTasks] = useState<string[]>(['task-groceries']);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newAssignee, setNewAssignee] = useState("My Turn");
  const [newUrgent, setNewUrgent] = useState(false);

  useEffect(() => {
    const socket = getSocket();
    socket.emit('join_stay', 'stay-indiranagar-loft');

    const handleTaskComplete = (data: { taskId: string; completed?: boolean }) => {
      setCompletedTasks((prev) => {
        if (data.completed === false) {
          return prev.filter((id) => id !== data.taskId);
        }
        return prev.includes(data.taskId) ? prev : [...prev, data.taskId];
      });
    };

    socket.on('responsibility:completed', handleTaskComplete);

    return () => {
      socket.emit('leave_stay', 'stay-indiranagar-loft');
      socket.off('responsibility:completed', handleTaskComplete);
    };
  }, []);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const isCompleted = prev.includes(taskId);
      const updated = isCompleted ? prev.filter((id) => id !== taskId) : [...prev, taskId];
      const socket = getSocket();
      socket.emit('responsibility:completed', {
        stayId: 'stay-indiranagar-loft',
        taskId,
        completed: !isCompleted,
      });
      return updated;
    });
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: HouseholdTask = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Shared household cadence task.',
      assignedTo: newAssignee,
      isUrgent: newUrgent,
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTitle('');
    setNewDesc('');
    setNewAssignee("My Turn");
    setNewUrgent(false);
    setIsAddingTask(false);
  };

  const handleDeleteTask = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setCompletedTasks((prev) => prev.filter((id) => id !== taskId));
  };

  return (
    <PageTransition className="min-h-screen pb-24 space-y-12">
      {/* Hero Section */}
      <section className="relative w-full h-[460px] md:h-[540px] flex items-end pb-12 px-6 md:px-14 max-w-6xl mx-auto">
        <div className="absolute inset-0 overflow-hidden rounded-b-3xl">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ"
            alt="The Indiranagar Sanctuary Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-earth-indigo via-earth-indigo/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full text-clay space-y-3">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-vitality-coral animate-pulse" />
            <span className="font-sans text-[11px] font-bold text-vitality-coral uppercase tracking-widest">
              Currently Living Together • Indiranagar, Bengaluru
            </span>
          </div>
          <h1 className="font-serif text-headline-lg-mobile md:text-display-hero font-bold text-clay leading-tight drop-shadow-md">
            The Indiranagar Sanctuary
          </h1>
          <p className="font-sans text-xs md:text-sm text-surface-dim max-w-xl">
            Day 142 of our shared stay. 12th Main HAL 2nd Stage. Space is organized, energy is steady.
          </p>
        </div>
      </section>

      {/* Main Living OS Grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column (7 cols): Today's Rhythm & Responsibilities */}
        <div className="lg:col-span-7 space-y-8">
          <div className="border-b border-surface-dim pb-4 flex justify-between items-end flex-wrap gap-3">
            <div>
              <span className="font-sans text-[10px] font-bold text-vitality-coral uppercase tracking-widest">
                Daily Cadence
              </span>
              <h2 className="font-serif text-headline-md font-bold text-earth-indigo">
                Today's Rhythm
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsAddingTask((prev) => !prev)}
                className="px-3.5 py-1.5 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-sans text-xs font-bold rounded-full shadow-md hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
              <span className="font-sans text-xs font-bold text-secondary hidden sm:inline">
                {formatIndianDate(new Date())}
              </span>
            </div>
          </div>

          {/* Add Task Form Drawer */}
          {isAddingTask && (
            <form
              onSubmit={handleAddTask}
              className="p-6 bg-clay dark:bg-surface-low border border-vitality-coral/40 rounded-2xl shadow-xl space-y-4 animate-fade-in"
            >
              <div className="flex justify-between items-center border-b border-surface-dim pb-3">
                <h3 className="font-serif text-sm font-bold text-earth-indigo flex items-center gap-2">
                  <Plus className="w-4 h-4 text-vitality-coral" />
                  <span>Create Household Cadence Task</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddingTask(false)}
                  className="text-secondary hover:text-earth-indigo p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block font-sans text-[11px] font-bold text-secondary uppercase tracking-wider mb-1">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Balcony plants watering, Filter coffee beans restock"
                    className="w-full px-4 py-2.5 bg-surface-low dark:bg-surface-high border border-surface-dim rounded-xl font-sans text-xs text-earth-indigo focus:outline-none focus:border-vitality-coral"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[11px] font-bold text-secondary uppercase tracking-wider mb-1">
                    Details / Instructions
                  </label>
                  <input
                    type="text"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="e.g., 2 bottles of Roastery beans from 100ft Road"
                    className="w-full px-4 py-2.5 bg-surface-low dark:bg-surface-high border border-surface-dim rounded-xl font-sans text-xs text-earth-indigo focus:outline-none focus:border-vitality-coral"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-sans text-[11px] font-bold text-secondary uppercase tracking-wider mb-1">
                      Assigned Roommate
                    </label>
                    <select
                      value={newAssignee}
                      onChange={(e) => setNewAssignee(e.target.value)}
                      className="w-full px-3 py-2.5 bg-surface-low dark:bg-surface-high border border-surface-dim rounded-xl font-sans text-xs text-earth-indigo focus:outline-none focus:border-vitality-coral cursor-pointer"
                    >
                      <option value="My Turn">My Turn (You)</option>
                      <option value="Ananya's Turn">Ananya Sharma</option>
                      <option value="Rohan's Turn">Rohan Patil</option>
                      <option value="Shared Cadence">Shared Cadence</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={newUrgent}
                        onChange={(e) => setNewUrgent(e.target.checked)}
                        className="w-4 h-4 rounded text-vitality-coral accent-vitality-coral"
                      />
                      <span className="font-sans text-xs font-bold text-earth-indigo">
                        Mark as Urgent / Due Today
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingTask(false)}
                  className="px-4 py-2 bg-surface-low dark:bg-surface-high border border-surface-dim text-earth-indigo rounded-xl font-sans text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-vitality-coral hover:bg-vitality-coral/90 text-white rounded-xl font-sans text-xs font-bold shadow-md cursor-pointer"
                >
                  Add Task
                </button>
              </div>
            </form>
          )}

          {/* Task List */}
          <div className="space-y-4">
            {tasks.map((task) => {
              const isCompleted = completedTasks.includes(task.id);
              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 group ${
                    isCompleted
                      ? 'bg-surface-low dark:bg-surface-high/60 border-surface-dim opacity-70'
                      : 'bg-clay dark:bg-surface-low border-surface-dim hover:border-earth-indigo shadow-sm'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isCompleted
                        ? 'bg-trust-teal border-trust-teal text-white'
                        : 'border-secondary/40 text-transparent group-hover:border-vitality-coral'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3
                          className={`font-serif text-base font-bold text-earth-indigo transition-all ${
                            isCompleted ? 'line-through opacity-70' : ''
                          }`}
                        >
                          {task.title}
                        </h3>
                        {task.isUrgent && (
                          <span className="px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 font-sans text-[10px] font-bold uppercase tracking-wider">
                            Due Today
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-full bg-surface-low dark:bg-surface-high border border-surface-dim font-sans text-[10px] font-bold text-earth-indigo">
                          {task.assignedTo}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteTask(task.id, e)}
                        className="opacity-0 group-hover:opacity-100 text-secondary hover:text-red-500 p-1 transition-opacity cursor-pointer"
                        title="Delete Task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-sans text-xs text-secondary leading-relaxed">
                      {task.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Access Grid */}
          <div className="pt-4 grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => navigate('/stay/agreement/builder')}
              className="p-4 bg-clay dark:bg-surface-low border border-surface-dim rounded-2xl text-left hover:border-earth-indigo transition-all group cursor-pointer shadow-sm"
            >
              <FileText className="w-5 h-5 text-vitality-coral mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-serif text-xs font-bold text-earth-indigo">House Agreement</div>
              <span className="font-sans text-[10px] text-secondary">v2.1 Living OS</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/stay/expenses')}
              className="p-4 bg-clay dark:bg-surface-low border border-surface-dim rounded-2xl text-left hover:border-earth-indigo transition-all group cursor-pointer shadow-sm"
            >
              <Receipt className="w-5 h-5 text-trust-teal mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-serif text-xs font-bold text-earth-indigo">Expense Ledger</div>
              <span className="font-sans text-[10px] text-secondary">3 Active Splits</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/stay/safety')}
              className="p-4 bg-clay dark:bg-surface-low border border-surface-dim rounded-2xl text-left hover:border-earth-indigo transition-all group cursor-pointer shadow-sm"
            >
              <ShieldCheck className="w-5 h-5 text-earth-indigo mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-serif text-xs font-bold text-earth-indigo">Safety Center</div>
              <span className="font-sans text-[10px] text-secondary">Personal Control</span>
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Financial Equilibrium Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-clay dark:bg-surface-low border border-surface-dim rounded-3xl p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
              Financial Equilibrium
            </h3>

            <div className="text-center py-5 bg-surface-low dark:bg-surface-high rounded-2xl border border-surface-dim shadow-inner">
              <span className="font-sans text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">
                Your Net Balance
              </span>
              <div className="font-serif text-headline-lg font-bold text-vitality-coral">
                -₹950.00
              </div>
              <span className="font-sans text-[11px] text-secondary">You owe roommates</span>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center pb-3 border-b border-surface-dim">
                <div className="flex items-center gap-3">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A"
                    alt="Ananya"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-serif text-xs font-bold text-earth-indigo">Ananya</div>
                    <div className="font-sans text-[10px] text-secondary">For Nature’s Basket</div>
                  </div>
                </div>
                <span className="font-sans text-xs font-bold text-vitality-coral bg-vitality-coral/10 px-2 py-0.5 rounded-md border border-vitality-coral/20">-₹950.00</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-surface-dim">
                <div className="flex items-center gap-3">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2i8SWb4apq6U1es6wns7xbL7M0iATnV9B0tUPVJ8wkAcPPnSxWpkn7RkYeWkoEHQd0963RC1wXOpzAIpyr3-iHi_2rFrr0ee44glSA9C-3IMa8KVBFUuRkLkR7z5xDs39RTkQi5dodR4MExu9kttg4kfvaxAUCMKUutHCViobglnW4KmJvyEBm03D1AT5KE-6Vi3hF7cWFK6G_AwvFQE5R9fiVI_tgFyEztv6vxUoaqk8MaqskJEImQ"
                    alt="Rohan"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-serif text-xs font-bold text-earth-indigo">Rohan</div>
                    <div className="font-sans text-[10px] text-secondary">For Airtel Gigabit Fiber</div>
                  </div>
                </div>
                <span className="font-sans text-xs font-bold text-trust-teal bg-trust-teal/15 px-2 py-0.5 rounded-md border border-trust-teal/30">+₹400.00</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/stay/expenses')}
              className="w-full py-4 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-bold rounded-xl shadow-lg shadow-vitality-coral/25 transition-all uppercase tracking-wider text-xs cursor-pointer"
            >
              Settle Balances via UPI
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

// ============================================================================
// 5. LIVING AGREEMENT BUILDER (/stay/agreement/builder)
// ============================================================================
export const AgreementBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const [signed, setSigned] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [editNote, setEditNote] = useState('');

  const [dimensions, setDimensions] = useState([
    {
      id: 'dim-1',
      title: 'Rent Contribution',
      value: '₹18,500/mo per resident',
      note: 'Due by the 5th of each calendar month via UPI/NEFT to the designated flat account.',
    },
    {
      id: 'dim-2',
      title: 'Quiet Hours Rhythm',
      value: '10:30 PM – 7:00 AM Daily',
      note: 'Headphones mandatory in shared living zones after 10:30 PM. No loud speakers during work hours.',
    },
    {
      id: 'dim-3',
      title: 'Guest & Visitor Policy',
      value: '2 Nights Max / Week',
      note: 'Notify flatmates via Living OS 24 hours in advance for overnight visitors.',
    },
    {
      id: 'dim-4',
      title: 'Maid & Cook Schedule',
      value: 'Daily 8:30 AM Clean & Prep',
      note: 'Kitchen counter cleared and sink free of dishes before morning maid arrival.',
    },
  ]);

  const handleStartEdit = (dim: typeof dimensions[0]) => {
    setEditingId(dim.id);
    setEditValue(dim.value);
    setEditNote(dim.note);
  };

  const handleSaveEdit = (id: string) => {
    setDimensions((prev) =>
      prev.map((d) => (d.id === id ? { ...d, value: editValue, note: editNote } : d))
    );
    setEditingId(null);
  };

  return (
    <PageTransition className="min-h-screen flex flex-col md:flex-row relative">
      {/* Top Chapter Progress */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-surface-dim z-50">
        <div className="h-full bg-vitality-coral w-4/5" />
      </div>

      {/* Left Column (4 cols): Narrative & Context */}
      <div className="w-full md:w-4/12 p-8 md:p-14 border-r border-surface-dim bg-clay flex flex-col justify-between">
        <div className="space-y-6">
          <button
            type="button"
            onClick={() => navigate('/stay')}
            className="flex items-center gap-2 font-sans text-xs font-semibold text-secondary hover:text-earth-indigo transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Living OS</span>
          </button>

          <div className="space-y-2">
            <span className="font-sans text-[11px] font-bold text-vitality-coral uppercase tracking-widest">
              Chapter 04
            </span>
            <h1 className="font-serif text-headline-lg-mobile md:text-headline-lg font-bold text-earth-indigo">
              The Living Agreement
            </h1>
            <p className="font-sans text-xs text-secondary leading-relaxed">
              Co-living is an art of shared intention. Formalize mutual house standards before move-in. This document serves as the foundational understanding between you and your flatmates.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-surface-dim shadow-inner">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBALxpFa4YiBPqIYIB48o1H5Gr4Ze9OOCo5WX71jmokjiq3VCz7K0hgIHNTkTG3cjojinKawK0M3xpkx6WiH9Nldgg0VO9JSSATIPrYdCcdRTWikfOVypndm4IjfIeEItDOQM7Znk22vvlL7IwbZeoADMPyi_iMnQG_ucA-leaZaam4SA_5PykGhxdsq7edDZFZmz2TCh6b4Y15FRrYriSDIv6cXhzxXtxgfhHeSz2cGa8SYADbgtoYMw"
              alt="Living Agreement Paper"
              className="w-full h-44 object-cover"
            />
          </div>
        </div>

        <div className="pt-8 border-t border-surface-dim text-xs font-sans text-secondary">
          <span>Active Version: </span>
          <strong className="text-earth-indigo">v2.1 Roommate Living OS • Bengaluru</strong>
        </div>
      </div>

      {/* Right Column (8 cols): Interactive Dimensions */}
      <div className="w-full md:w-8/12 bg-earth-indigo text-clay p-8 md:p-14 overflow-y-auto space-y-8">
        <header className="border-b border-surface-dim/20 pb-4 space-y-1">
          <h2 className="font-serif text-headline-md font-bold text-clay">
            Establish Shared Dimensions
          </h2>
          <p className="font-sans text-xs text-surface-dim">
            Review, adjust, and formalize the agreements for The Indiranagar Sanctuary.
          </p>
        </header>

        <div className="space-y-4 max-w-2xl">
          {dimensions.map((dim) => {
            const isEditing = editingId === dim.id;
            return (
              <div
                key={dim.id}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-vitality-coral transition-colors space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-serif text-base font-bold text-clay">{dim.title}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => (isEditing ? handleSaveEdit(dim.id) : handleStartEdit(dim))}
                      className="text-xs text-surface-dim hover:text-vitality-coral flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>{isEditing ? 'Done' : 'Edit'}</span>
                    </button>
                    <span className="px-2.5 py-0.5 bg-trust-teal/30 text-trust-teal border border-trust-teal/40 rounded-full font-sans text-[10px] font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Agreed
                    </span>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-2 pt-1">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 font-sans text-xs text-clay focus:outline-none"
                    />
                    <textarea
                      rows={2}
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 font-sans text-xs text-clay focus:outline-none"
                    />
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => handleSaveEdit(dim.id)}
                      className="bg-vitality-coral text-clay text-xs font-bold py-1.5"
                    >
                      Save Dimension
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="font-sans text-xs font-bold text-vitality-coral">{dim.value}</div>
                    <p className="font-sans text-xs text-surface-dim leading-relaxed">{dim.note}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-4 max-w-2xl">
          {signed ? (
            <div className="p-4 bg-trust-teal/20 border border-trust-teal text-trust-teal rounded-xl text-center font-sans text-xs font-bold flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Living Agreement Confirmed and Cryptographically Signed by All 3 Flatmates</span>
            </div>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={() => setSigned(true)}
              className="w-full py-4 bg-vitality-coral hover:bg-vitality-coral/90 text-clay font-bold rounded-xl shadow-lg shadow-vitality-coral/30 uppercase tracking-wider text-xs cursor-pointer"
            >
              Confirm & Sign Agreement
            </Button>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

// ============================================================================
// 6. SHARED EXPENSES (/stay/expenses)
// ============================================================================
export const ExpensesPage: React.FC = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState<DemoExpenseItem[]>(INITIAL_INDIAN_EXPENSES);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState<DemoExpenseItem['category']>('Groceries');
  const [showAddForm, setShowAddForm] = useState(false);

  // Dynamic calculations
  const totalHouseholdSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const isSettled = expenses.every((e) => e.status === 'Settled');
  const pendingUserOwed = expenses
    .filter((e) => e.status === 'Pending')
    .reduce((sum, e) => sum + (e.paidBy === 'You' ? -(e.amount * 0.66) : e.userShare), 0);

  const handleSettle = () => {
    setExpenses((prev) =>
      prev.map((e) => ({ ...e, status: 'Settled' }))
    );
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAmount) return;
    const amountVal = Number(newAmount);
    const added: DemoExpenseItem = {
      id: `exp-${Date.now()}`,
      title: newTitle,
      amount: amountVal,
      paidBy: 'You',
      category: newCategory,
      date: 'Today',
      userShare: -(amountVal * 0.66),
      status: 'Pending',
    };
    setExpenses([added, ...expenses]);
    setNewTitle('');
    setNewAmount('');
    setShowAddForm(false);
  };

  return (
    <PageTransition className="min-h-screen max-w-4xl mx-auto p-6 md:p-12 space-y-8">
      <div className="flex items-center justify-between border-b border-surface-dim pb-4">
        <button
          type="button"
          onClick={() => navigate('/stay')}
          className="flex items-center gap-2 font-sans text-xs font-semibold text-secondary hover:text-earth-indigo transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Living OS</span>
        </button>
        <span className="font-serif text-headline-sm font-bold text-earth-indigo">
          Shared Household Ledger
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-clay border border-surface-dim rounded-3xl p-6 space-y-2">
          <span className="font-sans text-[10px] font-bold text-secondary uppercase tracking-wider">
            Total Household Spent
          </span>
          <div className="font-serif text-headline-lg font-bold text-earth-indigo">
            {formatINR(totalHouseholdSpent)}
          </div>
          <p className="font-sans text-xs text-secondary">
            Shared equally among Ananya, Rohan, and You ({expenses.length} total entries).
          </p>
        </div>

        <div className="bg-earth-indigo text-clay rounded-3xl p-6 flex flex-col justify-between">
          <span className="font-sans text-[10px] font-bold text-surface-dim uppercase tracking-wider">
            Your Net Balance
          </span>
          <div className="font-serif text-headline-lg font-bold text-vitality-coral">
            {isSettled || pendingUserOwed === 0 ? '₹0.00' : pendingUserOwed > 0 ? `+${formatINR(pendingUserOwed)}` : `-${formatINR(Math.abs(pendingUserOwed))}`}
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-surface-dim">
              {isSettled ? 'All shared balances settled via UPI' : 'Pending settlement among flatmates'}
            </span>
            <button
              type="button"
              onClick={handleSettle}
              disabled={isSettled}
              className={`px-4 py-2 rounded-xl font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer ${
                isSettled
                  ? 'bg-trust-teal text-white cursor-default'
                  : 'bg-vitality-coral text-clay hover:bg-vitality-coral/90'
              }`}
            >
              {isSettled ? '✓ All Settled' : 'Pay Now via UPI'}
            </button>
          </div>
        </div>
      </div>

      {/* Expense List Header with Add Button */}
      <div className="flex justify-between items-center pt-4">
        <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">Recent Ledger</h3>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Close' : 'Add Expense'}</span>
        </Button>
      </div>

      {/* Add Expense Form Drawer */}
      {showAddForm && (
        <form
          onSubmit={handleAddExpense}
          className="bg-clay border border-surface-dim rounded-3xl p-6 space-y-4"
        >
          <h4 className="font-serif text-sm font-bold text-earth-indigo">Record New Expense</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Expense Description (e.g. Filter Coffee / Water Purifier)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-white dark:bg-surface-low border border-surface-dim rounded-xl px-4 py-2.5 font-sans text-xs text-earth-indigo"
              required
            />
            <input
              type="number"
              placeholder="Amount (₹)"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="bg-white dark:bg-surface-low border border-surface-dim rounded-xl px-4 py-2.5 font-sans text-xs text-earth-indigo"
              required
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as DemoExpenseItem['category'])}
              className="bg-white dark:bg-surface-low border border-surface-dim rounded-xl px-4 py-2.5 font-sans text-xs text-earth-indigo cursor-pointer"
            >
              <option value="Groceries">Groceries</option>
              <option value="Utilities">Utilities</option>
              <option value="Supplies">Supplies</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="bg-vitality-coral text-clay font-bold cursor-pointer">
              Save Expense
            </Button>
          </div>
        </form>
      )}

      {/* Ledger Table */}
      <div className="space-y-3">
        {expenses.map((exp) => (
          <div
            key={exp.id}
            className="bg-clay border border-surface-dim rounded-2xl p-5 flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-low flex items-center justify-center text-earth-indigo">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-earth-indigo">{exp.title}</h4>
                <div className="font-sans text-[10px] text-secondary">
                  Paid by <strong className="text-earth-indigo">{exp.paidBy}</strong> · {exp.date}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-serif text-sm font-bold text-earth-indigo">
                  {formatINR(exp.amount)}
                </div>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full font-sans text-[9px] font-bold uppercase tracking-wider ${
                    exp.status === 'Settled'
                      ? 'bg-trust-teal/15 text-trust-teal'
                      : 'bg-vitality-coral/15 text-vitality-coral'
                  }`}
                >
                  {exp.status}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteExpense(exp.id)}
                className="p-1.5 text-secondary hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                title="Delete expense"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageTransition>
  );
};

// ============================================================================
// 7. SAFETY CENTER & DISCREET CONTROLS (/stay/safety)
// ============================================================================
export const SafetyCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const [incidentText, setIncidentText] = useState('');
  const [reportReference, setReportReference] = useState<string | null>(null);
  const [showExitRights, setShowExitRights] = useState(false);
  const [consultationRequested, setConsultationRequested] = useState(false);
  const [activeCallStatus, setActiveCallStatus] = useState<string | null>(null);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentText.trim()) return;
    const refId = `SAFE-${Date.now().toString().slice(-6)}`;
    setReportReference(refId);
    setIncidentText('');
  };

  const handleEmergencyCall = () => {
    setActiveCallStatus('Emergency dispatch initiated (Dialing 112 National Emergency Helpline).');
    window.location.href = 'tel:112';
  };

  const handleDeskCall = () => {
    setActiveCallStatus('Connecting to Indiranagar Residency Concierge Desk (+91-80-5550-1920).');
    window.location.href = 'tel:+918055501920';
  };

  return (
    <PageTransition className="min-h-screen max-w-4xl mx-auto p-6 md:p-12 space-y-8">
      <div className="flex items-center justify-between border-b border-surface-dim pb-4">
        <button
          type="button"
          onClick={() => navigate('/stay')}
          className="flex items-center gap-2 font-sans text-xs font-semibold text-secondary hover:text-earth-indigo transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Living OS</span>
        </button>
        <span className="font-serif text-headline-sm font-bold text-earth-indigo">
          Safety Center
        </span>
      </div>

      <div className="space-y-2">
        <span className="font-sans text-[11px] font-bold text-vitality-coral uppercase tracking-widest">
          Personal Control & Protection
        </span>
        <h1 className="font-serif text-headline-lg-mobile md:text-headline-md font-bold text-earth-indigo">
          Safety & Support Infrastructure
        </h1>
        <p className="font-sans text-xs text-secondary max-w-lg leading-relaxed">
          Your autonomy and personal well-being are paramount. Access 24/7 emergency dispatch, quiet lease exit protocols, and confidential trust escalation.
        </p>
      </div>

      {activeCallStatus && (
        <div className="p-4 bg-earth-indigo text-clay rounded-2xl font-sans text-xs font-bold flex items-center justify-between gap-2 shadow-lg">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-vitality-coral animate-pulse" />
            <span>{activeCallStatus}</span>
          </div>
          <button
            type="button"
            onClick={() => setActiveCallStatus(null)}
            className="text-surface-dim hover:text-clay text-xs underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Immediate Emergency Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-300">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold text-red-900 dark:text-red-200">National Emergency Services</h3>
              <p className="font-sans text-[11px] text-red-700 dark:text-red-300">Dial 112 (All-in-One Police, Ambulance, Fire)</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleEmergencyCall}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Call 112 Helpline
          </button>
        </div>

        <div className="bg-clay border border-surface-dim rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-low flex items-center justify-center text-trust-teal">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold text-earth-indigo">Building & Concierge Desk</h3>
              <p className="font-sans text-[11px] text-secondary">HAL 2nd Stage Security & Front Desk (+91-80-5550-1920)</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDeskCall}
            className="w-full py-3 bg-earth-indigo hover:bg-vitality-coral text-clay font-bold rounded-xl font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Contact Building Desk
          </button>
        </div>
      </div>

      {/* Discreet Incident Report Form */}
      <div className="bg-clay border border-surface-dim rounded-3xl p-8 space-y-6">
        <h3 className="font-serif text-headline-sm font-bold text-earth-indigo flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-vitality-coral" />
          <span>Discreet Household Report</span>
        </h3>
        <p className="font-sans text-xs text-secondary leading-relaxed">
          Reports are reviewed directly by Roommate Trust Specialists and are never shared with flatmates without your explicit written approval.
        </p>

        {reportReference ? (
          <div className="p-5 bg-trust-teal/20 border border-trust-teal text-trust-teal rounded-2xl font-sans text-xs font-bold space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span>Report registered (Ref #{reportReference}).</span>
            </div>
            <p className="text-xs text-secondary">
              A Roommate trust officer will contact you discreetly on your registered phone within 2 hours.
            </p>
            <button
              type="button"
              onClick={() => setReportReference(null)}
              className="text-xs underline text-earth-indigo font-bold pt-1 cursor-pointer"
            >
              Submit another report
            </button>
          </div>
        ) : (
          <form onSubmit={handleReportSubmit} className="space-y-4">
            <textarea
              rows={4}
              value={incidentText}
              onChange={(e) => setIncidentText(e.target.value)}
              placeholder="Describe any safety, quiet hour violation, or flatmate concerns in strict confidence..."
              className="w-full bg-white dark:bg-surface-low border border-surface-dim rounded-2xl p-4 font-sans text-xs text-earth-indigo focus:outline-none"
              required
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="bg-vitality-coral text-clay font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer"
            >
              Submit Discreet Report
            </Button>
          </form>
        )}
      </div>

      {/* Quiet Exit Protocol */}
      <div className="bg-white dark:bg-surface-low border border-surface-dim rounded-3xl p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-serif text-base font-bold text-earth-indigo flex items-center gap-2">
              <UserX className="w-4 h-4 text-secondary" />
              <span>Quiet Exit Protocol</span>
            </h4>
            <p className="font-sans text-xs text-secondary max-w-md">
              Need to relocate? Review your standard 30-day notice rights and deposit security protection under Roommate Tenancy Guidelines.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowExitRights(!showExitRights)}
            className="font-bold text-xs uppercase tracking-wider shrink-0 cursor-pointer"
          >
            {showExitRights ? 'Close Rights' : 'Review Exit Rights'}
          </Button>
        </div>

        {showExitRights && (
          <div className="pt-4 border-t border-surface-dim space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
              <div className="bg-surface-low dark:bg-surface-container p-4 rounded-xl space-y-1">
                <span className="font-bold text-earth-indigo block">1. 30-Day Notice</span>
                <span className="text-secondary text-[11px]">Submit confidential notification without room friction.</span>
              </div>
              <div className="bg-surface-low dark:bg-surface-container p-4 rounded-xl space-y-1">
                <span className="font-bold text-earth-indigo block">2. Security Deposit Shield</span>
                <span className="text-secondary text-[11px]">Direct transfer or settlement upon verified replacement.</span>
              </div>
              <div className="bg-surface-low dark:bg-surface-container p-4 rounded-xl space-y-1">
                <span className="font-bold text-earth-indigo block">3. Living OS Concierge</span>
                <span className="text-secondary text-[11px]">Assistance with replacement vetting & handover.</span>
              </div>
            </div>

            {consultationRequested ? (
              <div className="p-3 bg-trust-teal/15 text-trust-teal rounded-xl text-xs font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Mediated departure consultation requested. A specialist will reach out confidentially.</span>
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setConsultationRequested(true)}
                className="bg-earth-indigo text-clay font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Request Confidential Departure Consultation
              </Button>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

// ============================================================================
// 8. TRAVEL MODE JOURNEY (/travel)
// ============================================================================
export const TravelModePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>('bengaluru');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<'2_weeks' | '1_month' | '3_months'>('1_month');
  const [budgetSlider, setBudgetSlider] = useState<number>(25000);
  const [isStayModalOpen, setIsStayModalOpen] = useState(false);

  const destinations = INDIAN_DEMO_DESTINATIONS;

  const currentDestination =
    destinations.find((d) => d.id === selectedDestinationId) || destinations[0];

  // Filter destinations by search query
  const filteredDestinations = searchQuery.trim()
    ? destinations.filter(
        (d) =>
          d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.neighborhoods.some((n) => n.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : destinations;

  // Curated rooms matching current city
  const cityRooms = INDIAN_DEMO_ROOMS.filter(
    (r) =>
      r.city.toLowerCase().includes(currentDestination.city.toLowerCase()) ||
      r.state.toLowerCase().includes(currentDestination.state.toLowerCase()) ||
      (currentDestination.id === 'delhi' && r.city.toLowerCase().includes('delhi'))
  );

  // Compatible residents matching current city
  const cityResidents = INDIAN_DEMO_PROFILES.filter((p) =>
    p.preferredLocations.some(
      (loc) =>
        loc.toLowerCase().includes(currentDestination.city.toLowerCase()) ||
        (currentDestination.id === 'delhi' && loc.toLowerCase().includes('delhi'))
    )
  );

  return (
    <PageTransition className="min-h-screen pb-24 relative overflow-x-hidden bg-clay text-earth-indigo transition-colors duration-200">
      {/* Top Chapter Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-surface-dim z-50">
        <div className="h-full bg-vitality-coral w-2/3 transition-all duration-700" />
      </div>

      {/* Cinematic Hero Section */}
      <section className="relative w-full min-h-[580px] lg:min-h-[620px] overflow-hidden rounded-b-[2.5rem] bg-earth-indigo flex flex-col justify-end">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay transition-all duration-700 scale-105"
          style={{
            backgroundImage: `url('${currentDestination.heroImageUrl}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-clay via-clay/70 to-transparent dark:from-surface-low dark:via-surface-low/80" />

        <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-6xl mx-auto w-full space-y-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-vitality-coral text-white font-sans text-[10px] font-bold uppercase tracking-widest shadow-md">
                ROOMMATE Living OS • Travel Mode
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 font-sans text-xs font-bold text-trust-teal">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Cohabitation Network</span>
              </span>
            </div>

            <h1 className="font-serif text-headline-lg-mobile sm:text-headline-lg md:text-display-hero font-bold text-earth-indigo leading-[1.15]">
              Explore a City. Find Your People. Live Differently.
            </h1>

            <p className="font-sans text-body-md text-secondary leading-relaxed max-w-2xl">
              Don’t just visit a city as a tourist. Discover where you could actually live — understand neighborhood circadian rhythms, inspect quiet-hour acoustics, connect with verified roommates, and plan a temporary living trial.
            </p>
          </div>

          {/* Interactive Search & Filter Desk */}
          <div className="bg-clay/95 dark:bg-surface-high/95 backdrop-blur-xl border border-surface-dim rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search Destination Input */}
              <div className="md:col-span-5 relative">
                <label className="font-sans text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1.5">
                  Destination or Neighborhood
                </label>
                <div className="flex items-center border border-surface-dim rounded-2xl px-4 py-3 bg-surface-low dark:bg-surface-container focus-within:border-earth-indigo transition-colors">
                  <Compass className="w-4 h-4 text-vitality-coral mr-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Bengaluru, Indiranagar, Bandra, Baner..."
                    className="w-full bg-transparent font-sans text-xs font-bold text-earth-indigo placeholder:text-secondary focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="w-4 h-4 text-secondary hover:text-earth-indigo"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Monthly Budget Slider */}
              <div className="md:col-span-4 space-y-1.5">
                <div className="flex justify-between font-sans text-[10px] font-bold uppercase text-secondary">
                  <span>Target Monthly Rent</span>
                  <span className="text-vitality-coral text-xs">{formatINR(budgetSlider)} / mo</span>
                </div>
                <input
                  type="range"
                  min="12000"
                  max="60000"
                  step="2000"
                  value={budgetSlider}
                  onChange={(e) => setBudgetSlider(Number(e.target.value))}
                  className="w-full accent-vitality-coral cursor-pointer"
                />
              </div>

              {/* Stay Duration Selector */}
              <div className="md:col-span-3 space-y-1.5">
                <label className="font-sans text-[10px] font-bold text-secondary uppercase tracking-wider block">
                  Stay Duration
                </label>
                <div className="grid grid-cols-3 gap-1.5 font-sans text-xs">
                  {[
                    { id: '2_weeks', label: '2 Wks' },
                    { id: '1_month', label: '1 Mo' },
                    { id: '3_months', label: '3 Mos' },
                  ].map((dur) => (
                    <button
                      key={dur.id}
                      type="button"
                      onClick={() => setSelectedDuration(dur.id as any)}
                      className={`py-2.5 rounded-xl font-bold transition-all text-center cursor-pointer ${
                        selectedDuration === dur.id
                          ? 'bg-earth-indigo text-clay shadow-sm'
                          : 'bg-surface-low border border-surface-dim text-secondary hover:text-earth-indigo'
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Destination Navigation Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-surface-dim/50 font-sans text-xs">
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider mr-1">
                Popular Hubs:
              </span>
              {destinations.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    setSelectedDestinationId(d.id);
                    setSearchQuery('');
                  }}
                  className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedDestinationId === d.id
                      ? 'bg-vitality-coral text-white shadow-md'
                      : 'bg-surface-low border border-surface-dim text-secondary hover:text-earth-indigo'
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  <span>{d.city}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Destination Discovery Body */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-14 py-12 space-y-16">
        {/* 1. All Curated Indian Destinations Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-surface-dim pb-4">
            <div>
              <span className="font-sans text-[10px] font-bold text-vitality-coral uppercase tracking-widest block">
                Destination Portfolio
              </span>
              <h2 className="font-serif text-headline-lg font-bold text-earth-indigo">
                Curated Indian Living Hubs
              </h2>
            </div>
            <p className="font-sans text-xs text-secondary max-w-sm">
              Select any city to deep-dive into its neighborhoods, living costs, verified cohabitants, and residency trial blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                isSelected={dest.id === selectedDestinationId}
                onSelect={(id) => setSelectedDestinationId(id)}
              />
            ))}
          </div>
        </section>

        {/* 2. Selected Destination Deep-Dive Experience */}
        <section className="space-y-12 pt-6">
          {/* Destination Header Banner */}
          <div className="bg-clay dark:bg-surface-low border border-surface-dim rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-vitality-coral/15 text-vitality-coral font-sans text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Active Exploration Context
                </span>
                <span className="font-sans text-xs text-secondary font-bold">
                  {currentDestination.state}
                </span>
              </div>

              <h2 className="font-serif text-headline-lg font-bold text-earth-indigo">
                {currentDestination.city} — {currentDestination.tagline}
              </h2>

              <p className="font-sans text-xs text-secondary leading-relaxed">
                {currentDestination.description}
              </p>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 font-sans text-xs font-bold">
              <button
                type="button"
                onClick={() => setIsStayModalOpen(true)}
                className="px-6 py-3.5 bg-vitality-coral hover:bg-vitality-coral/90 text-white rounded-2xl shadow-lg shadow-vitality-coral/25 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <Sparkles className="w-4 h-4" />
                <span>Plan Living Trial</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/spatial')}
                className="px-6 py-3 bg-surface-low dark:bg-surface-container border border-surface-dim hover:border-earth-indigo text-earth-indigo rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Compass className="w-4 h-4 text-vitality-coral" />
                <span>Launch 3D Spatial City</span>
              </button>
            </div>
          </div>

          {/* 3. City Snapshot Component */}
          <CitySnapshot destination={currentDestination} />

          {/* 4. Neighborhoods Exploration Grid */}
          <NeighborhoodGrid
            neighborhoods={currentDestination.neighborhoods}
            cityName={currentDestination.city}
          />

          {/* 5. Available Curated Rooms in this Destination */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-surface-dim pb-4">
              <div>
                <span className="font-sans text-[10px] font-bold text-vitality-coral uppercase tracking-widest block">
                  Living Spaces • {currentDestination.city}
                </span>
                <h3 className="font-serif text-headline-md font-bold text-earth-indigo">
                  Available Co-Living Suites & Studios
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/discover')}
                className="font-sans text-xs font-bold text-vitality-coral hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Browse all {currentDestination.city} rooms</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {cityRooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cityRooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => navigate(`/rooms/${room.id}`)}
                    className="bg-clay dark:bg-surface-low border border-surface-dim rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="h-52 w-full relative overflow-hidden bg-earth-indigo">
                      <img
                        src={room.imageUrl}
                        alt={room.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white font-sans text-[10px] font-bold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-vitality-coral" />
                        <span>{room.neighborhood}</span>
                      </div>
                      <div className="absolute top-3 right-3 bg-vitality-coral text-white font-sans text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                        98% Match
                      </div>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="font-sans text-[10px] font-bold text-vitality-coral uppercase">
                          {room.neighborhood}, {room.city}
                        </span>
                        <h4 className="font-serif text-base font-bold text-earth-indigo group-hover:text-vitality-coral transition-colors line-clamp-1">
                          {room.title}
                        </h4>
                        <p className="font-sans text-xs text-secondary line-clamp-2">
                          {room.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-surface-dim flex items-center justify-between font-sans">
                        <div>
                          <span className="text-[10px] text-secondary block">Monthly Rent</span>
                          <span className="font-serif text-sm font-bold text-earth-indigo">
                            {formatINR(room.monthlyRent)} <span className="text-[10px] font-normal text-secondary">/ mo</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-bold text-vitality-coral group-hover:translate-x-1 transition-transform">
                          <span>View Room</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-surface-low rounded-2xl text-center space-y-2">
                <Home className="w-8 h-8 mx-auto text-secondary" />
                <h4 className="font-serif text-sm font-bold text-earth-indigo">
                  No direct rooms listed in this sector yet
                </h4>
                <p className="font-sans text-xs text-secondary">
                  Explore neighboring sectors or check cohabitants in {currentDestination.city}.
                </p>
              </div>
            )}
          </div>

          {/* 6. Compatible Verified Residents Living Here */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-surface-dim pb-4">
              <div>
                <span className="font-sans text-[10px] font-bold text-vitality-coral uppercase tracking-widest block">
                  Cohabitant Synergies • {currentDestination.city}
                </span>
                <h3 className="font-serif text-headline-md font-bold text-earth-indigo">
                  People Already Living Here
                </h3>
              </div>
              <p className="font-sans text-xs text-secondary max-w-sm">
                Connect with verified residents to discuss shared lease openings, morning routines, and quiet hours.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cityResidents.map((profile) => (
                <div
                  key={profile.id}
                  className="bg-clay dark:bg-surface-low border border-surface-dim rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-surface-dim shrink-0 shadow-md">
                      <img
                        src={profile.avatarUrl}
                        alt={profile.displayName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-serif text-base font-bold text-earth-indigo">
                            {profile.displayName}
                          </h4>
                          <ShieldCheck className="w-4 h-4 text-trust-teal" />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-vitality-coral/15 text-vitality-coral font-sans text-[10px] font-bold">
                          98% Fit
                        </span>
                      </div>

                      <p className="font-sans text-xs text-secondary font-medium">
                        {profile.headline}
                      </p>

                      <div className="flex items-center gap-1 text-[11px] text-secondary mt-1 font-sans">
                        <MapPin className="w-3 h-3 text-vitality-coral shrink-0" />
                        <span className="truncate">{profile.preferredLocations.join(' • ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio & Tags */}
                  <p className="font-sans text-xs text-secondary leading-relaxed">
                    "{profile.bio}"
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {profile.visualTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 bg-surface-low dark:bg-surface-container border border-surface-dim rounded-full font-sans text-[10px] font-bold text-earth-indigo"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Resident Action Row */}
                  <div className="pt-3 border-t border-surface-dim flex gap-2 font-sans text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => navigate('/messages/conversation-ananya')}
                      className="flex-1 py-2.5 bg-vitality-coral hover:bg-vitality-coral/90 text-white rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider text-[11px]"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Message in Chat</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate('/compatibility-lab')}
                      className="flex-1 py-2.5 bg-surface-low dark:bg-surface-container border border-surface-dim hover:border-earth-indigo text-earth-indigo rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors text-[11px]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-vitality-coral" />
                      <span>Check Synergy</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/profile/${profile.id}`)}
                      className="px-3 py-2.5 bg-surface-low border border-surface-dim hover:border-earth-indigo text-secondary hover:text-earth-indigo rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                      title="View Verified Trust DNA"
                    >
                      <ShieldCheck className="w-4 h-4 text-trust-teal" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Living Trial Itinerary Blueprint Component */}
          <LivingItinerary
            cityName={currentDestination.city}
            itinerary={currentDestination.livingItinerary}
          />

          {/* 8. 3D Spatial District Experience Banner */}
          <div
            onClick={() => navigate('/spatial')}
            className="bg-earth-indigo text-clay rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 cursor-pointer hover:bg-earth-indigo/95 transition-all group"
          >
            <div className="flex items-start sm:items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-vitality-coral/20 border border-vitality-coral/50 flex items-center justify-center text-vitality-coral shrink-0 shadow-lg">
                <Compass className="w-7 h-7 group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <div className="space-y-1">
                <span className="font-sans text-[10px] font-bold text-vitality-coral uppercase tracking-widest block">
                  WebGL Spatial Engine
                </span>
                <h4 className="font-serif text-headline-sm sm:text-headline-md font-bold text-clay">
                  Explore {currentDestination.city} in 3D Spatial Layout
                </h4>
                <p className="font-sans text-xs text-surface-dim max-w-xl leading-relaxed">
                  Navigate interactive 3D spatial node topologies, discover acoustic tranquility ratings, transit subway lines, and neighborhood cafes.
                </p>
              </div>
            </div>

            <span className="px-6 py-3.5 bg-vitality-coral text-white font-sans text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 shrink-0 uppercase tracking-wider group-hover:scale-105 transition-transform">
              <span>Launch 3D Canvas</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </section>
      </div>

      {/* Stay Intent Modal */}
      <StayIntentModal
        destination={currentDestination}
        isOpen={isStayModalOpen}
        onClose={() => setIsStayModalOpen(false)}
      />
    </PageTransition>
  );
};

