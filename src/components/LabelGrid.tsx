import { SheetPreset } from "@/types/sheet";

interface Props {
  preset: SheetPreset;
}

export default function LabelGrid({
  preset,
}: Props) {

  const total = preset.rows * preset.cols;

  return (
    <div
      className="grid w-full max-w-3xl"
      style={{
        gridTemplateColumns:
          `repeat(${preset.cols}, 1fr)`
      }}
    >
      {Array.from({ length: total }).map(
        (_, index) => (
          <div
            key={index}
            className="
              aspect-[2/1]
              border
              flex
              items-center
              justify-center
              text-sm
            "
          >
            {index + 1}
          </div>
        )
      )}
    </div>
  );
}