"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRegisterMutation } from "@/services/apis/users";
import Swal from "sweetalert2";

export default function Home() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [register] = useRegisterMutation();

  const handleLogin = async () => {
    const username = document.querySelector('input[type="username"]').value;
    const password = document.querySelector('input[type="password"]').value;
    const role = document.querySelector('select[name="role"]').value;

    setErrorMessage(null);

    if (!username || !password || !role) {
      setErrorMessage("Lütfen Kullanıcı adı, rol ve şifreyi doldurunuz.");

      return;
    }

    try {
      const response = await register({ username, password, role });
      if (response.error) {
        setErrorMessage(response.error.message);
        return;
      }
      console.log("Login successful:", response.data);
      Swal.fire({
        icon: "success",
        title: "Kayıt Başarılı!",
        text: "Hesap başarıyla oluşturuldu",
        confirmButtonColor: "#23AB4C",
        confirmButtonText: "Giriş Yap",
      }).then((result) => {
        router.push("/login");
      });
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        title: "Opss",
        text: "Bir Hata Oluştu",
        icon: "question",
      });
      setErrorMessage("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="login-container">
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="center">
        <h2 className="text-[25px] font-bold ">Kayıt Ol</h2>
        <input type="username" placeholder="username" />
        <input type="password" placeholder="password" />
        <select name="role" id="role">
          <option value="admin">Admin</option>
          <option value="user">Kullanıcı</option>
        </select>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="flex flex-row mt-[5px]">
          <button
            className="bg-green-400 mr-[10px] px-[15px] py-[5px] rounded-md text-white font-bold"
            onClick={handleLogin}
          >
            Kayıt Ol
          </button>
          <button onClick={() => router.push("/login")}>Giriş Yap</button>
        </div>
      </div>
    </div>
  );
}
