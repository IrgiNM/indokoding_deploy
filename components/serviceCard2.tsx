import { Service2 } from "@/type/Service";
import Image from "next/image";


export function ServiceCard2(props: Service2) {
    return (
        <>
            <div className={`lg:w-80 lg:h-85 lg:flex lg:flex-col lg:justify-start lg:items-center lg:gap-3 lg:py-8 lg:px-10 lg:border-1 lg:rounded-lg w-35 h-40 flex flex-col justify-start items-center gap-1 py-3 px-3 border-1 rounded-lg ${props.border} ${props.bg}`}>
                <Image width={140} height={140} src={props.id === 1 ? "/webdev.svg" : props.id === 2 ? "/apps.svg" : "/troubleshooting.svg"} alt="" className="lg:left-270 lg:top-50 lg:w-12 lg:h-12 left-270 top-50 w-6 h-6"/>
                <h1 className={`lg:text-lg lg:font-bold lg:text-center text-[12px] font-bold text-center ${props.warna}`}>{props.title}</h1>
                <p className='lg:w-full lg:text-justify lg:text-lg w-full text-justify text-[10px]'>{props.description}</p>
            </div>
        </>
    )
}