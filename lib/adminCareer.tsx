import { getCookies } from "@/utils/tokenController";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { User } from "@/type/userType";

export interface Career {
  id: string;
  createdAt: string;
  dibaca_oleh: string[];
  email: string;
  favorite: boolean;
  message: string;
  phone: string;
  from: string;
  position: string;
  rate: number;
  name: string;
  title: string;
  description: string;
  list: string[];
}

export default function AdminCareer() {
  const [edit, setEdit] = useState("none");
  const [hapus, setHapus] = useState(false);
  const [detail, setDetail] = useState(false);
  const [request, setRequest] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);
  const [hapusNama, setHapusNama] = useState("none");
  const [isPosition, setIsPosition] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [readMessage, setReadMessage] = useState(false);

  const [token, setToken] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const savedToken = await getCookies(); // <- pakai await
  
        if (savedToken) {
          // Parse JSON kalau cookies disimpan sebagai string
          const parsed = typeof savedToken === "string" ? JSON.parse(savedToken) : savedToken;
          // Ambil token dan simpan ke state
          setToken(parsed);
          const res = await fetch("/api/cekAdminUser", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
              email: parsed.email,
              role: parsed.role,
              }),
          });
          if(!res.ok){
              router.push("/");
          }
        } else {
          setToken(undefined);
          router.push("/admin");
        }
      } catch (error) {
        // console.error("Gagal mengambil cookies:", error);
        setToken(undefined);
      }
    };
  
    fetchCookies();
  }, [router]);

  const [urutan, setUrutan] = useState("A - Z");
  const [urutanActive, setUrutanActive] = useState(false);
  const diKlik = () => {
    setUrutanActive(!urutanActive);
  };
  const klikDetail = () => {
    setDetail(!detail);
  };
  const az = () => {
    setUrutan("A - Z");
    setUrutanActive(false);
  };
  const za = () => {
    setUrutan("Z - A");
    setUrutanActive(false);
  };
  const newklik = () => {
    setUrutan("New");
    setUrutanActive(false);
  };
  const old = () => {
    setUrutan("Old");
    setUrutanActive(false);
  };

  const [pickNama, setPickNama] = useState("none");
  const [pickEmail, setPickEmail] = useState("none@gmail.com");
  const [pickId, setPickId] = useState("");
  const [pickTanggal, setPickTanggal] = useState("0-0-2025");
  const [pickPesan, setPickPesan] = useState("none");
  const [pickPhone, setPickPhone] = useState("none");
  const [pickGaji, setPickGaji] = useState(200.321);
  const [pickPosition, setPickPosition] = useState("Web Frontend");
  const [titleForm, setTitleForm] = useState("");
  const [descriptionForm, setDescriptionForm] = useState("");
  const [listForm, setListForm] = useState<string[]>([]);
  const [love, setLove] = useState(false);
  const [loveTesting, setLoveTesting] = useState(false);
  const [date, setDate] = useState("");

  const [pickTitle, setPickTitle] = useState("All");
  const [pickDescription, setPickDescription] = useState(
    "We are looking for a Django Developer to join our team. You will be responsible for building and maintaining web applications using Django framework."
  );
  const [picklistRequirement, setPickListRequirement] = useState<string[]>([]);

  const [requirments, setRequirments] = useState("");
  const [listRequirement, setListRequirement] = useState<string[]>([]);
  const handleAddRequirement = () => {
    if (requirments.trim() === "") return;

    setListRequirement((prev) => [...prev, requirments]);
    setRequirments("");
  };

  const [hapusRequirement, setHapusRequirement] = useState(false);
  const [RequirementsCareer, setRequirementsCareer] = useState<Career[]>([]);
  useEffect(() => {
    const fetchRequirementsCareer = async () => {
      try {
        // panggil backend API
        const res = await fetch(
          "/api/getRequirementsCareer"
        );
        const data = await res.json();
        setRequirementsCareer(data);
      } catch (err) {
        // console.error("Gagal fetch RequirementsCareer:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequirementsCareer();
  }, [hapusNama, hapusRequirement, request]);

  async function handleDeleteRequirement(title: string) {
    setIsLoading(true);
    try {
      const res = await fetch(
        "/api/removeRequirementCareer",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: title }),
        }
      );

      if (!res.ok) {
        throw new Error("Gagal menghapus Requirement Career");
      }

      await res.json();
      alert("Requirement Career berhasil dihapus");
      setHapusRequirement(false);
      setDetailRequest(false);
      setPickTitle("All");
    } catch (error) {
      // console.error("Error:", error);
      alert("Gagal menghapus Requirement. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  }

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  function truncateTextByChar(text: string, charLimit: number): string {
    if (text.length <= charLimit) return text;
    return text.slice(0, charLimit) + "...";
  }

  const [Careers, setCareers] = useState<Career[]>([]);
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        // panggil backend API
        const res = await fetch("/api/getCareerMessage");
        const data = await res.json();

        // Urutkan data berdasarkan pilihan sorting
        const sortedData = sortCareers(data, urutan);
        setCareers(sortedData);
      } catch (err) {
        // console.error("Gagal fetch Careers:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCareers();
  }, [urutan, detail, loveTesting]);

  const sortCareers = (data: Career[], order: string) => {
    const sortedData = [...data];

    switch (order) {
      case "A - Z":
        return sortedData.sort((a, b) => a.name.localeCompare(b.name));
      case "Z - A":
        return sortedData.sort((a, b) => b.name.localeCompare(a.name));
      case "New":
        return sortedData.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "Old":
        return sortedData.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      default:
        return sortedData;
    }
  };

  const searchLove = async () => {
    try {
      const res = await fetch("/api/searchCareerByLove", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        const sortedData = sortCareers(data.careers || [], urutan);
        setCareers(sortedData);
      } else {
        // console.error("Error:", data.error);
        setCareers([]);
      }
    } catch (error) {
      // console.error("Request error:", error);
      setCareers([]);
    }
  };

  const [formDataRequirement, setFormDataRequirement] = useState({
    description: "",
  });

  const handleChangeRequirement = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormDataRequirement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateRequirement = async () => {
    setIsLoading(true);
    // Query Firestore untuk cek username
    const checkUserQuery = query(
      collection(db, "Requirements_Career"),
      or(where("position", "==", pickTitle))
    );
    const checkSnap = await getDocs(checkUserQuery);

    if (checkSnap.empty) {
      try {
        const res = await fetch(
          "/api/createRequirementCareer",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: titleForm !== "" ? titleForm : pickPosition,
              description:
                descriptionForm !== ""
                  ? descriptionForm
                  : formDataRequirement.description,
              list: listForm.length > 0 ? listForm : listRequirement,
              update: isUpdate,
            }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          setIsUpdate(false);
          setRequest(false);
          setTitleForm("");
          setDescriptionForm("");
          setListForm([]);
          alert(data.message || "Create Requirement Career berhasil!");
          setFormDataRequirement({
            description: "",
          });
          setRequest(false);
        } else {
          alert(data.error || "Create Requirement Career gagal");
        }
      } catch (error) {
        // console.error("Error saat Create Requirement Career:", error);
        alert("Terjadi kesalahan saat Create Requirement Career");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Requirement Career sudah terdaftar");
    }
  };

  async function handleLove(id: string) {
    try {
      await fetch("/api/loveCareer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
    } catch (error) {
      // console.error("Error:", error);
    }
  }

  async function handleBuka(id: string, email: string) {
    try {
      const res = await fetch("/api/openCareer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, email: email }),
      });

      await res.json();
    } catch (error) {
      // console.error("Error:", error);
    }
  }

  const searchDate = async (selectedDate: string) => {
    setDate(selectedDate);

    try {
      const res = await fetch("/api/searchCareersByDate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: selectedDate }),
      });

      const data = await res.json();

      if (res.ok) {
        const sortedData = sortCareers(data.careers || [], urutan);
        setCareers(sortedData);
      } else {
        // console.error("Error:", data.error);
        setCareers([]);
      }
    } catch (error) {
      // console.error("Request error:", error);
      setCareers([]);
    }
  };

  async function handleBukaSemua(email: string) {
    try {
      const res = await fetch("/api/openAllCareer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      await res.json();
    } catch (error) {
      // console.error("Error:", error);
    }
  }

  async function handleDelete(id: string, email: string) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/removeCareerMessage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, email: email }),
      });

      if (!res.ok) {
        throw new Error("Gagal menghapus message");
      }

      await res.json();
      alert("Career message berhasil dihapus");
      setHapusNama("none");
    } catch (error) {
      // console.error("Error:", error);
      alert("Gagal menghapus message. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteAll() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/removeAllCareer", {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Gagal menghapus semua message");
      }

      await res.json();
      alert("Career message berhasil dihapus semua");
      setHapus(false);
    } catch (error) {
      // console.error("Error:", error);
      alert("Gagal menghapus semua message. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-45 flex flex-col bg-[#eff3ff]">
        {/* TITLE */}
        <div className="relative z-2 w-full flex flex-row justify-between p-2 px-4 bg-white border-b-[1px] border-[#f6d7ff]">
          <h1 className="font-semibold text-sm text-[#710093]">
            Career Requirment Inbox List
          </h1>
          <p className="font-light text-[12px] text-[#00930f]">
            today : <span className="font-bold">{formattedDate}</span>
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative z-4 w-full p-3 pl-5 border-t-[1px] border-[#f6d7ff] bg-white flex flex-row  justify-between gap-4">
          <div className="relative">
            <input
              type="text"
              className="border-1 hover:border-[1.5px] border-[#710093] bg-[#fcf1ff] p-2 pl-4 text-[12px] w-70 rounded-full text-[#930062]"
              placeholder="Search"
            />
            <button className="cursor-pointer w-8 h-8 pt-1 absolute top-0 right-1">
              <Image
                width={30}
                height={30}
                src="/search.svg"
                alt="Search"
                className="w-4 h-4 ml-2"
              />
            </button>
          </div>
          <div className="relative flex flex-row gap-2">
            <button
              onClick={() => {
                setLove(!love);
                if (love === false) {
                  searchLove();
                } else if (love === true) {
                  setLoveTesting(!loveTesting);
                }
              }}
              className="hover:bg-purple-50 p-2 hover:border hover:border-[#e079ff] rounded-full"
            >
              <Image
                width={140}
                height={140}
                src={love ? `/love-fill.svg` : "/love.svg"}
                alt="MySQL"
                className="w-4"
              />
            </button>
            <input
              type="date"
              value={date}
              onChange={(e) => searchDate(e.target.value)}
              className="hover:bg-[#f9e6ff] text-[12px] font-semibold text-[#710093] px-4 rounded-full border-1 border-[#d37eec] flex justify-start"
            />
            <button
              onClick={diKlik}
              className="cursor-pointer bg-white text-[#710093] font-semibold flex flex-row text-[12px] px-4 py-2 rounded-full hover:bg-[#f9e6ff] transition duration-200"
            >
              {urutan}
              <Image
                width={30}
                height={30}
                src="/arrow-solid.svg"
                alt="Search"
                className={`w-2 h-2 mt-1.5 ${
                  urutanActive ? "rotate-0" : "rotate-180"
                } ml-2`}
              />
            </button>
            {urutanActive && (
              <div className="absolute z-7 w-30 h-50 border-[1.5px] rounded-lg border-[#cb48f3] top-11 right-52 backdrop-blur-md flex flex-col justify-center items-center gap-2 px-4">
                <button
                  onClick={az}
                  className="text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full"
                >
                  A - Z
                </button>
                <button
                  onClick={za}
                  className="text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full"
                >
                  Z - A
                </button>
                <button
                  onClick={newklik}
                  className="text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full"
                >
                  New
                </button>
                <button
                  onClick={old}
                  className="text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full"
                >
                  Old
                </button>
              </div>
            )}
            <button
              onClick={() => setReadMessage(true)}
              className="text-[12px] font-bold p-2 px-5 border-1 border-[#7e8bec] text-[#001893] flex flex-row gap-2 rounded-lg bg-[#e6edff] hover:bg-[#7e8bec] hover:text-white active:bg-[#001893] cursor-pointer"
            >
              <Image
                width={30}
                height={30}
                src="/email-dibuka-blue.svg"
                alt="Dashboard"
                className="w-3 h-3 mt-[.5px]"
              />
              Read All
            </button>
            <button
              onClick={() => {
                setHapus(true);
              }}
              className="cursor-pointer text-[12px] font-bold p-2 px-5 border-1 border-[#ec7eaf] text-[#93006e] rounded-lg bg-[#f9e6ff] hover:bg-[#ff1376] hover:border-[#ff1376] hover:text-white active:bg-[#93006e]"
            >
              Delete All
            </button>
          </div>
        </div>

        {/* CAREER CONTROL */}
        <div className="relative z-3 top-0 w-full pr-5 flex flex-row gap-2 justify-between items-center p-3 backdrop-blur-lg border-b-1 border-[#cb48f3]">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-[12px] font-semibold text-[#710093]">
              Required :
            </p>
            {RequirementsCareer.map((career, index) => (
              <button
                key={index}
                onClick={() => {
                  setPickTitle(career.title);
                  setPickDescription(career.description);
                  setPickListRequirement(career.list);
                }}
              >
                <Image
                  width={30}
                  height={30}
                  src={
                    career.title === "Web Frontend"
                      ? "/code.svg"
                      : career.title === "Web Backend"
                      ? "/server.svg"
                      : career.title === "Django Developer"
                      ? "/django.svg"
                      : career.title === "Android Developer"
                      ? "/android.svg"
                      : career.title === "IOS Developer"
                      ? "/apple.svg"
                      : career.title === "Administrator"
                      ? "/admin.svg"
                      : "/code.svg"
                  }
                  alt="Dashboard"
                  className="w-8 border-1 bg-white hover:bg-transparent border-[#710093] rounded-full h-8 p-2"
                />
              </button>
            ))}
            <button
              onClick={() => {
                setPickTitle("All");
              }}
              className="w-8 border-1 bg-white hover:bg-transparent border-[#710093] rounded-full h-8 p-2 text-[12px] flex justify-center items-center text-[#710093] font-bold"
            >
              all
            </button>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <button
              onClick={() => {
                setRequest(true);
              }}
              className="cursor-pointer text-[12px] font-bold p-2 px-5 text-white rounded-lg bg-[#ce2dff] hover:bg-[#e078ff] active:bg-[#390056]"
            >
              + Edit Job
            </button>
          </div>
        </div>

        {/* LIST USERS */}
        <div className="flex flex-row flex-wrap max-h-full overflow-auto gap-x-5 gap-y-1 p-5 pt-5">
          <div className="flex flex-row items-start gap-2 pl-1 w-full mb-3">
            <p className="font-bold text-xl text-[#710093]">{pickTitle}</p>
            {pickTitle !== "All" ? (
              <button
                onClick={() => {
                  setDetailRequest(!detailRequest);
                }}
                className="text-[12px] font-bold p-1 px-5 border-1 border-[#d37eec] text-[#710093] rounded-lg bg-[#f9e6ff] hover:bg-[#d37eec] hover:text-white active:bg-[#710093] cursor-pointer"
              >
                Manage Requirements
              </button>
            ) : null}
          </div>
          {Careers.map((user, index) => (
            <div
              key={index}
              className={`w-full flex flex-row justify-start items-center p-3 px-4 pr-10 bg-white rounded-lg border-1 border-[#cb48f3] hover:bg-purple-50 shadow-md gap-2 relative`}
            >
              <Image
                width={30}
                height={30}
                src={
                  user.position === "Web Frontend"
                    ? "/code.svg"
                    : user.position === "Web Backend"
                    ? "/server.svg"
                    : user.position === "Django Developer"
                    ? "/django.svg"
                    : user.position === "Android Developer"
                    ? "/android.svg"
                    : user.position === "IOS Developer"
                    ? "/apple.svg"
                    : user.position === "Administrator"
                    ? "/admin.svg"
                    : "/code.svg"
                }
                alt="Dashboard"
                className="w-8 border-1 border-purple-300 rounded-full h-8 p-2 absolute"
              />
              <button
                key={index}
                onClick={() => {
                  klikDetail();
                  setPickNama(user.name);
                  setPickEmail(user.email);
                  setPickTanggal(user.createdAt);
                  setPickPesan(user.message);
                  setPickPhone(user.phone);
                  setPickGaji(user.rate);
                  handleBuka(user.id, token?.username || "saya");
                }}
                className="w-full flex items-start justify-start pl-10"
              >
                <div className="flex flex-col items-start">
                  <p
                    className={`text-[13px] font-bold text-[#710093] ${
                      (user.dibaca_oleh || []).some(
                        (pembaca) => pembaca === (token?.username || "saya")
                      )
                        ? "opacity-30"
                        : "opacity-100"
                    }`}
                  >
                    {truncateTextByChar(user.name, 60)}{" "}
                    <span className="font-light text-[10px] text-[#00930f] ml-2">
                      {user.createdAt}
                    </span>
                  </p>
                  <p className="text-[12px] font-light">
                    from
                    <span className="text-[#004793]">
                      {" "}
                      {truncateTextByChar(user.from, 10)} -
                    </span>
                    <span className="text-[#004793]"> {user.email} -</span>
                    <span> {truncateTextByChar(user.message, 70)}</span>
                  </p>
                </div>
              </button>
              <button
                onClick={() => {
                  setHapusNama(user.name);
                  setPickId(user.id);
                  setPickEmail(user.email);
                }}
                className="h-8 w-8 absolute right-3 top-4 flex justify-center items-center rounded-full bg-[#ffa0c0] text-[#cf008a] border-[1px] border-[#930062] hover:bg-[#cf008a] cursor-pointer"
              >
                <Image
                  width={30}
                  height={30}
                  src="/trash.svg"
                  alt="Dashboard"
                  className="w-3 h-3"
                />
              </button>
              {(user.dibaca_oleh || []).some(
                (pembaca) => pembaca === (token?.username || "saya")
              ) ? (
                <Image
                  width={30}
                  height={30}
                  src="/email-dibuka.svg"
                  alt="Dashboard"
                  className="w-4 h-4 absolute right-15 top-6"
                />
              ) : (
                <Image
                  width={30}
                  height={30}
                  src="/email-blue.svg"
                  alt="Dashboard"
                  className="w-4 h-4 absolute right-15 top-6"
                />
              )}
              {user.dibaca_oleh.length > 0 &&
                user.dibaca_oleh.map((admin, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (edit === "none" || edit !== user.name) {
                        setEdit(user.name);
                      } else {
                        setEdit("none");
                      }
                    }}
                  >
                    <Image
                      width={30}
                      height={30}
                      src="/eye.svg"
                      alt="Dashboard"
                      className="w-4 h-4 absolute right-24 top-6 cursor-pointer"
                    />
                  </button>
                ))}
              {user.dibaca_oleh.length > 0 && edit === user.name ? (
                <div className="absolute z-1 w-30 border-[1.5px] rounded-lg border-[#cb48f3] top-4 right-30 backdrop-blur-md flex flex-col justify-center items-center gap-2 py-4">
                  {user.dibaca_oleh.map((admin, idx) => (
                    <p
                      key={idx}
                      className="text-[12px] font-semibold text-[#710093]"
                    >
                      {truncateTextByChar(admin, 10)}
                    </p>
                  ))}
                </div>
              ) : null}
              <p className="text-[12px] font-bold text-[#009351] absolute w-20 border border-[#009351] bg-[#effff4] flex flex-row gap-2 p-2 right-32 top-4 rounded-md">
                <Image
                  width={140}
                  height={140}
                  src="/dollar-green.svg"
                  alt="MySQL"
                  className="w-2"
                />
                {Number(user.rate).toFixed(2)}
              </p>
              <p className="absolute top-1 right-37 text-[12px] text-[#710093] p-0 px-2 rounded-md bg-purple-100">
                Rate
              </p>
              <button
                onClick={() => (
                  setLoveTesting(!loveTesting), handleLove(user.id)
                )}
                className="absolute top-4 right-55 p-2 hover:border hover:border-[#e079ff] rounded-full"
              >
                <Image
                  width={140}
                  height={140}
                  src={user.favorite === true ? `/love-fill.svg` : "/love.svg"}
                  alt="MySQL"
                  className="w-4"
                />
              </button>
            </div>
          ))}
        </div>

        {/* EDIT USER */}
        {hapus ||
        hapusNama !== "none" ||
        detail ||
        detailRequest ||
        request ||
        readMessage ? (
          <div className="fixed z-4 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center"></div>
        ) : null}
        {hapus ||
        hapusNama !== "none" ||
        detail ||
        detailRequest ||
        request ||
        readMessage ? (
          <div className="fixed z-5 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center"></div>
        ) : null}
        {hapus && (
        <div className="fixed z-6 top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
          <div className="relative z-6 -top-20 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center">
            <Image
              width={140}
              height={140}
              src="/warning-red.svg"
              alt=""
              className="w-10"
            />
            <p className="text-[12px] text-[#930062] w-30 text-center">
              Yakin <span className="font-bold">dihapus</span> semua ?
            </p>
            <button
              onClick={()=>handleDeleteAll()}
              className="p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold"
            >
              {isLoading ? "delete..." : "Yes"}
            </button>
            <button
              onClick={() => setHapus(false)}
              className={`absolute z-6 -top-4 -right-4 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}
            >
              <Image
                width={140}
                height={140}
                src="/close.svg"
                alt=""
                className="w-3"
              />
            </button>
          </div>
        </div>
        )}
        {hapusNama !== "none" && (
        <div className="fixed z-6 top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
          <div className="relative z-6 -top-20 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center">
            <Image
              width={140}
              height={140}
              src="/warning-red.svg"
              alt=""
              className="w-10"
            />
            <p className="text-[12px] text-[#930062] w-30 text-center">
              Yakin <span className="font-bold">Message {hapusNama} ini</span>{" "}
              dihapus ?
            </p>
            <button
              onClick={() => handleDelete(pickId, pickEmail)}
              className="p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold"
            >
              {isLoading ? "delete..." : "Yes"}
            </button>
            <button
              onClick={() => setHapusNama("none")}
              className={`absolute z-6 -top-4 -right-4 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]`}
            >
              <Image
                width={140}
                height={140}
                src="/close.svg"
                alt=""
                className="w-3"
              />
            </button>
          </div>
        </div>
        )}
        {hapusRequirement && (
          <>
            <div className="fixed z-7 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center"></div>
            <div className="fixed z-8 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center"></div>
            <div className="fixed z-6 top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
              <div className="relative z-9 -top-20 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center">
                <Image
                  width={140}
                  height={140}
                  src="/warning-red.svg"
                  alt=""
                  className="w-10"
                />
                <p className="text-[12px] text-[#930062] w-30 text-center">
                  Yakin <span className="font-bold">{pickTitle}</span> dihapus ?
                </p>
                <button
                  onClick={() => {
                    handleDeleteRequirement(pickTitle);
                  }}
                  className="p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold"
                >
                  {isLoading ? "delete..." : "Yes"}
                </button>
                <button
                  onClick={() => setHapusRequirement(false)}
                  className={`absolute z-6 -top-4 -right-4 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]`}
                >
                  <Image
                    width={140}
                    height={140}
                    src="/close.svg"
                    alt=""
                    className="w-3"
                  />
                </button>
              </div>
            </div>
          </>
        )}
        {readMessage && (
        <div className="fixed z-6 top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
          <div className="relative z-6 -top-20 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center">
            <Image
              width={140}
              height={140}
              src="/warning-red.svg"
              alt=""
              className="w-10"
            />
            <p className="text-[12px] text-[#005dcf] w-30 text-center">
              Yakin <span className="font-bold">Semua Message</span> dibaca ?
            </p>
            <button
              onClick={() => (handleBukaSemua(token?.username || "saya"), setReadMessage(false))}
              className="p-2 w-full rounded-md bg-[#9fc7ff] hover:bg-[#0055ff] active:bg-[#001d93] text-[12px] text-[#005dcf] hover:text-white font-bold"
            >
              {isLoading ? "Read all..." : "Yes"}
            </button>
            <button
              onClick={() => setReadMessage(false)}
              className={`absolute z-6 -top-4 -right-4 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]`}
            >
              <Image
                width={140}
                height={140}
                src="/close.svg"
                alt=""
                className="w-3"
              />
            </button>
          </div>
        </div>
        )}
        {detail && (
        <div className="fixed z-6 top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
          <div className="relative w-150 z-6 -top-20 p-7 border-1 rounded-lg border-[#930062] bg-white flex flex-col justify-center items-start">
            <div className="flex flex-row gap-2 mb-7 items-center">
              <div className="w-13 h-13 bg-blue-100 flex justify-center items-center rounded-full font-bold text-[25px] text-blue-700">
                {pickNama.charAt(0)}
              </div>
              <div className="flex flex-col">
                <p className="text-[20px] text-[#710093] gap-2 font-bold flex flex-row items-center">
                  {pickNama}{" "}
                  <h1 className="text-[12px] mt-1 font-semibold text-[#710093]">
                    {pickTanggal}
                  </h1>
                </p>
                <p className="text-[12px] text-[#710093]">{pickEmail}</p>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="p-2 pl-3 gap-2 border-2 border-[#c77fd6] text-[12px] text-[#710093] font-bold flex flex-row items-center w-101 bg-[#ffffff] rounded-md">
                <Image
                  width={30}
                  height={30}
                  src={
                    pickPosition === "Web Frontend"
                      ? "/code.svg"
                      : pickPosition === "Web Backend"
                      ? "/server.svg"
                      : pickPosition === "Django Developer"
                      ? "/django.svg"
                      : pickPosition === "Android Developer"
                      ? "/android.svg"
                      : pickPosition === "IOS Developer"
                      ? "/apple.svg"
                      : pickPosition === "Administrator"
                      ? "/admin.svg"
                      : "/code.svg"
                  }
                  alt="Dashboard"
                  className="w-8 border-1 border-purple-300 rounded-full h-8 p-2"
                />
                {pickPosition}
              </div>
              <div className="p-3 gap-2 border-2 border-[#7fd6af] text-[#007541] font-bold flex flex-row bg-[#effff4] rounded-md">
                <Image
                  width={140}
                  height={140}
                  src="/dollar-green.svg"
                  alt="MySQL"
                  className="w-2"
                />
                {Number(pickGaji).toFixed(2)}
              </div>
            </div>

            <p className="max-h-50 pr-5 mt-3 overflow-auto text-[12px] text-justify">
              <span className="text-[#710093] font-bold">Number Phone : </span>
              {pickPhone}
            </p>
            <p className="max-h-50 pr-5 mt-3 overflow-auto text-[12px] text-justify">
              <span className="text-[#710093] font-bold">Pesan : </span>
              {pickPesan}
            </p>

            <button
              onClick={() => klikDetail()}
              className={`absolute z-6 -top-4 -right-4 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]`}
            >
              <Image
                width={140}
                height={140}
                src="/close.svg"
                alt=""
                className="w-3"
              />
            </button>
          </div>
        </div>
        )}
        {detailRequest && (
        <div className="fixed z-6 top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
            <div className="relative z-6 -top-20 w-200 bg-white p-7 rounded-lg border-1 border-[#930062] flex flex-col gap-3">
              <h1 className="font-bold text-xl text-[#710093]">{pickTitle}</h1>
              <p className="text-[12px]">{pickDescription}</p>
              <ul className="pl-7">
                {picklistRequirement.map((item, index) => (
                  <li key={index} className="text-[12px] list-disc pl-5">
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setDetailRequest(!detailRequest);
                }}
                className={`absolute z-6 -top-4 -right-4 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]`}
                >
                <Image
                  width={140}
                  height={140}
                  src="/close.svg"
                  alt=""
                  className="w-3"
                />
              </button>
              <button
                onClick={() => {
                  setDetailRequest(!detailRequest);
                  setTitleForm(pickTitle);
                  setDescriptionForm(pickDescription);
                  setListForm(picklistRequirement);
                  setRequest(true);
                  setIsUpdate(true);
                }}
                className={`absolute z-6 top-5 -right-4 w-8 h-8 rounded-full bg-[#ffc56f] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#ffc56f] hover:to-[#ff7a32] border-1 border-[#c34a09]`}
                >
                <Image
                  width={140}
                  height={140}
                  src="/edit-yellow.svg"
                  alt=""
                  className="w-3"
                  />
              </button>
              <button
                onClick={() => setHapusRequirement(true)}
                className="h-8 w-8 absolute -right-4 top-14 flex justify-center items-center rounded-full bg-[#ff4586] text-[#cf008a] border-[1px] border-[#930062] hover:bg-gradient-to-b hover:from-[#ff4586] hover:to-[#d4005c] cursor-pointer"
                >
                <Image
                  width={30}
                  height={30}
                  src="/trash.svg"
                  alt="Dashboard"
                  className="w-3 h-3"
                  />
              </button>
            </div>
          </div>
        )}
        {request && (
        <div className="fixed z-6 top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
          <div className="relative z-6 -top-20 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center">
            <p className="w-full text-left text-lg font-bold text-[#710093]">
              Add Requirement
            </p>
            <button
              onClick={() => setIsPosition(!isPosition)}
              className="w-full p-2 px-4 rounded-lg bg-purple-200 border border-purple-500 text-[12px] font-semibold text-[#9400cf]"
            >
              {titleForm ? titleForm : pickPosition}
              <Image
                width={30}
                height={30}
                src="/arrow-solid.svg"
                alt="Search"
                className={`w-2 h-2 ${
                  isPosition ? "rotate-270" : "rotate-180"
                } absolute top-18`}
              />
            </button>
            {isPosition && (
              <>
                <div className="absolute z-2 border-[1.5px] rounded-lg border-[#710093] top-10 -left-47  backdrop-blur-md flex flex-col justify-center items-center gap-2 p-4">
                  <button
                    onClick={() => (
                      setPickPosition("Web Frontend"),
                      setIsPosition(!isPosition)
                    )}
                    className="text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 px-4 rounded-full"
                  >
                    Web Frontend
                  </button>
                  <button
                    onClick={() => (
                      setPickPosition("Web Backend"), setIsPosition(!isPosition)
                    )}
                    className="text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 px-4 rounded-full"
                  >
                    Web Backend
                  </button>
                  <button
                    onClick={() => (
                      setPickPosition("Android Developer"),
                      setIsPosition(!isPosition)
                    )}
                    className="text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 px-4 rounded-full"
                  >
                    Android Developer
                  </button>
                  <button
                    onClick={() => (
                      setPickPosition("IOS Developer"),
                      setIsPosition(!isPosition)
                    )}
                    className="text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 px-4 rounded-full"
                  >
                    IOS Developer
                  </button>
                  <button
                    onClick={() => (
                      setPickPosition("Administrator"),
                      setIsPosition(!isPosition)
                    )}
                    className="text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 px-4 rounded-full"
                  >
                    Administrator
                  </button>
                  <button
                    onClick={() => (
                      setPickPosition("Django Developer"),
                      setIsPosition(!isPosition)
                    )}
                    className="text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 px-4 rounded-full"
                  >
                    Django Developer
                  </button>
                </div>
                <div className="absolute bg-white w-45 h-71 opacity-60 z-1 border-[1.5px] rounded-lg border-[#cb48f3] top-10 -left-47  backdrop-blur-md flex flex-col justify-center items-center gap-2 p-4"></div>
              </>
            )}
            <textarea
              onChange={handleChangeRequirement}
              value={
                descriptionForm
                  ? descriptionForm
                  : formDataRequirement.description
              }
              name="description"
              id=""
              placeholder="Description"
              className="p-2 px-4 text-[12px] border rounded-lg h-max-30 w-full bg-purple-50 border-purple-500"
            ></textarea>
            <div className="flex flex-row w-full gap-2">
              <input
                type="text"
                value={requirments}
                onChange={(e) => setRequirments(e.target.value)}
                placeholder={`Requirement ${
                  (listForm.length > 0 ? listForm : listRequirement).length + 1
                }`}
                className="p-2 px-4 text-[12px] border rounded-lg w-92 bg-purple-50 border-purple-500"
              />
              <button
                disabled={listRequirement.length === 5 || listForm.length > 0}
                onClick={handleAddRequirement}
                className="p-2 w-10 rounded-md bg-purple-700 hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-white hover:text-white font-bold"
              >
                +
              </button>
            </div>
            <div className="w-full h-max-50 overflow-auto flex flex-col gap-2">
              {(listForm.length > 0 ? listForm : listRequirement).map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between items-center w-full p-2 px-4 bg-purple-100 rounded-lg"
                  >
                    <p className="text-[12px] text-[#710093] w-70 text-justify">
                      {item}
                    </p>
                    <button
                      onClick={() => {
                        if (listForm.length > 0) {
                          // Jika listForm yang aktif
                          const newList = listForm.filter(
                            (_, i) => i !== index
                          );
                          setListForm(newList);
                        } else {
                          // Jika listRequirement yang aktif
                          const newList = listRequirement.filter(
                            (_, i) => i !== index
                          );
                          setListRequirement(newList);
                        }
                      }}
                      className="text-red-700 text-[12px]"
                    >
                      Remove
                    </button>
                  </div>
                )
              )}
            </div>
            <button
              onClick={handleCreateRequirement}
              className="p-2 w-full rounded-md bg-purple-700 hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-white hover:text-white font-bold"
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
            <button
              onClick={async () => {
                setIsUpdate(false);
                setRequest(false); 
                setTitleForm("");
                setDescriptionForm("");
                setListForm([]);
              }}
              className={`absolute z-6 -top-4 -right-4 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}
            >
              <Image
                width={140}
                height={140}
                src="/close.svg"
                alt=""
                className="w-3"
              />
            </button>
          </div>
        </div>
        )}
      </div>
    </>
  );
}
