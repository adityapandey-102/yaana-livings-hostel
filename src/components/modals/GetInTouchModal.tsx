"use client";

import { X } from "lucide-react";

type Props = { open: boolean; onClose: () => void };

export function GetInTouchModal({ open, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-yaana-charcoal">Get in touch with us!</h3>
          <button onClick={onClose} className="p-1 text-yaana-charcoal hover:bg-yaana-cream-dark rounded"><X className="w-5 h-5" /></button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-yaana-charcoal mb-1">Name</label>
            <input type="text" className="w-full border border-yaana-charcoal/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yaana-forest focus:border-transparent outline-none" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-yaana-charcoal mb-1">Email</label>
            <input type="email" className="w-full border border-yaana-charcoal/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yaana-forest focus:border-transparent outline-none" placeholder="Your email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-yaana-charcoal mb-1">Phone Number</label>
            <input type="tel" className="w-full border border-yaana-charcoal/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yaana-forest focus:border-transparent outline-none" placeholder="Your phone" />
          </div>
          <div>
            <label className="block text-sm font-medium text-yaana-charcoal mb-1">Message</label>
            <textarea rows={4} className="w-full border border-yaana-charcoal/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yaana-forest focus:border-transparent outline-none resize-none" placeholder="Your message" />
          </div>
          <button type="submit" className="w-full bg-yaana-forest text-white py-2.5 rounded-lg font-medium hover:bg-yaana-forest-light transition">Submit</button>
        </form>
      </div>
    </div>
  );
}
