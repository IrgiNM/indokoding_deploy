import { TypeOurWork } from '@/type/typeOurWork'
import Image from 'next/image'

export default function CardOurWork(props: TypeOurWork) {
    const tag = props.tags
    const warnaTag = [
        {
            id: 1,
            bg: 'bg-[#F5F8C4] text-[#895B00]'
        },
        {
            id: 2,
            bg: 'bg-[#B3E3EB] text-[#004B89]'
        },
        {
            id: 3,
            bg: 'bg-[#BDEBB3] text-[#128900]'
        },
        {
            id: 4,
            bg: 'bg-[#F1D6FF] text-[#4F006C]'
        },
    ]
  return (
    <button onClick={props.onClick} className={`group relative flex flex-col justify-start items-start overflow-clip transition-all duration-700 ${props.class}`}>
        <Image width={480} height={480} src={props.image} alt="" className='w-120 rounded-xl border-2 border-b-5 border-[#128900] object-cover'/>
        <div className='w-120 h-76 rounded-xl border-2 border-b-5 border-[#128900] bg-[#128900] absolute top-0 opacity-0 group-hover:opacity-20 transition-all duration-200'></div>
        <div className='flex flex-row justify-center items-end gap-2 mt-2'>
            <h2 className='text-xl font-bold mt-5 text-[#128900] mr-3'>{props.title}</h2>
        </div>
        <div className='flex flex-row justify-center items-end gap-2 mt-2'>
            {tag.map((item, index) => (
                <p key={index} className={`py-1 px-4
                    ${
                        item === 'next js' ? warnaTag[1].bg :
                        item === 'tailwindcss' ? warnaTag[2].bg :
                        item === 'market place' ? warnaTag[0].bg :
                        warnaTag[3].bg
                    }
                    rounded-full text-[12px] font-semibold`}>{item}</p>
            ))}
        </div>
        <p className='w-120 text-justify text-sm mt-5'>{props.description}</p>
    </button>
  )
}
