"use client";

import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

interface Props {
  value: string;
}

export default function Barcode({ value }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    JsBarcode(ref.current, value, {
      format: "CODE128",
      displayValue: true,
      fontSize: 10,
      height: 35,
      margin: 0,
    });
  }, [value]);

  return (
    <svg ref={ref} />
  );
}
