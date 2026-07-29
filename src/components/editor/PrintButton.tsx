"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded border px-4 py-2 bg-black text-white"
    >
      Imprimir
    </button>
  );
}