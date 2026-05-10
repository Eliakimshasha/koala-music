import album1 from "../../public/assets/images/alb1.jpeg";
import album2 from "../../public/assets/images/alb2.jpeg";
import album3 from "../../public/assets/images/alb3.jpeg";
import album4 from "../../public/assets/images/alb4.jpeg";
import product1 from "../../public/assets/images/prod1.jpg";
import product2 from "../../public/assets/images/prod2.jpg";
import product3 from "../../public/assets/images/prod3.jpg";
import product4 from "../../public/assets/images/prod4.jpg";
import product5 from "../../public/assets/images/prod5.jpg";
import iconSpotify from "../../public/assets/images/spotify.png";
import iconTikTok from "../../public/assets/images/tiktok.png";
import iconTwitter from "../../public/assets/images/twitter.png";
import iconYouTube from "../../public/assets/images/youtube.png";
import Boomplay from "../../public/assets/images/boomplay.svg";
import iconInstagram from "../../public/assets/images/social.png";

export const navLinks = [
  { label: "MUSIC", href: "/music" },
  { label: "VIDEOS", href: "/videos" },
  { label: "SHOWS", href: "/live-shows" },
  { label: "LIFESTYLE", href: "/lifestyle" },
  { label: "MORE THAN MUSIC", href: "/more-than-music" },
  { label: "STORE", href: "/store" },
  { label: "ABOUT", href: "/about" },
];

export const albums = [
  { title: "Feelings Collection", year: "2024", image: album1, tracks: 12 },
  { title: "Deep Vibes", year: "2023", image: album2, tracks: 10 },
  { title: "Life Sessions", year: "2023", image: album3, tracks: 8 },
  { title: "Kitu Wrong EP", year: "2022", image: album4, tracks: 6 },
];

export const musicReleases = [
  {
    title: "On and Off",
    duration: "3:52",
    plays: "980K",
    views: "980K",
    imageSrc: "/assets/images/main-on-and-off.jpeg",
    imageAlt: "On and Off cover art",
  },
  {
    title: "Kitu Wrong",
    duration: "3:45",
    plays: "1.2M",
    views: "1.2M",
    imageSrc: "/assets/images/alb1.jpeg",
    imageAlt: "Kitu Wrong cover art",
  },
  {
    title: "Safe Space",
    duration: "3:40",
    plays: "1.1M",
    views: "1.1M",
    imageSrc: "/assets/images/safe-space.jpg",
    imageAlt: "Safe Space cover art",
  },
  {
    title: "Bottles of Beer",
    duration: "4:01",
    plays: "840K",
    views: "840K",
    imageSrc: "/assets/images/alb2.jpeg",
    imageAlt: "Bottles of Beer cover art",
  },
  {
    title: "Am Alive",
    duration: "3:36",
    plays: "760K",
    views: "760K",
    imageSrc: "/assets/images/koala9.jpeg",
    imageAlt: "Am Alive cover art",
  },
];

export const tracks = musicReleases.map(({ title, duration, plays }) => ({
  title,
  duration,
  plays,
}));

export const videos = musicReleases.map(
  ({ title, views, imageSrc, imageAlt }) => ({
    title,
    views,
    image: imageSrc,
    imageAlt,
  })
);

export const products = [
  { name: "Feelings T-Shirt", price: "35,000 TZS", image: product1 },
  { name: "Life Cap", price: "25,000 TZS", image: product3 },
  { name: "Koala Tote Bag", price: "30,000 TZS", image: product4 },
  { name: "Deep Hoodie", price: "75,000 TZS", image: product2 },
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

export const liveShows = [
  {
    title: "Midnight Echoes Tour",
    date: "Mar 12, 2026",
    location: "Dar es Salaam • Diamond Dome",
    price: "55,000 TZS",
    image: product5,
  },
  {
    title: "Coastline Sessions",
    date: "Apr 18, 2026",
    location: "Zanzibar • Oceanfront Arena",
    price: "70,000 TZS",
    image: product5,
  },
  {
    title: "Neon Rooftop Live",
    date: "May 09, 2026",
    location: "Arusha • Skyline Rooftop",
    price: "45,000 TZS",
    image: product5,
  },
  {
    title: "City Lights Experience",
    date: "Jun 20, 2026",
    location: "Dodoma • Capital Hall",
    price: "60,000 TZS",
    image: product5,
  },
];

export const lifestylePosts = [
  {
    title: "Morning Routines Before the Stage",
    tag: "Lifestyle",
    date: "Feb 02, 2026",
    readTime: "5 min read",
    excerpt:
      "Quiet mornings, strong tea, and the rituals that keep me focused before the crowd arrives.",
    image: product5,
  },
  {
    title: "Tour Diary: City Lights, Quiet Rooms",
    tag: "Stories",
    date: "Jan 24, 2026",
    readTime: "6 min read",
    excerpt:
      "Snapshots from the road - the small moments between soundcheck and the spotlight.",
    image: product5,
  },
  {
    title: "What I Pack for a Week of Shows",
    tag: "Lifestyle",
    date: "Jan 10, 2026",
    readTime: "4 min read",
    excerpt:
      "Gear, journals, and essentials that travel with me from studio sessions to stage.",
    image: product5,
  },
];

export const moreThanMusic = {
  title: "More Than Music",
  subtitle:
    "Biotechnologist, strategist, and community leader blending research, creativity, and social impact.",
  disciplines: [
    {
      title: "Modelling",
      tag: "Editorial + Campaign",
      description:
        "Fashion stories, lookbooks, and brand campaigns with a bold, clean edge.",
      image: product5,
    },
    {
      title: "Author",
      tag: "Books + Essays",
      description:
        "Short-form stories, essays, and a developing book project rooted in real life.",
      image: product5,
    },
    {
      title: "Comedy",
      tag: "Live + Digital",
      description:
        "Set pieces, sketches, and quick hits that blend timing with truth.",
      image: product5,
    },
    {
      title: "Creative Direction",
      tag: "Visual + Styling",
      description:
        "Concepts, styling, and creative direction for visuals that feel cinematic.",
      image: product5,
    },
  ],
  highlights: [
    {
      title: "Featured Work",
      detail: "Runway looks, lifestyle campaigns, and visual editorials.",
    },
    {
      title: "Writing Desk",
      detail: "Essays in progress and a book chapter series.",
    },
    {
      title: "Stage Time",
      detail: "Stand-up sets and audience-ready hosting.",
    },
    {
      title: "Collabs",
      detail: "Creative partnerships across fashion, media, and culture.",
    },
  ],
  gallery: [
    { title: "On Set", image: product5 },
    { title: "Editorial", image: product5 },
    { title: "Backstage", image: product5 },
  ],
};
