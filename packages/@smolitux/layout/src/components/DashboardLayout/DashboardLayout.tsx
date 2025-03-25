// packages/@smolitux/layout/src/components/DashboardLayout/DashboardLayout.tsx
import React, { useState, useEffect } from 'react';
import Header, { HeaderProps } from '../Header/Header';
import Sidebar, { SidebarProps } from '../Sidebar/Sidebar';
import Footer, { FooterProps } from '../Footer/Footer';
import Container from '../Container/Container';

export interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Konfiguration für den Header */
  header?: Omit<HeaderProps, 'onSidebarToggle'> & { show?: boolean };
  /** Konfiguration für die Sidebar */
  sidebar?: Omit<SidebarProps, 'onCollapseChange'> & { show?: boolean };
  /** Konfiguration für den Footer */
  footer?: FooterProps & { show?: boolean };
  /** Hauptinhalt */
  children: React.ReactNode;
  /** Initiale Collapse-Status der Sidebar */
  sidebarCollapsed?: boolean;
  /** Max-Width des Content-Containers */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
  /** Content-Padding */
  contentPadding?: boolean;
  /** Responsive Anpassung der Sidebar (mobile collapsed) */
  responsive?: boolean;
}

/**
 * Dashboard-Layout für Admin-Bereiche und Applikationen
 * 
 * @example
 * ```tsx
 * <DashboardLayout
 *   header={{ title: "Admin Panel" }}
 *   sidebar={{ items: navigationItems }}
 *   footer={{ copyright: "© 2025 My Company" }}
 * >
 *   <h1>Dashboard Content</h1>
 * </DashboardLayout>
 * ```
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  header = { show: true },
  sidebar = { show: true },
  footer = { show: true },
  children,
  sidebarCollapsed = false,
  maxWidth = 'full',
  contentPadding = true,
  responsive = true,
  className = '',
  ...rest
}) => {
  // State für Sidebar Collapse und Mobile-Layout
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(sidebarCollapsed);
  const [isMobile, setIsMobile] = useState(false);
  
  // Prüfe bei Initialisierung und Resize ob es sich um ein mobiles Gerät handelt
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);
      
      // Auto-Collapse auf Mobile-Geräten
      if (responsive && mobile && !isSidebarCollapsed) {
        setIsSidebarCollapsed(true);
      }
    };
    
    // Initial check
    checkIfMobile();
    
    // Event listener für Resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [responsive, isSidebarCollapsed]);
  
  // Sidebarbreite berechnen für Content-Margin
  const sidebarWidth = sidebar.show 
    ? (isSidebarCollapsed 
      ? (sidebar.collapsedWidth || 64)
      : (sidebar.width || 240))
    : 0;
  
  // CSS für dynamischen Content-Bereich
  const contentStyle = {
    marginLeft: sidebar.show && sidebar.position !== 'right' ? `${sidebarWidth}px` : 0,
    marginRight: sidebar.show && sidebar.position === 'right' ? `${sidebarWidth}px` : 0,
    marginTop: header.show && header.fixed ? (header.height === 'sm' ? '3rem' : header.height === 'md' ? '4rem' : '5rem') : 0,
    marginBottom: footer.show && footer.fixed ? '4rem' : 0,
    paddingLeft: contentPadding ? '1rem' : 0,
    paddingRight: contentPadding ? '1rem' : 0,
    paddingTop: contentPadding ? '1rem' : 0,
    paddingBottom: contentPadding ? '1rem' : 0,
  };
  
  // Header/Sidebar toggle für mobile
  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  return (
    <div className={`min-h-screen ${className}`} {...rest}>
      {/* Header */}
      {header.show && (
        <Header
          {...header}
          showSidebarToggle={sidebar.show && responsive && isMobile}
          onSidebarToggle={handleSidebarToggle}
        />
      )}
      
      {/* Sidebar */}
      {sidebar.show && (
        <Sidebar
          {...sidebar}
          collapsed={isSidebarCollapsed}
          onCollapseChange={setIsSidebarCollapsed}
        />
      )}
      
      {/* Hauptinhalt-Bereich mit dynamischen Rändern */}
      <main
        className="flex-grow transition-all duration-300 ease-in-out"
        style={contentStyle}
      >
        <Container maxWidth={maxWidth} disableGutters={!contentPadding}>
          {children}
        </Container>
      </main>
      
      {/* Footer */}
      {footer.show && (
        <Footer
          {...footer}
          className={`transition-all duration-300 ease-in-out ${
            sidebar.show
              ? sidebar.position !== 'right'
                ? `ml-0 md:ml-${isSidebarCollapsed ? '16' : '64'}`
                : `mr-0 md:mr-${isSidebarCollapsed ? '16' : '64'}`
              : ''
          }`}
        />
      )}
      
      {/* Mobile Overlay für Sidebar */}
      {sidebar.show && responsive && isMobile && !isSidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={handleSidebarToggle}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default DashboardLayout;
