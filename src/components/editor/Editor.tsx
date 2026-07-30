type EditorProps = {
  children: React.ReactNode;
};

export default function Editor({ children }: EditorProps) {
  return (
    <div className="no-print flex justify-center">
      <div className="flex items-center rounded-lg border bg-white px-4 py-3 shadow-sm">
        {children}
      </div>
    </div>
  );
}