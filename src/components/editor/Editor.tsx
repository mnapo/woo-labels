type EditorProps = {
  children: React.ReactNode;
};

export default function Editor({ children }: EditorProps) {
  return (
    <div className="no-print flex justify-center">
      <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg border p-4">
        {children}
      </div>
    </div>
  );
}