import { useState } from 'react';
import { Sidebar, Header, Footer } from './components/layout';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider defaultTheme="system" storageKey="toolsathi-theme">
      <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans overflow-hidden">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header setIsOpen={setSidebarOpen} />
          
          <main className="flex-1 overflow-y-auto flex flex-col">
            <div className="p-4 sm:p-6 lg:p-8 flex-1">
              <div className="max-w-7xl mx-auto">
                <Outlet />
              </div>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
