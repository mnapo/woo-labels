interface Props {
  onClick: () => void;
}

export default function LabelCell({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        aspect-[2/1]
        border
        bg-white
        hover:bg-gray-50
        transition
        flex
        flex-col
        items-center
        justify-center
        gap-1
      "
    >
      <span className="text-xl">
        +
      </span>

      <span className="text-xs text-gray-500">
        Agregar producto
      </span>
    </button>
  );
}