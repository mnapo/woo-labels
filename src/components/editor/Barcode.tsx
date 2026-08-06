"use client";

interface Props {
  value: string;
}

export default function Barcode({ value }: Props) {
  return (
    <div className="text-xs tracking-widest text-black">
      {value}
    </div>
  );
}
