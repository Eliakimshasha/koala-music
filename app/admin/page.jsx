"use client";

import { useEffect, useState } from "react";

import AdminAlbumsSection from "./components/AdminAlbumsSection";
import AdminMockResourceWorkspace from "./components/AdminMockResourceWorkspace";
import AdminAuthPanel from "./components/AdminAuthPanel";
import AdminSettingsPanel from "./components/AdminSettingsPanel";
import AdminSidebar from "./components/AdminSidebar";
import DashboardActivity from "./components/DashboardActivity";
import DashboardOverview from "./components/DashboardOverview";
import DashboardUpcoming from "./components/DashboardUpcoming";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeView, setActiveView] = useState("dashboard");
  const [stats, setStats] = useState([
    { label: "Total Music", value: "0", delta: "", caption: "Tracks in library" },
    { label: "Total Videos", value: "0", delta: "", caption: "Published videos" },
    { label: "Total Shows", value: "0", delta: "", caption: "Upcoming shows" },
    { label: "Total Products", value: "0", delta: "", caption: "Store catalog" },
  ]);
  const [activityItems, setActivityItems] = useState([]);
  const [upcomingGigs, setUpcomingGigs] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  async function parseAuthError(res, fallbackMessage) {
    try {
      const data = await res.json();

      if (typeof data?.detail === "string") {
        return data.detail;
      }

      if (Array.isArray(data?.detail)) {
        const first = data.detail[0];
        if (typeof first === "string") return first;
        if (typeof first?.msg === "string") return first.msg;
      }

      if (typeof data?.message === "string") {
        return data.message;
      }

      return fallbackMessage;
    } catch {
      return fallbackMessage;
    }
  }

  async function login(e) {
    e.preventDefault();
    setStatus("Logging in...");
    setAuthError("");
    try {
      const body = new URLSearchParams();
      body.append("username", email);
      body.append("password", password);

      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) {
        const message = await parseAuthError(
          res,
          "Wrong email or password. Please try again."
        );
        throw new Error(message);
      }

      const data = await res.json();
      localStorage.setItem("admin_token", data.access_token);
      setToken(data.access_token);
      setStatus("Logged in.");
      setAuthError("");
    } catch (err) {
      setStatus("");
      setAuthError(err?.message || "Wrong email or password. Please try again.");
    }
  }

  async function register(e) {
    e.preventDefault();
    setStatus("Creating admin...");
    setAuthError("");
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const message = await parseAuthError(
          res,
          "Admin creation failed. Please check your details."
        );
        throw new Error(message);
      }

      setStatus("Admin created. Now login.");
      setAuthError("");
    } catch (err) {
      setStatus("");
      setAuthError(
        err?.message || "Admin creation failed. Please check your details."
      );
    }
  }

  function logout() {
    localStorage.removeItem("admin_token");
    setToken("");
  }

  function handleEmailChange(value) {
    setEmail(value);
    if (authError) setAuthError("");
  }

  function handlePasswordChange(value) {
    setPassword(value);
    if (authError) setAuthError("");
  }

  useEffect(() => {
    async function loadDashboardData() {
      if (!token) return;
      try {
        const [musicRes, videosRes, showsRes, storeRes, albumsRes] = await Promise.all([
          fetch(`${API_URL}/music`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/videos`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/shows`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/store`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/albums`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        if (!musicRes.ok || !videosRes.ok || !showsRes.ok || !storeRes.ok || !albumsRes.ok) {
          return;
        }
        const [musicData, videosData, showsData, storeData, albumsData] = await Promise.all([
          musicRes.json(),
          videosRes.json(),
          showsRes.json(),
          storeRes.json(),
          albumsRes.json(),
        ]);

        setStats([
          {
            label: "Total Music",
            value: String(Array.isArray(musicData) ? musicData.length : 0),
            delta: "",
            caption: "Tracks in library",
          },
          {
            label: "Total Videos",
            value: String(Array.isArray(videosData) ? videosData.length : 0),
            delta: "",
            caption: "Published videos",
          },
          {
            label: "Total Shows",
            value: String(Array.isArray(showsData) ? showsData.length : 0),
            delta: "",
            caption: "Upcoming shows",
          },
          {
            label: "Total Products",
            value: String(Array.isArray(storeData) ? storeData.length : 0),
            delta: "",
            caption: "Store catalog",
          },
        ]);

        const activities = [];
        (Array.isArray(musicData) ? musicData : [])
          .slice(0, 2)
          .forEach((item) => activities.push({ title: `Music: ${item.title}`, time: "Latest" }));
        (Array.isArray(videosData) ? videosData : [])
          .slice(0, 1)
          .forEach((item) => activities.push({ title: `Video: ${item.title}`, time: "Latest" }));
        (Array.isArray(albumsData) ? albumsData : [])
          .slice(0, 1)
          .forEach((item) => activities.push({ title: `Album: ${item.title}`, time: "Latest" }));
        setActivityItems(activities);

        const shows = (Array.isArray(showsData) ? showsData : []).slice(0, 3).map((show) => ({
          title: show.title,
          location: [show.venue, show.city, show.country].filter(Boolean).join(", "),
          date: show.show_datetime
            ? new Date(show.show_datetime).toLocaleDateString()
            : "TBA",
        }));
        setUpcomingGigs(shows);
      } catch {
        // Keep UI usable even when dashboard fetch fails.
      }
    }

    loadDashboardData();
  }, [token]);

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
                  endpoint="/music"
                  token={token}
                  apiUrl={API_URL}
                  fields={[
                    { name: "title", label: "Title" },
                    { name: "artist", label: "Artist" },
                    { name: "album", label: "Album" },
                    { name: "description", label: "Description", type: "textarea" },
                    { name: "audio_url", label: "Audio URL" },
                    { name: "release_date", label: "Release Date", type: "date" },
                  ]}
                />
              )}

              {activeView === "albums" && (
                <AdminAlbumsSection token={token} apiUrl={API_URL} />
              )}

              {activeView === "videos" && (
                <AdminMockResourceWorkspace
                  title="Video Manager"
                  endpoint="/videos"
                  token={token}
                  apiUrl={API_URL}
                  fields={[
                    { name: "title", label: "Title" },
                    { name: "description", label: "Description", type: "textarea" },
                    { name: "video_url", label: "Video URL" },
                    { name: "thumbnail_url", label: "Thumbnail URL" },
                    { name: "release_date", label: "Release Date", type: "date" },
                  ]}
                />
              )}

              {activeView === "shows" && (
                <AdminMockResourceWorkspace
                  title="Shows Manager"
                  endpoint="/shows"
                  token={token}
                  apiUrl={API_URL}
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
                />
              )}

              {activeView === "store" && (
                <AdminMockResourceWorkspace
                  title="Store Manager"
                  endpoint="/store"
                  token={token}
                  apiUrl={API_URL}
                  fields={[
                    { name: "name", label: "Product Name" },
                    { name: "description", label: "Description", type: "textarea" },
                    { name: "price", label: "Price", type: "number", step: "0.01" },
                    { name: "currency", label: "Currency" },
                    { name: "stock", label: "Stock", type: "number", step: "1" },
                    { name: "image_url", label: "Image URL" },
                  ]}
                />
              )}

              {activeView === "settings" && (
                <AdminSettingsPanel />
              )}
            </div>
          </div>
        ) : (
          <div className="grid min-h-screen place-items-center p-4">
            <AdminAuthPanel
              email={email}
              password={password}
              status={status}
              errorMessage={authError}
              onEmailChange={handleEmailChange}
              onPasswordChange={handlePasswordChange}
              onLogin={login}
              onRegister={register}
            />
          </div>
        )}
      </div>
    </main>
  );
}
