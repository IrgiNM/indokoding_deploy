import { CardCareerProps } from "@/type/typeCardCareer";

export default function CardCareer(props: CardCareerProps) {
    const listData = props.list || [];
    const isActive = props.isActive || 'null';
    const title = props.title || 'null';
    function truncateText(text: string, wordLimit: number): string {
      const words = text.split(' ');
      if (words.length <= wordLimit) return text;
      return words.slice(0, wordLimit).join(' ') + '...';
    }

  return (
    <button onClick={props.onClick} className={`${isActive === title ? 'w-80 h-160' : 'w-55 h-65 hover:w-60 hover:-ml-2 hover:-mt-2 hover:h-70 transition-all duration-200'} relative border-1 border-[#007924] bg-white rounded-xl p-6 flex flex-col justify-start items-start gap-4`}>
        <div className='w-full h-full bg-[#d6ffe8] mb-15 p-5 rounded-lg border-1 border-[#4adf77] '>
            <h1 className={`text-lg font-bold mb-3 text-left ${props.id === 1 ? 'text-[#007924]' : props.id === 2 ?'text-[#006779]' : 'text-[#794100]'}`}>{props.title}</h1>
            <p className='text-sm text-justify'>{isActive === title ? props.description : truncateText(props.description, 10)}</p>
            {isActive === title && 
            <ul className='w-53 mt-3 pl-5'>
                {listData.map((item: string, index: number) => (
                    <li key={index} className='text-sm text-justify list-disc pl-5 mb-2'>{item}</li>
                ))}
            </ul>
            }
        </div>
        <div className='absolute bottom-6 w-58 flex flex-row justify-between items-center'>
            <button className={`${isActive === title ? 'p-29' : 'p-16'} py-2 bg-[#007924] text-white font-semibold rounded-md text-sm hover:bg-[#223d43] transition`}>
            Apply
            </button>
        </div>
    </button>
  )
}
