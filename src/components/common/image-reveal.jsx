"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

const ImageReveal = ({ src, alt, className, ...props }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={imgRef}
      className={cn(
        "overflow-hidden transition-all duration-700 ease-out",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
        className
      )}
      {...props}
    >
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-700 ease-out",
          isLoaded ? "scale-100" : "scale-110"
        )}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}

export default ImageReveal
