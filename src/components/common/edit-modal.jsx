"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * A custom modal component using raw HTML/CSS (not Dialog/Sheet).
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {(open: boolean) => void} props.onOpenChange
 * @param {string} props.title
 * @param {string} props.description
 * @param {React.ReactNode} props.children
 */
export function EditModal({ isOpen, onOpenChange, title, description, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div
        className="relative bg-white p-6 rounded-lg shadow-2xl w-[90vw] max-w-3xl max-h-[95vh] "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
