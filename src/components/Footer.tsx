import Link from "next/link";
import { Phone, Mail } from "lucide-react";

const aboutLinks = [
  { label: "Developer", href: "#" },
  { label: "Operator", href: "#" },
  { label: "Franchise", href: "#" },
];

const propertyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Boutique Workspaces", href: "#" },
  { label: "Life @ Yaana", href: "/life-at-yaana" },
  { label: "Hostels", href: "/rental" },
  { label: "FAQ", href: "#" },
  { label: "Blogs", href: "#" },
  { label: "Contact Us", href: "/contact" },
];

const residenceLinks = [
  { label: "Residences in Noida", href: "/rental?city=noida" },
  { label: "Residences in Ahmedabad", href: "/rental?city=ahmedabad" },
  { label: "Residences in Mumbai", href: "/rental?city=mumbai" },
  { label: "Residences in Greater Noida", href: "/rental?city=greater-noida" },
];

const legalLinks = [
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-yaana-nearblack text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Logo and Description */}
        <div className="mb-12">
          <h3 className="text-2xl font-serif font-bold text-yaana-gold mb-4">YAANA</h3>
          <p className="max-w-2xl text-sm text-white/80 leading-relaxed">
            Introducing Yaana Luxury Residences, where student living reaches new heights of excellence in India. Experience the epitome of modernity fused with community and convenience. Our meticulously crafted spaces are tailored to prioritize your comfort, safety, and connectivity, boasting cozy study nooks and vibrant common areas.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">About</h4>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-yaana-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {propertyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-yaana-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Residences</h4>
            <ul className="space-y-2">
              {residenceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-yaana-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-yaana-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3">
              <a href="tel:1800-572-0709" className="flex items-center gap-2 text-sm text-white/70 hover:text-yaana-gold transition-colors">
                <Phone className="w-4 h-4" />
                <span>1800-572-0709</span>
              </a>
              <a href="mailto:info@yaanaliving.com" className="flex items-center gap-2 text-sm text-white/70 hover:text-yaana-gold transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@yaanaliving.com</span>
              </a>
              <p className="text-sm text-white/60 leading-relaxed mt-4">
                405, 4th Floor, The Summit Business Bay, New Link Metro Station, Andheri-Kurla Road, Andheri East, Mumbai - 400 093, Maharashtra, India.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © Copyright 2026 by Yaana Luxury - Designed By Buzzlink Studios
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-yaana-gold flex items-center justify-center transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-yaana-gold flex items-center justify-center transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-yaana-gold flex items-center justify-center transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
