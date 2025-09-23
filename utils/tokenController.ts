"use server"
import { cookies } from "next/headers";

export async function setCookies(
  token: string,
  username: string,
  email: string,
  role: string
): Promise<void> {
  try {
    const cookieAll = JSON.stringify({
      token,
      username,
      email,
      role,
    });

    const cookieStore = await cookies();

    cookieStore.set("token", cookieAll, {
      maxAge: 60 * 60 * 24, // 1 hari
      secure: true,
      httpOnly: true,
      path: "/", // pastikan cookie bisa diakses di seluruh path
    });
  } catch {
    // console.error("Gagal menyimpan cookies:", error);
    throw new Error("Terjadi kesalahan saat menyimpan cookies");
  }
}

export async function getCookies() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token")?.value;

    return tokenCookie ? JSON.parse(tokenCookie) : null;
  } catch {
    // console.error("Gagal mengambil cookies:", error);
    return null;
  }
}

export async function deleteCookies() {
    (await cookies()).delete('token')
  }
