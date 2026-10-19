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
  // hidden: kept (page still exists) but not shown in the header menus
  { label: "LIFESTYLE", href: "/lifestyle", hidden: true },
  { label: "MORE THAN MUSIC", href: "/more-than-music" },
  { label: "MERCHANDISE", href: "/store" },
  { label: "ABOUT", href: "/about" },
];

export const visibleNavLinks = navLinks.filter((link) => !link.hidden);

export const albums = [
  { title: "On & Off EP", image: "/assets/images/main-on-and-off.jpeg", href: "https://onerpm.link/245155137539" },
  { title: "Safe Space", image: "/assets/images/safe-space.jpg", href: "https://onerpm.link/219151261349" },
  { title: "Eulo", image: "/assets/images/WhatsApp Image 2026-10-18 at 9.18.12 PM.jpeg", href: "https://onerpm.link/200067207020" },
];

export const musicReleases = [
  {
    title: "On & Off EP",
    imageSrc: "/assets/images/main-on-and-off.jpeg",
    imageAlt: "On and Off cover art",
    href: "https://onerpm.link/245155137539",
  },
  {
    title: "Safe Space",
    imageSrc: "/assets/images/safe-space.jpg",
    imageAlt: "Safe Space cover art",
    href: "https://onerpm.link/219151261349",
  },
  {
    title: "Eulo",
    imageSrc: "/assets/images/WhatsApp Image 2026-10-18 at 9.18.12 PM.jpeg",
    imageAlt: "Eulo cover art",
    href: "https://onerpm.link/200067207020",
  },
];

export const tracks = musicReleases.map(({ title, href }) => ({
  title,
  href,
  duration: "",
}));

export const videos = [
  { title: "Safe Space (Acoustic Version)", image: "/assets/images/WhatsApp Image 2026-10-18 at 9.26.04 PM.jpeg", aspectRatio: "1254 / 1254", href: "https://youtu.be/OVleZjX9Ukw?si=Nd4u_khJM9RpVlso" },
  { title: "Eulo (Acoustic Version)", image: "/assets/images/WhatsApp Image 2026-10-18 at 9.27.08 PM.jpeg", aspectRatio: "1280 / 1280", href: "https://youtu.be/JmYQ0KhfF_8?si=NC5wk72GsbFXarkP" },
  { title: "Bottles of Beer (Acoustic Version)", image: null, aspectRatio: "1 / 1", href: null },
  { title: "Kitu Wrong (Acoustic Remix)", image: "/assets/images/alb4.jpeg", aspectRatio: "938 / 1194", href: "https://youtu.be/wmMga1XVVvA?si=8znkcBRGT7qgS5Xg" },
  { title: "Eulo (Lyric Video)", image: "/assets/images/WhatsApp Image 2026-10-18 at 9.30.05 PM.jpeg", aspectRatio: "1020 / 1039", href: "https://youtu.be/FdKhdyFaQOk?si=Z99z0eQp4othbFgH" },
  { title: "Safe Space (Lyric Video)", image: "/assets/images/safe-space.jpg", aspectRatio: "1118 / 1157", href: "https://youtu.be/ngEBdPhpDCc?si=lxVOW8FSCSQqHV1a" },
];

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
    title: "Koala Live at The Slow Leopard, Dar es Salaam \u2014 Marafiki Night Live",
    location: "The Slow Leopard, Dar es Salaam",
    image: "/assets/images/WhatsApp Image 2026-10-18 at 9.35.51 PM.jpeg",
    href: "https://youtu.be/b1SMfyAV_mA?si=9qvG6EuxOrnAmRlT",
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
  commercialModeling: [
    {
      brand: "Serengeti Lemon",
      href: "https://www.instagram.com/reel/DUkc1D7DM4o/?obrf=am5iZG5pb2hlc2U3",
      image: "/assets/images/tunnel/man1.jpg",
    },
    {
      brand: "CRDB Bank",
      href: "https://www.instagram.com/reel/DXMVxTrDCXy/?rpxt=MTdoZmdxdGVzcjNjZA==",
      image: "/assets/images/tunnel/man2.jpg",
    },
    {
      brand: "Kikkoman Soy Sauce",
      href: "https://www.instagram.com/reel/Da16DNHIZNs/?cplk=MXVmMm4waWZ3eTlzcw==",
      image: "/assets/images/tunnel/man6.jpg",
    },
  ],
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
