import album1 from "../../public/assets/images/alb1.jpeg";
import album2 from "../../public/assets/images/alb2.jpeg";
import album3 from "../../public/assets/images/alb3.jpeg";
import album4 from "../../public/assets/images/alb4.jpeg";
import product1 from "../../public/assets/images/prod1.jpg";
import product2 from "../../public/assets/images/prod2.jpg";
import product3 from "../../public/assets/images/prod3.jpg";
import product4 from "../../public/assets/images/prod4.jpg";
import product5 from "../../public/assets/images/prod5.jpg";
import iconApple from "../../public/assets/images/apple.png";
import iconSpotify from "../../public/assets/images/spotify.png";
import iconTikTok from "../../public/assets/images/tiktok.png";
import iconTwitter from "../../public/assets/images/twitter.png";
import iconYouTube from "../../public/assets/images/youtube.png";
import Boomplay from "../../public/assets/images/boomplay.png";
import iconInstagram from "../../public/assets/images/social.png";

export const navLinks = [
  { label: "MUSIC", href: "#music" },
  { label: "VIDEOS", href: "#videos" },
  { label: "STORE", href: "#store" },
  { label: "ABOUT", href: "#about" },
];

export const albums = [
  { title: "Feelings Collection", year: "2024", image: album1, tracks: 12 },
  { title: "Deep Vibes", year: "2023", image: album2, tracks: 10 },
  { title: "Life Sessions", year: "2023", image: album3, tracks: 8 },
  { title: "Kitu Wrong EP", year: "2022", image: album4, tracks: 6 },
];

export const tracks = [
  { title: "Kitu Wrong", duration: "3:45", plays: "1.2M" },
  { title: "I Move On", duration: "4:12", plays: "890K" },
  { title: "Happiness", duration: "3:28", plays: "1.5M" },
  { title: "Ya Kesho", duration: "3:56", plays: "750K" },
  { title: "More Than Music", duration: "4:34", plays: "2.1M" },
];

export const videos = [
  { title: "Kitu Wrong (Official Video)", views: "2.3M", image: product5 },
  { title: "Studio Sessions Vol. 1", views: "560K", image: product5 },
  { title: "Live at Mlimani City", views: "1.1M", image: product5 },
  { title: "Behind The Scenes", views: "430K", image: product5 },
];

export const products = [
  { name: "Feelings T-Shirt", price: "35,000 TZS", image: product1 },
  { name: "Deep Hoodie", price: "75,000 TZS", image: product2 },
  { name: "Life Cap", price: "25,000 TZS", image: product3 },
  { name: "Koala Tote Bag", price: "30,000 TZS", image: product4 },
];

export const comingSoon = {
  title: "Limited Drop",
  label: "Coming Soon",
  description:
    "A new capsule designed for late nights and long drives. Clean silhouettes, elevated textures, and a quiet signature.",
  image: product5,
};

export const socialLinks = [
   { label: "Spotify", href: "#", icon: iconSpotify },
  { label: "TikTok", href: "#", icon: iconTikTok },
  { label: "Boomplay", href: "#", icon: Boomplay },
  { label: "Instagram", href: "#", icon: iconInstagram },
  { label: "Twitter", href: "#", icon: iconTwitter },
  { label: "YouTube", href: "#", icon: iconYouTube },
 
];
