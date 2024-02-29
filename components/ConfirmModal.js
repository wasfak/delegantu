import { Dialog } from "@headlessui/react";

export function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="w-full max-w-md bg-[#252525] text-white p-6 rounded-lg shadow">
          <Dialog.Title>Confirm Action</Dialog.Title>
          <p>{message}</p>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="bg-gray-500 text-white rounded px-4 py-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white rounded px-4 py-2"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
