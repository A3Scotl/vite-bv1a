import { Loader } from "lucide-react"
import { motion } from "framer-motion"

const LoadingPage = () => {
  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-background"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    </motion.div>
  )
}

export default LoadingPage
