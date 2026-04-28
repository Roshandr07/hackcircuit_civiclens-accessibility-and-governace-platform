import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Mic, 
  Upload, 
  ExternalLink, 
  ClipboardList, 
  MapPin, 
  Newspaper, 
  Calendar,
  Sparkles
} from 'lucide-react';

const SidebarNavItem = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
      active 
        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <span className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
      {icon}
    </span>
    <span className="text-sm font-semibold tracking-wide">{label}</span>
  </Link>
);

const Sidebar = ({ t }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { to: '/chat', icon: <Mic size={20} />, label: t.navChat },
    { to: '/document', icon: <Upload size={20} />, label: t.navDocs },
    { to: '/portals', icon: <ExternalLink size={20} />, label: t.navPortals },
    { to: '/eligibility', icon: <ClipboardList size={20} />, label: t.navEligibility },
    { to: '/centers', icon: <MapPin size={20} />, label: t.navCenters },
    { to: '/news', icon: <Newspaper size={20} />, label: t.navNews },
    { to: '/calendar', icon: <Calendar size={20} />, label: t.navCalendar },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass border-r border-white/10 z-40 hidden lg:flex flex-col p-6">
      <Link to="/" className="flex items-center gap-3 px-2 mb-10 mt-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Sparkles className="text-white" size={24} />
        </div>
        <h1 className="text-2xl font-bold gradient-text">CivicLens</h1>
      </Link>

      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            active={currentPath === item.to}
          />
        ))}
      </div>

      <div className="mt-auto">
         <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">CivicLens Pro</h3>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Advanced AI features for document verification and government services.
            </p>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;
