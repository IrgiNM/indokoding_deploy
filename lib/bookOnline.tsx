import { Button, Dialog, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";
import React from "react";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export function BookOnline() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
        <div className="flex flex-row relative items-center gap-12 mt-35">
            <Image width={140} height={140} src="/assets/image/consule.png" alt="consule" className="w-90 h-90" />
            <div className="flex flex-col items-start justify-center">
                <h1 className="text-6xl font-extrabold text-[#00466C] mb-4">BOOK ONLINE</h1>
                <p className="font-semibold text-[#00466C] text-[18px]">Free Online Consultation</p>
                <p className="text-[#00466C] text-[18px] tracking-wide custom-word-spacing mb-4">1hr Consultation | Skype or email at <br></br> info@indokoding.com</p>
                {/* <button className="bg-[#FFBC48] w-35 text-white font-semibold px-4 py-2 rounded-md hover:bg-gradient-to-b hover:from-[#FFBC48] hover:to-[#ff8903] hover:font-bold transition duration-200 mt-3">
                    BOOK NOW
                </button> */}
                <Button onClick={handleClickOpen} sx={{
                    backgroundColor: '#FFBC48',
                    color: 'white',
                    fontWeight: '600',
                    px: 2,
                    py: 1,
                    borderRadius: '6px',
                    mt: 1.5,
                    '&:hover': {
                    background: 'linear-gradient(to bottom, #FFBC48, #ff8903)',
                    fontWeight: 'bold',
                    },
                }}>
                BOOK NOW
                </Button>
                {/* <Button variant="contained">Hello world</Button> */}
            </div>
            <div className="absolute rounded-full left-195 -top-37 -z-1 bg-[#F1D6FF] w-100 h-100"></div>
            <div className="absolute rounded-full left-150 top-70 -z-1 bg-[#D6FFDC] w-40 h-40"></div>
            <div className="absolute rounded-full -left-60 -top-65 -z-1 bg-[#D6E9FF] w-80 h-80"></div>
        </div>

        <Dialog
            open={open}
            slots={{
            transition: Transition,
            }}
            keepMounted
            maxWidth="md"
            PaperProps={{
                sx: {
                    borderRadius: 3, // bisa juga '16px' atau angka (1 = 8px, 2 = 16px, dst)
                    width: '2000px',
                    height: '600px'
                  },
                // className: 'w-[2000px] h-130' // atau pakai sx jika mau
            }}
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ 
                fontFamily: 'Poppins, sans-serif',
                paddingBottom: '0',
                paddingTop: '26px',
                paddingLeft: '26px',
                display: 'flex',
                justifyContent: 'space-between',
                color: '#00466C',
             }}>
                <p className="text-3xl font-extrabold">Schedule Your Services</p>
                <button onClick={handleClose} className="w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]">
                    <Image width={140} height={140} src="/close.svg" alt="" className="w-3" />
                </button>
             </DialogTitle>
             <p className="text-md pl-6 pb-6">Check out our availability and book the date and time that works for you</p>
             
            <iframe
                    allowFullScreen
                    height="717"
                    width="100%"
                    frameBorder="0"
                    title="Iframe embed"
                    src="https://irginm.neetocal.com/embed/651ea267-c42b-41e9-a593-7c7aaf42dff8"
                />
        </Dialog>
        </>
    )
}