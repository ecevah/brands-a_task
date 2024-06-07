import React from "react";

export const Selected = (props) => {
  return (
    <>
      {props.products.map((product) => (
        <div
          key={product.id}
          className="flex flex-row justify-between items-center p-[8px] rounded-md border-solid border-[1px] border-gray-300"
        >
          <div className="flex flex-col w-full justify-start">
            <div className="text-[15px] font-bold">{product.name}</div>
            <div className="text-[10px]">{product.content}</div>
          </div>
          <div className="flex flex-row items-center">
            <div className="font-bold text-[15px]">{`$${product.price}`}</div>
            <button
              className="p-[3px] rounded-md bg-red-400 w-[20px] h-[20px] text-center text-[10px] text-white ml-[10px]"
              onClick={() => props.onRemove(product.id)}
            >
              X
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
