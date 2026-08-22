import { useEffect, useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import {
  LayoutDashboard,
  Users,
  Building2,
  TrendingUp,
  CheckSquare,
  BarChart3,
  Settings,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CreditCard
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Contacts', path: '/contacts', icon: Users },
  { name: 'Companies', path: '/companies', icon: Building2 },
  { name: 'Deals', path: '/deals', icon: TrendingUp },
  { name: 'Tasks', path: '/tasks', icon: CheckSquare },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
  { name: 'Billing', path: '/billing', icon: CreditCard },
  { name: 'Settings', path: '/settings', icon: Settings },
]

export default function MainLayout() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1024)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024)

  const toggleSidebar = () => {
    setSidebarOpen((open) => !open)
  }

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      setSidebarOpen(!mobile)
    }

    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="flex h-screen bg-background">
      {sidebarOpen && isMobile && (
        <div onClick={closeSidebarOnMobile} className="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>
      )}

      <aside
        className={`bg-card border-r transition-all duration-300 flex flex-col fixed lg:relative h-full z-50 overflow-hidden ${
          isMobile ? (sidebarOpen ? 'w-64' : 'w-0') : sidebarOpen ? 'w-64' : 'w-16'
        } ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          {sidebarOpen && <h3 className="text-sm font-semibold">Material Shadcn Vue</h3>}
          <button
            onClick={toggleSidebar}
            className={`p-2 hover:bg-accent rounded-md hidden lg:block ${!sidebarOpen ? 'mx-auto' : ''}`}
          >
            {!sidebarOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeSidebarOnMobile}
              className={() =>
                [
                  'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm',
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                ].join(' ')
              }
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onToggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
