import React from 'react';
import { Sparkles, ArrowLeft, Mic, Upload, ExternalLink, ClipboardList, MapPin, Newspaper, Calendar, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavItem = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all w-full ${
      active ? 'bg-emerald-500 text-white shadow-xl scale-105' : 'text-slate-400 hover:text-white hover:bg-white/10'
    }`}
  >
    <span className="scale-[1.5]">{icon}</span>
    <span className="text-sm font-black tracking-wide">{label}</span>
  </Link>
);

const Navbar = ({ language, setLanguage, t }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="glass fixed top-0 left-0 lg:left-64 right-0 z-50 flex items-center justify-between px-8 py-4 m-4">
      <Link to="/" className="flex items-center gap-2 cursor-pointer lg:hidden">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Sparkles className="text-white" size={24} />
        </div>
        <h1 className="text-2xl font-bold gradient-text">CivicLens</h1>
      </Link>
      
      <div className="hidden lg:block">
        <h2 className="text-xl font-bold text-white/90">Welcome to CivicLens AI</h2>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex bg-slate-800/50 p-1 rounded-lg border border-white/5 mr-4">
          {['en', 'hi', 'kn'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                language === lang ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
        
        <div className="flex flex-col gap-3 w-64 bg-slate-900/50 p-4 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-xl absolute top-20 right-0 lg:static lg:flex-row lg:w-auto lg:bg-transparent lg:border-none lg:shadow-none">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                <UserIcon size={16} className="text-emerald-400" />
                <span className="text-xs font-bold text-white">{user.username}</span>
              </div>
              <button 
                onClick={logout}
                className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl border border-red-500/20 transition-all font-bold text-xs flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                to="/login"
                className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-white transition-all font-bold text-xs flex items-center gap-2"
              >
                <LogIn size={16} /> Login
              </Link>
              <Link 
                to="/register"
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 rounded-xl text-white transition-all font-bold text-xs shadow-lg shadow-emerald-500/20"
              >
                Register
              </Link>
            </div>
          )}
          
          <div className="lg:hidden flex flex-col gap-3">
             <NavItem to="/chat" icon={<Mic size={14}/>} label={t.navChat} active={currentPath === '/chat'} />
             <NavItem to="/document" icon={<Upload size={14}/>} label={t.navDocs} active={currentPath === '/document'} />
             <NavItem to="/portals" icon={<ExternalLink size={14}/>} label={t.navPortals} active={currentPath === '/portals'} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
export { NavItem };
