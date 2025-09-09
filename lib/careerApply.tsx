import CardCareer from "@/components/cardCareer";
import PopUpLogin from "@/components/popUpLogin";
import { RequirementCareer } from "@/type/careerType";
import { getCookies } from "@/utils/tokenController";
import Image from "next/image";
import React, { forwardRef, useEffect, useState } from "react";
import Swal from "sweetalert2";

function CareerApplyComponent(props: { id: string } & object, ref: React.Ref<HTMLDivElement>) {
  const [diKlik, setDiKlik] = useState("Django Developer");
  const [showLogOut, setShowLogOut] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showAuthYet, setShowAuthYet] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [pickTitle, setPickTitle] = useState("Django Developer");

  const [isLoading, setIsLoading] = useState(false);
  const [RequirementsCareer, setRequirementsCareer] = useState<
    RequirementCareer[]
  >([]);
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
        console.error("Gagal fetch RequirementsCareer:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequirementsCareer();
  }, []);

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

  const [formDataCareerMessage, setFormData] = useState({
    name: "",
    email: "",
    from: "",
    phone: "",
    position: pickTitle,
    rate: 0,
    message: "",
  });

  const handleChangeCareerMessage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCareerMessage = async () => {
    if (
      !formDataCareerMessage.name ||
      !formDataCareerMessage.email ||
      !formDataCareerMessage.from ||
      !formDataCareerMessage.phone ||
      !formDataCareerMessage.rate
    ) {
      Swal.fire({
        title: "The Internet?",
        text: "please fill all the fields!",
        icon: "question"
      });
      // alert("Harap isi semua field");
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
        name: formDataCareerMessage.name,
        email: formDataCareerMessage.email,
        from: formDataCareerMessage.from,
        phone: formDataCareerMessage.phone,
        rate: formDataCareerMessage.rate,
        position: pickTitle,
        message: formDataCareerMessage.message,
      };
      console.log("data yang dikirim : ", payload);

      const res = await fetch("/api/createCareerMessage", {
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

      await res.json();
      Swal.fire({
        title: "message sent successfully",
        icon: "success",
        draggable: true
      });
      // alert(data.message || "Pesan berhasil dikirim!");
      setShowPopup(false);

      // Reset form setelah berhasil
      setFormData({
        name: "",
        email: "",
        from: "",
        phone: "",
        position: "",
        rate: 0,
        message: "",
      });
    } catch (error: unknown) {
      console.error("Error saat mengirim kontak:", error);

      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "an error occured while sending the message!",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
        // alert(error.message || "Terjadi kesalahan saat mengirim pesan");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "an unknown error occured!",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
        // alert("Terjadi kesalahan yang tidak diketahui");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" lg:w-[1600px] lg:h-180 lg:mt-30 lg:flex lg:flex-row lg:justify-center lg:items-start lg:relative w-[300px] h-240 mt-0 flex flex-col justify-center items-start relative">
      <div ref={ref} id={props.id} className=" lg:absolute lg:left-70 lg:flex lg:flex-col lg:justify-start lg:items-start absolute left-5 top-0 flex flex-col justify-start items-start">
        <p className=" lg:text-sm lg:font-semibold lg:text-center lg:mb-2 text-[12px] font-semibold text-center mb-2">
          Stay tuned for updates!
        </p>
        <h1 className=" lg:text-3xl lg:w-100 lg:text-left lg:font-bold lg:text-[#007924] text-2xl w-70 text-left font-bold text-[#007924]">
          Available Career Opportunities
        </h1>
        <p className=" lg:text-sm lg:mt-5 lg:w-60 lg:text-justify text-[12px] mt-5 w-60 text-justify">
          We&apos;re on the lookout for passionate and talented individuals to
          join our growing team. If you&apos;re ready to take the next step in
          your career and make a meaningful impact, explore the open positions
          below and apply today!
        </p>
      </div>
      <div className="lg:w-200 lg:absolute lg:-top-10 lg:left-145 lg:-mr-80 lg:ml-10 lg:flex lg:flex-row lg:justify-start lg:items-start lg:gap-4 lg:mt-10 pt-5 lg:pl-0 w-120 absolute top-60 -left-40 mr-0 ml-0 flex flex-row justify-start items-start gap-4 mt-10 hide-scrollbar overflow-auto pl-45">
        {RequirementsCareer.map((career, index) => (
          <CardCareer
            key={index}
            onClick={() => {
              console.log(`${career.title} clicked`);
              setDiKlik(career.title);
            }}
            applyClick={() => {
              setShowPopup(true);
              setPickTitle(career.title);
            }}
            title={career.title}
            description={career.description}
            isActive={diKlik}
            list={career.list}
            id={career.id}
          />
        ))}
      </div>
      <div className=" lg:w-[850px] lg:absolute lg:-z-1 lg:right-20 lg:-top-15 lg:h-200 lg:bg-gradient-to-b lg:mt-10 lg:from-[#81ff88] lg:to-[#4afcff] lg:rounded-t-[100px] w-[850px] absolute -z-1 -right-150 top-53 h-200 bg-gradient-to-b mt-10 from-[#81ff88] to-[#4afcff] rounded-t-xl"></div>

      {showLogOut ? (
        <div className="fixed z-4 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center"></div>
      ) : null}
      {showLogOut ? (
        <div className="fixed z-5 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center"></div>
      ) : null}
      {showLogOut ? (
        <div className="fixed z-6 lg:top-40 lg:left-140 top-40 p-5 border-1 rounded-lg border-purple-900 bg-white flex flex-col gap-3 justify-center items-center">
          <Image
            width={140}
            height={140}
            src="/warning-red.svg"
            alt=""
            className="w-10"
          />
          <p className="text-[12px] text-purple-900 w-30 text-center">
            Are you sure you want to log out?
          </p>
          <button
            onClick={() => setShowLogOut(false)}
            className="text-[12px] font-bold text-[#f00070] w-full border py-1 rounded-md hover:bg-red-50"
          >
            Log Out
          </button>
          <button
            onClick={() => setShowLogOut(false)}
            className={`fixed z-6 lg:top-37 lg:right-133 lg:mr-0 -mr-40 top-36 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}
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
      ) : null}

      {showAuth ? (
        <button
          onClick={() => setShowAuth(false)}
          className={`fixed z-8 lg:top-36 lg:right-105 -top-14 -right-3 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}
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
      {showPopup || showAuthYet ? (
        <div className="fixed z-4 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center"></div>
      ) : null}
      {showPopup || showAuthYet ? (
        <div className="fixed z-5 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center"></div>
      ) : null}
      {showPopup ? (
        <>
          <div className="fixed z-7 lg:w-80 w-75 lg:top-40 lg:left-70 top-27 p-5 lg:border-1 rounded-lg border-purple-900 bg-white flex flex-col gap-3 justify-center items-center">
            <h1 className="font-bold text-xl text-[#00a50b] w-full">
              Apply Career
            </h1>
            <p className="text-[12px] text-green-900 w-full text-justify">
              Chosen Career : <span className="font-bold">{pickTitle}</span>
            </p>
            <input
              type="text"
              className="w-full py-2 px-4 border border-green-900 bg-green-100 rounded-full text-[12px]"
              placeholder="Your Name"
              name="name"
              value={formDataCareerMessage.name}
              onChange={handleChangeCareerMessage}
            />
            <input
              type="email"
              className="w-full py-2 px-4 border border-green-900 bg-green-50 rounded-full text-[12px]"
              placeholder="Your@email.com"
              name="email"
              value={formDataCareerMessage.email}
              onChange={handleChangeCareerMessage}
            />
            <input
              type="text"
              className="w-full py-2 px-4 border border-green-900 bg-green-100 rounded-full text-[12px]"
              placeholder="Where are you come from ?"
              name="from"
              value={formDataCareerMessage.from}
              onChange={handleChangeCareerMessage}
            />
            <input
              type="text"
              className="w-full py-2 px-4 border border-green-900 bg-green-50 rounded-full text-[12px]"
              placeholder="Your Phone"
              name="phone"
              value={formDataCareerMessage.phone}
              onChange={handleChangeCareerMessage}
            />
            <button
              onClick={() => handleCareerMessage()}
              className="text-[12px] lg:flex justify-center items-center hidden font-bold text-white w-full border py-3 rounded-lg bg-[#007924] hover:bg-[#44975d]"
            >
              {isLoading ? "Try Send..." : "Send"}
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className={`fixed z-6 lg:top-37 lg:right-45 lg:mr-0 -mr-40 top-24 right-45 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}
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
          <div className="fixed lg:z-6 z-7 lg:w-115 w-75 lg:top-40 lg:right-50 top-94 p-5 lg:border-1 rounded-lg border-purple-900 bg-white flex flex-col gap-3 justify-center items-center">
            <div className="w-full relative flex flex-row items-center">
              <p className="text-[12px] font-bold text-green-900 w-13 text-justify">
                Rate :{" "}
              </p>
              <input
                type="number"
                className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-full py-2 px-4 pl-7 border border-green-900 bg-green-100 rounded-full text-[12px]"
                placeholder="0"
                name="rate"
                value={formDataCareerMessage.rate}
                onChange={handleChangeCareerMessage}
              />
              <Image
                width={140}
                height={140}
                src="/dollar.svg"
                alt="MySQL"
                className=" lg:w-2 lg:absolute lg:top-3 lg:left-15 w-2 absolute top-3 left-14"
              />
            </div>
            <textarea
              name="message"
              id="message"
              className="w-full lg:h-64 h-20 py-2 px-4 border border-green-900 bg-green-50 rounded-lg text-[12px]"
              placeholder="Some more words, maybe?"
              value={formDataCareerMessage.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
            ></textarea>
            <button
              onClick={() => handleCareerMessage()}
              className="text-[12px] flex justify-center items-center lg:hidden font-bold text-white w-full border py-3 rounded-lg bg-[#007924] hover:bg-[#44975d]"
            >
              {isLoading ? "Try Send..." : "Send"}
            </button>
          </div>
        </>
      ) : null}
      {showAuthYet ? (
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
      {showAuth ? (
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
    </div>
  );
}

const CareerApply = forwardRef(CareerApplyComponent);
export default CareerApply;
