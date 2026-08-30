/**
 * Demo data for the Nouvelage app.
 *
 * Branches, services, prices, doctors and package names are REAL values read
 * from the Odoo 18 production database on 30 Aug 2026, so the demo reads
 * convincingly. Ratings, reviews, doctor bios and offer countdowns are
 * invented — those do not exist in Odoo yet and still need to be built.
 *
 * When the API is wired up, delete this file and point the screens at
 * src/api/client.ts instead. The shapes below match the API responses.
 */

export const DEMO = true;

export type Branch = { id: number; name: string; area: string };
export type Service = {
  id: number; name: string; price: number; category: string;
  duration: string; longevity?: string; blurb: string;
};
export type Doctor = {
  id: number; name: string; specialty: string; rating: number;
  reviews: number; experience: string; available: string;
  branches: string[]; bio: string; topRated?: boolean;
};
export type Session = {
  id: number; ref: string; date: string; time: string; service: string;
  doctor: string; branch: string; state: 'upcoming' | 'completed' | 'cancelled';
  progress?: { done: number; total: number };
  total: number; paid: number; remaining: number;
};
export type Package = {
  id: number; name: string; price: number; wasPrice?: number;
  purchased: string; expires: string;
  pulsesLeft: number; pulsesTotal: number; paid: number;
  includes: string[];
};

export const ME = {
  name: 'Nahla Faisl',
  phone: '01206935427',
  email: 'nahla.faisl@gmail.com',
  code: 'HMS300164',
  balance: 6706.94,
  currency: 'EGP',
  points: 0,          // no loyalty card linked — matches the real data gap
};

/* 12 real branches from clinic.branch */
export const BRANCHES: Branch[] = [
  { id: 22, name: 'Mohandseen', area: 'Giza' },
  { id: 19, name: 'CFC', area: 'New Cairo' },
  { id: 20, name: 'City Stars', area: 'Nasr City' },
  { id: 26, name: 'El Rehab', area: 'New Cairo' },
  { id: 28, name: 'Madinity', area: 'New Cairo' },
  { id: 29, name: 'Madinity The Strip', area: 'New Cairo' },
  { id: 30, name: 'Mall Of Arabia', area: '6th October' },
  { id: 25, name: 'Zayed', area: 'Sheikh Zayed' },
  { id: 41, name: 'Roushdy', area: 'Alexandria' },
  { id: 27, name: 'Loran', area: 'Alexandria' },
  { id: 17, name: 'Alex Camp Chizar', area: 'Alexandria' },
  { id: 57, name: 'HQ', area: 'Cairo' },
];

export const CATEGORIES = [
  { key: 'beauty', name: 'Beauty', icon: 'happy-outline' },
  { key: 'laser', name: 'Laser', icon: 'flash-outline' },
  { key: 'skin', name: 'Skin', icon: 'sparkles-outline' },
  { key: 'dental', name: 'Dental', icon: 'medkit-outline' },
  { key: 'body', name: 'Body', icon: 'body-outline' },
  { key: 'hair', name: 'Hair', icon: 'cut-outline' },
] as const;

