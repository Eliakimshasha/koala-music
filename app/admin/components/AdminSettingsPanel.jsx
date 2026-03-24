"use client";

import { useState } from "react";

function Section({ title, description, children }) {
  return (
    <section className="border border-slate-300 bg-white p-4 sm:p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-600">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
      />
    </label>
  );
}

function TextareaField({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-600">
        {label}
      </span>
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
      />
    </label>
  );
}

export default function AdminSettingsPanel() {
  const [profile, setProfile] = useState({
    fullName: "Ariana Cole",
    username: "arianacole",
    avatarUrl: "https://images.example.com/users/arianacole-avatar.jpg",
    email: "admin@example.com",
    phone: "+1 555 123 4567",
    role: "Admin",
    bio: "Independent artist manager and creative director. Focused on releases, shows, and fan growth.",
    location: "Los Angeles, CA",
    website: "https://artiststudio.example.com",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: "English",
    profileVisibility: "Public",
    allowTagging: true,
  });

  return (
    <div className="space-y-5">
      <header className="border border-slate-300 bg-white p-4 sm:p-5">
        <h2 className="text-lg font-semibold text-slate-900">Settings</h2>
        <p className="mt-1 text-sm text-slate-600">
          Simple profile and basic preferences. Hard-coded for now.
        </p>
      </header>

      <Section
        title="Edit Profile"
        description="Public profile details for your admin account."
      >
        <div className="mb-4 grid gap-4 md:grid-cols-[120px_minmax(0,1fr)]">
          <div className="border border-slate-300 bg-slate-100 p-2">
            <div className="grid h-24 w-24 place-items-center bg-white text-xs text-slate-500">
              Avatar
            </div>
          </div>
          <div className="space-y-3">
            <Field
              label="Avatar URL"
              value={profile.avatarUrl}
              onChange={(value) => setProfile((prev) => ({ ...prev, avatarUrl: value }))}
              placeholder="https://..."
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="border border-slate-900 bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white"
              >
                Update Avatar
              </button>
              <button
                type="button"
                className="border border-slate-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-widest text-slate-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Full Name"
            value={profile.fullName}
            onChange={(value) => setProfile((prev) => ({ ...prev, fullName: value }))}
          />
          <Field
            label="Username"
            value={profile.username}
            onChange={(value) => setProfile((prev) => ({ ...prev, username: value }))}
          />
          <Field
            label="Email"
            type="email"
            value={profile.email}
            onChange={(value) => setProfile((prev) => ({ ...prev, email: value }))}
          />
          <Field
            label="Phone"
            value={profile.phone}
            onChange={(value) => setProfile((prev) => ({ ...prev, phone: value }))}
          />
          <Field
            label="Role"
            value={profile.role}
            onChange={(value) => setProfile((prev) => ({ ...prev, role: value }))}
          />
          <Field
            label="Location"
            value={profile.location}
            onChange={(value) => setProfile((prev) => ({ ...prev, location: value }))}
          />
          <Field
            label="Website"
            value={profile.website}
            onChange={(value) => setProfile((prev) => ({ ...prev, website: value }))}
          />
        </div>

        <div className="mt-4">
          <TextareaField
            label="Bio"
            value={profile.bio}
            onChange={(value) => setProfile((prev) => ({ ...prev, bio: value }))}
          />
        </div>
      </Section>

      <Section
        title="Account Preferences"
        description="Simple visibility and personalization settings."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-600">
              Language
            </span>
            <select
              value={preferences.language}
              onChange={(e) =>
                setPreferences((prev) => ({
                  ...prev,
                  language: e.target.value,
                }))
              }
              className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-600">
              Profile Visibility
            </span>
            <select
              value={preferences.profileVisibility}
              onChange={(e) =>
                setPreferences((prev) => ({
                  ...prev,
                  profileVisibility: e.target.value,
                }))
              }
              className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </label>
          <label className="flex items-center justify-between border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-800">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={preferences.darkMode}
              onChange={(e) =>
                setPreferences((prev) => ({
                  ...prev,
                  darkMode: e.target.checked,
                }))
              }
              className="h-4 w-4 border-slate-300 accent-slate-900"
            />
          </label>
          <label className="flex items-center justify-between border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-800">
            <span>Allow user tagging</span>
            <input
              type="checkbox"
              checked={preferences.allowTagging}
              onChange={(e) =>
                setPreferences((prev) => ({
                  ...prev,
                  allowTagging: e.target.checked,
                }))
              }
              className="h-4 w-4 border-slate-300 accent-slate-900"
            />
          </label>
        </div>
      </Section>

      <Section
        title="Notifications"
        description="Simple notification controls."
      >
        <div className="grid gap-3">
          {[
            {
              key: "emailNotifications",
              label: "Email notifications",
            },
            {
              key: "smsNotifications",
              label: "SMS notifications",
            },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-800"
            >
              <span>{item.label}</span>
              <input
                type="checkbox"
                checked={notifications[item.key]}
                onChange={(e) =>
                  setNotifications((prev) => ({
                    ...prev,
                    [item.key]: e.target.checked,
                  }))
                }
                className="h-4 w-4 border-slate-300 accent-slate-900"
              />
            </label>
          ))}
        </div>
      </Section>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="border border-slate-900 bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white"
        >
          Save Changes
        </button>
        <button
          type="button"
          className="border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-700"
        >
          Reset Defaults
        </button>
      </div>
    </div>
  );
}
