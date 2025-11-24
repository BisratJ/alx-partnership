import { HeroSection } from '@/components/ui/hero-section-dark';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { Home, FileText, Search, LayoutDashboard } from 'lucide-react';

export default function HomePage() {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Apply', url: '/apply', icon: FileText },
    { name: 'Track', url: '/track', icon: Search },
    { name: 'Dashboard', url: '/dashboard', icon: LayoutDashboard }
  ];

  return (
    <>
      <NavBar items={navItems} />
      <HeroSection
        title="Welcome to Our Platform"
        subtitle={{
          regular: "Transform your ideas into ",
          gradient: "beautiful digital experiences",
        }}
        description="Transform your ideas into reality with our comprehensive suite of development tools and resources."
        ctaText="Get Started"
        ctaHref="/apply"
        bottomImage={undefined}
        gridOptions={{
          angle: 65,
          opacity: 0.4,
          cellSize: 50,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
      />
    </>
  );
}
