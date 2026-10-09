import { z } from 'zod';

export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(100),
  phone: z.string().trim().max(25).regex(/^\+?[\d\s()-]{7,25}$/, 'Please enter a valid phone number.').refine(v => v.replace(/\D/g, '').length >= 7 && v.replace(/\D/g, '').length <= 15, 'Use a phone number with 7–15 digits.'),
  email: z.string().trim().email('Please enter a valid email address.').max(255),
  moveIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please choose your preferred move-in date.').refine(v => { const d = new Date(v + 'T12:00:00'); return !Number.isNaN(d.getTime()) && d.toISOString().slice(0,10) === v; }, 'Please choose a valid date.'),
  room: z.enum(['four-sharing', 'five-sharing', 'premium-sharing', 'undecided']),
  budget: z.string().trim().max(50),
  message: z.string().trim().max(1500),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please agree to the contact consent.' }) }),
  intent: z.enum(['enquiry', 'visit']),
  visitDate: z.string().max(10).optional(),
}).superRefine((data, ctx) => {
  if (data.intent === 'visit' && (!data.visitDate || !/^\d{4}-\d{2}-\d{2}$/.test(data.visitDate))) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['visitDate'], message: 'Please choose your preferred visit date.' });
});
export type Enquiry = z.infer<typeof enquirySchema>;
export function enquiryText(data: Enquiry) {
  return `${data.intent === 'visit' ? 'Visit request' : 'Room enquiry'} — Srisubham Ladies Hostel\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nMove-in: ${data.moveIn}\nRoom: ${data.room}\nBudget: ${data.budget || 'Not specified'}\n${data.visitDate ? `Preferred visit: ${data.visitDate}\n` : ''}Message: ${data.message || 'None'}\nRequest only — not a confirmed booking.`;
}
export function whatsappUrl(phone: string | null, text: string) {
  if (!phone || !/^\+?[1-9]\d{6,14}$/.test(phone.replace(/[\s()-]/g, ''))) return null;
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(text.slice(0, 3000))}`;
}