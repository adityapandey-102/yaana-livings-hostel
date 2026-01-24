"use client";

import { SectionFade } from "@/components/ui/section-fade";
import { 
  Waves, 
  Dumbbell, 
  Wifi, 
  Users, 
  ShoppingBag, 
  Wind, 
  Coffee,
  Car,
  Sparkles,
  UserCheck,
  Video,
  FlowerIcon
} from "lucide-react";

const AMENITIES = [
  { 
    title: "INFINITY POOL", 
    icon: Waves,
    desc: "Relax and unwind in our state-of-the-art infinity pool" 
  },
  { 
    title: "WORLD CLASS GYM", 
    icon: Dumbbell,
    desc: "Stay fit with premium equipment and training" 
  },
  { 
    title: "RFID IN ALL ROOMS", 
    icon: Wifi,
    desc: "Secure keyless entry with advanced RFID technology" 
  },
  { 
    title: "5-STAR DINING EXPERIENCE", 
    icon: Coffee,
    desc: "Enjoy gourmet meals prepared by professional chefs" 
  },
  { 
    title: "CONCIERGE", 
    icon: UserCheck,
    desc: "24/7 dedicated assistance for all your needs" 
  },
  { 
    title: "PERSONAL BUTLER", 
    icon: Users,
    desc: "Premium personalized service at your doorstep" 
  },
  { 
    title: "AIRPORT PICK UP AND DROP", 
    icon: Car,
    desc: "Complimentary airport transfer service" 
  },
  { 
    title: "STEAM ROOM", 
    icon: Wind,
    desc: "Rejuvenate in our luxury steam and sauna facilities" 
  },
  { 
    title: "SALON EXPERIENCE", 
    icon: Sparkles,
    desc: "In-house salon services for your grooming needs" 
  },
  { 
    title: "DEDICATED RELATIONSHIP MANAGER", 
    icon: UserCheck,
    desc: "Your personal point of contact for seamless living" 
  },
  { 
    title: "PREMIUM CONFERENCE ROOM", 
    icon: Video,
    desc: "Professional meeting spaces with modern amenities" 
  },
  { 
    title: "YOGA ROOM", 
    icon: FlowerIcon,
    desc: "Dedicated wellness space for meditation and yoga" 
  },
];

export function Perks() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-yaana-charcoal to-yaana-nearblack text-white">
      <SectionFade className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 tracking-tight">
            EXCLUSIVE AMENITIES
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-white/80 leading-relaxed">
            At YAANA, experience a lifestyle crafted with luxury and convenience in mind. Our world-class amenities include state-of-the-art fitness centers, elegantly designed common areas, top-tier Wi-Fi and 24/7 security for peace of mind. Revel in our cozy lounges, unwind on the rooftop deck, or dive into our curated social events tailored for a vibrant community. At YAANA, every detail is designed to elevate your living experience, offering a blend of comfort, style, and sophistication.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {AMENITIES.map((amenity) => {
            const Icon = amenity.icon;
            return (
              <div
                key={amenity.title}
                className="group bg-white/5 backdrop-blur-sm rounded-card p-6 border border-white/10 hover:border-yaana-gold/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-yaana-gold/10 mb-4 group-hover:bg-yaana-gold/20 transition-colors">
                  <Icon className="w-7 h-7 text-yaana-gold" />
                </div>
                <h3 className="font-serif font-bold text-sm text-white mb-2 uppercase tracking-wider leading-tight">{amenity.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed">{amenity.desc}</p>
              </div>
            );
          })}
        </div>
      </SectionFade>
    </section>
  );
}
