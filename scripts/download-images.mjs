#!/usr/bin/env node
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const ASSETS = path.join(ROOT, "public", "assets");

const IMAGES = [
  // Hero & brand
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/microsite/3800089600A/sample-brand.webp", file: "hero-bg.webp" },
  // Stats
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/eazypg-2-resources/house-door.png", file: "icons/house-door.png" },
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/eazypg-2-resources/Happy%20tenants.png", file: "icons/happy-tenants.png" },
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/eazypg-2-resources/Bed.png", file: "icons/bed.png" },
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/eazypg-2-resources/pin.png", file: "icons/pin.png" },
  // What makes different
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/brand-page/smart-kyc.webp", file: "perks/smart-kyc.webp" },
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/brand-page/tenant-membership.webp", file: "perks/tenant-membership.webp" },
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/brand-page/digital-payment.webp", file: "perks/digital-payment.webp" },
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/vectors/eazypg-logo-blue.webp", file: "perks/tenant-app.webp" },
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/brand-page/tenant-insurance.webp", file: "perks/tenant-insurance.webp" },
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/brand-page/complaint-resolution.webp", file: "perks/complaint-resolution.webp" },
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/landing-page-vectors/smart-living.webp", file: "smart-living.webp" },
  // App / footer
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/owner-landing/google-play-final.webp", file: "google-play.webp" },
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/vectors/app-store.webp", file: "app-store.webp" },
  // Properties
  { url: "https://rentok-storage-cdn.azureedge.net/due-type-images/due-type-images/D1HABdxjg9Z4VmwQ3iDbdLtQ0V13/1767681018852-142849.jpg", file: "properties/yaana-homes.jpg" },
  { url: "https://rentok-storage-cdn.azureedge.net/due-type-images/due-type-images/D1HABdxjg9Z4VmwQ3iDbdLtQ0V13/1767680725349-142797.jpg", file: "properties/yaana-comforts.jpg" },
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/microsite/sample/sample-image-house-3.webp", file: "properties/yaana-group.webp" },
  { url: "https://rentok-storage-cdn.azureedge.net/static-assets/PropertyImages/829c1c51-24a3-4f06-93a9-09c2c2aebdff/1767622079800_8o3opprncz9zhb64g6vy4a.webp", file: "properties/yaana-living.webp" },
  // Gallery (extra from yaana)
  { url: "https://rentok-storage-cdn.azureedge.net/due-type-images/due-type-images/D1HABdxjg9Z4VmwQ3iDbdLtQ0V13/1767680941594-142852.jpg", file: "gallery/g1.jpg" },
  { url: "https://rentok-storage-cdn.azureedge.net/due-type-images/due-type-images/D1HABdxjg9Z4VmwQ3iDbdLtQ0V13/1767680724500-142802.jpg", file: "gallery/g2.jpg" },
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/microsite/sample/sample-image-bedroom-1.webp", file: "gallery/g3.webp" },
  { url: "https://rentok-storage-cdn.azureedge.net/static-assets/PropertyImages/829c1c51-24a3-4f06-93a9-09c2c2aebdff/1767622066217_bsuw59x8neoux3ag03ivuh.webp", file: "gallery/g4.webp" },
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/microsite/sample/sample-image-hall-1.webp", file: "gallery/g5.webp" },
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/microsite/sample/sample-image-kichen-1.webp", file: "gallery/g6.webp" },
  // About
  { url: "https://rentok-storage-cdn.azureedge.net/rentok-marketplace/marketplace-dump/microsite/3800089600A/sample-brand.webp", file: "about-brand.webp" },
];

function get(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    protocol.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return get(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function main() {
  fs.mkdirSync(path.join(ASSETS, "icons"), { recursive: true });
  fs.mkdirSync(path.join(ASSETS, "perks"), { recursive: true });
  fs.mkdirSync(path.join(ASSETS, "properties"), { recursive: true });
  fs.mkdirSync(path.join(ASSETS, "gallery"), { recursive: true });

  for (const { url, file } of IMAGES) {
    const dest = path.join(ASSETS, file);
    try {
      const buf = await get(url);
      fs.writeFileSync(dest, buf);
      console.log("OK", file);
    } catch (e) {
      console.error("FAIL", file, e.message);
    }
  }
  console.log("Done.");
}

main();
