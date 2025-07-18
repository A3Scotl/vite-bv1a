"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search, Phone } from 'lucide-react'
import { motion } from "framer-motion"

const NotFoundPage = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="text-8xl md:text-9xl font-bold text-blue-600 mb-4">
            4
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              0
            </motion.span>
            4
          </div>
        </motion.div>

        {/* Animated Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Trang không tồn tại
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Trang bạn đang tìm kiếm có thể đã được di chuyển, xóa hoặc không bao giờ tồn tại. 
            Hãy thử các liên kết bên dưới để tìm những gì bạn cần.
          </p>
        </motion.div>

        {/* Animated Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link to="/">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
              <Home className="w-5 h-5 mr-2" />
              Về trang chủ
            </Button>
          </Link>
          
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => window.history.back()}
            className="px-8 py-3"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Quay lại
          </Button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Link 
            to="/dich-vu" 
            className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <Search className="w-8 h-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 mb-2">Dịch vụ y tế</h3>
            <p className="text-sm text-gray-600">Khám phá các dịch vụ chăm sóc sức khỏe</p>
          </Link>

          <Link 
            to="/doi-ngu-chuyen-gia" 
            className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-3 group-hover:scale-110 transition-transform"></div>
            <h3 className="font-semibold text-gray-900 mb-2">Đội ngũ bác sĩ</h3>
            <p className="text-sm text-gray-600">Tìm hiểu về các chuyên gia y tế</p>
          </Link>

          <Link 
            to="/lien-he" 
            className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 mb-2">Liên hệ</h3>
            <p className="text-sm text-gray-600">Liên hệ để được hỗ trợ</p>
          </Link>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-10 w-16 h-16 bg-blue-100 rounded-full opacity-50"
        />
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-20 w-12 h-12 bg-green-100 rounded-full opacity-50"
        />

        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 left-20 w-8 h-8 bg-yellow-100 rounded-full opacity-50"
        />
      </div>
    </div>
  )
}

export default NotFoundPage
