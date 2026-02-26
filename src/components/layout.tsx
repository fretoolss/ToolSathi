import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { 
  LayoutDashboard, 
  Youtube, 
  TrendingUp, 
  Search, 
  Wrench,
  Menu,
  X
} from 'lucide-react';
import { ModeToggle } from './mode-toggle';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'YouTube Tools', path: '/youtube', icon: Youtube },
  { name: 'Trading Tools', path: '/trading', icon: TrendingUp },
  { name: 'SEO Tools', path: '/seo', icon: Search },
  { name: 'Utility Tools', path: '/utility', icon: Wrench },
];

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-screen flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400">
            <Wrench className="h-6 w-6" />
            <span>ToolSathi</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400" 
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50"
                )}
                onClick={() => setIsOpen(false)}
              >
                <Icon className={cn("h-5 w-5", isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 text-center">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Go Premium</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Unlock all AI features</p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export function Header({ setIsOpen }: { setIsOpen: (v: boolean) => void }) {
  return (
    <header className="h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-md"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="hidden sm:flex items-center relative">
          <Search className="h-4 w-4 absolute left-3 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search tools..." 
            className="pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border-transparent focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-lg text-sm w-64 transition-all outline-none dark:text-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ModeToggle />
        <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-semibold text-sm border border-indigo-200 dark:border-indigo-800">
          U
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400 mb-4">
              <Wrench className="h-6 w-6" />
              <span>ToolSathi</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Smart tools for smart creators. Everything you need to grow your digital presence.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Tools</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/youtube" className="hover:text-indigo-600 dark:hover:text-indigo-400">YouTube Tools</Link></li>
              <li><Link to="/trading" className="hover:text-indigo-600 dark:hover:text-indigo-400">Trading Tools</Link></li>
              <li><Link to="/seo" className="hover:text-indigo-600 dark:hover:text-indigo-400">SEO Tools</Link></li>
              <li><Link to="/utility" className="hover:text-indigo-600 dark:hover:text-indigo-400">Utility Tools</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact Us</Link></li>
              <li><Link to="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="hover:text-indigo-600 dark:hover:text-indigo-400">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} ToolSathi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
