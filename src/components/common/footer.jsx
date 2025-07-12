import { Link } from "react-router-dom"
import { Facebook, Instagram, Linkedin, Phone, MessageSquare, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40 ">
        <Button className="size-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex flex-col items-center justify-center text-xs">
          <Phone size={20} />
          BOOK NOW
        </Button>
        <Button className="size-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg flex flex-col items-center justify-center text-xs">
          <MessageSquare size={20} />
          Zalo
        </Button>
        <Button className="size-14 rounded-full bg-blue-400 hover:bg-blue-500 text-white shadow-lg flex flex-col items-center justify-center text-xs">
          <MessageSquare size={20} />
          Messenger
        </Button>
        <Button className="size-14 rounded-full bg-blue-300 hover:bg-blue-400 text-white shadow-lg flex flex-col items-center justify-center text-xs">
          <Gift size={20} />
          Gift
        </Button>
      </div>

      {/* Main Footer */}
      <footer className="bg-diag-blue text-white py-12 mt-auto bg-blue-900">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Company Info */}
          <div>
            <Link to="/" className="text-3xl font-extrabold text-white mb-4 block">
              Bệnh Viện 1A
            </Link>
            <p className="text-sm mb-2">LAB GROUP INTERNATIONAL VIETNAM COMPANY LIMITED</p>
            <p className="text-xs mb-1">Enterprise Registration Certificate No. 0301482205</p>
            <p className="text-xs mb-1">granted by Department of Planning and Investment</p>
            <p className="text-xs mb-4">of Ho Chi Minh City for the first time on 26 September 2008.</p>
            <p className="text-xs mb-1">Operation license No. 06434/HCM-GPHD</p>
            <p className="text-xs mb-4">was issued by the Department of Health of Ho Chi Minh City.</p>
            <p className="text-sm font-semibold mb-2">Address:</p>
            <p className="text-xs mb-1">Polyclinics – Medical Laboratory and Diagnosis Center – Medical Diag Center,</p>
            <p className="text-xs">414-420 Cao Thang Street, Ward 12, District 10, Ho Chi Minh City, Vietnam</p>
          </div>

          {/* Column 2: Diag Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Bệnh Viện 1A</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:underline">
                  News
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Policies & Terms */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Policies & Terms</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="hover:underline">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:underline">
                  Terms and conditions
                </Link>
              </li>
              <li>
                <Link to="/service-provision" className="hover:underline">
                  Policy of service provision
                </Link>
              </li>
              <li>
                <Link to="/payment-info" className="hover:underline">
                  Policy of payment, transaction conditions & payment information protection
                </Link>
              </li>
              <li>
                <Link to="/change-cancellation-refund" className="hover:underline">
                  Policy of change, cancellation, and refund of service fee
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              {/* Placeholder for PROTECTED DMCA badge */}
              <img src="/placeholder.svg?height=30&width=100" alt="Protected DMCA" className="h-8" />
            </div>
          </div>

          {/* Column 4: Healthcare Professionals & Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Healthcare Professionals</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <Link to="/for-doctors" className="hover:underline">
                  For Doctors
                </Link>
              </li>
              <li>
                <Link to="/for-hospitals" className="hover:underline">
                  For Hospitals
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-4">Patients</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <Link to="/patient-services" className="hover:underline">
                  Patient Services
                </Link>
              </li>
              <li>
                <Link to="/patient-resources" className="hover:underline">
                  Patient Resources
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-4">Follow us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-gray-300">
                <Facebook size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-gray-300">
                <Instagram size={24} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-gray-300">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto text-center text-xs mt-8 border-t border-diag-blue-light pt-4">
          &copy; {new Date().getFullYear()} Bệnh Viện 1A. All Rights Reserved.
        </div>
      </footer>
    </>
  )
}
