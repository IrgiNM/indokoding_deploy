import { Service } from "@/type";

export function ServiceCard(props: Service) {
    console.log(props.id);
    return (
        <>
            <div className={`w-72 flex flex-col justify-center items-center gap-3 p-4  `}>
                <i className="fas fa-check-circle text-green-500"></i>
                <h1 className={`text-lg font-bold text-[22px] ${props.warna}`}>{props.title}</h1>
                <p className='w-full text-justify text-[18px]'>{props.description}</p>
            </div>
            
        </>
    )
}