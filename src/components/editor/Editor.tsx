return (
  <>
    <div className="no-print sticky top-0 z-20 flex justify-center bg-white/90 py-2 backdrop-blur">
      <div className="flex flex-col items-center rounded-lg border bg-white px-4 py-3 shadow-sm">
        <ToolBar
          value={preset}
          onChange={setPreset}
          config={config}
          setConfig={setConfig}
        />

        <hr className="my-4 w-full" />

        <ProductPicker onSelect={assignNextProduct} />
      </div>
    </div>

    <div className="print-area h-screen">
      <LabelGrid
        preset={preset}
        cells={cells}
        config={config}
        onRemove={removeProduct}
      />
    </div>
  </>
);