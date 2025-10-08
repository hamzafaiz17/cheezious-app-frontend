import { useState } from "react";
import { X } from "lucide-react"; // Close icon

export default function Offmenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button (for example purposes) */}
      <button
        onClick={() => setOpen(true)}
        className="bg-orange-500 text-white px-4 py-2 rounded"
      >
        Open Menu
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Offcanvas Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-end p-4 border-b">
          <button onClick={() => setOpen(false)} aria-label="Close">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <h1 className="text-2xl font-bold text-orange-500">Cheezious</h1>
        </div>
      </div>
    </>
  );
}
