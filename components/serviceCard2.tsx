import { Service2 } from "@/type/Service";



export function ServiceCard2(props: Service2) {
    console.log(props.id);
    return (
        <>
            <div className={`w-80 h-85 flex flex-col justify-start items-center gap-3 py-8 px-10 border-1 rounded-lg ${props.border} ${props.bg}`}>
                {/* <div className="absolute rounded-full left-270 top-50 -z-1 bg-[#FEFFD6] w-50 h-50"></div>
                {props.id === 1 ? <IconWebDev/> : props.id === 2 ? <IconApps/> : <IconTroubleShoot/>} */}
                <img src={props.id === 1 ? "/webdev.svg" : props.id === 2 ? "/apps.svg" : "/troubleshooting.svg"} alt="" className="left-270 top-50 w-12 h-12"/>
                <h1 className={`text-lg font-bold text-[22px] text-center ${props.warna}`}>{props.title}</h1>
                <p className='w-full text-justify text-[18px]'>{props.description}</p>
            </div>
            
        </>
    )
}