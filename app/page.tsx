"use client";

import { useMemo, useState } from "react";

type Entry = {
  date: string;
  start: string;
  end: string;
  wage: number;
  description: string;
};

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);

  const [form, setForm] = useState<Entry>({
    date: new Date().toISOString().split("T")[0],
    start: "08:00",
    end: "17:00",
    wage: 30,
    description: "",
  });

  const calculateHours = (start: string, end: string) => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    const startMinutes = sh * 60 + sm;
    const endMinutes = eh * 60 + em;

    return Math.max((endMinutes - startMinutes) / 60, 0);
  };

  const addEntry = () => {
    setEntries([...entries, form]);

    setForm({
      date: new Date().toISOString().split("T")[0],
      start: "08:00",
      end: "17:00",
      wage: form.wage,
      description: "",
    });
  };

  const totals = useMemo(() => {
    let totalHours = 0;
    let totalPay = 0;

    entries.forEach((entry) => {
      const hours = calculateHours(entry.start, entry.end);
      totalHours += hours;
      totalPay += hours * entry.wage;
    });

    return {
      totalHours,
      totalPay,
    };
  }, [entries]);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Contractor Time Card App
        </h1>

        <div className="bg-white rounded-2xl shadow p-6 mb-8 grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Hourly Wage</label>
            <input
              type="number"
              value={form.wage}
              onChange={(e) =>
                setForm({ ...form, wage: Number(e.target.value) })
              }
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Start Time</label>
            <input
              type="time"
              value={form.start}
              onChange={(e) => setForm({ ...form, start: e.target.value })}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">End Time</label>
            <input
              type="time"
              value={form.end}
              onChange={(e) => setForm({ ...form, end: e.target.value })}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">
              Work Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border rounded-lg p-2 h-24"
              placeholder="Describe work completed today"
            />
          </div>

          <div className="md:col-span-2">
            <button
              onClick={addEntry}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Add Time Entry
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-auto mb-8">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Start</th>
                <th className="p-3 text-left">End</th>
                <th className="p-3 text-left">Hours</th>
                <th className="p-3 text-left">Wage</th>
                <th className="p-3 text-left">Daily Pay</th>
                <th className="p-3 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => {
                const hours = calculateHours(entry.start, entry.end);
                const pay = hours * entry.wage;

                return (
                  <tr key={index} className="border-b">
                    <td className="p-3">{entry.date}</td>
                    <td className="p-3">{entry.start}</td>
                    <td className="p-3">{entry.end}</td>
                    <td className="p-3">{hours.toFixed(2)}</td>
                    <td className="p-3">${entry.wage.toFixed(2)}</td>
                    <td className="p-3">${pay.toFixed(2)}</td>
                    <td className="p-3">{entry.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Weekly Summary</h2>
            <p className="text-lg">
              Total Hours: <strong>{totals.totalHours.toFixed(2)}</strong>
            </p>
            <p className="text-lg">
              Total Pay: <strong>${totals.totalPay.toFixed(2)}</strong>
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Monthly Summary</h2>
            <p className="text-lg">
              Total Hours: <strong>{totals.totalHours.toFixed(2)}</strong>
            </p>
            <p className="text-lg">
              Total Pay: <strong>${totals.totalPay.toFixed(2)}</strong>
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Yearly Summary</h2>
            <p className="text-lg">
              Total Hours: <strong>{totals.totalHours.toFixed(2)}</strong>
            </p>
            <p className="text-lg">
              Total Pay: <strong>${totals.totalPay.toFixed(2)}</strong>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}