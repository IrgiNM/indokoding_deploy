
import { Service } from '@/type/Service';
import { IconApps, IconTroubleShoot, IconWebDev } from './Icon';


export function ServiceCard(props: Service) {
    console.log(props.id);
    return (
        <>
            <div className={`w-72 flex flex-col justify-center items-center gap-3 p-4  `}>
                <div className="absolute rounded-full left-270 top-50 -z-1 bg-[#FEFFD6] w-90 h-90"></div>
                {/* <i class={`text-5xl ${props.icon}`}></i> */}
                {props.id === 1 ? <IconWebDev/> : props.id === 2 ? <IconApps/> : <IconTroubleShoot/>}
                <h1 className={`text-lg font-bold text-[22px] ${props.warna}`}>{props.title}</h1>
                <p className='w-full text-justify text-[18px]'>{props.description}</p>
            </div>
            
        </>
    )
}