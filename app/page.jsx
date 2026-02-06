'use client';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function KoalaWebsite() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [activeAlbum, setActiveAlbum] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scrolling setup
      ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      });

      // Hero parallax animations
      gsap.to('.hero-title', {
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: 300,
        opacity: 0.3,
        scale: 0.8,
      });

      gsap.to('.hero-koala-text', {
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -200,
        rotate: -15,
        opacity: 0,
      });

      gsap.to('.hero-bg', {
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        scale: 1.2,
        opacity: 0.5,
      });

      // Staggered reveal for section titles
      gsap.utils.toArray('.section-title').forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        });
      });

      // Album cards parallax
      gsap.utils.toArray('.album-card').forEach((card, i) => {
        const speed = 1 + (i % 3) * 0.3;
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          y: (i) => i * -50 * speed,
        });
      });

      // Music player reveal
      gsap.from('.music-player', {
        scrollTrigger: {
          trigger: '.music-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
      });

      // Video grid animations
      gsap.utils.toArray('.video-item').forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 100,
          opacity: 0,
          rotation: i % 2 === 0 ? 5 : -5,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power2.out',
        });
      });

      // Store items reveal
      gsap.utils.toArray('.store-item').forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      });

      // Social links floating animation
      gsap.to('.social-link', {
        y: -10,
        duration: 2,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Parallax background elements
      gsap.to('.parallax-slow', {
        scrollTrigger: {
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        y: (i, el) => (1 - parseFloat(el.getAttribute('data-speed'))) * ScrollTrigger.maxScroll(window),
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const albums = [
    { title: 'Feelings Collection', year: '2024', cover: 'bg-gradient-to-br from-[#AFD3A1] to-[#8BC084]', tracks: 12 },
    { title: 'Deep Vibes', year: '2023', cover: 'bg-gradient-to-br from-[#000000] to-[#333333]', tracks: 10 },
    { title: 'Life Sessions', year: '2023', cover: 'bg-gradient-to-br from-[#FFFFFF] to-[#E5E5E5]', tracks: 8 },
    { title: 'Kitu Wrong EP', year: '2022', cover: 'bg-gradient-to-br from-[#AFD3A1] to-[#000000]', tracks: 6 },
  ];

  const tracks = [
    { title: 'Kitu Wrong', duration: '3:45', plays: '1.2M' },
    { title: 'I Move On', duration: '4:12', plays: '890K' },
    { title: 'Happiness', duration: '3:28', plays: '1.5M' },
    { title: 'Ya Kesho', duration: '3:56', plays: '750K' },
    { title: 'More Than Music', duration: '4:34', plays: '2.1M' },
  ];

  const videos = [
    { title: 'Kitu Wrong (Official Video)', views: '2.3M', thumbnail: 'bg-[#AFD3A1]' },
    { title: 'Studio Sessions Vol. 1', views: '560K', thumbnail: 'bg-[#000000]' },
    { title: 'Live at Mlimani City', views: '1.1M', thumbnail: 'bg-gradient-to-br from-[#AFD3A1] to-[#000000]' },
    { title: 'Behind The Scenes', views: '430K', thumbnail: 'bg-[#FFFFFF]' },
  ];

  const products = [
    { name: 'Feelings T-Shirt', price: '35,000 TZS', image: 'bg-[#AFD3A1]' },
    { name: 'Deep Hoodie', price: '75,000 TZS', image: 'bg-[#000000]' },
    { name: 'Life Cap', price: '25,000 TZS', image: 'bg-[#FFFFFF]' },
    { name: 'Koala Tote Bag', price: '30,000 TZS', image: 'bg-gradient-to-br from-[#AFD3A1] to-[#000000]' },
  ];

  return (
    <div ref={containerRef} className="bg-[#000000] text-white overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Space Grotesk', sans-serif;
          background: #000000;
          color: white;
          overflow-x: hidden;
        }

        .font-display {
          font-family: 'Instrument Serif', serif;
        }

        .text-gradient {
          background: linear-gradient(135deg, #AFD3A1 0%, #FFFFFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glow-effect {
          text-shadow: 0 0 20px rgba(175, 211, 161, 0.5),
                       0 0 40px rgba(175, 211, 161, 0.3);
        }

        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 30px 60px rgba(175, 211, 161, 0.3);
        }

        .noise {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          z-index: 9999;
        }

        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="noise"></div>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* Navigation */}
          <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <div className="text-2xl font-display font-bold text-[#AFD3A1]">KOALA</div>
              <div className="hidden md:flex gap-8 text-sm tracking-wider">
                <a href="#music" className="hover:text-[#AFD3A1] transition-colors">MUSIC</a>
                <a href="#videos" className="hover:text-[#AFD3A1] transition-colors">VIDEOS</a>
                <a href="#store" className="hover:text-[#AFD3A1] transition-colors">STORE</a>
                <a href="#about" className="hover:text-[#AFD3A1] transition-colors">ABOUT</a>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
            <div className="hero-bg absolute inset-0 bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#AFD3A1] opacity-50"></div>
            
            {/* Parallax circles */}
            <div className="parallax-slow absolute top-20 left-10 w-96 h-96 bg-[#AFD3A1] rounded-full blur-3xl opacity-20" data-speed="0.3"></div>
            <div className="parallax-slow absolute bottom-20 right-10 w-80 h-80 bg-white rounded-full blur-3xl opacity-10" data-speed="0.5"></div>
            
            <div className="relative z-10 text-center px-6">
              <div className="hero-koala-text text-[#AFD3A1] text-xl tracking-[0.3em] mb-6 font-light">
                KOALA
              </div>
              <h1 className="hero-title font-display text-7xl md:text-9xl font-bold mb-8 glow-effect">
                MORE<br/>THAN<br/>MUSIC
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light tracking-wide">
                Pure Feeling. Raw Passion. Unforgettable Sound.
              </p>
              <div className="mt-12 flex gap-6 justify-center">
                <button className="px-8 py-4 bg-[#AFD3A1] text-black font-semibold tracking-wider hover:scale-105 transition-transform">
                  LISTEN NOW
                </button>
                <button className="px-8 py-4 border-2 border-white/30 hover:border-[#AFD3A1] hover:text-[#AFD3A1] transition-all">
                  EXPLORE
                </button>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="relative py-32 px-6 bg-gradient-to-b from-black to-[#0a0a0a]">
            <div className="max-w-6xl mx-auto">
              <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-16 text-gradient">
                The Story
              </h2>
              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                  <p>
                    Koala isn't just an artist—he's a storyteller, a spiritual being, and a creator. 
                    He believes in love, in feeling deeply, and in channeling those emotions into music 
                    that speaks straight to the soul.
                  </p>
                  <p>
                    With a smooth yet slightly raspy voice that carries raw passion, he makes you stop 
                    and ask, "Who is that?"—and once you hear him, you won't forget.
                  </p>
                  <p>
                    For over five years, Koala has been crafting his sound, blending R&B/soul, Afrosoul, 
                    Afrobeats, Amapiano, Jazz, and Indie to create something uniquely his own.
                  </p>
                </div>
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-[#AFD3A1] to-[#000000] rounded-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-9xl font-display">
                      K
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Albums Section */}
          <section id="albums" className="relative py-32 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-20 text-[#AFD3A1]">
                Albums
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {albums.map((album, i) => (
                  <div key={i} className="album-card card-hover cursor-pointer">
                    <div className={`aspect-square ${album.cover} rounded-lg mb-4 flex items-center justify-center text-6xl font-display text-white/20 backdrop-blur-sm`}>
                      {album.year}
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-2">{album.title}</h3>
                    <p className="text-gray-400">{album.tracks} tracks • {album.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Music Section */}
          <section id="music" className="music-section relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-black">
            <div className="max-w-5xl mx-auto">
              <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-20 text-gradient">
                Latest Tracks
              </h2>
              <div className="music-player bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                {tracks.map((track, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-white/10 hover:bg-white/5 transition-all px-4 rounded group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#AFD3A1] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{track.title}</div>
                        <div className="text-sm text-gray-400">{track.plays} plays</div>
                      </div>
                    </div>
                    <div className="text-gray-400">{track.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Videos Section */}
          <section id="videos" className="relative py-32 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-20 text-[#AFD3A1]">
                Videos
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {videos.map((video, i) => (
                  <div key={i} className="video-item cursor-pointer group">
                    <div className={`aspect-video ${video.thumbnail} rounded-lg mb-4 flex items-center justify-center overflow-hidden relative`}>
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all"></div>
                      <svg className="w-20 h-20 text-white group-hover:scale-125 transition-transform relative z-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{video.title}</h3>
                    <p className="text-gray-400">{video.views} views</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Store Section */}
          <section id="store" className="relative py-32 px-6 bg-gradient-to-b from-black to-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">
              <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-20 text-gradient">
                Store
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product, i) => (
                  <div key={i} className="store-item card-hover cursor-pointer">
                    <div className={`aspect-square ${product.image} rounded-lg mb-4 flex items-center justify-center text-4xl font-display`}>
                      <div className={`w-24 h-24 rounded-full ${product.image === 'bg-[#FFFFFF]' ? 'bg-black' : 'bg-white'} opacity-20`}></div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-[#AFD3A1] font-bold">{product.price}</p>
                    <button className="w-full mt-4 py-3 border border-white/20 hover:bg-[#AFD3A1] hover:text-black hover:border-[#AFD3A1] transition-all tracking-wider">
                      ADD TO CART
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Social Media Section */}
          <section className="relative py-32 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-16 text-[#AFD3A1]">
                Connect
              </h2>
              <div className="flex justify-center gap-8 flex-wrap">
                {['Instagram', 'Twitter', 'YouTube', 'Spotify', 'Apple Music', 'TikTok'].map((platform, i) => (
                  <a key={i} href="#" className="social-link group">
                    <div className="w-20 h-20 bg-white/5 hover:bg-[#AFD3A1] rounded-full flex items-center justify-center border border-white/10 hover:border-[#AFD3A1] transition-all">
                      <span className="text-2xl group-hover:scale-125 transition-transform">
                        {platform.charAt(0)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400 group-hover:text-[#AFD3A1] transition-colors">
                      {platform}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="relative py-16 px-6 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="text-3xl font-display font-bold text-[#AFD3A1] mb-4">KOALA</div>
                  <p className="text-gray-400">More Than Music. Pure Feeling.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <div className="space-y-2 text-gray-400">
                    <div><a href="#music" className="hover:text-[#AFD3A1] transition-colors">Music</a></div>
                    <div><a href="#videos" className="hover:text-[#AFD3A1] transition-colors">Videos</a></div>
                    <div><a href="#store" className="hover:text-[#AFD3A1] transition-colors">Store</a></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Newsletter</h4>
                  <div className="flex gap-2">
                    <input type="email" placeholder="Your email" className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-[#AFD3A1]" />
                    <button className="px-6 py-2 bg-[#AFD3A1] text-black font-semibold hover:scale-105 transition-transform">
                      →
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-center text-gray-400 text-sm">
                © 2024 Koala. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}