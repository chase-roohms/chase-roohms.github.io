import { type ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import SiteBackground from './SiteBackground';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <SiteBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
