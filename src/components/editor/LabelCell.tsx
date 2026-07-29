"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import ProductPicker from "./ProductPicker";
import { Product } from "@/types/product";


interface Props {
  product?: Product;
  onSelectProduct: (
    product: Product
  ) => void;
}


export default function LabelCell({
  product,
  onSelectProduct,
}: Props) {

  const [open, setOpen] =
    useState(false);


  return (
    <div className="relative">

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          aspect-[2/1]
          w-full
          border
          bg-white
          hover:bg-gray-50
          transition
          flex
          flex-col
          items-center
          justify-center
          gap-1
          p-2
          text-center
        "
      >

        {product ? (
          <>
            <span className="
              text-sm
              font-medium
            ">
              {product.name}
            </span>

            <span className="
              text-xs
              text-gray-600
            ">
              ${product.price}
            </span>
          </>
        ) : (
          <>
            <Plus
              size={20}
              className="text-gray-400"
            />

            <span className="
              text-xs
              text-gray-500
            ">
              Agregar producto
            </span>
          </>
        )}

      </button>


      {open && (
        <ProductPicker
          onSelect={(product)=>{
            onSelectProduct(product);
            setOpen(false);
          }}
        />
      )}

    </div>
  );
}