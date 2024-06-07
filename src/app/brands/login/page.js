"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLoginMutation } from "@/services/apis/users";

export default function Home() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [login] = useLoginMutation();

  const handleLogin = async () => {
    const username = document.querySelector('input[type="username"]').value;
    const password = document.querySelector('input[type="password"]').value;

    setErrorMessage(null);

    if (!username || !password) {
      setErrorMessage("Lütfen Kullanıcı adı ve şifreyi doldurunuz.");
      return;
    }

    try {
      const response = await login({ username, password });
      if (response.error) {
        setErrorMessage(response.error.message);
        return;
      }
      console.log("Login successful:", response.data);
      document.cookie = `refresh-token=${response.data.refresh_token}`;
      localStorage.setItem("accessToken", response.data.accessToken);
      router.push("/product");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="login-container">
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="center">
        <h2 className="text-[25px] font-bold ">Giriş Yap</h2>
        <input type="username" placeholder="username" />
        <input type="password" placeholder="password" />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="flex flex-row mt-[5px]">
          <button
            className="bg-green-400 mr-[10px] px-[15px] py-[5px] rounded-md text-white font-bold"
            onClick={handleLogin}
          >
            Giriş Yap
          </button>
          <button onClick={() => router.push("/register")}>Kayıt Ol</button>
        </div>
      </div>
    </div>
  );
}
