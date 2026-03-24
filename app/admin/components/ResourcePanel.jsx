"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

function Field({ field, value, onChange }) {
  if (field.type === "textarea") {
    return (
      <div>
        <label className="admin-label">{field.label}</label>
        <textarea
          className="admin-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="admin-label">{field.label}</label>
      <input
        type={field.type || "text"}
        className="admin-input"
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

export default function ResourcePanel({ title, endpoint, fields, token, apiUrl }) {
  const panelId = `resource-${title.toLowerCase().replace(/\s+/g, "-")}`;
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
  const [status, setStatus] = useState("Ready");

  async function fetchItems() {
    if (!token) return;
    setStatus("Loading...");
    try {
      const res = await fetch(`${apiUrl}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
      setStatus("Ready");
    } catch (err) {
      setStatus("Failed to load.");
    }
  }

  async function createItem(e) {
    e.preventDefault();
    setStatus("Creating...");
    try {
      const res = await fetch(`${apiUrl}${endpoint}`, {
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
      const res = await fetch(`${apiUrl}${endpoint}/${updateId}`, {
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
      const res = await fetch(`${apiUrl}${endpoint}/${deleteId}`, {
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
    <section className="admin-resource-panel" id={panelId}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="admin-resource-title">{title}</h2>
          <p className="admin-panel-status">{status}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <button className="admin-button-primary" type="button">
                New
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-xl border border-slate-300 bg-white text-slate-900">
              <DialogHeader>
                <DialogTitle>Create {title}</DialogTitle>
                <DialogDescription>
                  Add new entries to the {title.toLowerCase()} catalog.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={createItem} className="grid gap-3">
                {fields.map((field) => (
                  <Field
                    key={`create-${field.name}`}
                    field={field}
                    value={createForm[field.name]}
                    onChange={(val) =>
                      setCreateForm((prev) => ({ ...prev, [field.name]: val }))
                    }
                  />
                ))}
                <DialogFooter>
                  <button className="admin-button-primary" type="submit">
                    Create
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger asChild>
              <button className="admin-button-ghost" type="button">
                Workspace
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-l border-slate-300 bg-white text-slate-900"
            >
              <SheetHeader>
                <SheetTitle>{title} Workspace</SheetTitle>
                <SheetDescription>
                  Review data and apply updates without leaving the dashboard.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4 pb-6">
                <button
                  className="admin-button-ghost self-start"
                  type="button"
                  onClick={fetchItems}
                >
                  Refresh List
                </button>
                <pre className="admin-panel-list">
                  {JSON.stringify(items, null, 2)}
                </pre>
                <Separator className="bg-slate-300" />
                <form onSubmit={updateItem} className="grid gap-3">
                  <div>
                    <label className="admin-label">ID to update</label>
                    <input
                      className="admin-input"
                      placeholder="e.g. 12"
                      value={updateId}
                      onChange={(e) => setUpdateId(e.target.value)}
                    />
                  </div>
                  {fields.map((field) => (
                    <Field
                      key={`update-${field.name}`}
                      field={field}
                      value={updateForm[field.name]}
                      onChange={(val) =>
                        setUpdateForm((prev) => ({ ...prev, [field.name]: val }))
                      }
                    />
                  ))}
                  <button className="admin-button-ghost" type="submit">
                    Save Changes
                  </button>
                </form>
              </div>
            </SheetContent>
          </Sheet>

          <Dialog>
            <DialogTrigger asChild>
              <button className="admin-button-danger" type="button">
                Remove
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md border border-slate-300 bg-white text-slate-900">
              <DialogHeader>
                <DialogTitle>Delete {title}</DialogTitle>
                <DialogDescription>
                  This action is permanent. Please confirm the ID to remove.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={deleteItem} className="grid gap-3">
                <div>
                  <label className="admin-label">ID to delete</label>
                  <input
                    className="admin-input"
                    placeholder="e.g. 12"
                    value={deleteId}
                    onChange={(e) => setDeleteId(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <button className="admin-button-danger" type="submit">
                    Confirm Delete
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Separator className="my-3 bg-slate-300" />
    </section>
  );
}
