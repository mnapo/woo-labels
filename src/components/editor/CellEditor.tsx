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

  if (!open) return null;

  return (
    <div className="absolute left-1/2 top-1/2 z-30 w-72 -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white p-4 shadow-xl">
      <div className="space-y-3">
        <input
          value={customName}
          onChange={e => setCustomName(e.target.value)}
          placeholder="Product name"
          className="w-full rounded border px-2 py-1"
        />

        <input
          value={customPrice}
          onChange={e => setCustomPrice(e.target.value)}
          placeholder="Price"
          className="w-full rounded border px-2 py-1"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded border px-3 py-1"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSave(customName, customPrice);
              onClose();
            }}
            className="rounded bg-black px-3 py-1 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}