import React, { useState } from 'react';
import { useContent } from '../data/contentContext';
import { Phone, MessageSquare, Mail, MapPin, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';
import confetti from 'canvas-confetti';

export default function Contact() {
  const { contactData } = useContent();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: 'Telugu Wedding / South Indian Wedding',
    date: '',
    location: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trigger celebratory golden confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f3e5ab', '#ffffff'],
      });
    } catch {
      // ignore
    }

    setSubmitted(true);

    // Format WhatsApp query
    const text = encodeURIComponent(
      `Hello NS Photography!\n\n` +
      `My name is ${formData.name}.\n` +
      `*Event Type:* ${formData.eventType}\n` +
      `*Tentative Date:* ${formData.date || 'TBD'}\n` +
      `*City/Venue:* ${formData.location || 'TBD'}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Note:* ${formData.message || 'Looking forward to discussing wedding photography coverage.'}`
    );

    // Open WhatsApp in new tab
    const waUrl = `https://wa.me/91${contactData.primaryPhone.replace(/\D/g, '')}?text=${text}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="contact" className="py-28 px-6 sm:px-12 lg:px-20 bg-[#070709] relative overflow-hidden border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Emotional Heading & Official Contact Info */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span className="font-sans text-xs tracking-[0.3em] font-semibold text-[#d4af37] uppercase">
                INITIATE THE JOURNEY
              </span>
            </div>

            <h2 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1] whitespace-pre-line">
              {contactData.heading || "LET'S CREATE\nSOMETHING TIMELESS"}
            </h2>

            <p className="text-base sm:text-lg text-[#a0a0b2] font-sans font-light leading-relaxed">
              {contactData.subheading ||
                "Have a project in mind or want to collaborate? I'd love to hear from you."}
            </p>

            <p className="text-sm text-[#808092] font-sans leading-relaxed">
              {contactData.description}
            </p>

            {/* Direct Official Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {/* Phone 1 */}
              <a
                href={`tel:${contactData.primaryPhone}`}
                className="p-4 rounded-2xl bg-[#0e0f14] border border-white/10 hover:border-[#d4af37] transition-all flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#8a8a9a] uppercase block">
                    CALL DIRECT
                  </span>
                  <span className="text-sm font-bold text-white font-mono">
                    {contactData.primaryPhone}
                  </span>
                </div>
              </a>

              {/* Phone 2 */}
              <a
                href={`tel:${contactData.secondaryPhone}`}
                className="p-4 rounded-2xl bg-[#0e0f14] border border-white/10 hover:border-[#d4af37] transition-all flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#8a8a9a] uppercase block">
                    SECONDARY LINE
                  </span>
                  <span className="text-sm font-bold text-white font-mono">
                    {contactData.secondaryPhone}
                  </span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={contactData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#0e0f14] border border-white/10 hover:border-[#25D366] transition-all flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#8a8a9a] uppercase block">
                    INSTANT CHAT
                  </span>
                  <span className="text-sm font-bold text-white font-mono">
                    WhatsApp Chat →
                  </span>
                </div>
              </a>

              {/* Location Link to Google Maps */}
              <a
                href={contactData.googleMapsUrl || "https://www.google.com/maps/place/16%C2%B017'09.0%22N+80%C2%B026'23.7%22E/@16.285836,80.439902,17z/data=!3m1!4b1!4m4!3m3!8m2!3d16.285836!4d80.439902?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#0e0f14] border border-white/10 hover:border-[#d4af37] transition-all flex items-center gap-3 group cursor-pointer"
                title="Open Studio Location on Google Maps"
              >
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-[#8a8a9a] uppercase block group-hover:text-[#d4af37] transition-colors">
                    STUDIO BASE (MAPS ↗)
                  </span>
                  <span className="text-xs font-semibold text-white group-hover:text-white transition-colors truncate block">
                    {contactData.location}
                  </span>
                </div>
              </a>

              {/* Instagram Official Profile Card */}
              <a
                href={contactData.instagramUrl || "https://www.instagram.com/chinnanerella1982?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-1 sm:col-span-2 p-4 rounded-2xl bg-[#0e0f14] border border-[#E1306C]/30 hover:border-[#E1306C] transition-all flex items-center justify-between group cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(225,48,108,0.2)]"
                title="Follow NS Photography on Instagram"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                    <InstagramIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#E1306C] font-semibold uppercase tracking-wider block">
                        INSTAGRAM PROFILE
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#E1306C]/15 text-[#E1306C] font-mono font-medium">
                        OFFICIAL
                      </span>
                    </div>
                    <span className="text-sm font-bold text-white group-hover:text-[#f8b500] transition-colors font-mono">
                      {contactData.instagramHandle || "@chinnanerella1982"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-[#E1306C] text-xs font-mono text-[#e0e0ea] group-hover:text-white group-hover:bg-[#E1306C]/20 transition-all">
                  <span>CONNECT</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
                </div>
              </a>
            </div>

            {/* Social Channels */}
            <div className="pt-2">
              <span className="text-[11px] font-mono tracking-widest text-[#d4af37] uppercase block mb-3">
                CONNECT ACROSS PLATFORMS
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {contactData.socials?.map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs transition-all ${
                      soc.name?.toLowerCase() === 'instagram'
                        ? 'bg-[#E1306C]/10 border-[#E1306C]/40 text-white hover:bg-[#E1306C] hover:border-[#E1306C]'
                        : 'bg-[#121318] border-white/5 hover:border-[#d4af37]/40 text-[#a0a0b2] hover:text-white'
                    }`}
                  >
                    {soc.name?.toLowerCase() === 'instagram' && (
                      <InstagramIcon className="w-3.5 h-3.5" />
                    )}
                    <span>{soc.name}</span>
                    <span className="text-[10px] opacity-70">↗</span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Booking & Inquiry Form */}
          <div className="lg:col-span-6 bg-[#0f1016] rounded-3xl p-8 sm:p-10 border border-[#d4af37]/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
            <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
              RESERVE YOUR DATES
            </h3>
            <p className="text-xs text-[#8a8a9e] mb-8 font-sans">
              Share your celebration details. We accept a limited number of weddings each season to ensure uncompromising artistic dedication.
            </p>

            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-cinzel text-xl font-bold text-white">
                  INQUIRY PREPARED!
                </h4>
                <p className="text-xs text-[#a0a0b2] max-w-sm">
                  Your details have been formatted and directed to NS via WhatsApp. We will connect with you shortly!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full border border-white/20 text-xs font-mono uppercase tracking-wider text-white hover:border-[#d4af37]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-[#a0a0b2] uppercase mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ananya & Karthik"
                    className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-sm transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-[#a0a0b2] uppercase mb-1.5">
                    Contact / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-sm transition-colors"
                  />
                </div>

                {/* Event Type & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-[#a0a0b2] uppercase mb-1.5">
                      Event Type
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-sm transition-colors"
                    >
                      {contactData.eventTypes?.map((type, tIdx) => (
                        <option key={tIdx} value={type} className="bg-[#090a0d]">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-[#a0a0b2] uppercase mb-1.5">
                      Tentative Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-[#a0a0b2] uppercase mb-1.5">
                    City / Venue
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Hyderabad, Vijayawada, Visakhapatnam, Tirupati"
                    className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-sm transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-[#a0a0b2] uppercase mb-1.5">
                    Tell Us About Your Vision
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share any special rituals, mandap ideas, or timeline questions..."
                    className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-sm transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8901a] text-black font-bold text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 transform active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND INQUIRY VIA WHATSAPP</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
