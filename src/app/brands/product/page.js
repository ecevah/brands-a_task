"use client";
import ProductPanel from "@/components/productList";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiShoppingCart, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  useFetchProductsQuery,
  useAddProductMutation,
} from "@/services/apis/product";
import { addProduct } from "@/services/apis/controller";
import { Selected } from "@/components/selected";

export default function Animate() {
  const [mobileShow, setMobileShow] = useState(false);
  const dispatch = useDispatch();

  const { cartItems, total } = useSelector((state) => state.selectedProducts);
  const {
    data,
    error,
    isLoading,
    isFetching,
    isError,
  } = useFetchProductsQuery();

  const [addProductMutation] = useAddProductMutation();

  useEffect(() => {
    const container = document.querySelector(".animate-container");
    container.classList.add("animate-active");
  }, []);

  const handleAddProductClick = () => {
    Swal.fire({
      title: "Ürün Ekle",
      html: `
        <input id="swal-input-name" class="swal2-input" placeholder="Ürün Adı">
        <input id="swal-input-description" class="swal2-input" placeholder="Ürün İçeriği">
        <input id="swal-input-price" class="swal2-input" placeholder="Ürün Fiyatı">
      `,
      showCancelButton: true,
      confirmButtonText: "Ekle",
      cancelButtonText: "İptal",
      confirmButtonColor: "#3085d6",

      preConfirm: () => {
        return {
          name: document.getElementById("swal-input-name").value,
          description: document.getElementById("swal-input-description").value,
          price: parseFloat(document.getElementById("swal-input-price").value),
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.value);
        const newProduct = result.value;
        addProductMutation(newProduct)
          .unwrap()
          .then(() => {
            Swal.fire("Eklendi!", "Ürün başarıyla eklendi.", "success");
          })
          .catch((error) => {
            console.error("Failed to add product:", error);
            Swal.fire("Hata!", "Ürün eklenirken bir hata oluştu.", "error");
          });
        Swal.fire("Eklendi!", "Ürün başarıyla eklendi.", "success");
      }
    });
  };

  return (
    <div className="animate-container">
      <div className="animatetop z-10"></div>
      <div className="animatebottom z-0"></div>
      <div className="animatecenter z-[20]">
        <div className="flex flex-row justify-end items-center">
          <button
            className="w-fit h-[60px] bg-blue-300 rounded-md ml-auto px-[30px] text-white font-bold"
            onClick={handleAddProductClick}
          >
            + Ürün Ekle
          </button>
          <div
            onClick={() => setMobileShow(!mobileShow)}
            className="cursor-pointer flex lg:hidden"
          >
            {mobileShow ? (
              <FiX
                size={30}
                className="p-[8px] rounded-md border-solid border-[0.5px] border-black ml-[20px]"
              />
            ) : (
              <FiShoppingCart
                size={30}
                className="p-[8px] rounded-md border-solid border-[0.5px] border-black ml-[20px]"
              />
            )}
          </div>
        </div>

        {isFetching ? (
          <div>Loading products...</div>
        ) : isError ? (
          <div>Error fetching products...</div>
        ) : (
          <div className="flex flex-row justify-between mt-[20px] h-full z-[999]">
            <div className="h-[95%] overflow-y-scroll">
              <ProductPanel products={data} />
            </div>
            {cartItems.length > 0 && (
              <div
                className={`flex flex-col w-[30%] ml-[20px] rounded-md p-[10px] justify-start items-start shadow-lg z-20 h-[95%] absolute top-[10%] right-[5%] md:flex`}
              >
                <div className="flex flex-row justify-between">
                  <p className="text-center text-black text-xl mb-[30px]">
                    Seçilen Ürünler
                  </p>
                  <FiX
                    size={30}
                    className={`p-[8px] rounded-md border-solid border-[0.5px] border-black ml-[20px] md:hidden flex ${
                      mobileShow ? "block" : "hidden"
                    }`}
                  />
                </div>

                <div className="w-full h-full flex flex-col overflow-y-scroll">
                  <Selected products={cartItems} />
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <p className="font-semibold">Toplam Tutar: </p>
                  <p className="font-bold">{`$${total.toFixed(2)}`}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
