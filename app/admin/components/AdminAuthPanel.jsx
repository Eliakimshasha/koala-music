"use client";

export default function AdminAuthPanel({
  email,
  password,
  status,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onRegister,
}) {
  return (
    <div className="border border-slate-300 bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-900">
          Secure Access
        </h2>
        <span className="border border-slate-300 bg-slate-100 px-3 py-1 text-[0.58rem] uppercase tracking-widest text-slate-700">
          {status}
        </span>
      </div>

      <form onSubmit={onLogin} className="mt-4 grid gap-3.5">
        <div>
          <label className="mb-1 block text-[0.68rem] uppercase tracking-widest text-slate-600">
            Email
          </label>
          <input
            className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-[0.68rem] uppercase tracking-widest text-slate-600">
            Password
          </label>
          <input
            className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-3">
          <button
            className="border border-slate-900 bg-slate-900 px-6 py-2 text-[0.62rem] font-semibold uppercase tracking-widest text-white transition hover:bg-slate-700"
            type="submit"
          >
            Login
          </button>
          <button
            className="border border-slate-300 bg-white px-6 py-2 text-[0.62rem] font-semibold uppercase tracking-widest text-slate-700 transition hover:border-slate-900"
            type="button"
            onClick={onRegister}
          >
            Create First Admin
          </button>
        </div>
      </form>
    </div>
  );
}
