import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import FeatureLayout from './FeatureLayout';

const CalendarPage = ({ t }) => {
  const dates = [
    { event: "Scholarship Renewal Ends", date: "April 30, 2026", days: "18 Days Left", type: "Urgent" },
    { event: "Income Certificate Renewal", date: "May 15, 2026", days: "1 Month Left", type: "Alert" },
    { event: "Voter ID Correction Camp", date: "June 01, 2026", days: "2 Months Left", type: "Event" }
  ];

  return (
    <FeatureLayout title={t.calendarTitle} sub={t.calendarSub}>
      <div className="space-y-4 max-w-4xl mx-auto">
        {dates.map((d, i) => (
          <div key={i} className="glass p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-l-emerald-500">
            <div className="space-y-1">
              <h5 className="font-bold text-lg text-white">{d.event}</h5>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Calendar size={14} /> {d.date}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-emerald-400">{d.days}</span>
              <button 
                onClick={() => alert(`Reminder set for: ${d.event}`)}
                className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-xs font-bold text-white transition-all active:scale-95"
              >
                Remind Me
              </button>
            </div>
          </div>
        ))}
      </div>
    </FeatureLayout>
  );
};

export default CalendarPage;
