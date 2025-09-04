import PopUpLogin from "@/components/popUpLogin";
import { getCookies } from "@/utils/tokenController";
import { SelectChangeEvent } from "@mui/material/Select";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function JoinUsPage() {
  const [age, setAge] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showAuthYet, setShowAuthYet] = useState(false);
  const [pickTitle, setPickTitle] = useState("Django Developer");
  const [showPopup, setShowPopup] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginSuccess = async () => {
      // Cek jika ada token dan popup masih terbuka
      const token = await getCookies();
      if (token && showAuth) {
        setShowAuth(false);
        setShowAuthYet(false);
      }
    };

    // Untuk menangkap alert yang mungkin muncul
    const originalAlert = window.alert;
    window.alert = function (message) {
      if (
        message.includes("Login successful") ||
        message.includes("berhasil")
      ) {
        setTimeout(checkLoginSuccess, 100); // Beri sedikit delay
      }
      return originalAlert.apply(this, []);
    };

    return () => {
      window.alert = originalAlert;
    };
  }, [showAuth]);

  const [formDataJoinUsMessage, setFormData] = useState({
    name: "",
    email: "",
    from: "",
    phone: "",
    position: pickTitle,
    rate: 0,
    message: "",
  });

  const handleChangeJoinUsMessage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPickTitle(value); // juga update pickTitle
  };

  const handleJoinUsMessage = async () => {
    if (
      !formDataJoinUsMessage.name ||
      !formDataJoinUsMessage.email ||
      !formDataJoinUsMessage.from ||
      !formDataJoinUsMessage.phone ||
      !formDataJoinUsMessage.rate ||
      !formDataJoinUsMessage.position
    ) {
      alert("Harap isi semua field");
      return;
    }

    // cek token dulu sebelum kirim request
    const token = await getCookies();
    if (!token) {
      //   alert("Anda harus login terlebih dahulu untuk mengirim pesan");
      setShowAuthYet(true);
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name: formDataJoinUsMessage.name,
        email: formDataJoinUsMessage.email,
        from: formDataJoinUsMessage.from,
        phone: formDataJoinUsMessage.phone,
        rate: formDataJoinUsMessage.rate,
        position: formDataJoinUsMessage.position,
        message: formDataJoinUsMessage.message,
      };
      console.log("data yang dikirim : ", payload);

      const res = await fetch("http://localhost:3001/api/createJoinUsMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal mengirim pesan");
      }

      const data = await res.json();
      alert(data.message || "Pesan berhasil dikirim!");
      setShowPopup(false);

      // Reset form setelah berhasil
      setFormData({
        name: "",
        email: "",
        from: "",
        phone: "",
        position: "Django Developer",
        rate: 0,
        message: "",
      });
      setPickTitle("Django Developer");
    } catch (error: unknown) {
      console.error("Error saat mengirim kontak:", error);

      if (error instanceof Error) {
        alert(error.message || "Terjadi kesalahan saat mengirim pesan");
      } else {
        alert("Terjadi kesalahan yang tidak diketahui");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className=" lg:w-full lg:flex lg:flex-row lg:justify-center lg:items-center lg:relative lg:gap-20 lg:h-100 lg:mt-40 lg:mb-30 w-full flex flex-col justify-center items-center relative gap-20 h-300 mt-20 mb-30">
        <div className="relative top-0">
          <div className=" lg:p-8 lg:pt-8 lg:flex lg:flex-col lg:justify-center lg:items-start lg:gap-y-4 lg:bg-white lg:rounded-[20px] lg:border-[1px] lg:mt-0 lg:-ml-20 lg:border-[#307CFF] lg:w-193 p-5 pt-10 w-70 flex flex-col mt-0 justify-center items-start gap-y-4 bg-white rounded-[20px] border-[1px] ml-0  border-[#307CFF]">
            <p className="lg:text-4xl lg:font-bold lg:italic lg:text-[#2C507A] lg:px-10 lg:pt-2 lg:pb-3 lg:border-5 lg:ml-20 lg:rounded-full lg:border-[#498cff] lg:backdrop-blur lg:absolute lg:-left-40 lg:-top-13 lg:-rotate-4 text-2xl font-bold italic text-[#181F38] px-5 pt-1 pb-2 border-3 rounded-full border-[#498cff] backdrop-blur absolute left-5 z-3 -top-7 -rotate-4">
              Join Us
            </p>
            <div className=" lg:flex lg:flex-row lg:space-x-2 lg:gap-3 flex flex-col space-x-2 gap-3">
              <input
                name="name"
                value={formDataJoinUsMessage.name}
                onChange={handleChangeJoinUsMessage}
                type="text"
                placeholder="Your Name"
                className=" lg:bg-[#d9ebfc] lg:text-sm lg:text-[#00296c] lg:px-6 lg:py-3 lg:rounded-[40px] lg:w-[700px] bg-[#d9ebfc] text-sm text-[#00296c] px-6 py-3 border border-[#8eb0e5] rounded-lg w-[240px]"
              />
              {/* <input
                name="rate"
                value={formDataJoinUsMessage.rate}
                onChange={handleChangeJoinUsMessage}
                type="number"
                placeholder="How much rate do you want?"
                className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none lg:bg-[#d9ebfc] lg:text-sm lg:text-[#00296c] lg:px-6 lg:py-3 lg:pl-12 lg:rounded-[40px] lg:w-[260px] bg-[#d9ebfc] text-sm text-[#00296c] px-6 py-3 pl-11  rounded-lg w-[240px] border border-[#8eb0e5]"
              /> */}
              {/* <Image
                width={140}
                height={140}
                src="/dollar.svg"
                alt="MySQL"
                className=" lg:w-2 lg:absolute lg:top-12 lg:right-67 w-2 absolute top-28 right-58"
              /> */}
            </div>
            <div className=" lg:flex lg:flex-row lg:space-x-2 lg:gap-4 flex flex-col space-x-2 gap-4">
              <div className=" lg:flex lg:flex-col lg:space-y-2 lg:gap-2 flex flex-col space-y-2 gap-2">
                <div className=" lg:flex lg:flex-row lg:space-x-2 flex flex-col space-x-2">
                  <div className="lg:w-[200px] w-60 mr-4 lg:h-[50px] border-1 border-[#00296c] h-[50px] rounded-lg bg-[#d9ebfc] pr-8">
                    <select
                      name="position"
                      value={formDataJoinUsMessage.position}
                      onChange={handleSelectChange}
                      className="font-semibold focus:outline-none focus:ring-0 lg:text-sm lg:text-[#00296c] lg:bg-[#d9ebfc] lg:px-6 pr-7 lg:py-3 lg:rounded-[10px] lg:w-[180px] lg:h-[48px] text-[12px] text-[#00296c] bg-[#d9ebfc] px-6 py-2 rounded-[10px] w-55 h-[48px]"
                      id=""
                    >
                      <option value="Web Frontend">Web-Frontend</option>
                      <option value="Web Backend">Web-Backend</option>
                      <option value="Android Developer">
                        Android Developer
                      </option>
                      <option value="IOS Developer">IOS Developer</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Django Developer">Django Developer</option>
                    </select>
                  </div>
                  <input
                    name="from"
                    value={formDataJoinUsMessage.from}
                    onChange={handleChangeJoinUsMessage}
                    type="text"
                    placeholder="Where are you come from?"
                    className=" lg:text-sm lg:text-[#00296c] lg:bg-[#d9ebfc] lg:px-6 lg:py-3 lg:rounded-[10px] lg:w-[205px] lg:h-[50px] lg:mt-0 text-sm text-[#00296c] bg-[#d9ebfc] px-6 py-3 rounded-[10px] w-[240px] h-[50px] mt-3 border border-[#8eb0e5]"
                  />
                </div>
                <div className=" lg:flex lg:flex-row lg:space-x-2 flex flex-col space-x-2">
                  <input
                    name="email"
                    value={formDataJoinUsMessage.email}
                    onChange={handleChangeJoinUsMessage}
                    type="email"
                    placeholder="Your email"
                    className=" lg:text-sm lg:text-[#00296c] lg:bg-[#d9ebfc] lg:px-6 lg:py-3 lg: lg:rounded-[50px] lg:w-[205px] lg:h-[50px] text-sm text-[#00296c] bg-[#d9ebfc] px-6 py-3  rounded-lg w-[240px] h-[50px] border border-[#8eb0e5]"
                  />
                  <input
                    name="phone"
                    value={formDataJoinUsMessage.phone}
                    onChange={handleChangeJoinUsMessage}
                    type="number"
                    placeholder="Your phone number"
                    className=" lg:text-sm lg:text-[#00296c] lg:bg-[#d9ebfc] lg:px-6 lg:py-3 lg:mt-0 lg:rounded-[50px] lg:w-[205px] lg:h-[50px] text-sm text-[#00296c] bg-[#d9ebfc] px-6 py-3 rounded-lg w-[240px] h-[50px] mt-3 border border-[#8eb0e5]"
                  />
                </div>
              </div>
              <textarea
                name="message"
                value={formDataJoinUsMessage.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                placeholder="Some more words, maybe?"
                className=" lg:bg-[#d9ebfc] lg:text-sm lg:text-[#00296c] lg:px-6 lg:py-3 lg: lg:rounded-[10px] lg:w-[260px] lg:h-[119px] bg-[#d9ebfc] text-sm text-[#00296c] px-6 py-3  rounded-[10px] w-[240px] h-[119px] border focus:border-[#498cff]"
              />
            </div>
            <button
              onClick={() => handleJoinUsMessage()}
              className="cursor-pointer lg:mt-3 lg:w-[705px] lg:py-3 lg:bg-[#181F38] lg:text-sm lg:font-bold lg:text-white lg:rounded-full mt-3 w-[240px] py-3 bg-[#181F38] text-sm font-bold text-white rounded-full"
            >
              {isLoading ? "Try Send..." : "Send"}
            </button>
          </div>
          <div className=" lg:w-[930px] lg:h-90 lg:bg-gradient-to-b lg:from-[#aae8ff] lg:to-[#498cff] lg:rounded-[20px] lg:absolute lg:-z-1 lg:rotate-3 lg:top-0 lg:-left-45 w-[1400px] h-270 bg-gradient-to-b from-[#aae8ff] to-[#498cff] rounded-[20px] absolute -z-1 rotate-3 top-10 -left-45" />
        </div>

        <div className=" lg:ml-20 lg:flex lg:flex-col lg:items-center lg:justify-center ml-5 flex flex-col items-center justify-center">
          <div className="relative lg:ml-0 -ml-5">
            <h3 className=" lg:text-2xl lg:text-left lg:font-extrabold lg:text-blue-800 lg:mb-7 lg:font-poppins lg:rotate-3 text-2xl text-left font-extrabold text-[#00296c] mb-7 font-poppins">
              OUR SKILLS
            </h3>
            <Image
              width={140}
              height={140}
              src="/assets/image/2line-yellow.png"
              alt="MySQL"
              className=" lg:absolute lg:w-10 lg:h-10 lg:scale-x-[-1] lg:-left-10 lg:-top-5 absolute w-10 h-10 scale-x-[-1] -left-12 -top-5"
            />
          </div>

          <div className=" lg:flex lg:flex-row lg:flex-wrap lg:gap-5 lg:w-50 lg:place-items-center flex flex-row flex-wrap gap-5 w-50 place-items-center">
            <Image
              width={140}
              height={140}
              src="/golang.svg"
              alt="Golang"
              className=" lg:bg-white lg:w-20 lg:h-20 lg:p-3 lg:rounded-lg lg:border-1 lg:border-b-2 lg:border-[#498cff] bg-white w-20 h-20 p-3 rounded-lg border-1 border-b-2 border-[#498cff]"
            />
            <Image
              width={140}
              height={140}
              src="/postgre.svg"
              alt="PostgreSQL"
              className="lg:bg-white lg:w-20 lg:h-20 lg:p-3 lg:rounded-lg lg:border-1 lg:border-b-2 lg:border-[#498cff] bg-white w-20 h-20 p-3 rounded-lg border-1 border-b-2 border-[#498cff]"
            />
            <Image
              width={140}
              height={140}
              src="/python.svg"
              alt="Python"
              className="lg:bg-white lg:w-20 lg:h-20 lg:p-3 lg:rounded-lg lg:border-1 lg:border-b-2 lg:border-[#498cff] bg-white w-20 h-20 p-3 rounded-lg border-1 border-b-2 border-[#498cff]"
            />
            <Image
              width={140}
              height={140}
              src="/java.svg"
              alt="Java"
              className="lg:bg-white lg:w-20 lg:h-20 lg:p-3 lg:rounded-lg lg:border-1 lg:border-b-2 lg:border-[#498cff] bg-white w-20 h-20 p-3 rounded-lg border-1 border-b-2 border-[#498cff]"
            />
            <Image
              width={140}
              height={140}
              src="/mysql.svg"
              alt="MySQL"
              className="lg:bg-white lg:w-20 lg:h-20 lg:p-3 lg:rounded-lg lg:border-1 lg:border-b-2 lg:border-[#498cff] bg-white w-20 h-20 p-3 rounded-lg border-1 border-b-2 border-[#498cff]"
            />
          </div>
        </div>
        <Image
          width={140}
          height={140}
          src="/assets/image/pythonk.png"
          alt="gambar-pythonb"
          className="lg:w-35 lg:-rotate-20 lg:absolute lg:-right-6 lg:-bottom-25 w-10 rotate-10 scale-x-[-1] absolute -right-10 -bottom-20"
        />
      </div>
      {showAuthYet && (token === null || token === "") ? (
        <>
          <div className="fixed z-7 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center"></div>
          <div className="fixed z-8 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center"></div>
          <div className="fixed z-9 lg:top-40 lg:left-140 top-50 left-27 p-5 border-1 rounded-lg border-purple-900 bg-white flex flex-col gap-3 justify-center items-center">
            <Image
              width={140}
              height={140}
              src="/warning-red.svg"
              alt=""
              className="w-10"
            />
            <p className="text-[12px] text-purple-900 w-30 text-justify">
              Oops! You need to <span className="font-bold">Log In</span> first
              before filling out the form.
            </p>
            <button
              onClick={() => (setShowAuth(true), setShowPopup(false))}
              className="text-[12px] font-bold text-blue-600 w-full border py-1 rounded-md hover:bg-blue-50"
            >
              Log In
            </button>
            <button
              onClick={() => setShowAuthYet(false)}
              className={`fixed z-6 lg:top-37 lg:right-133 lg:mr-0 -mr-40 top-46 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}
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
        </>
      ) : null}
      {showAuth && (token === null || token === "") ? (
        <button
          onClick={() => setShowAuth(false)}
          className={`fixed z-13 lg:top-27 lg:right-105 top-36 right-7 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}
        >
          <Image
            width={140}
            height={140}
            src="/close.svg"
            alt=""
            className="w-3"
          />
        </button>
      ) : null}
      {showAuth && (
        <PopUpLogin
          onClick={() => {
            setShowAuth(false);
          }}
          isClose={false}
          isRole="guest"
        />
      )}
    </>
  );
}
