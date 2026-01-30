import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/common/shadcn-ui/dialog";
import { Button } from "@/common/shadcn-ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  className?: string;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  className,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              {cancelText}
            </Button>
            <Button className={className} onClick={onConfirm}>
              {confirmText}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}