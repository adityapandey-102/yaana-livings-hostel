"use client";

import { Phone, MessageCircle } from "lucide-react";
import { CONTACT } from "@/data/contact";

const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}`;

export function FloatingContactButtons() {
  return (
    <div className="fixed right-4 bottom-6 z-40 flex flex-col gap-3">
      <a
        href={`tel:${CONTACT.phone}`}
        aria-label="Call"
        className="w-12 h-12 rounded-full bg-yaana-forest flex items-center justify-center text-white shadow-lg hover:bg-yaana-forest-light transition"
      >
        <Phone className="w-5 h-5" />
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg hover:opacity-90 transition"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
}
