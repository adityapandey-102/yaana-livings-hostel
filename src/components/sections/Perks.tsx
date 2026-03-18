"use client";

import { SectionFade } from "@/components/ui/section-fade";
// import { 
//   Waves, 
//   Dumbbell, 
//   Wifi, 
//   Users, 
//   ShoppingBag, 
//   Wind, 
//   Coffee,
//   Car,
//   Sparkles,
//   UserCheck,
//   Video,
//   FlowerIcon
// } from "lucide-react";
import { 
  Dumbbell,
  ChefHat,
  KeyRound,
  Utensils,
  UserCheck,
  Users,
  Bath,
  Archive,
  Table,
  Tv,
  Sparkles,
  Droplets
} from "lucide-react";

// const AMENITIES = [
//   { 
//     title: "INFINITY POOL", 
//     icon: Waves,
//     desc: "Relax and unwind in our state-of-the-art infinity pool" 
//   },
//   { 
//     title: "WORLD CLASS GYM", 
//     icon: Dumbbell,
//     desc: "Stay fit with premium equipment and training" 
//   },
//   { 
//     title: "RFID IN ALL ROOMS", 
//     icon: Wifi,
//     desc: "Secure keyless entry with advanced RFID technology" 
//   },
//   { 
//     title: "5-STAR DINING EXPERIENCE", 
//     icon: Coffee,
//     desc: "Enjoy gourmet meals prepared by professional chefs" 
//   },
//   { 
//     title: "CONCIERGE", 
//     icon: UserCheck,
//     desc: "24/7 dedicated assistance for all your needs" 
//   },
//   { 
//     title: "PERSONAL BUTLER", 
//     icon: Users,
//     desc: "Premium personalized service at your doorstep" 
//   },
//   { 
//     title: "AIRPORT PICK UP AND DROP", 
//     icon: Car,
//     desc: "Complimentary airport transfer service" 
//   },
//   { 
//     title: "STEAM ROOM", 
//     icon: Wind,
//     desc: "Rejuvenate in our luxury steam and sauna facilities" 
//   },
//   { 
//     title: "SALON EXPERIENCE", 
//     icon: Sparkles,
//     desc: "In-house salon services for your grooming needs" 
//   },
//   { 
//     title: "DEDICATED RELATIONSHIP MANAGER", 
//     icon: UserCheck,
//     desc: "Your personal point of contact for seamless living" 
//   },
//   { 
//     title: "PREMIUM CONFERENCE ROOM", 
//     icon: Video,
//     desc: "Professional meeting spaces with modern amenities" 
//   },
//   { 
//     title: "YOGA ROOM", 
//     icon: FlowerIcon,
//     desc: "Dedicated wellness space for meditation and yoga" 
//   },
// ];

const AMENITIES = [
  { 
    title: "GYM", 
    icon: Dumbbell,
    desc: "Stay fit with premium equipment and training"
  },
  { 
    title: "Self cooking kitchen", 
    icon: ChefHat,
    desc: "Cook the way you like with our convenient self-cooking kitchen facility."
  },
  { 
    title: "RFID IN ALL ROOMS", 
    icon: KeyRound,
    desc: "Secure keyless entry with advanced RFID technology"
  },
  { 
    title: "5-STAR DINING EXPERIENCE", 
    icon: Utensils,
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
    title: "Attached Western Bathroom", 
    icon: Bath,
    desc: "Designed for comfort with a private attached western bathroom in every room."
  },
  { 
    title: "Personal Cupboard", 
    icon: Archive,
    desc: "Spacious personal cupboards for smart and secure storage."
  },
  { 
    title: "Study Table", 
    icon: Table,
    desc: "Study smarter with a personal study table built for focus and efficiency."
  },
  { 
    title: "TV", 
    icon: Tv,
    desc: "Relax and unwind with high-quality television entertainment in every room."
  },
  { 
    title: "Dressing Table", 
    icon:Sparkles,
    desc: "Start your day with ease using a stylish and functional in-room dressing table."
  },
  { 
    title: "RO Water", 
    icon: Droplets,
    desc: "Drink safe with advanced RO purified water available round the clock."
  }
];

export function Perks() {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-yaana-nearblack/95-- from-purple-200 via-purple-400 via-yaana-nearblack/85-- to-yaana-dark-lavender/70">
      <SectionFade className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-yaana-nearblack mb-6 tracking-tight">
            EXCLUSIVE AMENITIES
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-yaana-charcoal leading-relaxed">
            At YAANA, experience modern living designed with luxury and convenience in mind. From high-speed Wi-Fi and 24/7 security to thoughtfully designed common spaces and vibrant community events, every detail is crafted to offer comfort, style, and a seamless living experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {AMENITIES.map((amenity) => {
            const Icon = amenity.icon;
            return (
              <div
                key={amenity.title}
                className="group bg-white rounded-card p-6 border border-lavender-200 hover:border-lavender-400 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-lavender-600/10 mb-4 group-hover:bg-lavender-600/20 transition-colors">
                  <Icon className="w-7 h-7 text-lavender-700" />
                </div>
                <h3 className="font-serif font-bold text-sm text-yaana-nearblack mb-2 uppercase tracking-wider leading-tight">{amenity.title}</h3>
                <p className="text-xs text-yaana-charcoal leading-relaxed">{amenity.desc}</p>
              </div>
            );
          })}
        </div>
      </SectionFade>
    </section>
  );
}
