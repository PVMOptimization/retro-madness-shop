import Link from "next/link";
import type { Metadata } from "next";
import { BUSINESS } from "@/lib/repairData";

export const metadata: Metadata = {
  title: "Console Repair Fort Worth TX | Retro Madness",
  description:
    "Walk-in console repair in Fort Worth, TX. PS5, Xbox, Nintendo Switch. Near Bedford, Hurst, and Euless. No appointment needed.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Retro Madness — Pro Console Repair",
  description: "Fast, affordable console repair for PS5, Xbox, and Nintendo Switch.",
  telephone: "+16827087506",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5425 S Hulen St",
    addressLocality: "Fort Worth",
    addressRegion: "TX",
    postalCode: "76132",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "11:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "12:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
};

export default function LocalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-base">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-accent text-xs uppercase tracking-widest mb-4">
            Fort Worth, TX
          </p>
          <h1 className="text-white font-bold text-4xl md:text-5xl mb-4">
            Console Repair<br />in Fort Worth
          </h1>
          <p className="text-muted text-lg max-w-xl mb-8">
            Walk in — no appointment needed. We&apos;re near Bedford, Hurst, and Euless.
            Serving the entire DFW area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent text-base font-bold px-6 py-3 rounded-xl hover:bg-accent-hover transition-colors"
            >
              Get Directions →
            </a>
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:border-accent hover:text-accent transition-colors font-mono"
            >
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Map embed */}
      <section className="px-6 pb-16 bg-base">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3357.4!2d-97.43!3d32.66!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s5425+S+Hulen+St%2C+Fort+Worth%2C+TX+76132!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Retro Madness location map"
            />
          </div>
        </div>
      </section>

      {/* Location info */}
      <section className="px-6 py-16 bg-panel">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="font-mono text-accent text-xs uppercase tracking-widest mb-4">
              Address
            </p>
            <p className="text-white font-bold text-xl mb-1">Retro Madness</p>
            <p className="text-white font-mono">{BUSINESS.address}</p>
            <p className="text-muted text-sm mt-3">
              Near Bedford, Hurst, and Euless. Easy access off I-20.
            </p>
          </div>

          <div>
            <p className="font-mono text-accent text-xs uppercase tracking-widest mb-4">
              Hours
            </p>
            <div className="space-y-2">
              {BUSINESS.hours.map((h) => (
                <div key={h.day} className="flex justify-between text-sm">
                  <span className="text-muted font-mono w-10">{h.day}</span>
                  <span className="text-white">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Walk-in CTA */}
      <section className="px-6 py-20 bg-base">
        <div className="max-w-4xl mx-auto bg-panel border border-accent/20 rounded-2xl p-10 text-center">
          <h2 className="text-white font-bold text-3xl mb-3">
            Come In Now
          </h2>
          <p className="text-muted mb-6 max-w-md mx-auto">
            No appointment needed. Walk in with your console — we&apos;ll diagnose
            it for free and give you a price on the spot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent text-base font-bold px-6 py-3 rounded-xl hover:bg-accent-hover transition-colors"
            >
              Get Directions →
            </a>
            <Link
              href="/repair"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:border-accent hover:text-accent transition-colors"
            >
              Get a Quote First →
            </Link>
          </div>
        </div>
      </section>

      {/* Area coverage */}
      <section className="px-6 py-16 bg-panel">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-accent text-xs uppercase tracking-widest mb-4">
            Serving DFW
          </p>
          <h2 className="text-white font-bold text-2xl mb-6">
            Serving Fort Worth and surrounding cities
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Fort Worth",
              "Bedford",
              "Hurst",
              "Euless",
              "Arlington",
              "Grapevine",
              "Keller",
              "Benbrook",
              "Burleson",
              "Crowley",
            ].map((city) => (
              <span
                key={city}
                className="border border-white/10 text-muted text-sm px-4 py-2 rounded-full"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