/* real product.template names and list_price values */
export const SERVICES: Service[] = [
  { id: 43373, name: 'Radiesse Merz Aesthetics', price: 24015, category: 'beauty',
    duration: '30–45 min', longevity: '12–18 months',
    blurb: 'Collagen-stimulating filler that restores volume and firms the skin.' },
  { id: 43285, name: 'G Cell Kit', price: 27000, category: 'skin',
    duration: '45–60 min', longevity: '6–12 months',
    blurb: 'Regenerative cell therapy for overall skin renewal.' },
  { id: 43683, name: 'Sfera 3ML', price: 25250, category: 'skin',
    duration: '30 min', longevity: '6–9 months',
    blurb: 'Biological collagen stimulator for firmer, smoother skin.' },
  { id: 43363, name: 'Profhilo Body Kit', price: 18605, category: 'body',
    duration: '45 min', longevity: '6 months',
    blurb: 'Deep hydration and elasticity treatment for the body.' },
  { id: 43403, name: 'Threads Biolift Long (Neck)', price: 18557, category: 'beauty',
    duration: '60 min', longevity: '12–18 months',
    blurb: 'Lifting threads that tighten and redefine the neckline.' },
  { id: 43354, name: 'Novuma 1.5 cc', price: 19000, category: 'skin',
    duration: '30 min', longevity: '9–12 months',
    blurb: 'Collagen biostimulator for natural-looking rejuvenation.' },
  { id: 43409, name: 'V-Hacker 2.5ML', price: 16250, category: 'skin',
    duration: '30–45 min', longevity: '6 months',
    blurb: 'Medical treatment designed to improve skin quality and glow.' },
  { id: 43404, name: 'Threads Biolift Medium (Jawline)', price: 17466, category: 'beauty',
    duration: '45–60 min', longevity: '12 months',
    blurb: 'Jawline definition with absorbable lifting threads.' },
  { id: 42480, name: 'Skin Fill BODY 10ml', price: 14190, category: 'body',
    duration: '45 min', longevity: '9 months',
    blurb: 'Body filler for contouring and skin quality.' },
  { id: 43358, name: 'Pbserum High Kit', price: 19649, category: 'body',
    duration: '45 min', longevity: '6 months',
    blurb: 'Enzyme-based treatment for localised fat and fibrosis.' },
  { id: 43369, name: 'REGENERA KIT', price: 19649, category: 'hair',
    duration: '60 min', longevity: '12 months',
    blurb: 'Regenerative therapy for hair density and scalp health.' },
  { id: 43405, name: 'Threads Biolift Small (Eyebrows)', price: 14190, category: 'beauty',
    duration: '30 min', longevity: '9–12 months',
    blurb: 'Subtle brow lift using fine absorbable threads.' },
];

/* real doctor names from clinic.slot; ratings and bios are invented */
export const DOCTORS: Doctor[] = [
  { id: 6843, name: 'Dr. Ghada Amer', specialty: 'Dermatology', rating: 4.9,
    reviews: 32, experience: '+8 years', available: 'Available today', topRated: true,
    branches: ['Mohandseen', 'CFC'],
    bio: 'Board-certified dermatologist with extensive experience in non-surgical aesthetic treatments, focusing on natural and safe results.' },
  { id: 6821, name: 'DR.Mirna Abdelkader', specialty: 'Dermatology', rating: 4.8,
    reviews: 27, experience: '+6 years', available: 'Available tomorrow',
    branches: ['City Stars', 'El Rehab'],
    bio: 'Specialises in injectables and skin rejuvenation with a conservative, natural approach.' },
  { id: 6801, name: 'Dr. Asmaa El Fawal', specialty: 'Dermatology', rating: 4.9,
    reviews: 41, experience: '+10 years', available: 'Available today',
    branches: ['Roushdy', 'Loran'],
    bio: 'Focuses on laser treatments and pigmentation disorders across all skin types.' },
  { id: 6812, name: 'Dr. Randa El Aguizy', specialty: 'Dermatology', rating: 4.7,
    reviews: 19, experience: '+7 years', available: 'Available next week',
    branches: ['Mall Of Arabia'],
    bio: 'Combines filler and thread lifting for facial contouring.' },
  { id: 6830, name: 'Dr. Toka Tharwat', specialty: 'Dermatology', rating: 4.8,
    reviews: 24, experience: '+5 years', available: 'Available tomorrow',
    branches: ['Mall Of Arabia', 'Zayed'],
    bio: 'Skin booster and hydration treatments with a focus on long-term skin health.' },
  { id: 6805, name: 'Dr. Shrouk Yehia', specialty: 'Dermatology', rating: 4.6,
    reviews: 15, experience: '+4 years', available: 'Available today',
    branches: ['Madinity The Strip'],
    bio: 'Laser hair removal and body contouring specialist.' },
];

export const REVIEWS = [
  { id: 1, name: 'Noor Ali', date: '12 April 2026', stars: 5,
    text: 'Quick session with great results. My lines look softer and my face still feels natural.' },
  { id: 2, name: 'Sara A.', date: '2 April 2026', stars: 5,
    text: 'Very natural results and a smooth experience. The doctor was professional and made me feel comfortable.' },
  { id: 3, name: 'Mariam H.', date: '28 March 2026', stars: 4,
    text: 'Good outcome overall. Booking was easy and the branch was on time.' },
];

