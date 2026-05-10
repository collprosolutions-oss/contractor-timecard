"use client";

import { useMemo, useState } from "react";

type Entry = {
  id: string;
  date: string;
  employee: string;
  job: string;
  start: string;
  end: string;
  wage: number;
  expenses: number;
  description: string;
};

function today() {
  return new Date().toISOString().split("T")[0];
}

function hoursBetween(start: string, end: string) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  let startMinutes = sh * 60 + sm;
  let endMinutes = eh * 60 + em;

  if (endMinutes < startMinutes) endMinutes += 24 * 60;

  return Math.max((endMinutes - startMinutes) / 60, 0);
}

function money(amount: number) {
  return `$${amount.toFixed(2)}`;
}

function weekStartMonday(dateString: string) {
  const date = new Date(dateString + "T00:00:00");
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return date.toISOString().split("T")[0];
}

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);

  const [form, setForm] = useState({
    date: today(),
    employee: "Daniel",
    job: "",
    start: "08:00",
    end: "17:00",
    wage: 30,
    expenses: 0,
    description: "",
  });

  const currentHours = hoursBetween(form.start, form.end);
  const currentGross = currentHours * form.wage;
  const currentNet = currentGross - form.expenses;

  const entriesWithTotals = entries.map((entry) => {
    const hours = hoursBetween(entry.start, entry.end);
    const gross = hours * entry.wage;
    const net = gross - entry.expenses;

    return {
      ...entry,
      hours,
      gross,
      net,
      week: weekStartMonday(entry.date),
      month: entry.date.slice(0, 7),
      year: entry.date.slice(0, 4),
    };
  });

  const totals = useMemo(() => {
    return entriesWithTotals.reduce(
      (acc, entry) => {
        acc.hours += entry.hours;
        acc.gross += entry.gross;
        acc.expenses += entry.expenses;
        acc.net += entry.net;
        return acc;
      },
      { hours: 0, gross: 0, expenses: 0, net: 0 }
    );
  }, [entriesWithTotals]);

  const weekly = useMemo(() => {
    const groups: Record<string, typeof entriesWithTotals> = {};
    entriesWithTotals.forEach((entry) => {
      if (!groups[entry.week]) groups[entry.week] = [];
      groups[entry.week].push(entry);
    });
    return groups;
  }, [entriesWithTotals]);

  const monthly = useMemo(() => {
    const groups: Record<string, typeof entriesWithTotals> = {};
    entriesWithTotals.forEach((entry) => {
      if (!groups[entry.month]) groups[entry.month] = [];
      groups[entry.month].push(entry);
    });
    return groups;
  }, [entriesWithTotals]);

  const yearly = useMemo(() => {
    const groups: Record<string, typeof entriesWithTotals> = {};
    entriesWithTotals.forEach((entry) => {
      if (!groups[entry.year]) groups[entry.year] = [];
      groups[entry.year].push(entry);
    });
    return groups;
  }, [entriesWithTotals]);

  function addEntry() {
    setEntries([
      ...entries,
      {
        id: crypto.randomUUID(),
        ...form,
      },
    ]);

    setForm({
      ...form,
      date: today(),
      job: "",
      expenses: 0,
      description: "",
    });
  }

  function deleteEntry(id: string) {
    setEntries(entries.filter((entry) => entry.id !== id));
  }

  function exportCSV() {
    const header =
      "Date,Employee,Job,Start,End,Hours,Wage,Gross Pay,Expenses,Net Pay,Description\n";

    const rows = entriesWithTotals
      .map(
        (e) =>
          `"${e.date}","${e.employee}","${e.job}","${e.start}","${e.end}","${e.hours.toFixed(
            2
          )}","${e.wage.toFixed(2)}","${e.gross.toFixed(
            2
          )}","${e.expenses.toFixed(2)}","${e.net.toFixed(
            2
          )}","${e.description.replaceAll('"', '""')}"`
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "contractor-time-card.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-slate-100 text-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <section className="bg-blue-900 text-white rounded-3xl p-6 shadow-lg">
          <h1 className="text-3xl md:text-5xl font-bold">
            Contractor Time Card App
          </h1>
          <p className="text-blue-100 mt-2 text-lg">
            Track hours, pay, job descriptions, expenses, and reports.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <TotalBox title="Total Hours" value={totals.hours.toFixed(2)} />
            <TotalBox title="Gross Pay" value={money(totals.gross)} />
            <TotalBox title="Expenses" value={money(totals.expenses)} />
            <TotalBox title="Net Pay" value={money(totals.net)} />
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow p-5 md:p-6">
          <h2 className="text-2xl font-bold mb-4">Add Daily Time Card</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Date">
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="input"
              />
            </Field>

            <Field label="Employee Name">
              <input
                value={form.employee}
                onChange={(e) =>
                  setForm({ ...form, employee: e.target.value })
                }
                className="input"
              />
            </Field>

            <Field label="Client / Job Name">
              <input
                value={form.job}
                onChange={(e) => setForm({ ...form, job: e.target.value })}
                placeholder="Example: Smith Kitchen Remodel"
                className="input"
              />
            </Field>

            <Field label="Start Time">
              <input
                type="time"
                value={form.start}
                onChange={(e) => setForm({ ...form, start: e.target.value })}
                className="input"
              />
            </Field>

            <Field label="End Time">
              <input
                type="time"
                value={form.end}
                onChange={(e) => setForm({ ...form, end: e.target.value })}
                className="input"
              />
            </Field>

            <Field label="Hourly Wage">
              <input
                type="number"
                value={form.wage}
                onChange={(e) =>
                  setForm({ ...form, wage: Number(e.target.value) })
                }
                className="input"
              />
            </Field>

            <Field label="Expenses">
              <input
                type="number"
                value={form.expenses}
                onChange={(e) =>
                  setForm({ ...form, expenses: Number(e.target.value) })
                }
                className="input"
              />
            </Field>

            <div className="md:col-span-2">
              <Field label="Daily Work Description">
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe the work done today..."
                  className="input h-28"
                />
              </Field>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-5">
            <SmallBox title="Hours" value={currentHours.toFixed(2)} />
            <SmallBox title="Gross" value={money(currentGross)} />
            <SmallBox title="Net" value={money(currentNet)} />
          </div>

          <button
            onClick={addEntry}
            className="mt-5 bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl w-full md:w-auto"
          >
            Add Time Entry
          </button>
        </section>

        <section className="bg-white rounded-3xl shadow p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <h2 className="text-2xl font-bold">Time Card Entries</h2>
            <button
              onClick={exportCSV}
              className="bg-green-700 hover:bg-green-800 text-white font-bold px-5 py-3 rounded-xl"
            >
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border text-left">
              <thead className="bg-slate-200">
                <tr>
                  <th className="th">Date</th>
                  <th className="th">Employee</th>
                  <th className="th">Job</th>
                  <th className="th">Start</th>
                  <th className="th">End</th>
                  <th className="th">Hours</th>
                  <th className="th">Wage</th>
                  <th className="th">Gross</th>
                  <th className="th">Expenses</th>
                  <th className="th">Net</th>
                  <th className="th">Description</th>
                  <th className="th">Action</th>
                </tr>
              </thead>
              <tbody>
                {entriesWithTotals.length === 0 && (
                  <tr>
                    <td className="td text-center" colSpan={12}>
                      No time entries yet.
                    </td>
                  </tr>
                )}

                {entriesWithTotals.map((entry) => (
                  <tr key={entry.id} className="border-t">
                    <td className="td">{entry.date}</td>
                    <td className="td">{entry.employee}</td>
                    <td className="td">{entry.job}</td>
                    <td className="td">{entry.start}</td>
                    <td className="td">{entry.end}</td>
                    <td className="td">{entry.hours.toFixed(2)}</td>
                    <td className="td">{money(entry.wage)}</td>
                    <td className="td">{money(entry.gross)}</td>
                    <td className="td">{money(entry.expenses)}</td>
                    <td className="td font-bold">{money(entry.net)}</td>
                    <td className="td">{entry.description}</td>
                    <td className="td">
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="bg-red-600 text-white px-3 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <ReportSection title="Weekly Report" groups={weekly} />
        <ReportSection title="Monthly Report" groups={monthly} />
        <ReportSection title="Yearly Report" groups={yearly} />

        <section className="bg-white rounded-3xl shadow p-5 md:p-6">
          <h2 className="text-2xl font-bold mb-4">Future Paid App Features</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <Feature title="Individual Logins" text="Each employee gets their own account." />
            <Feature title="Cloud Storage" text="Save time cards online permanently." />
            <Feature title="Photo Uploads" text="Upload receipts and job photos." />
            <Feature title="GPS Clock-In" text="Admin can turn GPS tracking on or off." />
            <Feature title="Payroll Reports" text="Export payroll by week, month, or year." />
            <Feature title="$4.99 Subscription" text="Charge users monthly with Stripe." />
          </div>
        </section>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border: 2px solid #64748b;
          border-radius: 12px;
          color: black;
          background: white;
          font-size: 16px;
          outline: none;
        }

        .input::placeholder {
          color: #64748b;
        }

        .input:focus {
          border-color: #1d4ed8;
          box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.15);
        }

        .th {
          padding: 12px;
          font-weight: 800;
          color: black;
          border-bottom: 1px solid #cbd5e1;
        }

        .td {
          padding: 12px;
          color: black;
          vertical-align: top;
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block font-bold mb-2 text-black">{label}</span>
      {children}
    </label>
  );
}

function TotalBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white/15 rounded-2xl p-4">
      <p className="text-blue-100 text-sm">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function SmallBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-slate-100 rounded-2xl p-4 border border-slate-300">
      <p className="text-slate-700 text-sm font-semibold">{title}</p>
      <p className="text-xl font-bold text-black">{value}</p>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="border border-slate-300 rounded-2xl p-4 bg-slate-50">
      <h3 className="font-bold text-lg text-black">{title}</h3>
      <p className="text-slate-700 mt-1">{text}</p>
    </div>
  );
}

function ReportSection({
  title,
  groups,
}: {
  title: string;
  groups: Record<string, any[]>;
}) {
  const keys = Object.keys(groups).sort().reverse();

  return (
    <section className="bg-white rounded-3xl shadow p-5 md:p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {keys.length === 0 && <p>No report data yet.</p>}

      <div className="space-y-4">
        {keys.map((key) => {
          const total = groups[key].reduce(
            (acc, entry) => {
              acc.hours += entry.hours;
              acc.gross += entry.gross;
              acc.expenses += entry.expenses;
              acc.net += entry.net;
              return acc;
            },
            { hours: 0, gross: 0, expenses: 0, net: 0 }
          );

          return (
            <div key={key} className="border border-slate-300 rounded-2xl p-4">
              <h3 className="font-bold text-lg">{key}</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                <SmallBox title="Hours" value={total.hours.toFixed(2)} />
                <SmallBox title="Gross" value={money(total.gross)} />
                <SmallBox title="Expenses" value={money(total.expenses)} />
                <SmallBox title="Net" value={money(total.net)} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}