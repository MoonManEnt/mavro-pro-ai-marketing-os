import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CheckCircle2, Sparkles } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      <AnimatePresence>
        {toasts.map(function ({ id, title, description, action, variant, ...props }) {
          const isSuccess = variant === "success"
          
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
            >
              <Toast {...props} variant={variant} className="relative overflow-visible">
                {/* Sparkle animations for success toasts */}
                {isSuccess && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 6 }, (_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        initial={{ opacity: 0, scale: 0, rotate: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0], 
                          scale: [0, 1.2, 0], 
                          rotate: [0, 180, 360],
                          x: [0, (Math.random() - 0.5) * 60],
                          y: [0, (Math.random() - 0.5) * 60]
                        }}
                        transition={{ 
                          duration: 2, 
                          delay: i * 0.1,
                          ease: "easeOut"
                        }}
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                      >
                        <Sparkles className="w-3 h-3 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-start space-x-3 relative z-10">
                  {isSuccess && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20, 
                        delay: 0.2 
                      }}
                      className="flex-shrink-0 mt-0.5"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </motion.div>
                  )}
                  
                  <div className="grid gap-1 flex-1">
                    {title && <ToastTitle>{title}</ToastTitle>}
                    {description && (
                      <ToastDescription>{description}</ToastDescription>
                    )}
                  </div>
                </div>
                
                {/* Success glow effect */}
                {isSuccess && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 3 }}
                  />
                )}
                
                {action}
                <ToastClose />
              </Toast>
            </motion.div>
          )
        })}
      </AnimatePresence>
      <ToastViewport />
    </ToastProvider>
  )
}
