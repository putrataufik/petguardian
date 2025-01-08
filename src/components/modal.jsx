import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function DialogDefault({ modalOpen, setModalOpen, onConfirm }) {
  const handleClose = () => setModalOpen(false);

  return (
    <Dialog open={modalOpen} handler={handleClose}>
      <DialogHeader>Konfirmasi</DialogHeader>
      <DialogBody>
        Apakah anda yakin untuk menghapus ini?
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleClose}
          className="mr-1"
        >
          <span>Batal</span>
        </Button>
        <Button
          variant="gradient"
          color="red"
          onClick={() => {
            onConfirm();  // Trigger confirmation action
            handleClose();  // Close the modal
          }}
        >
          <span>Hapus</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
