/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelpCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export function SEOContent() {
  const faqs = [
    {
      q: "What is the ideal clearance around a dining table?",
      a: "For comfortable movement and chair pull-out, a minimum of 36 inches (91cm) of clearance from the table edge to the nearest wall or furniture is recommended. For luxury spacing, 42–48 inches is ideal."
    },
    {
      q: "How much space does each person need at the table?",
      a: "Each seated person typically requires 24 inches (61cm) of linear table space to eat comfortably without bumping elbows. For armchair use or luxury spacing, allow 30 inches per person."
    },
    {
      q: "Can I fit a round table in a small rectangular room?",
      a: "Square or round tables often work best in small rooms as they create a more open feel and allow for better circulation. However, if the room is very narrow, a small rectangular or oval table might be more space-efficient."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Schema Markup for SEO (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Dining Table Size Calculator",
            "url": "https://luxehome.com/tools/dining-table-calculator",
            "description": "Calculate the perfect dining table size for your room based on dimensions, seating needs, and comfort levels.",
            "applicationCategory": "DesignTool",
            "operatingSystem": "All"
          })}
        </script>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-8 leading-tight">
              A Professional Guide to Dining Room Spacing
            </h2>
            <div className="space-y-8 text-gray-600 leading-relaxed">
              <p>
                Choosing the right dining table is more than just picking a design you love; it's about engineering the perfect flow for your home. Our calculator uses architectural standards to ensure you never have to squeeze past a guest or struggle with a heavy chair.
              </p>
              
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  Key Dimensions to Remember
                </h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex justify-between border-b border-gray-200 pb-2">
                    <span>Minimum Clearance</span>
                    <span className="font-bold text-gray-900">36" (91cm)</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-200 pb-2">
                    <span>Width Per Guest</span>
                    <span className="font-bold text-gray-900">24" (61cm)</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-200 pb-2">
                    <span>Standard Table Height</span>
                    <span className="font-bold text-gray-900">30" (76cm)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Chair Seat Height</span>
                    <span className="font-bold text-gray-900">18" (46cm)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Recommended Articles</h4>
                <div className="grid grid-cols-1 gap-4">
                  {['Best dining table size for 12x12 room', '6 seater dining table dimensions guide', 'Round vs Rectangular: Which is right?'].map((blog) => (
                    <a key={blog} href="#" className="group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-amber-200 transition-colors shadow-sm">
                      <span className="text-sm font-medium group-hover:text-amber-600 transition-colors uppercase tracking-wide">{blog}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div>
               <h3 className="font-serif text-2xl text-gray-900 mb-8 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-amber-600" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-gray-100 pb-6 last:border-0">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg leading-snug">
                      {faq.q}
                    </h4>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 p-10 rounded-3xl text-white overflow-hidden relative group">
              <div className="relative z-10">
                <h3 className="font-serif text-2xl mb-4">Still unsure about your space?</h3>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed max-w-xs">
                  Book a free 15-minute consultation with our interior design experts.
                </p>
                <button className="bg-amber-600 hover:bg-amber-500 px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-amber-600/20">
                  Book Consultation
                </button>
              </div>
               {/* Decorative background element */}
               <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl group-hover:bg-amber-600/20 transition-all duration-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
