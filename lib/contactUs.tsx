import PopUpLogin from "@/components/popUpLogin";
import { getCookies } from "@/utils/tokenController";
import Image from "next/image";
import React, { forwardRef, useEffect, useState } from "react";

function ContactUsComponent(props: object, ref: React.Ref<HTMLDivElement>) {
  const [showPopup, setShowPopup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const savedToken = await getCookies(); // <- pakai await

        if (savedToken) {
          // Parse JSON kalau cookies disimpan sebagai string
          const parsed =
            typeof savedToken === "string"
              ? JSON.parse(savedToken)
              : savedToken;
          setShowAuth(false);
          // Ambil token dan simpan ke state
          setToken(parsed?.token || "");
        } else {
          setToken("");
        }
      } catch (error) {
        console.error("Gagal mengambil cookies:", error);
        setToken("");
      }
    };

    fetchCookies();
  }, [showAuth]);

  useEffect(() => {
    const checkLoginSuccess = async () => {
      // Cek jika ada token dan popup masih terbuka
      const token = await getCookies();
      if (token && showAuth) {
        setShowAuth(false);
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // panggil backend API
        const res = await fetch("/api/getUsers");
        await res.json();
      } catch (err) {
        console.error("Gagal fetch users:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [isLoading]);

  const [formDataContact, setFormData] = useState({
    username: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChangeContact = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContact = async () => {
    if (
      !formDataContact.username ||
      !formDataContact.email ||
      !formDataContact.subject ||
      !formDataContact.message
    ) {
      alert("Harap isi semua field");
      return;
    }

    // cek token dulu sebelum kirim request
    const token = await getCookies();
    if (!token) {
      // alert("Anda harus login terlebih dahulu untuk mengirim pesan");
      console.log("No token found, showing popup", token);
      setShowPopup(true);
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        username: formDataContact.username,
        email: formDataContact.email,
        subject: formDataContact.subject,
        message: formDataContact.message,
      };

      const res = await fetch("/api/createContact", {
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

      // Reset form setelah berhasil
      setFormData({
        username: "",
        email: "",
        subject: "",
        message: "",
      });
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
      <div ref={ref} id="contact-us" className="relative top-20 right-0"></div>
      <div className=" lg:w-full lg:pl-20 lg:mb-0 lg:mt-50 lg:relative lg:flex lg:flex-col lg:justify-center lg:items-center lg:pr-20 w-full px-5 mb-0 mt-50 relative flex flex-col justify-center items-center">
        <div className=" lg:w-full lg:h-50 lg:bg-gradient-to-b lg:from-[#a9ff91] lg:to-[#17fbff] lg:absolute lg:-top-20 lg:-z-1 w-full h-30 bg-gradient-to-b from-[#a9ff91] to-[#17fbff] absolute -top-10 -z-1"></div>
        <div className="lg:relative relative z-3 flex flex-row lg:w-200 w-70">
          <h1 className="lg:w-180 lg:text-4xl lg:text-left lg:font-bold lg:text-[#4F006C] w-180 text-xl text-left font-bold -mb-2 text-[#4F006C]">
            Contact Us
          </h1>
          <Image
            width={140}
            height={140}
            src="/all_mascot.svg"
            alt=""
            className="absolute lg:w-100 w-50 lg:-top-52 lg:-right-40 -top-22 -right-20"
          />
        </div>

        <div className=" lg:flex lg:justify-center lg:w-250 lg:items-center lg:px-5 lg:py-5 flex flex-col justify-center items-center px-5 py-5 w-full">
          <div className=" lg:flex lg:flex-col lg:md:flex-row lg:w-full lg:max-w-6xl lg:bg-white lg:border-[1px] lg:border-[#97BED7] lg:rounded-3xl lg:shadow-xl lg:p-6 lg:gap-10 flex flex-col justify-center items-center md:flex-row w-full max-w-6xl bg-white border-[1px] border-[#97BED7] rounded-xl shadow-xl p-6 gap-10">
            <div className=" lg:w-full lg:md:w-2/3 lg:flex lg:flex-col lg:gap-4 w-full md:w-2/3 flex flex-col justify-center items-center gap-4">
              <div className=" lg:flex lg:flex-col lg:md:flex-row lg:gap-4 w-full flex flex-col md:flex-row gap-4">
                <input
                  // onClick={() => setShowPopup(true)}
                  className=" lg:bg-[#D9DFFC] lg:rounded-3xl lg:text-sm lg:px-5 lg:py-3 lg:text-[#4F006C] lg:w-full bg-[#D9DFFC] rounded-lg text-[12px] px-5 py-2 text-[#4F006C] w-full"
                  type="email"
                  placeholder="Name"
                  id="username"
                  name="username"
                  value={formDataContact.username}
                  onChange={handleChangeContact}
                />
                <input
                  // onClick={() => setShowPopup(true)}
                  className=" lg:bg-[#D9DFFC] lg:rounded-3xl lg:text-sm lg:px-5 lg:py-3 lg:text-[#4F006C] lg:w-full bg-[#D9DFFC] rounded-lg text-[12px] px-5 py-2 text-[#4F006C] w-full"
                  type="text"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={formDataContact.email}
                  onChange={handleChangeContact}
                />
              </div>

              <input
                // onClick={() => setShowPopup(true)}
                className=" lg:bg-[#D9DFFC] lg:rounded-3xl lg:text-sm lg:px-5 lg:py-3 lg:text-[#4F006C] lg:w-full bg-[#D9DFFC] rounded-lg text-[12px] px-5 py-2 text-[#4F006C] w-full"
                type="text"
                placeholder="Subject"
                id="subject"
                name="subject"
                value={formDataContact.subject}
                onChange={handleChangeContact}
              />

              <textarea
                // onClick={() => setShowPopup(true)}
                className=" lg:bg-[#D9DFFC] lg:rounded-3xl lg:text-sm lg:px-5 lg:py-4 lg:text-[#4F006C] lg:h-40 lg:w-full lg:resize-none bg-[#D9DFFC] rounded-lg text-[12px] px-5 py-4 text-[#4F006C] h-40 w-full resize-none"
                placeholder="Message"
                id="message"
                name="message"
                value={formDataContact.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
              ></textarea>

              <button
                onClick={() => handleContact()}
                className="cursor-pointer lg:bg-[#181F38] lg:text-white lg:text-sm lg:font-bold lg:py-3 lg:rounded-3xl lg:w-full lg:hover:bg-[#303b69] lg:transition bg-[#181F38] text-[12px] text-white font-semibold py-3 rounded-3xl w-full hover:bg-[#303b69] transition"
              >
                {isLoading ? "Try Send..." : "Send"}
              </button>
            </div>

            <div className=" lg:w-full lg:md:w-1/3 lg:flex lg:flex-col lg:gap-4 lg:text-[#4F006C] w-full md:w-1/3 flex flex-col justify-center items-center gap-4 text-[#4F006C]">
              <div className=" lg:bg-[#D9DFFC] lg:flex lg:flex-row lg:items-center lg:p-4 lg:pl-7 lg:rounded-2xl bg-[#D9DFFC] flex flex-row items-center p-4 pl-7 rounded-xl w-full">
                <Image
                  width={140}
                  height={140}
                  src="/icon-jam.svg"
                  alt=""
                  className=" lg:w-6 lg:mr-5 w-6 mr-5"
                />
                <div>
                  <p className="font-semibold text-[12px] text-[#181F38]">
                    Monday - Friday
                  </p>
                  <p className="lg:text-sm text-[12px] text-[#181F38]">
                    7 AM - 6 PM
                  </p>
                </div>
              </div>

              <div className=" lg:bg-[#D9DFFC] lg:flex lg:flex-row lg:items-center lg:p-4 lg:pl-7 lg:rounded-2xl bg-[#D9DFFC] flex flex-row items-center p-4 pl-7 rounded-xl w-full">
                <Image
                  width={140}
                  height={140}
                  src="/icon-phone.svg"
                  alt=""
                  className=" lg:w-6 lg:mr-5 w-6 mr-5"
                />
                <div>
                  <p className="lg:font-semibold font-semibold text-[12px] text-[#181F38]">
                    +62274 540448
                  </p>
                  <p className="lg:text-sm text-[12px] text-[#181F38]">
                    +622745306395
                  </p>
                </div>
              </div>

              <div className=" lg:bg-[#D9DFFC] lg:flex lg:flex-row lg:items-center lg:p-4 lg:pl-7 lg:rounded-2xl bg-[#D9DFFC] flex flex-row items-center p-4 pl-7 rounded-xl w-full">
                <Image
                  width={140}
                  height={140}
                  src="/icon-email.svg"
                  alt=""
                  className=" lg:w-6 lg:mr-5 w-6 mr-5"
                />
                <div>
                  <p className="lg:text-sm text-[12px] text-[#181F38]">
                    info@indokoding.com
                  </p>
                </div>
              </div>

              <div className="lg:mt-4 mt-4 flex flex-col justify-center items-center">
                <p className=" lg:mb-2 lg:text-extrabold mb-2 text-extrabold text-[#181F38] text-[12px]">
                  Follow our social media
                </p>
                <div className=" lg:flex lg:gap-4 flex gap-4">
                  <div className=" lg:bg-[#D9DFFC] cursor-pointer lg:w-10 lg:h-10 lg:rounded-full lg:flex lg:items-center lg:justify-center bg-[#D9DFFC] w-10 h-10 rounded-full flex items-center justify-center">
                    <Image
                      width={140}
                      height={140}
                      src="/fb-black.svg"
                      alt=""
                      className=" lg:w-3 w-3"
                    />
                  </div>
                  <div className=" lg:bg-[#D9DFFC] cursor-pointer lg:w-10 lg:h-10 lg:rounded-full lg:flex lg:items-center lg:justify-center bg-[#D9DFFC] w-10 h-10 rounded-full flex items-center justify-center">
                    <Image
                      width={140}
                      height={140}
                      src="/ig-black.svg"
                      alt=""
                      className="lg:w-5 w-5"
                    />
                  </div>
                  <div className=" lg:bg-[#D9DFFC] cursor-pointer lg:w-10 lg:h-10 lg:rounded-full lg:flex lg:items-center lg:justify-center bg-[#D9DFFC] w-10 h-10 rounded-full flex items-center justify-center">
                    <Image
                      width={140}
                      height={140}
                      src="/x-black.svg"
                      alt=""
                      className="lg:w-4 w-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1450.0329966036097!2d110.30648249266326!3d-7.785142307915073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7af70009a10b4b%3A0x2a213bb1df2a7745!2sCV%20Indokoding%20Sukses%20Makmur!5e0!3m2!1sen!2sid!4v1753343284581!5m2!1sen!2sid"
        className=" lg:w-full lg:h-80 lg:-mt-10 w-full h-80 -mt-10"
      ></iframe>

      {/* <div className={`fixed z-6 h-35 left-0 right-0 top-0 bg-[#2c48ac] blur-2xl ${showPopup ? 'translate-x-0 opacity-50' : 'translate-x-10 opacity-0 pointer-events-none'}`}>aa</div>
    <div className={`fixed z-6 w-100 p-3 rounded-md border-[1px] border-[#97BED7] bg-white top-25 flex flex-row justify-center items-center gap-3 ${showPopup ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
      <Image width={140} height={140} src="/warning-purple.svg" alt="" className="w-5"/>
      <p className='text-[10px] text-[#4F006C]'>Oops! You need to log in first before filling out the form.</p>
      <button className='text-[10px] font-bold text-blue-600'>Log In</button>
    </div>
    <button onClick={() => setShowPopup(false)} className={`fixed z-6 top-[100px] right-103 w-7 h-[45px] rounded-r-md bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]  ${showPopup ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'}`}>
        <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
    </button> */}

      {showPopup && token === "" ? (
        <div className="fixed z-4 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center"></div>
      ) : null}
      {showPopup && token === "" ? (
        <div className="fixed z-5 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center"></div>
      ) : null}
      {showPopup && (token === "" || token === null) ? (
        <div className="fixed z-6 lg:top-40 lg:left-140 top-40 p-5 border-1 rounded-lg border-purple-900 bg-white flex flex-col gap-3 justify-center items-center">
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
            onClick={() => setShowPopup(false)}
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
      {showAuth && token === "" ? (
        <button
          onClick={() => setShowAuth(false)}
          className={`fixed z-13 lg:top-27 lg:right-105 top-37 right-8 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}
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

const ContactUs = forwardRef(ContactUsComponent);
export default ContactUs;
