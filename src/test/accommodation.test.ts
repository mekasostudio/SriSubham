import { describe,it,expect } from 'vitest';
import { rooms,amenities,property } from '@/data/property';
import { enquirySchema,whatsappUrl } from '@/lib/enquiry';
describe('Accommodation accuracy',()=>{
  it('four-sharing has two bunk units and four spaces',()=>{const r=rooms.find(r=>r.id==='four-sharing');expect(r?.capacity).toBe(4);expect(r?.arrangement).toBe('2 bunk-bed units · 4 sleeping spaces');});
  it('five-sharing has five spaces',()=>{expect(rooms.find(r=>r.id==='five-sharing')?.capacity).toBe(5);});
  it('does not invent prices or availability',()=>{expect(rooms.every(r=>r.monthlyRent===null&&r.availability===null)).toBe(true);});
  it('does not invent facilities or location',()=>{expect(amenities.some(a=>a.confirmed)).toBe(false);expect(property.address).toBeNull();});
});
describe('Enquiry validation',()=>{
 const valid={name:'Test Resident',phone:'+919876543210',email:'test@example.com',moveIn:'2026-11-01',room:'four-sharing',budget:'',message:'',consent:true,intent:'enquiry'};
 it('requires valid phone and email',()=>{expect(enquirySchema.safeParse({...valid,phone:'not a number'}).success).toBe(false);expect(enquirySchema.safeParse({...valid,email:'invalid'}).success).toBe(false);expect(enquirySchema.safeParse(valid).success).toBe(true);});
 it('requires contact consent',()=>{expect(enquirySchema.safeParse({...valid,consent:false}).success).toBe(false);});
 it('requires a visit date for visit requests',()=>{expect(enquirySchema.safeParse({...valid,intent:'visit'}).success).toBe(false);expect(enquirySchema.safeParse({...valid,intent:'visit',visitDate:'2026-10-20'}).success).toBe(true);});
 it('rejects malformed dates',()=>{expect(enquirySchema.safeParse({...valid,moveIn:'2026-02-31'}).success).toBe(false);});
 it('does not create WhatsApp link without real phone',()=>{expect(whatsappUrl(null,'Hi')).toBeNull();expect(whatsappUrl('abc','Hi')).toBeNull();expect(whatsappUrl('+919876543210','Hello & welcome')).toBe('https://wa.me/919876543210?text=Hello%20%26%20welcome');});
});