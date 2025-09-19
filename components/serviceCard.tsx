
import { Service } from '@/type/Service';
import Image from 'next/image';


export function ServiceCard(props: Service) {
    return (
        <>
            <div className={`lg:w-72 lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-3 lg:p-4 w-28 flex flex-col justify-start items-center gap-1 p-2}`}>  
                <Image width={140} height={140} src={props.id === 1 ? "/webdev.svg" : props.id === 2 ? "/apps.svg" : "/troubleshooting.svg"} alt="" className="lg:left-270 lg:top-50 lg:w-12 lg:h-12 left-270 top-50 w-8 h-8"/>
                <h1 className={`lg:text-lg lg:font-bold lg:text-[22px] text-lg text-center w-70 font-bold text-[12px] ${props.warna}`}>{props.title}</h1>
                <p className='lg:w-full lg:text-justify lg:text-[18px] w-full text-justify text-[12px]'>{props.description}</p>
            </div>
            
        </>
    )
}

