"use client";

import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  name: string;
  price: string;
  onClose: () => void;
  onSave: (name: string, price: string) => void;
}

export default function CellEditor({
  open,
  name,
  price,
  onClose,
  onSave,
}: Props) {
  const [customName, setCustomName] = useState(name);
  const [customPrice, setCustomPrice] = useState(price);

  useEffect(() => {
    setCustomName(name);
    setCustomPrice(price);
  }, [name, price, open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-5 shadow-xl">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Editar etiqueta</h2>
          <p className="text-sm text-gray-500">
            Modificá el nombre y el precio del producto.
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Nombre
            </label>

            <input
              autoFocus
              value={customName}
              onChange={e => setCustomName(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Precio
            </label>

            <input
              value={customPrice}
              onChange={e => setCustomPrice(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              onSave(customName, customPrice);
              onClose();
            }}
            className="rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
