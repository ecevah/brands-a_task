import React from "react";
import Swal from "sweetalert2";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/services/apis/product";
import { addItem, removeItemById } from "@/services/apis/controller";

export default function Product({ id, name, content, price }) {
  const dispatch = useDispatch();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleEditClick = async () => {
    const result = await Swal.fire({
      title: "Ürün Düzenle",
      html: `
        <input id="swal-input-name" class="swal2-input" value="${name}">
        <input id="swal-input-content" class="swal2-input" value="${content}">
        <input id="swal-input-price" class="swal2-input" value="${price}">
      `,
      showCancelButton: true,
      confirmButtonText: "Kaydet",
      cancelButtonText: "İptal",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        return {
          id,
          name: document.getElementById("swal-input-name").value,
          content: document.getElementById("swal-input-content").value,
          price: document.getElementById("swal-input-price").value,
        };
      },
    });

    if (result.isConfirmed) {
      const response = await updateProduct(result.value);
      console.log("Değişiklikler kaydedildi:", response.data);
    }
  };

  const handleDeleteClick = async () => {
    const result = await Swal.fire({
      title: "Emin misiniz?",
      text: "Bu ürünü silmek istediğinizden emin misiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Evet, sil",
      cancelButtonText: "İptal",
    });

    if (result.isConfirmed) {
      const response = await deleteProduct(id);
      console.log("Ürün silindi:", { id, name, content, price });
      Swal.fire("Silindi!", "Ürün başarıyla silindi.", "success");
    }
  };

  const handleAddToSelected = () => {
    dispatch(addItem({ id, name, content, price }));
  };

  const handleRemoveFromSelected = () => {
    dispatch(removeItemById(id));
  };

  return (
    <div className="bg-opacity-25 bg-white shadow-lg backdrop-filter backdrop-blur-lg border-1 border-opacity-25 border-white rounded-lg p-6 flex flex-col h-[270px] w-[400px] max-w-[200px]">
      <div className="flex flex-row w-full justify-end mb-4">
        <div
          className="p-[3px] rounded-md border-solid border-[1px] border-gray-500 flex justify-center items-center mr-2"
          onClick={handleEditClick}
        >
          <FiEdit2 />
        </div>
        <div
          className="p-[3px] rounded-md border-solid border-[1px] border-gray-500 flex justify-center items-center"
          onClick={handleDeleteClick}
        >
          <FiTrash2 />
        </div>
      </div>
      <div>
        <h2 className="font-bold text-[20px] mt-[5px] mb-[3px]">{name}</h2>
        <p className="text-[10px]">{content}</p>
        <p className="text-[20px] font-bold mt-[20px] ml-auto ">{`$${price}`}</p>
      </div>
      <div
        className="p-[3px] rounded-md border-solid border-[1px] border-gray-500 flex justify-center items-center"
        onClick={handleAddToSelected}
      >
        Add to Selected
      </div>
      <div
        className="p-[3px] rounded-md border-solid border-[1px] border-gray-500 flex justify-center items-center"
        onClick={handleRemoveFromSelected}
      >
        Remove from Selected
      </div>
    </div>
  );
}
