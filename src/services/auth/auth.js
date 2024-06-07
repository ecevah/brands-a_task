import { URL } from "@/constant/constant";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function useVerify() {
  const router = useRouter();

  const verify = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Token yoksa, giriş sayfasına yönlendir
        router.push("/login");
        return false;
      }

      axios.defaults.headers.common["x-access-token"] = `${token}`;
      const response = await axios.get(`${URL}api/verify`);

      if (response.data.status === true) {
        // Doğrulama başarılıysa true döndür
        return true;
      } else {
        // Doğrulama başarısızsa, access token'ı yenilemeyi dene
        const refreshToken = getRefreshTokenFromCookie();
        if (!refreshToken) {
          // Refresh token yoksa, giriş sayfasına yönlendir
          router.push("/login");
          return false;
        }

        try {
          const refreshResponse = await axios.post(
            `${URL}api/auth/refreshtoken`,
            {
              refresh_token: refreshToken,
            }
          );

          if (refreshResponse.data.success) {
            // Access token yenileme başarılıysa, yeni token'ı kaydet ve doğrulamayı tekrar dene
            localStorage.setItem("token", refreshResponse.data.token);
            return await verify();
          } else {
            // Access token yenileme başarısızsa, giriş sayfasına yönlendir
            router.push("/login");
            return false;
          }
        } catch (error) {
          console.error("Refresh token error:", error);
          router.push("/login");
          return false;
        }
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // Helper function to retrieve refresh token from cookie
  function getRefreshTokenFromCookie() {
    // Implement logic to retrieve refresh token from cookie (e.g., using document.cookie)
    // Handle cases where the cookie is not present or invalid
  }

  return { verify };
}
