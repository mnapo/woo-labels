"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Settings } from "lucide-react";

import { LabelConfig } from "@/types/label";
import { SheetPreset } from "@/types/sheet";

import SheetSelector from "./SheetSelector";
import PrintButton from "./PrintButton";

interface Props {
  value: SheetPreset;
  onChange: (preset: SheetPreset) => void;
  config: LabelConfig;
  setConfig: Dispatch<SetStateAction<LabelConfig>>;
}

interface ConfigurationControlsProps {
  config: LabelConfig;
  setConfig: Dispatch<SetStateAction<LabelConfig>>;
  mobile?: boolean;
}

function ConfigurationControls({
  config,
  setConfig,
  mobile = false,
}: ConfigurationControlsProps) {
  const selectClass = mobile
    ? "w-full rounded border px-3 py-2 text-sm"
    : "rounded border px-2 py-1 text-sm";

  return (
    <>
      <select
        value={config.fontSize}
        onChange={e =>
          setConfig(current => ({
            ...current,
            fontSize:
              e.target.value as LabelConfig["fontSize"],
          }))
        }
        className={selectClass}
      >
        <option value="small">Texto pequeño</option>
        <option value="medium">Texto medio</option>
        <option value="large">Texto grande</option>
      </select>

      <select
        value={config.layout}
        onChange={e =>
          setConfig(current => ({
            ...current,
            layout:
              e.target.value as LabelConfig["layout"],
          }))
        }
        className={selectClass}
      >
        <option value="vertical">Vertical</option>
        <option value="horizontal">Horizontal</option>
      </select>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={config.showBarcode}
          onChange={e =>
            setConfig(current => ({
              ...current,
              showBarcode: e.target.checked,
            }))
          }
        />
        Código de barras
      </label>

      <div className="space-y-2">
        <span className="text-sm font-medium">
          Borde
        </span>

        <div className="flex flex-wrap gap-3">
          {[
            ["solid", "Recto"],
            ["dashed", "Punteado"],
            ["none", "Ninguno"],
          ].map(([value, label]) => (
            <label
              key={value}
              className="flex items-center gap-1 text-sm"
            >
              <input
                type="radio"
                name={mobile ? "mobile-border-style" : "border-style"}
                value={value}
                checked={
                  config.borderStyle === value
                }
                onChange={() =>
                  setConfig(current => ({
                    ...current,
                    borderStyle:
                      value as LabelConfig["borderStyle"],
                  }))
                }
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor={
            mobile
              ? "mobile-border-width"
              : "border-width"
          }
          className="text-sm font-medium"
        >
          Ancho de borde
        </label>

        <input
          id={
            mobile
              ? "mobile-border-width"
              : "border-width"
          }
          type="range"
          min="0"
          max="2"
          step="1"
          value={
            config.borderWidth === "thin"
              ? 0
              : config.borderWidth === "medium"
                ? 1
                : 2
          }
          disabled={config.borderStyle === "none"}
          onChange={e => {
            const values = [
              "thin",
              "medium",
              "thick",
            ] as const;

            setConfig(current => ({
              ...current,
              borderWidth:
                values[Number(e.target.value)],
            }));
          }}
          className="w-full disabled:opacity-40"
        />

        <div className="flex justify-between text-xs text-gray-500">
          <span>Fino</span>
          <span>Medio</span>
          <span>Grueso</span>
        </div>
      </div>
    </>
  );
}

export default function ToolBar({
  value,
  onChange,
  config,
  setConfig,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="hidden items-center gap-2 sm:flex">
          <SheetSelector
            value={value}
            onChange={onChange}
          />

          <ConfigurationControls
            config={config}
            setConfig={setConfig}
          />
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded border px-3 py-2 text-sm sm:hidden"
        >
          <Settings size={16} />
          Configurar hoja
        </button>

        <PrintButton />
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/40 p-4 sm:hidden">
          <div className="w-full max-w-sm rounded-lg bg-white p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-medium">
                Configurar hoja
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <SheetSelector
                value={value}
                onChange={onChange}
              />

              <ConfigurationControls
                config={config}
                setConfig={setConfig}
                mobile
              />

              <button
                onClick={() => setOpen(false)}
                className="w-full rounded bg-black px-3 py-2 text-sm text-white"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
