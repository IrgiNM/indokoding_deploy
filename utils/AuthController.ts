"use server"
import { CookiesType } from "@/type/cookiesType";
import { setCookies } from "./tokenController";

export const loginAuth = async (
  username: string,
  password: string
): Promise<CookiesType> => {
  try {
    const res = await fetch("/api/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        role: "guest",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // Set cookies
      await setCookies(data.token, data.username, data.email, data.role);

      // Pastikan return sesuai tipe CookiesType
      return {
        token: data.token,
        username: data.username,
        email: data.email,
        role: data.role,
        message: data.message || "Login berhasil!",
      };
    } else {
      // Kalau gagal, tetap kembalikan sesuai tipe
      return {
        token: "",
        username: "",
        email: "",
        role: "guest",
        message: data.error || "Login gagal",
      };
    }
  } catch (error) {
    console.error("Error saat login:", error);
    // Jika terjadi error, tetap kembalikan data dengan tipe yang sama
    return {
      token: "",
      username: "",
      email: "",
      role: "guest",
      message: "Terjadi kesalahan saat login",
    };
  }
};
