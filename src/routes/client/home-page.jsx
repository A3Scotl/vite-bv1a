export function HomePage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Bệnh Viện 1A</h1>
      <p className="text-lg text-muted-foreground">Your trusted healthcare partner.</p>
      <div className="mt-8">
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="Hospital building"
          className="mx-auto rounded-lg shadow-lg"
        />
      </div>
      <p className="mt-8 text-base text-foreground">
        We are dedicated to providing the highest quality medical care with compassion and innovation.
      </p>
    </div>
  )
}
