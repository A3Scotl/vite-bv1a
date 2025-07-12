"use client"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ChevronDown,
  Facebook,
  Youtube,
  Instagram,
  Search,
  Phone,
  Globe,
  User,
  BriefcaseMedical,
  MapPin,
  FileText,
  PanelLeft,
} from "lucide-react"

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-blue-700 shadow-sm">
      {/* Top Bar */}
      <div className="bg-diag-blue text-white text-sm py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">Find us at:</span>
            <div className="flex space-x-3">
              <a href="#" aria-label="Facebook" className="hover:text-gray-300">
                <Facebook size={16} />
              </a>
              <a href="#" aria-label="Youtube" className="hover:text-gray-300">
                <Youtube size={16} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-gray-300">
                <Instagram size={16} />
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="flex items-center hover:text-gray-300">
              <BriefcaseMedical size={16} className="mr-1" /> For business
            </a>
            <a href="#" className="flex items-center hover:text-gray-300">
              <MapPin size={16} className="mr-1" /> Locations
            </a>
            <a href="#" className="flex items-center hover:text-gray-300">
              <FileText size={16} className="mr-1" /> Test result
            </a>
            <a href="#" className="flex items-center hover:text-gray-300">
              <User size={16} className="mr-1" /> Partner portal
            </a>
            <a href="tel:19001717" className="flex items-center font-bold hover:text-gray-300">
              <Phone size={16} className="mr-1" /> 1900 1717
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-diag-blue-light hover:text-white h-auto p-1">
                  <Globe size={16} className="mr-1" /> Tiếng Việt <ChevronDown size={16} className="ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Tiếng Việt</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-blue-900 text-white container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="text-3xl font-extrabold text-diag-blue">
          Bệnh Viện 1A
        </Link>
        <nav className="hidden lg:flex items-center space-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-lg font-semibold  ">
                All Services <ChevronDown size={16} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>General Check-up</DropdownMenuItem>
              <DropdownMenuItem>Specialist Consultation</DropdownMenuItem>
              <DropdownMenuItem>Emergency Care</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-lg font-semibold  ">
                Departments <ChevronDown size={16} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Cardiology</DropdownMenuItem>
              <DropdownMenuItem>Pediatrics</DropdownMenuItem>
              <DropdownMenuItem>Dermatology</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/home-care" className="text-lg font-semibold hover:text-diag-blue">
            Home Care
          </Link>
          <Link to="/vaccination" className="text-lg font-semibold hover:text-diag-blue">
            Vaccination
          </Link>
          <Link to="/insurance" className="text-lg font-semibold hover:text-diag-blue">
            Insurance
          </Link>
          <Link to="/promotions" className="text-lg font-semibold hover:text-diag-blue">
            Promotions
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-lg font-semibold  ">
                Partnership <ChevronDown size={16} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Corporate Partners</DropdownMenuItem>
              <DropdownMenuItem>Medical Professionals</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-lg font-semibold  ">
                About Us <ChevronDown size={16} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Our Story</DropdownMenuItem>
              <DropdownMenuItem>Our Team</DropdownMenuItem>
              <DropdownMenuItem>Mission & Vision</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-lg font-semibold  ">
                Blog <ChevronDown size={16} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Health Tips</DropdownMenuItem>
              <DropdownMenuItem>News & Events</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className=" ">
            <Search size={20} />
          </Button>
        </nav>

        {/* Mobile Menu Toggle (for future implementation) */}
        <div className="lg:hidden">
          {/* You can add a Sheet or Drawer component here for mobile navigation */}
          <Button variant="ghost" size="icon">
            <PanelLeft size={24} /> {/* Placeholder for mobile menu icon */}
          </Button>
        </div>
      </div>
    </header>
  )
}
