"use client"
import { useIsMobile } from "@/hooks/use-mobile"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"

/**
 * A responsive modal component that renders a Dialog on desktop and a Sheet on mobile.
 * @param {object} props
 * @param {boolean} props.isOpen - Controls the open state of the modal.
 * @param {(open: boolean) => void} props.onOpenChange - Callback for when the open state changes.
 * @param {string} props.title - The title of the modal.
 * @param {string} props.description - The description of the modal.
 * @param {React.ReactNode} props.children - The content to be rendered inside the modal.
 * @param {string} [props.className] - Optional class names for the content.
 */
function EditModal({ isOpen, onOpenChange, title, description, children, className }) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="sm:max-w-md p-3">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export { EditModal }
