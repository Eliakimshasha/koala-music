"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./admin.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

function ResourcePanel({ title, endpoint, fields, token }) {
  const initialForm = useMemo(() => {
    const data = {};
    fields.forEach((f) => {
      data[f.name] = "";
    });
    return data;
  }, [fields]);

  const [items, setItems] = useState([]);
  const [createForm, setCreateForm] = useState(initialForm);
  const [updateForm, setUpdateForm] = useState(initialForm);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [status, setStatus] = useState("");

  async function fetchItems() {
    if (!token) return;
    setStatus("Loading...");
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
      setStatus("");
    } catch (err) {
      setStatus("Failed to load.");
    }
  }

  async function createItem(e) {
    e.preventDefault();
    setStatus("Creating...");
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cleanForm(createForm)),
      });
      if (!res.ok) throw new Error();
      setCreateForm(initialForm);
      await fetchItems();
      setStatus("Created.");
    } catch (err) {
      setStatus("Create failed.");
    }
  }

  async function updateItem(e) {
    e.preventDefault();
    if (!updateId) return;
    setStatus("Updating...");
    try {
      const res = await fetch(`${API_URL}${endpoint}/${updateId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cleanForm(updateForm, true)),
      });
      if (!res.ok) throw new Error();
      setUpdateForm(initialForm);
      setUpdateId("");
      await fetchItems();
      setStatus("Updated.");
    } catch (err) {
      setStatus("Update failed.");
    }
  }

  async function deleteItem(e) {
    e.preventDefault();
    if (!deleteId) return;
    setStatus("Deleting...");
    try {
      const res = await fetch(`${API_URL}${endpoint}/${deleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setDeleteId("");
      await fetchItems();
      setStatus("Deleted.");
    } catch (err) {
      setStatus("Delete failed.");
    }
  }

  useEffect(() => {
    fetchItems();
  }, [token]);

  return (
    <section className={styles.resourcePanel}>
      <h2 className={styles.resourceTitle}>{title}</h2>
      <div className={styles.panelStatus}>{status}</div>

      <form onSubmit={createItem} className={styles.panelForm}>
        <div className={styles.panelFormTitle}>Create</div>
        {fields.map((f) => (
          <Field
            key={`create-${f.name}`}
            field={f}
            value={createForm[f.name]}
            onChange={(val) =>
              setCreateForm((prev) => ({ ...prev, [f.name]: val }))
            }
          />
        ))}
        <div className={styles.panelActions}>
          <button className={styles.buttonPrimary} type="submit">
            Create
          </button>
        </div>
      </form>

      <form onSubmit={updateItem} className={styles.panelForm}>
        <div className={styles.panelFormTitle}>Update</div>
        <div>
          <label className={styles.label}>ID to update</label>
          <input
            className={styles.input}
            placeholder="e.g. 12"
            value={updateId}
            onChange={(e) => setUpdateId(e.target.value)}
          />
        </div>
        {fields.map((f) => (
          <Field
            key={`update-${f.name}`}
            field={f}
            value={updateForm[f.name]}
            onChange={(val) =>
              setUpdateForm((prev) => ({ ...prev, [f.name]: val }))
            }
          />
        ))}
        <div className={styles.panelActions}>
          <button className={styles.buttonGhost} type="submit">
            Update
          </button>
        </div>
      </form>

      <form onSubmit={deleteItem} className={styles.panelForm}>
        <div className={styles.panelFormTitle}>Delete</div>
        <div>
          <label className={styles.label}>ID to delete</label>
          <input
            className={styles.input}
            placeholder="e.g. 12"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
        </div>
        <div className={styles.panelActions}>
          <button className={styles.buttonDanger} type="submit">
            Delete
          </button>
        </div>
      </form>

      <div className={styles.panelActions}>
        <button className={styles.buttonGhost} type="button" onClick={fetchItems}>
          Refresh List
        </button>
      </div>
      <pre className={styles.panelList}>{JSON.stringify(items, null, 2)}</pre>
    </section>
  );
}

function Field({ field, value, onChange }) {
  if (field.type === "textarea") {
    return (
      <div>
        <label className={styles.label}>{field.label}</label>
        <textarea
          className={styles.textarea}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
      </div>
    );
  }

  return (
    <div>
      <label className={styles.label}>{field.label}</label>
      <input
        type={field.type || "text"}
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        step={field.step}
      />
    </div>
  );
}

function cleanForm(form, excludeEmpty = false) {
  const cleaned = {};
  Object.entries(form).forEach(([key, value]) => {
    if (excludeEmpty && (value === "" || value === null)) return;
    cleaned[key] = value === "" ? null : value;
  });
  return cleaned;
}

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");

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

  return (
    <main className='bg-amber-600'>
      <div className={styles.backdrop} />
      <div className="noise" />
      <div className={styles.content}>
        <header>
          <span className={styles.pill}>Admin Console</span>
          <h1 className={styles.title}>Admin Panel</h1>
          <p className={styles.subtitle}>
            Control albums, videos, music, store inventory, and live shows. Use
            the admin login to unlock protected CRUD actions.
          </p>
        </header>

        <section className={styles.layout}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Secure Login</h2>
              <span className={styles.status}>{status}</span>
            </div>

            <form onSubmit={login} className={styles.form}>
              <div>
                <label className={styles.label}>Email</label>
                <input
                  className={styles.input}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className={styles.label}>Password</label>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.buttonRow}>
                <button className={styles.buttonPrimary} type="submit">
                  Login
                </button>
                <button className={styles.buttonGhost} type="button" onClick={register}>
                  Create First Admin
                </button>
              </div>
            </form>

            {token && (
              <div className={styles.buttonRow} style={{ marginTop: "1rem" }}>
                <button className={styles.buttonDanger} type="button" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Quick Notes</h2>
            </div>
            <p className={styles.helper}>
              API target:
              {" "}
              <span className={styles.pill}>{API_URL}</span>
            </p>
            <p className={styles.helper}>
              Use the Create First Admin button once. After an admin exists,
              registration is disabled.
            </p>
            <p className={styles.helper}>
              Keep this tab open while you manage content to avoid re-login.
            </p>
          </div>
        </section>

        {token ? (
          <div className={styles.resourceGrid}>
            {resources.map((resource) => (
              <ResourcePanel
                key={resource.title}
                title={resource.title}
                endpoint={resource.endpoint}
                fields={resource.fields}
                token={token}
              />
            ))}
          </div>
        ) : (
          <p className={styles.helper}>Login to manage content.</p>
        )}
      </div>
    </main>
  );
}
