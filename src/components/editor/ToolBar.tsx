"use client";

import { Dispatch, SetStateAction } from "react";

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

export default function ToolBar({
  value,
  onChange,
  config,
  setConfig,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <SheetSelector value={value} onChange={onChange} />

        <select
          value={config.fontSize}
          onChange={e =>
            setConfig(current => ({
              ...current,
              fontSize: e.target.value as LabelConfig["fontSize"],
            }))
          }
          className="rounded border px-2 py-1 text-sm"
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
              layout: e.target.value as LabelConfig["layout"],
            }))
          }
          className="rounded border px-2 py-1 text-sm"
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
      </div>

      <PrintButton />
    </div>
  );
}
