import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

export function Header() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Bệnh Viện 1A
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                {user?.roles?.includes("ROLE_ADMIN") || user?.roles?.includes("ROLE_EDITOR") ? (
                  <li>
                    <Link to="/admin/dashboard" className="hover:underline">
                      Dashboard
                    </Link>
                  </li>
                ) : null}
                <li>
                  <Button variant="secondary" onClick={logout}>
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/auth/login">
                  <Button variant="secondary">Login</Button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