/* mirrors the real appointment history for this patient, including the
   contradiction where a session is marked paid but still shows an amount due */
export const SESSIONS: Session[] = [
  { id: 7346, ref: 'APPT/2026/7346', date: 'Tue, 1 Sep', time: '4:00 PM',
    service: 'Laser Full Body', doctor: 'Dr. Ghada Amer', branch: 'Mohandseen',
    state: 'upcoming', progress: { done: 3, total: 6 },
    total: 2500, paid: 2500, remaining: 0 },
  { id: 6619, ref: 'AP256619', date: 'Sun, 6 Sep', time: '6:30 PM',
    service: 'Botox Injection', doctor: 'DR.Mirna Abdelkader', branch: 'CFC',
    state: 'upcoming', total: 3000, paid: 0, remaining: 3000 },
  { id: 250171, ref: 'AP250171', date: 'Tue, 16 Jun', time: '2:00 PM',
    service: 'Skin Booster Session', doctor: 'Dr. Asmaa El Fawal', branch: 'Alex Camp Chizar',
    state: 'completed', total: 2818.77, paid: 0, remaining: 2818.77 },
  { id: 233399, ref: 'AP233399', date: 'Thu, 16 Apr', time: '5:00 PM',
    service: 'Laser Full Body', doctor: 'Dr. Toka Tharwat', branch: 'Alex Camp Chizar',
    state: 'completed', progress: { done: 2, total: 6 },
    total: 2475.09, paid: 2475, remaining: 0 },
  { id: 239120, ref: 'AP239120', date: 'Tue, 5 May', time: '1:00 PM',
    service: 'Consultation', doctor: 'Dr. Randa El Aguizy', branch: 'Roushdy',
    state: 'cancelled', total: 118, paid: 118, remaining: 0 },
];

/* real package name and pulse figures from clinic.customer.package */
export const MY_PACKAGES: Package[] = [
  { id: 6784, name: 'Alexandira pulse 10000', price: 7500,
    purchased: '15 Jun 2026', expires: '15 Jul 2027',
    pulsesLeft: 1440, pulsesTotal: 10000, paid: 7500,
    includes: ['Full body laser sessions', 'Valid across all branches', 'Certified specialists'] },
];

export const OFFERS: Package[] = [
  { id: 1, name: 'Laser Full Body Package', price: 2500, wasPrice: 3000,
    purchased: '', expires: '', pulsesLeft: 0, pulsesTotal: 0, paid: 0,
    includes: ['3 Full Body Laser Sessions', 'Suitable for all skin types',
               'Advanced laser technology', 'Performed by certified specialists',
               'Valid for 6 months'] },
  { id: 2, name: 'Skin Glow Bundle', price: 4200, wasPrice: 5000,
    purchased: '', expires: '', pulsesLeft: 0, pulsesTotal: 0, paid: 0,
    includes: ['2 Skin Booster sessions', '1 Hydration facial', 'Valid for 4 months'] },
  { id: 3, name: 'Bridal Package', price: 9800, wasPrice: 12000,
    purchased: '', expires: '', pulsesLeft: 0, pulsesTotal: 0, paid: 0,
    includes: ['Full body laser', 'Skin booster', 'Facial', 'Valid for 12 months'] },
];

export const NOTIFICATIONS = [
  { id: 1, icon: 'time-outline', title: 'Appointment Reminder',
    body: 'Your Laser Full Body session is tomorrow at 4:00 PM.', when: '2 hours ago' },
  { id: 2, icon: 'checkmark-circle-outline', title: 'Booking Confirmed',
    body: 'Your appointment with Dr. Ghada Amer has been confirmed.', when: '2 days ago' },
  { id: 3, icon: 'cube-outline', title: 'Package Update',
    body: 'You have 1,440 pulses remaining on Alexandira pulse 10000.', when: '5 days ago' },
];

export const TIMES = ['10:00', '11:00', '12:00', '13:00', '15:00', '16:00', '17:00', '18:00'];
export const TAKEN = ['10:00', '18:00'];
