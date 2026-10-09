import four from '@/assets/four-sharing.jpg';
import five from '@/assets/five-sharing.jpg';
import premium from '@/assets/premium-sharing.jpg';
import lounge from '@/assets/lounge.jpg';
import study from '@/assets/study.jpg';
import storage from '@/assets/storage.jpg';
import bathroom from '@/assets/bathroom.jpg';
import dining from '@/assets/dining.jpg';
import exterior from '@/assets/exterior.jpg';
import bunk from '@/assets/bunk-detail.jpg';

export type Room = { id: string; name: string; capacity: number; arrangement: string; description: string; image: string; features: string[]; monthlyRent: string | null; availability: string | null; sample: boolean };
export const property = {
  name: 'Srisubham Ladies Hostel', shortName: 'Srisubham', logoSub: 'Ladies Hostel', tagline: 'Your Space. Your Comfort. Your Community.',
  address: null as string | null, phone: null as string | null, email: null as string | null,
  whatsapp: null as string | null, instagram: null as string | null,
  nearby: { Colleges: null, Offices: null, 'Public transport': null, 'Grocery shops': null, Hospitals: null } as Record<string, string | null>,
  policies: [
    { title: 'Entry & visitor policies', value: null },
    { title: 'Warden & on-site management', value: null },
    { title: 'Emergency contact process', value: null },
    { title: 'Building access arrangements', value: null },
    { title: 'House rules', value: null },
    { title: 'Parent & guardian enquiries', value: null },
  ] as { title: string; value: string | null }[],
  legal: { privacy: null, terms: null, rules: null } as Record<string, string | null>,
};
export const rooms: Room[] = [
  { id: 'four-sharing', name: 'Four-Sharing Room', capacity: 4, arrangement: '2 bunk-bed units · 4 sleeping spaces', description: 'A little togetherness. A space that’s yours.', image: four, features: ['Four individual sleeping spaces', 'Personal storage in concept layout', 'Study-friendly arrangement'], monthlyRent: null, availability: null, sample: true },
  { id: 'five-sharing', name: 'Five-Sharing Room', capacity: 5, arrangement: '2 bunk-bed units + 1 single bed', description: 'More company. Thoughtfully arranged comfort.', image: five, features: ['Five individual sleeping spaces', 'Individual storage in concept layout', 'Practical shared room arrangement'], monthlyRent: null, availability: null, sample: true },
  { id: 'premium-sharing', name: 'Premium Sharing Room', capacity: 2, arrangement: '2 single beds · sample arrangement', description: 'A little more room for your everyday.', image: premium, features: ['Spacious twin-sharing concept', 'Privacy-focused sample layout', 'Additional facilities to be confirmed'], monthlyRent: null, availability: null, sample: true },
];
export const gallery = [
  { title: 'Four-sharing room', image: four, category: 'Rooms' },
  { title: 'Five-sharing room', image: five, category: 'Rooms' },
  { title: 'Premium sharing room', image: premium, category: 'Rooms' },
  { title: 'Your personal berth', image: bunk, category: 'Rooms' },
  { title: 'Clean bathrooms', image: bathroom, category: 'Everyday spaces' },
  { title: 'A place to focus', image: study, category: 'Everyday spaces' },
  { title: 'Personal storage', image: storage, category: 'Everyday spaces' },
  { title: 'The common lounge', image: lounge, category: 'Community' },
  { title: 'Around the table', image: dining, category: 'Community' },
  { title: 'A welcoming entrance', image: exterior, category: 'Community' },
];
export const amenities = [
  { name: 'Wi-Fi', icon: 'wifi', confirmed: false }, { name: 'Laundry', icon: 'laundry', confirmed: false },
  { name: 'Housekeeping', icon: 'clean', confirmed: false }, { name: 'Study area', icon: 'study', confirmed: false },
  { name: 'Drinking water', icon: 'water', confirmed: false }, { name: 'Meals', icon: 'meals', confirmed: false },
  { name: 'Air conditioning', icon: 'air', confirmed: false }, { name: 'Power backup', icon: 'power', confirmed: false },
  { name: 'CCTV', icon: 'cctv', confirmed: false }, { name: 'Secure entry', icon: 'entry', confirmed: false },
  { name: 'Wardrobe', icon: 'wardrobe', confirmed: false }, { name: 'Common lounge', icon: 'lounge', confirmed: false },
];
export const faqs = [
  { question: 'What is included in the monthly rent?', answer: null },
  { question: 'Are meals included?', answer: null },
  { question: 'What are the check-in and visitor policies?', answer: null },
  { question: 'Is laundry available?', answer: null },
  { question: 'What is the deposit and refund policy?', answer: null },
  { question: 'How can I schedule a room visit?', answer: 'Use “Book a Visit” to prepare a visit request. This template is currently in demo mode; requests are not sent and visits are not confirmed.' },
  { question: 'What documents are required?', answer: null },
] as { question: string; answer: string | null }[];
export const testimonials = [
  { name: 'Student resident', quote: 'A quiet corner to study, and a friendly space to come back to.', role: 'Illustrative review · not a real resident' },
  { name: 'Working professional', quote: 'The kind of place where the little everyday details feel thoughtful.', role: 'Illustrative review · not a real resident' },
];
export const imageryDisclosure = 'AI-generated concept imagery. Not photographs of the actual property.';
export { four, five, premium, lounge, study, storage, bathroom, dining, exterior, bunk };