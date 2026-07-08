import Link from "next/link";

export function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_32%),linear-gradient(180deg,_#08111f_0%,_#0f172a_45%,_#0b1120_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 md:px-8">
        <header className="sticky top-0 z-10 mb-8 rounded-[1.75rem] border border-white/10 bg-slate-950/75 px-5 py-4 backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Link href="/" className="text-xl font-semibold tracking-tight text-white">
                Home Watching HQ
              </Link>
              <p className="mt-1 text-sm text-slate-400">
                Operations, client reporting, and vendor coordination
              </p>
            </div>
            <nav className="flex flex-wrap gap-2 text-sm">
              <NavLink href="/admin">Admin</NavLink>
              <NavLink href="/clients">Clients</NavLink>
              <NavLink href="/properties">Properties</NavLink>
              <NavLink href="/portal/prop-seabrook">Portal</NavLink>
              <NavLink href="/subcontractors">Subcontractors</NavLink>
            </nav>
          </div>
        </header>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

function NavLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  return (
    <Link
      href={href}
      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]"
    >
      {children}
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
  actions,
  sidecar,
}: Readonly<{
  eyebrow: string;
  title: string;
  body: string;
  actions?: React.ReactNode;
  sidecar?: React.ReactNode;
}>) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-2xl shadow-sky-950/30 backdrop-blur">
      <div className="grid gap-6 px-6 py-8 md:grid-cols-[1.3fr_0.7fr] md:px-8">
        <div className="space-y-5">
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 font-medium text-sky-100">
              {eyebrow}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">
              Home watch operations app
            </span>
          </div>
          <div className="space-y-3">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              {title}
            </h1>
            <p className="max-w-3xl text-base leading-7 text-slate-300 md:text-lg">{body}</p>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {sidecar ? (
          <aside className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">{sidecar}</aside>
        ) : null}
      </div>
    </section>
  );
}

export function PrimaryLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  return (
    <Link
      href={href}
      className="rounded-full bg-sky-300 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-sky-200"
    >
      {children}
    </Link>
  );
}

export function SecondaryLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  return (
    <Link
      href={href}
      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-white/25 hover:bg-white/10"
    >
      {children}
    </Link>
  );
}

export function Section({
  eyebrow,
  title,
  body,
  children,
}: Readonly<{
  eyebrow: string;
  title: string;
  body: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/20">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-sky-200/80">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{body}</p>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function StatGrid({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{children}</div>;
}

export function StatCard({
  label,
  value,
  detail,
}: Readonly<{
  label: string;
  value: string;
  detail: string;
}>) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-300">{detail}</p>
    </div>
  );
}

export function Panel({
  title,
  detail,
  aside,
  children,
}: Readonly<{
  title: string;
  detail?: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {detail ? <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p> : null}
        </div>
        {aside}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function Badge({
  tone = "default",
  children,
}: Readonly<{
  tone?: "default" | "sky" | "emerald" | "amber" | "rose";
  children: React.ReactNode;
}>) {
  const classes = {
    default: "border-white/10 bg-white/[0.03] text-slate-200",
    sky: "border-sky-400/30 bg-sky-400/10 text-sky-100",
    emerald: "border-emerald-400/30 bg-emerald-500/10 text-emerald-100",
    amber: "border-amber-400/30 bg-amber-500/10 text-amber-100",
    rose: "border-rose-400/30 bg-rose-500/10 text-rose-100",
  } satisfies Record<string, string>;

  return (
    <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] ${classes[tone]}`}>
      {children}
    </span>
  );
}

export function RouteCard({
  href,
  title,
  body,
  meta,
}: Readonly<{
  href: string;
  title: string;
  body: string;
  meta: string;
}>) {
  return (
    <Link
      href={href}
      className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
    >
      <p className="text-sm uppercase tracking-[0.18em] text-sky-200/80">{meta}</p>
      <h3 className="mt-3 text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{body}</p>
    </Link>
  );
}

export function PropertyLinkRow({
  href,
  title,
  meta,
  plan,
}: Readonly<{
  href: string;
  title: string;
  meta: string;
  plan: string;
}>) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:border-white/20 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h4 className="font-medium text-white">{title}</h4>
        <p className="mt-1 text-sm text-slate-300">{meta}</p>
      </div>
      <Badge tone="sky">{plan}</Badge>
    </Link>
  );
}
