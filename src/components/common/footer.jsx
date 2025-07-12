export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground p-4 mt-8">
      <div className="container mx-auto text-center text-sm text-black">
        &copy; {new Date().getFullYear()} Bệnh Viện 1A. All rights reserved.
      </div>
    </footer>
  )
}
