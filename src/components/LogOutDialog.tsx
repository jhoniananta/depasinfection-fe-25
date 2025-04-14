"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useClientLogout } from "@/lib/clientLogout";

import { useState } from "react";

type LogoutDialogProps = {
  trigger: (open: () => void) => React.ReactNode;
  onConfirm: () => void;
};

export default function LogoutDialog({ trigger }: LogoutDialogProps) {
  const [open, setOpen] = useState(false);

  const logout = useClientLogout();

  return (
    <>
      {trigger(() => setOpen(true))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
            <DialogDescription>
              Your session will be terminated and you'll be redirected to login.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setOpen(false);
                logout(false);
              }}
            >
              Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
