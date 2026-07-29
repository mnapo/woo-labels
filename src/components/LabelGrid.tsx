"use client";

import { useEffect, useState } from "react";
import { SheetPreset, Cell } from "@/types/sheet";
import LabelCell from "./editor/LabelCell";
import { Product } from "@/types/product";


interface Props {
  preset: SheetPreset;
}


export default function LabelGrid({
  preset,
}: Props) {

  const [cells, setCells] =
    useState<Cell[]>([]);


  useEffect(()=>{

    const total =
      preset.rows * preset.cols;

    setCells(
      Array.from(
        {length: total},
        (_,index)=>({
          id:index
        })
      )
    );

  },[preset]);


  function updateCell(
    id:number,
    product:Product
  ){

    setCells(
      current =>
        current.map(cell =>
          cell.id === id
          ? {
              ...cell,
              product
            }
          : cell
        )
    );

  }


  return (
    <div
      className="grid w-full max-w-4xl"
      style={{
        gridTemplateColumns:
          `repeat(${preset.cols},1fr)`
      }}
    >

      {cells.map(cell=>(
        <LabelCell
          key={cell.id}
          product={cell.product}
          onSelectProduct={
            (product)=>
              updateCell(
                cell.id,
                product
              )
          }
        />
      ))}

    </div>
  );
}