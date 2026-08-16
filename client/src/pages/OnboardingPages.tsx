import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Search,
  Check,
  Moon,
  Sun,
  Sunrise,
  Sparkle,
  Coffee,
  Volume2,
  VolumeX,
  Music,
  PartyPopper,
  Users,
  Home,
  Laptop,
  Briefcase,
  Heart,
  Dog,
  Cat,
  Leaf,
  ShieldAlert,
  Clock,
  DollarSign,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import {
  OnboardingSidebar,
  RangeSlider,
  UploadDropzone,
  SelectionChip,
  DNAVisualizer,
} from '../components/onboarding/index.js';
import { UnderlineInput, Button } from '../components/foundation/index.js';
import { PageTransition } from '../components/motion/index.js';
import { profileService } from '../services/index.js';
import { formatINR } from '../utils/localization.js';

// ============================================================================
// ONBOARDING CHAPTER 01: IDENTITY & ESSENCE
// ============================================================================
export const OnboardingChapter1Page: React.FC = () => {
  const navigate = useNavigate();

  // Form State with LocalStorage Draft Persistence
  const [firstName, setFirstName] = useState(() => localStorage.getItem('onboard_ch1_first') || 'Priya');
  const [lastName, setLastName] = useState(() => localStorage.getItem('onboard_ch1_last') || 'Sundaram');
  const [gender, setGender] = useState(() => localStorage.getItem('onboard_ch1_gender') || 'Female');
  const [occupation, setOccupation] = useState(() => localStorage.getItem('onboard_ch1_occ') || 'Visual Designer & Creative Technologist');
  const [budget, setBudget] = useState(() => Number(localStorage.getItem('onboard_ch1_budget')) || 26000);
  const [city, setCity] = useState(() => localStorage.getItem('onboard_ch1_city') || 'Indiranagar, Bengaluru');
  const [vibe, setVibe] = useState(() => localStorage.getItem('onboard_ch1_vibe') || 'urban');
  const [photo, setPhoto] = useState<string | null>(() => localStorage.getItem('onboard_ch1_photo') || null);

  const [saving, setSaving] = useState(false);

  // Auto-save draft on changes
  useEffect(() => {
    localStorage.setItem('onboard_ch1_first', firstName);
    localStorage.setItem('onboard_ch1_last', lastName);
    localStorage.setItem('onboard_ch1_gender', gender);
    localStorage.setItem('onboard_ch1_occ', occupation);
    localStorage.setItem('onboard_ch1_budget', String(budget));
    localStorage.setItem('onboard_ch1_city', city);
    localStorage.setItem('onboard_ch1_vibe', vibe);
    if (photo) {
      localStorage.setItem('onboard_ch1_photo', photo);
    } else {
      localStorage.removeItem('onboard_ch1_photo');
    }
  }, [firstName, lastName, gender, occupation, budget, city, vibe, photo]);

  const handleSaveProgress = async () => {
    try {
      await profileService.saveOnboardingChapter1({
        displayName: `${firstName} ${lastName}`.trim() || 'Priya Sundaram',
        headline: occupation ? `${occupation} in ${city}` : 'Verified Resident',
        budgetRange: { min: Math.max(8000, budget - 4000), max: budget + 4000, currency: 'INR' },
        preferredLocations: [city],
      });
    } catch {
      // Local draft is already persisted
    }
  };

  const handleSaveAndContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await handleSaveProgress();
    setSaving(false);
    navigate('/onboarding/chapter-2');
  };

  return (
    <div className="bg-clay-container min-h-screen flex flex-col font-sans selection:bg-vitality-coral selection:text-white">
      {/* 25% Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-surface-dim z-50">
        <div className="h-full bg-vitality-coral w-1/4 transition-all duration-500" />
      </div>

      {/* Desktop Sidebar Navigation */}
      <OnboardingSidebar currentChapter={1} userAvatar={photo || undefined} onSaveProgress={handleSaveProgress} />

      {/* Main Chapter Layout */}
      <main className="flex-1 lg:ml-72 flex flex-col md:flex-row relative">
        {/* Left Chapter Narrative Column */}
        <div className="w-full md:w-5/12 lg:w-4/12 p-8 md:p-12 lg:p-16 md:sticky md:top-0 md:h-screen flex flex-col justify-center bg-surface-low border-b md:border-b-0 md:border-r border-surface-dim">
          <div className="max-w-sm space-y-4">
            <span className="font-sans text-label-caps text-vitality-coral uppercase tracking-widest block font-bold">
              Chapter 01
            </span>
            <h1 className="font-serif text-headline-lg-mobile md:text-headline-lg text-earth-indigo font-bold leading-tight">
              Who are you, really?
            </h1>
            <p className="font-sans text-body-lg text-secondary leading-relaxed">
              Let's start with the basics. A great co-living experience begins with understanding your unique rhythm and where you want to anchor your next chapter.
            </p>
            <div className="hidden md:block w-full h-56 rounded-2xl overflow-hidden mt-6 shadow-md border border-surface-dim">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDusuocyHaArev_hEWiYk5VtyF_A1CM-4q8-kT-uN0n9rLDSR7-_6yxHxKk1IdrCU-2obZq36Ycy5hf087ezhHWXGIk4WiUiud6gvmmDgseKashyegsAMdcIUsl5ANryEty6pJzbyIxqLBg-xh92Pbbu6uW1X13n2kW7xREYWimTV1SDir_bIXFBr5zam-KVQ-DjQJlUCR7PEFXXkJYptKA7LEtyzBHxjvOLSqy8IicEYns8n0RH8F0ew"
                alt="Architectural light detail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="w-full md:w-7/12 lg:w-8/12 p-8 md:p-12 lg:p-16 pb-36">
          <PageTransition>
            <form onSubmit={handleSaveAndContinue} className="max-w-2xl mx-auto space-y-10">
              {/* Section 1: The Basics */}
              <div className="bg-clay p-8 rounded-2xl border border-surface-dim shadow-sm space-y-6">
                <h2 className="font-serif text-headline-sm text-earth-indigo font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-vitality-coral" />
                  <span>The Basics</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <UnderlineInput
                    label="First Name"
                    placeholder="e.g. Priya"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <UnderlineInput
                    label="Last Name"
                    placeholder="e.g. Sundaram"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <UnderlineInput
                  label="Occupation / Creative Practice"
                  placeholder="e.g. Spatial Architect & Product Designer"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />

                {/* Identity Pills */}
                <div className="space-y-2">
                  <label className="block font-sans text-label-caps text-secondary uppercase font-bold tracking-wider">
                    I identify as
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {['Female', 'Male', 'Non-Binary', 'Prefer not to say'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`px-4 py-2 rounded-full font-sans text-ui-medium font-semibold transition-all cursor-pointer ${
                          gender === g
                            ? 'bg-earth-indigo text-clay border-2 border-earth-indigo shadow-sm'
                            : 'bg-clay-container text-secondary border border-surface-dim hover:border-earth-indigo'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 2: Budget & Profile Photo */}
              <div className="bg-clay p-8 rounded-2xl border border-surface-dim shadow-sm space-y-8">
                <RangeSlider
                  label="Target Monthly Budget"
                  min={8000}
                  max={60000}
                  step={1000}
                  value={budget}
                  onChange={setBudget}
                  formatValue={(v) => formatINR(v)}
                  helperText="Your budget helps match you with compatible rooms and co-living agreements."
                />

                <UploadDropzone
                  label="Profile Portrait"
                  currentImage={photo || undefined}
                  onImageChange={setPhoto}
                />
              </div>

              {/* Section 3: Destination & Vibe */}
              <div className="bg-clay p-8 rounded-2xl border border-surface-dim shadow-sm space-y-6">
                <h2 className="font-serif text-headline-sm text-earth-indigo font-bold">
                  Destination & Living Vibe
                </h2>

                <div className="relative">
                  <label className="block font-sans text-label-caps text-secondary uppercase font-bold mb-2">
                    Target City / Neighborhood
                  </label>
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Indiranagar, Bengaluru / Bandra, Mumbai"
                      className="w-full pl-11 pr-4 py-3 bg-surface-low border border-surface-dim rounded-xl font-sans text-body-md text-earth-indigo focus:outline-none focus:border-earth-indigo transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block font-sans text-label-caps text-secondary uppercase font-bold">
                    Preferred Vibe
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setVibe('quiet')}
                      className={`border rounded-xl p-4 text-left transition-all flex items-start gap-3 cursor-pointer ${
                        vibe === 'quiet'
                          ? 'border-2 border-earth-indigo bg-surface-low shadow-sm'
                          : 'border-surface-dim bg-clay hover:border-earth-indigo/60'
                      }`}
                    >
                      <Coffee className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <div>
                        <div className="font-sans text-ui-medium font-bold text-earth-indigo">
                          Quiet & Green
                        </div>
                        <div className="font-sans text-xs text-secondary mt-0.5">
                          Residential, tree-lined, slower pace of life.
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVibe('urban')}
                      className={`border rounded-xl p-4 text-left transition-all flex items-start gap-3 relative overflow-hidden cursor-pointer ${
                        vibe === 'urban'
                          ? 'border-2 border-earth-indigo bg-surface-low shadow-sm'
                          : 'border-surface-dim bg-clay hover:border-earth-indigo/60'
                      }`}
                    >
                      {vibe === 'urban' && (
                        <div className="absolute top-0 right-0 w-6 h-6 bg-earth-indigo rounded-bl-lg flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-clay" />
                        </div>
                      )}
                      <Sparkle className="w-5 h-5 text-vitality-coral shrink-0 mt-0.5" />
                      <div>
                        <div className="font-sans text-ui-medium font-bold text-earth-indigo">
                          Urban & Active
                        </div>
                        <div className="font-sans text-xs text-secondary mt-0.5">
                          Walkable, cafes, cultural spaces close by.
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-6 border-t border-surface-dim">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="font-sans text-ui-medium font-semibold text-secondary hover:text-earth-indigo transition-colors flex items-center gap-2 px-4 py-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={saving}
                  className="px-8 py-4 flex items-center gap-2 shadow-md shadow-earth-indigo/15 cursor-pointer"
                >
                  <span>Continue to Living Habits</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </PageTransition>
        </div>
      </main>
    </div>
  );
};

// ============================================================================
// ONBOARDING CHAPTER 02: LIVING HABITS & CIRCADIAN RHYTHM
// ============================================================================
export const OnboardingChapter2Page: React.FC = () => {
  const navigate = useNavigate();

  // Habit State with LocalStorage Persistence
  const [sleepHabit, setSleepHabit] = useState(() => localStorage.getItem('onboard_ch2_sleep') || 'early');
  const [cleanHabit, setCleanHabit] = useState(() => localStorage.getItem('onboard_ch2_clean') || 'meticulous');
  const [noiseHabit, setNoiseHabit] = useState(() => localStorage.getItem('onboard_ch2_noise') || 'low');

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    localStorage.setItem('onboard_ch2_sleep', sleepHabit);
    localStorage.setItem('onboard_ch2_clean', cleanHabit);
    localStorage.setItem('onboard_ch2_noise', noiseHabit);
  }, [sleepHabit, cleanHabit, noiseHabit]);

  const handleSaveProgress = async () => {
    try {
      await profileService.saveOnboardingChapter2({
        chronotype: sleepHabit === 'early' ? 'early_bird' : sleepHabit === 'night' ? 'night_owl' : 'flexible',
        cleanlinessLevel: cleanHabit === 'meticulous' ? 5 : cleanHabit === 'relaxed' ? 2 : 4,
        socialEnergy: 4,
        workStyle: 'hybrid',
        guestPolicy: 'weekends_only',
        petTolerance: ['plants'],
        smokingTolerance: false,
      });
    } catch {
      // Local draft is saved
    }
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await handleSaveProgress();
    setSaving(false);
    navigate('/onboarding/chapter-3');
  };

  return (
    <div className="bg-clay-container min-h-screen flex flex-col font-sans selection:bg-vitality-coral selection:text-white">
      {/* 50% Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-surface-dim z-50">
        <div className="h-full bg-vitality-coral w-2/4 transition-all duration-500" />
      </div>

      {/* Desktop Sidebar Navigation */}
      <OnboardingSidebar currentChapter={2} onSaveProgress={handleSaveProgress} />

      {/* Main Chapter Layout */}
      <main className="flex-1 lg:ml-72 flex flex-col md:flex-row relative">
        {/* Left Chapter Narrative Column */}
        <div className="w-full md:w-5/12 lg:w-4/12 p-8 md:p-12 lg:p-16 md:sticky md:top-0 md:h-screen flex flex-col justify-between bg-surface-low border-b md:border-b-0 md:border-r border-surface-dim">
          <div className="max-w-sm space-y-4">
            <span className="font-sans text-label-caps text-vitality-coral uppercase tracking-widest block font-bold">
              Chapter 02
            </span>
            <h1 className="font-serif text-headline-lg-mobile md:text-headline-lg text-earth-indigo font-bold leading-tight">
              Living Habits
            </h1>
            <p className="font-sans text-body-lg text-secondary leading-relaxed">
              How we occupy a space defines our harmony within it. Define your rhythms, cleanliness rituals, and baseline acoustics.
            </p>
          </div>

          {/* Interactive Real-Time 3D Habit DNA Visualization */}
          <div className="my-6">
            <span className="font-sans text-label-caps text-secondary uppercase text-xs block mb-2 font-bold">
              Live Habitat Harmonic Node
            </span>
            <DNAVisualizer
              sleepHabit={sleepHabit}
              cleanHabit={cleanHabit}
              noiseHabit={noiseHabit}
              completionRate={65}
            />
          </div>
        </div>

        {/* Right Form Column */}
        <div className="w-full md:w-7/12 lg:w-8/12 p-8 md:p-12 lg:p-16 pb-36">
          <PageTransition>
            <form onSubmit={handleContinue} className="max-w-3xl mx-auto space-y-10">
              {/* Habit Section 1: Sleep / Circadian Rhythm */}
              <section className="bg-clay p-8 rounded-2xl border border-surface-dim shadow-sm space-y-6">
                <header className="border-b border-surface-dim pb-4 flex items-center gap-3">
                  <Moon className="w-6 h-6 text-earth-indigo" />
                  <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
                    Circadian Rhythm
                  </h3>
                </header>
                <p className="font-sans text-body-md text-secondary text-sm">
                  When are you most active in the home?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <SelectionChip
                    label="Early Riser"
                    subtitle="5AM - 9PM"
                    icon={<Sunrise className="w-7 h-7 mx-auto" />}
                    selected={sleepHabit === 'early'}
                    onClick={() => setSleepHabit('early')}
                  />
                  <SelectionChip
                    label="Balanced"
                    subtitle="8AM - 11PM"
                    icon={<Sun className="w-7 h-7 mx-auto" />}
                    selected={sleepHabit === 'balanced'}
                    onClick={() => setSleepHabit('balanced')}
                  />
                  <SelectionChip
                    label="Night Owl"
                    subtitle="11AM - 2AM+"
                    icon={<Moon className="w-7 h-7 mx-auto" />}
                    selected={sleepHabit === 'night'}
                    onClick={() => setSleepHabit('night')}
                  />
                </div>
              </section>

              {/* Habit Section 2: Cleanliness Standard */}
              <section className="bg-clay p-8 rounded-2xl border border-surface-dim shadow-sm space-y-6">
                <header className="border-b border-surface-dim pb-4 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-vitality-coral" />
                  <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
                    Environmental Standard
                  </h3>
                </header>
                <p className="font-sans text-body-md text-secondary text-sm">
                  How do you manage shared spaces and surfaces?
                </p>

                <div className="space-y-3">
                  <SelectionChip
                    orientation="horizontal"
                    label="Meticulous"
                    subtitle="Surfaces are clear after each use; cleaning is a daily mindfulness ritual."
                    selected={cleanHabit === 'meticulous'}
                    onClick={() => setCleanHabit('meticulous')}
                  />
                  <SelectionChip
                    orientation="horizontal"
                    label="Generally Tidy"
                    subtitle="Weekly scheduled cleans; occasional dish or working clutter is acceptable."
                    selected={cleanHabit === 'tidy'}
                    onClick={() => setCleanHabit('tidy')}
                  />
                  <SelectionChip
                    orientation="horizontal"
                    label="Relaxed & Lived-in"
                    subtitle="Cozy, lived-in feel; deep cleaning occurs when necessary."
                    selected={cleanHabit === 'relaxed'}
                    onClick={() => setCleanHabit('relaxed')}
                  />
                </div>
              </section>

              {/* Habit Section 3: Acoustic / Noise Preferences */}
              <section className="bg-clay p-8 rounded-2xl border border-surface-dim shadow-sm space-y-6">
                <header className="border-b border-surface-dim pb-4 flex items-center gap-3">
                  <Volume2 className="w-6 h-6 text-trust-teal" />
                  <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
                    Acoustic Baseline
                  </h3>
                </header>
                <p className="font-sans text-body-md text-secondary text-sm">
                  What is your ideal baseline volume and soundtrack at home?
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <SelectionChip
                    label="Library Quiet"
                    icon={<VolumeX className="w-5 h-5 mx-auto" />}
                    selected={noiseHabit === 'silent'}
                    onClick={() => setNoiseHabit('silent')}
                  />
                  <SelectionChip
                    label="Low Hum"
                    icon={<Volume2 className="w-5 h-5 mx-auto" />}
                    selected={noiseHabit === 'low'}
                    onClick={() => setNoiseHabit('low')}
                  />
                  <SelectionChip
                    label="Always Music"
                    icon={<Music className="w-5 h-5 mx-auto" />}
                    selected={noiseHabit === 'music'}
                    onClick={() => setNoiseHabit('music')}
                  />
                  <SelectionChip
                    label="Vibrant"
                    icon={<PartyPopper className="w-5 h-5 mx-auto" />}
                    selected={noiseHabit === 'vibrant'}
                    onClick={() => setNoiseHabit('vibrant')}
                  />
                </div>
              </section>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-surface-dim gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/onboarding/chapter-1')}
                  className="font-sans text-ui-medium font-semibold text-secondary hover:text-earth-indigo transition-colors flex items-center gap-2 px-4 py-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Identity</span>
                </button>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={saving}
                  className="w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-2 shadow-md shadow-earth-indigo/15 cursor-pointer"
                >
                  <span>Continue to Social DNA</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </PageTransition>
        </div>
      </main>
    </div>
  );
};

// ============================================================================
// ONBOARDING CHAPTER 03: SOCIAL DNA & LIVING CADENCE
// ============================================================================
export const OnboardingChapter3Page: React.FC = () => {
  const navigate = useNavigate();

  // Social DNA State with LocalStorage Persistence
  const [socialEnergy, setSocialEnergy] = useState(() => Number(localStorage.getItem('onboard_ch3_social')) || 40);
  const [guestPolicy, setGuestPolicy] = useState(() => localStorage.getItem('onboard_ch3_guest') || 'weekends');
  const [workStyle, setWorkStyle] = useState(() => localStorage.getItem('onboard_ch3_work') || 'hybrid');
  const [petPreference, setPetPreference] = useState(() => localStorage.getItem('onboard_ch3_pet') || 'plants');
  const [culinaryRhythm, setCulinaryRhythm] = useState(() => localStorage.getItem('onboard_ch3_culinary') || 'cooking');

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    localStorage.setItem('onboard_ch3_social', String(socialEnergy));
    localStorage.setItem('onboard_ch3_guest', guestPolicy);
    localStorage.setItem('onboard_ch3_work', workStyle);
    localStorage.setItem('onboard_ch3_pet', petPreference);
    localStorage.setItem('onboard_ch3_culinary', culinaryRhythm);
  }, [socialEnergy, guestPolicy, workStyle, petPreference, culinaryRhythm]);

  const handleSaveProgress = async () => {
    try {
      await profileService.updateDNA({
        chronotype: 'early_bird',
        cleanlinessLevel: 5,
        socialEnergy: Math.max(1, Math.min(5, Math.round(socialEnergy / 20))),
        workStyle: (workStyle === 'wfh' ? 'wfh_full' : workStyle === 'office' ? 'office_only' : 'hybrid') as 'wfh_full' | 'hybrid' | 'office_only',
        guestPolicy: (guestPolicy === 'open' ? 'open' : guestPolicy === 'weekends' ? 'weekends_only' : 'rarely') as 'rarely' | 'weekends_only' | 'open',
        petTolerance: [petPreference],
        smokingTolerance: false,
      });
    } catch {
      // Local draft is saved
    }
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await handleSaveProgress();
    setSaving(false);
    navigate('/onboarding/chapter-4');
  };

  return (
    <div className="bg-clay-container min-h-screen flex flex-col font-sans selection:bg-vitality-coral selection:text-white">
      {/* 75% Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-surface-dim z-50">
        <div className="h-full bg-vitality-coral w-3/4 transition-all duration-500" />
      </div>

      {/* Desktop Sidebar Navigation */}
      <OnboardingSidebar currentChapter={3} onSaveProgress={handleSaveProgress} />

      {/* Main Chapter Layout */}
      <main className="flex-1 lg:ml-72 flex flex-col md:flex-row relative">
        {/* Left Chapter Narrative Column */}
        <div className="w-full md:w-5/12 lg:w-4/12 p-8 md:p-12 lg:p-16 md:sticky md:top-0 md:h-screen flex flex-col justify-center bg-surface-low border-b md:border-b-0 md:border-r border-surface-dim">
          <div className="max-w-sm space-y-4">
            <span className="font-sans text-label-caps text-vitality-coral uppercase tracking-widest block font-bold">
              Chapter 03
            </span>
            <h1 className="font-serif text-headline-lg-mobile md:text-headline-lg text-earth-indigo font-bold leading-tight">
              Social DNA & Cadence
            </h1>
            <p className="font-sans text-body-lg text-secondary leading-relaxed">
              How do you recharge and engage? Define your hosting boundaries, remote working cadence, and kitchen rituals.
            </p>
            <div className="hidden md:block w-full h-52 rounded-2xl overflow-hidden mt-6 shadow-md border border-surface-dim">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ"
                alt="Social living room"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="w-full md:w-7/12 lg:w-8/12 p-8 md:p-12 lg:p-16 pb-36">
          <PageTransition>
            <form onSubmit={handleContinue} className="max-w-3xl mx-auto space-y-10">
              {/* Section 1: Social Energy Slider */}
              <section className="bg-clay p-8 rounded-2xl border border-surface-dim shadow-sm space-y-6">
                <header className="border-b border-surface-dim pb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-vitality-coral" />
                  <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
                    Social Energy Spectrum
                  </h3>
                </header>
                <RangeSlider
                  label="Sanctuary ↔ Open Salon"
                  min={0}
                  max={100}
                  step={5}
                  value={socialEnergy}
                  onChange={setSocialEnergy}
                  formatValue={(v) => `${v}%`}
                  helperText="Lower index = quiet private sanctuary with personal focus; higher index = open kitchen conversations and hosting dinner parties."
                />
              </section>

              {/* Section 2: Hosting & Guest Policy */}
              <section className="bg-clay p-8 rounded-2xl border border-surface-dim shadow-sm space-y-6">
                <header className="border-b border-surface-dim pb-4 flex items-center gap-3">
                  <Home className="w-6 h-6 text-earth-indigo" />
                  <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
                    Guest & Hosting Cadence
                  </h3>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <SelectionChip
                    label="Quiet Sanctuary"
                    subtitle="Rarely host / intimate catch-ups only"
                    icon={<Heart className="w-6 h-6 mx-auto" />}
                    selected={guestPolicy === 'rarely'}
                    onClick={() => setGuestPolicy('rarely')}
                  />
                  <SelectionChip
                    label="Weekends Only"
                    subtitle="Dinners & friends with heads-up"
                    icon={<Users className="w-6 h-6 mx-auto" />}
                    selected={guestPolicy === 'weekends'}
                    onClick={() => setGuestPolicy('weekends')}
                  />
                  <SelectionChip
                    label="Open Salon"
                    subtitle="Partners & creative friends welcome"
                    icon={<PartyPopper className="w-6 h-6 mx-auto" />}
                    selected={guestPolicy === 'open'}
                    onClick={() => setGuestPolicy('open')}
                  />
                </div>
              </section>

              {/* Section 3: Work Style */}
              <section className="bg-clay p-8 rounded-2xl border border-surface-dim shadow-sm space-y-6">
                <header className="border-b border-surface-dim pb-4 flex items-center gap-3">
                  <Laptop className="w-6 h-6 text-trust-teal" />
                  <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
                    Work & Daily Habitat
                  </h3>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <SelectionChip
                    label="100% Remote WFH"
                    subtitle="Deep work desk in private bedroom"
                    icon={<Laptop className="w-6 h-6 mx-auto" />}
                    selected={workStyle === 'wfh'}
                    onClick={() => setWorkStyle('wfh')}
                  />
                  <SelectionChip
                    label="Hybrid Cadence"
                    subtitle="2-3 days office / 2-3 days home"
                    icon={<Briefcase className="w-6 h-6 mx-auto" />}
                    selected={workStyle === 'hybrid'}
                    onClick={() => setWorkStyle('hybrid')}
                  />
                  <SelectionChip
                    label="In-Office Focused"
                    subtitle="Home is purely for rest & unwinding"
                    icon={<Home className="w-6 h-6 mx-auto" />}
                    selected={workStyle === 'office'}
                    onClick={() => setWorkStyle('office')}
                  />
                </div>
              </section>

              {/* Section 4: Pets & Plants */}
              <section className="bg-clay p-8 rounded-2xl border border-surface-dim shadow-sm space-y-6">
                <header className="border-b border-surface-dim pb-4 flex items-center gap-3">
                  <Leaf className="w-6 h-6 text-trust-teal" />
                  <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
                    Pets & Flora Companion Policy
                  </h3>
                </header>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <SelectionChip
                    label="Dog Friendly"
                    icon={<Dog className="w-5 h-5 mx-auto" />}
                    selected={petPreference === 'dogs'}
                    onClick={() => setPetPreference('dogs')}
                  />
                  <SelectionChip
                    label="Cat Friendly"
                    icon={<Cat className="w-5 h-5 mx-auto" />}
                    selected={petPreference === 'cats'}
                    onClick={() => setPetPreference('cats')}
                  />
                  <SelectionChip
                    label="Plants Only"
                    icon={<Leaf className="w-5 h-5 mx-auto" />}
                    selected={petPreference === 'plants'}
                    onClick={() => setPetPreference('plants')}
                  />
                  <SelectionChip
                    label="Pet-Free"
                    icon={<ShieldAlert className="w-5 h-5 mx-auto" />}
                    selected={petPreference === 'none'}
                    onClick={() => setPetPreference('none')}
                  />
                </div>
              </section>

              {/* Section 5: Kitchen Rituals */}
              <section className="bg-clay p-8 rounded-2xl border border-surface-dim shadow-sm space-y-6">
                <header className="border-b border-surface-dim pb-4 flex items-center gap-3">
                  <Coffee className="w-6 h-6 text-vitality-coral" />
                  <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
                    Culinary & Kitchen Rituals
                  </h3>
                </header>
                <div className="space-y-3">
                  <SelectionChip
                    orientation="horizontal"
                    label="Mindful Daily Cooking"
                    subtitle="Morning filter coffee, fresh wholesome meals, clean countertops after prep."
                    selected={culinaryRhythm === 'cooking'}
                    onClick={() => setCulinaryRhythm('cooking')}
                  />
                  <SelectionChip
                    orientation="horizontal"
                    label="Strict Vegetarian / Vegan"
                    subtitle="Dedicated plant-based pantry with respectful kitchen equipment segregation."
                    selected={culinaryRhythm === 'veg'}
                    onClick={() => setCulinaryRhythm('veg')}
                  />
                  <SelectionChip
                    orientation="horizontal"
                    label="Takeout & Espresso Minimalist"
                    subtitle="Low kitchen usage; quick breakfasts, Swiggy/Zomato gourmet orders."
                    selected={culinaryRhythm === 'takeout'}
                    onClick={() => setCulinaryRhythm('takeout')}
                  />
                </div>
              </section>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-surface-dim gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/onboarding/chapter-2')}
                  className="font-sans text-ui-medium font-semibold text-secondary hover:text-earth-indigo transition-colors flex items-center gap-2 px-4 py-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Living Habits</span>
                </button>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={saving}
                  className="w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-2 shadow-md shadow-earth-indigo/15 cursor-pointer"
                >
                  <span>Continue to Match Affinity</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </PageTransition>
        </div>
      </main>
    </div>
  );
};

// ============================================================================
// ONBOARDING CHAPTER 04: MATCH AFFINITY & DEALBREAKERS
// ============================================================================
export const OnboardingChapter4Page: React.FC = () => {
  const navigate = useNavigate();

  // Affinity State with LocalStorage Persistence
  const [selectedArchetypes, setSelectedArchetypes] = useState<string[]>(() => {
    const saved = localStorage.getItem('onboard_ch4_archetypes');
    return saved ? JSON.parse(saved) : ['architect', 'technologist'];
  });

  const [dealbreakers, setDealbreakers] = useState<string[]>(() => {
    const saved = localStorage.getItem('onboard_ch4_dealbreakers');
    return saved
      ? JSON.parse(saved)
      : ['quiet_hours', 'clean_kitchen', 'upi_prompt', 'no_smoking'];
  });

  const [agreementModel, setAgreementModel] = useState(() => localStorage.getItem('onboard_ch4_agreement') || 'cadence');

  const [calibrating, setCalibrating] = useState(false);

  useEffect(() => {
    localStorage.setItem('onboard_ch4_archetypes', JSON.stringify(selectedArchetypes));
    localStorage.setItem('onboard_ch4_dealbreakers', JSON.stringify(dealbreakers));
    localStorage.setItem('onboard_ch4_agreement', agreementModel);
  }, [selectedArchetypes, dealbreakers, agreementModel]);

  const toggleArchetype = (id: string) => {
    setSelectedArchetypes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleDealbreaker = (id: string) => {
    setDealbreakers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSaveProgress = async () => {
    try {
      await profileService.updateProfile({
        visualTags: ['ID Verified', 'Trust Score 960', 'Early Riser', 'Architectural Digest'],
      });
    } catch {
      // Local draft is saved
    }
  };

  const handleCompleteOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    setCalibrating(true);
    await handleSaveProgress();
    setCalibrating(false);
    navigate('/discover');
  };

  const archetypes = [
    {
      id: 'architect',
      label: 'Spatial Architect / Ceramicist',
      desc: 'Deep appreciation for sunlit layouts, raw materials, and clean common spaces.',
    },
    {
      id: 'technologist',
      label: 'AI Researcher / Product Lead',
      desc: 'Disciplined deep work focus, punctual ledger transfers, and quiet routines.',
    },
    {
      id: 'creative',
      label: 'Filmmaker / Editorial Curator',
      desc: 'Ambient reading corners, tea rituals, and mindful organic lifestyle.',
    },
    {
      id: 'artisan',
      label: 'Specialty Roaster / Vinyl Collector',
      desc: 'Soundtrack curation, sourdough baking, and weekend culinary sharing.',
    },
  ];

  const dealbreakerList = [
    {
      id: 'quiet_hours',
      label: 'Strict Quiet Hours after 10:30 PM',
      icon: <Clock className="w-4 h-4 text-trust-teal" />,
    },
    {
      id: 'clean_kitchen',
      label: 'Zero dirty dishes in the sink overnight',
      icon: <CheckCircle2 className="w-4 h-4 text-vitality-coral" />,
    },
    {
      id: 'upi_prompt',
      label: 'Instant UPI settlement on household bills',
      icon: <DollarSign className="w-4 h-4 text-trust-teal" />,
    },
    {
      id: 'no_smoking',
      label: 'Zero indoor smoking / smoke-free home',
      icon: <Flame className="w-4 h-4 text-vitality-coral" />,
    },
  ];

  return (
    <div className="bg-clay-container min-h-screen flex flex-col font-sans selection:bg-vitality-coral selection:text-white">
      {/* 100% Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-surface-dim z-50">
        <div className="h-full bg-trust-teal w-full transition-all duration-500" />
      </div>

      {/* Desktop Sidebar Navigation */}
      <OnboardingSidebar currentChapter={4} onSaveProgress={handleSaveProgress} />

      {/* Main Chapter Layout */}
      <main className="flex-1 lg:ml-72 flex flex-col md:flex-row relative">
        {/* Left Chapter Narrative Column */}
        <div className="w-full md:w-5/12 lg:w-4/12 p-8 md:p-12 lg:p-16 md:sticky md:top-0 md:h-screen flex flex-col justify-between bg-surface-low border-b md:border-b-0 md:border-r border-surface-dim">
          <div className="max-w-sm space-y-4">
            <span className="font-sans text-label-caps text-vitality-coral uppercase tracking-widest block font-bold">
              Chapter 04
            </span>
            <h1 className="font-serif text-headline-lg-mobile md:text-headline-lg text-earth-indigo font-bold leading-tight">
              Match Affinity & Synergy
            </h1>
            <p className="font-sans text-body-lg text-secondary leading-relaxed">
              Final calibration. Define non-negotiables, select desired roommate archetypes, and generate your shared living compatibility ledger.
            </p>
          </div>

          {/* Real-time Resonance Badge */}
          <div className="p-6 bg-clay rounded-2xl border border-surface-dim shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-sans text-label-caps text-vitality-coral uppercase font-bold text-[10px]">
                Vibe Resonance
              </span>
              <span className="font-serif text-xl font-bold text-trust-teal">98% Fit</span>
            </div>
            <div className="w-full bg-surface-dim h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-vitality-coral to-trust-teal h-full w-[98%]" />
            </div>
            <p className="font-sans text-[11px] text-secondary">
              Matched across 6 lifestyle dimensions in Bengaluru & Mumbai.
            </p>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="w-full md:w-7/12 lg:w-8/12 p-8 md:p-12 lg:p-16 pb-36">
          <PageTransition>
            <form onSubmit={handleCompleteOnboarding} className="max-w-3xl mx-auto space-y-10">
              {/* Section 1: Roommate Archetypes */}
              <section className="bg-clay p-8 rounded-2xl border border-surface-dim shadow-sm space-y-6">
                <header className="border-b border-surface-dim pb-4 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-vitality-coral" />
                  <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
                    Desired Cohabitant Archetypes
                  </h3>
                </header>
                <p className="font-sans text-body-md text-secondary text-sm">
                  Select the professional & creative mindsets you resonate with most:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {archetypes.map((arch) => {
                    const isSelected = selectedArchetypes.includes(arch.id);
                    return (
                      <button
                        key={arch.id}
                        type="button"
                        onClick={() => toggleArchetype(arch.id)}
                        className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-earth-indigo text-clay border-earth-indigo shadow-md'
                            : 'bg-surface-low text-earth-indigo border-surface-dim hover:border-earth-indigo/50'
                        }`}
                      >
                        <div className="font-serif font-bold text-sm mb-1">{arch.label}</div>
                        <div
                          className={`text-xs leading-relaxed ${
                            isSelected ? 'text-clay/80' : 'text-secondary'
                          }`}
                        >
                          {arch.desc}
                        </div>
                        {isSelected && (
                          <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-vitality-coral text-white flex items-center justify-center text-xs">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Section 2: Non-Negotiable Dealbreakers */}
              <section className="bg-clay p-8 rounded-2xl border border-surface-dim shadow-sm space-y-6">
                <header className="border-b border-surface-dim pb-4 flex items-center gap-3">
                  <ShieldAlert className="w-6 h-6 text-vitality-coral" />
                  <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
                    Mutual Living Non-Negotiables
                  </h3>
                </header>
                <p className="font-sans text-body-md text-secondary text-sm">
                  These standards form the foundation of your automatic Living Agreement:
                </p>

                <div className="space-y-3">
                  {dealbreakerList.map((db) => {
                    const isSelected = dealbreakers.includes(db.id);
                    return (
                      <button
                        key={db.id}
                        type="button"
                        onClick={() => toggleDealbreaker(db.id)}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-surface-low border-earth-indigo shadow-sm'
                            : 'bg-clay border-surface-dim hover:border-earth-indigo/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {db.icon}
                          <span className="font-sans text-xs font-bold text-earth-indigo">
                            {db.label}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-vitality-coral border-vitality-coral text-white'
                              : 'border-surface-dim bg-clay'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Section 3: Household Management Model */}
              <section className="bg-clay p-8 rounded-2xl border border-surface-dim shadow-sm space-y-6">
                <header className="border-b border-surface-dim pb-4 flex items-center gap-3">
                  <Home className="w-6 h-6 text-earth-indigo" />
                  <h3 className="font-serif text-headline-sm font-bold text-earth-indigo">
                    Preferred Household Operating Model
                  </h3>
                </header>
                <div className="space-y-3">
                  <SelectionChip
                    orientation="horizontal"
                    label="Structured Living Cadence"
                    subtitle="Automatic chore rotations, weekly supply checklists, and instant 1-click UPI expense splitting."
                    selected={agreementModel === 'cadence'}
                    onClick={() => setAgreementModel('cadence')}
                  />
                  <SelectionChip
                    orientation="horizontal"
                    label="Tribe Harmony Model"
                    subtitle="Flexible organic collaboration with mindful shared responsibility and mutual consideration."
                    selected={agreementModel === 'trust'}
                    onClick={() => setAgreementModel('trust')}
                  />
                  <SelectionChip
                    orientation="horizontal"
                    label="Autonomous Co-living Syndicate"
                    subtitle="Independent private spaces with equalized automated monthly utility ledger splits."
                    selected={agreementModel === 'syndicate'}
                    onClick={() => setAgreementModel('syndicate')}
                  />
                </div>
              </section>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-surface-dim gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/onboarding/chapter-3')}
                  className="font-sans text-ui-medium font-semibold text-secondary hover:text-earth-indigo transition-colors flex items-center gap-2 px-4 py-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Social DNA</span>
                </button>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={calibrating}
                  className="w-full sm:w-auto px-10 py-4 bg-vitality-coral hover:bg-vitality-coral/90 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-vitality-coral/30 cursor-pointer text-xs uppercase tracking-wider"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Complete DNA & Reveal Cohabitants</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </PageTransition>
        </div>
      </main>
    </div>
  );
};
