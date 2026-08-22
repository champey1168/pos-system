import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Menu, User, CreditCard, LogOut, ChevronDown } from 'lucide-react'

export default function Navbar({ onToggleSidebar }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search:', searchQuery)
  }

  const toggleAccountDropdown = () => {
    setAccountDropdownOpen((open) => !open)
  }

  const closeAccountDropdown = () => {
    setAccountDropdownOpen(false)
  }

  const navigateToBilling = () => {
    navigate('/billing')
    closeAccountDropdown()
  }

  const handleLogout = () => {
    console.log('Logout clicked')
    closeAccountDropdown()
  }

  return (
    <nav className="bg-card border-b sticky top-0 z-40">
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 hover:bg-accent rounded-md"
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>

            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-64 lg:w-96"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSidebar}
              className="hidden lg:block p-2 hover:bg-accent rounded-md"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>

            <div className="relative">
              <button
                onClick={toggleAccountDropdown}
                className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-md"
                aria-label="Account menu"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <User size={18} />
                </div>
                <span className="hidden sm:block text-sm font-medium">Account</span>
                <ChevronDown size={16} className="hidden sm:block" />
              </button>

              {accountDropdownOpen && (
                <>
                  <div onClick={closeAccountDropdown} className="fixed inset-0 z-40"></div>

                  <div
                    className={`absolute right-0 mt-2 w-56 bg-card border rounded-md shadow-lg py-1 z-50 origin-top-right transition ease-out duration-100 ${
                      accountDropdownOpen ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95'
                    }`}
                  >
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">john@example.com</p>
                    </div>

                    <button
                      onClick={navigateToBilling}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent"
                    >
                      <CreditCard size={16} />
                      <span>Billing</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent text-red-600"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </form>
        </div>
      </div>
    </nav>
  )
}
