import React from "react";

export default function Footer() {
  return (
    <footer className="section-stack relative py-16 px-6 border-t border-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-3xl font-display font-bold text-accent mb-4">
              KOALA
            </div>
            <p className="text-muted">More Than Music. Pure Feeling.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-muted">
              <div>
                <a href="#music" className="hover-text-accent transition-colors">
                  Music
                </a>
              </div>
              <div>
                <a href="#videos" className="hover-text-accent transition-colors">
                  Videos
                </a>
              </div>
              <div>
                <a href="#store" className="hover-text-accent transition-colors">
                  Store
                </a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-surface border border-subtle rounded focus:outline-none focus:border-accent"
              />
              <button className="px-6 py-2 bg-accent text-accent-contrast font-semibold hover:scale-105 transition-transform">
                -&gt;
              </button>
            </div>
          </div>
        </div>
        <div className="text-center text-muted text-sm">
          (c) 2024 Koala. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
