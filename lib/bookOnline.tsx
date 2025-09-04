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
        <div className="lg:flex lg:flex-row lg:relative lg:items-center lg:gap-12 lg:mt-35 flex flex-col relative items-center gap-12 mt-35">
            <Image width={140} height={140} src="/assets/image/consule.png" alt="consule" className=" lg:w-90 lg:h-90 w-55 h-55 -mb-10" />
            <div className="lg:flex lg:flex-col lg:items-start lg:justify-center flex flex-col items-center justify-center">
                <h1 className="lg:text-6xl lg:text-start lg:font-extrabold lg:text-[#00466C] lg:mb-4 text-4xl text-center font-extrabold text-[#00466C] mb-4">BOOK ONLINE</h1>
                <p className="lg:font-semibold lg:text-[#00466C] lg:text-[18px] lg:text-start font-semibold text-[#00466C] text-[12px] tracking-wide text-center">Free Online Consultation</p>
                <p className="lg:text-[#00466C] lg:text-[18px] lg:tracking-wide lg:text-start lg:custom-word-spacing lg:mb-4 text-[#00466C] text-[12px] text-center mb-4">1hr Consultation | Exmail at <br></br> info@indokoding.com</p>
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
            <div className="lg:absolute lg:rounded-full lg:left-195 lg:-top-37 lg:-z-1 lg:bg-[#F1D6FF] lg:w-100 lg:h-100 absolute rounded-full left-40 -top-32 -z-1 bg-[#F1D6FF] w-75 h-75"></div>
            <div className="lg:absolute lg:rounded-full lg:left-150 lg:top-70 lg:-z-1 lg:bg-[#D6FFDC] lg:w-40 lg:h-40 absolute rounded-full -left-5 top-70 -z-1 bg-[#D6FFDC] w-25 h-25"></div>
            <div className="lg:absolute lg:rounded-full lg:-left-60 lg:-top-65 lg:-z-1 lg:bg-[#D6E9FF] lg:w-80 lg:h-80 absolute rounded-full -left-60 -top-65 -z-1 bg-[#D6E9FF] w-80 h-80"></div>
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
                    borderRadius: 3, 
                    width: '2000px',
                    height: '600px'
                  },
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