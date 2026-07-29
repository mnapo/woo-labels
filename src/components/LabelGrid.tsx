import { SheetPreset } from "@/types/sheet";
import LabelCell from "./editor/LabelCell";

interface Props {
  preset: SheetPreset;
}

export default function LabelGrid({
  preset,
}: Props) {

  const total =
    preset.rows * preset.cols;


  return (
    <div
      className="grid w-full max-w-4xl"
      style={{
        gridTemplateColumns:
          `repeat(${preset.cols}, 1fr)`
      }}
    >
      {Array.from({
        length: total
      }).map((_, index)=>(
        <LabelCell
          key={index}
          onClick={()=>{
            console.log(
              "cell",
              index
            );
          }}
        />
      ))}
    </div>
  );
}