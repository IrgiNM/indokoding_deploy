export function BookOnline() {
    return (
        <>
        <div className="flex flex-row relative items-center gap-12 mt-35">
            <img src="/assets/image/consule.png" alt="consule" className="w-90 h-90" />
            <div className="flex flex-col items-start justify-center">
                <h1 className="text-6xl font-extrabold text-[#00466C] mb-4">BOOK ONLINE</h1>
                <p className="font-semibold text-[#00466C] text-[18px]">Free Online Consultation</p>
                <p className="text-[#00466C] text-[18px] tracking-wide custom-word-spacing mb-4">1hr Consultation | Skype or email at <br></br> info@indokoding.com</p>
                <button className="bg-[#FFBC48] w-35 text-white font-semibold px-4 py-2 rounded-md hover:bg-gradient-to-b hover:from-[#FFBC48] hover:to-[#ff8903] hover:font-bold transition duration-200 mt-3">
                    BOOK NOW
                </button>
            </div>
            <div className="absolute rounded-full left-195 -top-37 -z-1 bg-[#F1D6FF] w-100 h-100"></div>
            <div className="absolute rounded-full left-150 top-70 -z-1 bg-[#D6FFDC] w-40 h-40"></div>
            <div className="absolute rounded-full -left-60 -top-65 -z-1 bg-[#D6E9FF] w-80 h-80"></div>
        </div>
        </>
    )
}