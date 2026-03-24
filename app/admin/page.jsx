"use client";

import { useEffect, useState } from "react";

import AdminAuthInfo from "./components/AdminAuthInfo";
import AdminMockResourceWorkspace from "./components/AdminMockResourceWorkspace";
import AdminAuthPanel from "./components/AdminAuthPanel";
import AdminSettingsPanel from "./components/AdminSettingsPanel";
import AdminSidebar from "./components/AdminSidebar";
import DashboardActivity from "./components/DashboardActivity";
import DashboardCrudSection from "./components/DashboardCrudSection";
import DashboardOverview from "./components/DashboardOverview";
import DashboardUpcoming from "./components/DashboardUpcoming";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [activeView, setActiveView] = useState("dashboard");

  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  async function login(e) {
    e.preventDefault();
    setStatus("Logging in...");
    try {
      const body = new URLSearchParams();
      body.append("username", email);
      body.append("password", password);

      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      localStorage.setItem("admin_token", data.access_token);
      setToken(data.access_token);
      setStatus("Logged in.");
    } catch (err) {
      setStatus("Login failed.");
    }
  }

  async function register(e) {
    e.preventDefault();
    setStatus("Creating admin...");
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error();
      setStatus("Admin created. Now login.");
    } catch (err) {
      setStatus("Admin creation failed.");
    }
  }

  function logout() {
    localStorage.removeItem("admin_token");
    setToken("");
  }

  const resources = [
    {
      title: "Albums",
      endpoint: "/albums",
      fields: [
        { name: "title", label: "Title" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "release_date", label: "Release Date", type: "date" },
        { name: "cover_image_url", label: "Cover Image URL" },
      ],
    },
    {
      title: "Videos",
      endpoint: "/videos",
      fields: [
        { name: "title", label: "Title" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "video_url", label: "Video URL" },
        { name: "thumbnail_url", label: "Thumbnail URL" },
        { name: "release_date", label: "Release Date", type: "date" },
      ],
    },
    {
      title: "Music",
      endpoint: "/music",
      fields: [
        { name: "title", label: "Title" },
        { name: "artist", label: "Artist" },
        { name: "album", label: "Album" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "audio_url", label: "Audio URL" },
        { name: "cover_image_url", label: "Cover Image URL" },
        { name: "duration_seconds", label: "Duration (sec)", type: "number", step: "1" },
        { name: "release_date", label: "Release Date", type: "date" },
      ],
    },
    {
      title: "Store",
      endpoint: "/store",
      fields: [
        { name: "name", label: "Name" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "price", label: "Price", type: "number", step: "0.01" },
        { name: "currency", label: "Currency" },
        { name: "stock", label: "Stock", type: "number", step: "1" },
        { name: "image_url", label: "Image URL" },
      ],
    },
    {
      title: "Shows",
      endpoint: "/shows",
      fields: [
        { name: "title", label: "Title" },
        { name: "venue", label: "Venue" },
        { name: "city", label: "City" },
        { name: "country", label: "Country" },
        { name: "show_datetime", label: "Show Date/Time", type: "datetime-local" },
        { name: "ticket_url", label: "Ticket URL" },
        { name: "notes", label: "Notes", type: "textarea" },
      ],
    },
  ];

  const stats = [
    {
      label: "Total Streams",
      value: "2.5M",
      delta: "+12%",
      caption: "Last 30 days",
    },
    {
      label: "Tickets Sold",
      value: "1,200",
      delta: "+6%",
      caption: "Tour cycle",
    },
    {
      label: "Store Revenue",
      value: "$8,450",
      delta: "+3%",
      caption: "Monthly gross",
    },
    {
      label: "New Fans",
      value: "+320",
      delta: "+18%",
      caption: "Fan base growth",
    },
  ];

  const activityItems = [
    { title: 'Uploaded "Summer Nights" EP', time: "12 hrs ago" },
    { title: "Added new show in Austin, TX", time: "14 hrs ago" },
    { title: 'Updated "Echoes" video link', time: "2 days ago" },
    { title: "Merch stock update: Vinyl", time: "3 days ago" },
  ];

  const upcomingGigs = [
    { title: "The Fillmore", location: "San Francisco, CA", date: "Jul 15" },
    { title: "Brooklyn Steel", location: "Brooklyn, NY", date: "Jul 21" },
    { title: "Red Rocks Amphitheatre", location: "Morrison, CO", date: "Aug 05" },
  ];

  return (
    <main className="admin-page">
      <div className="admin-backdrop" />
      <div className="admin-content">
        {token ? (
          <div>
            <AdminSidebar
              onLogout={logout}
              activeView={activeView}
              onSelect={setActiveView}
            />
            <div className="space-y-4 p-3 sm:p-4 md:ml-[260px] md:space-y-6 md:p-8">
              {activeView === "dashboard" && (
                <>
                  <DashboardOverview stats={stats} />
                  <div className="grid gap-4 md:gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                    <DashboardActivity items={activityItems} />
                    <DashboardUpcoming gigs={upcomingGigs} />
                  </div>
                </>
              )}

              {activeView === "music" && (
                <AdminMockResourceWorkspace
                  title="Music Manager"
                  fields={[
                    { name: "title", label: "Title" },
                    { name: "artist", label: "Artist" },
                    { name: "album", label: "Album" },
                    { name: "description", label: "Description", type: "textarea" },
                    { name: "audio_url", label: "Audio URL" },
                    { name: "release_date", label: "Release Date", type: "date" },
                  ]}
                  seedItems={[
                    {
                      id: "m1",
                      title: "Midnight Echo",
                      artist: "Ariana Cole",
                      album: "City Lights",
                      description: "Lead single for spring campaign.",
                      audio_url: "https://audio.example.com/midnight-echo.mp3",
                      release_date: "2026-02-14",
                    },
                    {
                      id: "m2",
                      title: "Neon Drive",
                      artist: "Ariana Cole",
                      album: "Night Ride",
                      description: "High-energy promo track.",
                      audio_url: "https://audio.example.com/neon-drive.mp3",
                      release_date: "2026-03-05",
                    },
                  ]}
                />
              )}

              {activeView === "videos" && (
                <AdminMockResourceWorkspace
                  title="Video Manager"
                  fields={[
                    { name: "title", label: "Title" },
                    { name: "description", label: "Description", type: "textarea" },
                    { name: "video_url", label: "Video URL" },
                    { name: "thumbnail_url", label: "Thumbnail URL" },
                    { name: "release_date", label: "Release Date", type: "date" },
                  ]}
                  seedItems={[
                    {
                      id: "v1",
                      title: "Midnight Echo (Official Video)",
                      description: "Main campaign visual.",
                      video_url: "https://video.example.com/midnight-echo",
                      thumbnail_url: "https://img.example.com/midnight-echo.jpg",
                      release_date: "2026-02-20",
                    },
                    {
                      id: "v2",
                      title: "Behind The Scenes: Neon Drive",
                      description: "Studio and rehearsal footage.",
                      video_url: "https://video.example.com/neon-drive-bts",
                      thumbnail_url: "https://img.example.com/neon-drive-bts.jpg",
                      release_date: "2026-03-10",
                    },
                  ]}
                />
              )}

              {activeView === "shows" && (
                <AdminMockResourceWorkspace
                  title="Shows Manager"
                  fields={[
                    { name: "title", label: "Show Title" },
                    { name: "venue", label: "Venue" },
                    { name: "city", label: "City" },
                    { name: "country", label: "Country" },
                    {
                      name: "show_datetime",
                      label: "Show Date/Time",
                      type: "datetime-local",
                    },
                    { name: "ticket_url", label: "Ticket URL" },
                  ]}
                  seedItems={[
                    {
                      id: "s1",
                      title: "Summer Tour Opener",
                      venue: "The Fillmore",
                      city: "San Francisco",
                      country: "USA",
                      show_datetime: "2026-07-15T20:00",
                      ticket_url: "https://tickets.example.com/fillmore",
                    },
                    {
                      id: "s2",
                      title: "Night Sessions Live",
                      venue: "Brooklyn Steel",
                      city: "New York",
                      country: "USA",
                      show_datetime: "2026-07-21T21:00",
                      ticket_url: "https://tickets.example.com/brooklyn",
                    },
                  ]}
                />
              )}

              {activeView === "store" && (
                <AdminMockResourceWorkspace
                  title="Store Manager"
                  fields={[
                    { name: "name", label: "Product Name" },
                    { name: "description", label: "Description", type: "textarea" },
                    { name: "price", label: "Price", type: "number", step: "0.01" },
                    { name: "currency", label: "Currency" },
                    { name: "stock", label: "Stock", type: "number", step: "1" },
                    { name: "image_url", label: "Image URL" },
                  ]}
                  seedItems={[
                    {
                      id: "p1",
                      name: "Signature Hoodie",
                      description: "Limited drop black hoodie.",
                      price: "79.99",
                      currency: "USD",
                      stock: "42",
                      image_url: "https://store.example.com/hoodie.png",
                    },
                    {
                      id: "p2",
                      name: "Vinyl Deluxe Edition",
                      description: "Collector edition with booklet.",
                      price: "44.50",
                      currency: "USD",
                      stock: "18",
                      image_url: "https://store.example.com/vinyl.png",
                    },
                  ]}
                />
              )}

              {activeView === "settings" && (
                <AdminSettingsPanel />
              )}
            </div>
          </div>
        ) : (
          <div className="grid items-start gap-4 p-3 sm:p-4 md:gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <AdminAuthPanel
              email={email}
              password={password}
              status={status}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onLogin={login}
              onRegister={register}
            />
            <AdminAuthInfo apiUrl={API_URL} />
          </div>
        )}
      </div>
    </main>
  );
}
