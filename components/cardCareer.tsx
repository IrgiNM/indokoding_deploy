import React, { useState } from 'react'

export default function CardCareer(props: any) {
    const listData = props.list || [];
    const isActive = props.isActive || 'null';
    const title = props.title || 'null';
    function truncateText(text: string, wordLimit: number): string {
      const words = text.split(' ');
      if (words.length <= wordLimit) return text;
      return words.slice(0, wordLimit).join(' ') + '...';
    }

  return (
    <button onClick={props.onClick} className={`${isActive === title ? ' lg:w-80 lg:h-160 w-60 h-155' : ' lg:w-55 lg:h-80 lg:hover:w-60 lg:hover:-ml-2 lg:hover:-mt-2 lg:hover:h-85 lg:transition-all lg:duration-200 w-55 h-70 hover:w-60 hover:-ml-2 hover:-mt-2 hover:h-85 transition-all duration-200'} lg:relative lg:border-1 lg:border-[#007924] lg:bg-white lg:rounded-xl lg:p-6 lg:flex lg:flex-col lg:justify-start lg:items-start lg:gap-4 relative border-1 border-[#007924] bg-white rounded-xl p-2 flex flex-col justify-start items-start gap-4`}>
        <div className=' lg:w-full lg:h-full lg:bg-[#d6ffe8] lg:mb-15 lg:p-5 lg:rounded-lg lg:border-1 lg:border-[#4adf77] w-full h-full bg-[#d6ffe8] mb-15 p-5 rounded-lg border-1 border-[#4adf77]'>
            <h1 className={` lg:text-lg lg:font-bold lg:mb-3 lg:text-left text-md font-bold mb-3 text-left ${props.id === 1 ? 'text-[#007924]' : props.id === 2 ?'text-[#006779]' : 'text-[#794100]'}`}>{props.title}</h1>
            <p className='lg:text-sm lg:text-justify text-[12px] text-justify'>{isActive === title ? props.description : truncateText(props.description, 10)}</p>
            {isActive === title && 
            <ul className=' lg:w-53 lg:mt-3 lg:pl-5 w-40 mt-3 pl-5'>
                {listData.map((item: string, index: number) => (
                    <li key={index} className=' lg:text-sm lg:text-justify lg:list-disc lg:pl-5 lg:mb-2 text-[12px] text-justify list-disc pl-5 mb-2'>{item}</li>
                ))}
            </ul>
            }
        </div>
        <div className={` lg:absolute lg:bottom-6 lg:w-58 lg:flex lg:flex-row lg:justify-start lg:items-center absolute bottom-2 w-58 flex ${isActive === title ? 'flex-row' : 'flex-col'} justify-start items-start`}>
            <button onClick={props.onClick} className={`${isActive === title ? 'lg:p-6 p-4' : 'lg:p-15 p-11'}  lg:py-2 lg:text-[#007924] lg:mr-2 lg:font-semibold lg:rounded-md lg:border-1 lg:border-[#007924] lg:text-sm lg:hover:bg-[#c8f0ff] lg:transition py-2 text-[#007924] mr-2 font-semibold rounded-md border-1 border-[#007924] text-[12px] hover:bg-[#c8f0ff] transition`}>
            Detail
            </button>
            {isActive === title &&
                <button className={`${isActive === title ? 'lg:p-17 p-11' : 'lg:p-7 p-11'} lg:py-2 lg:bg-[#007924] lg:text-white lg:font-semibold lg:rounded-md lg:text-sm lg:hover:bg-[#223d43] lg:transition py-2 bg-[#007924] text-white font-semibold rounded-md text-[12px] hover:bg-[#223d43] transition`}>
                Apply
                </button>
            }
        </div>
    </button>
  )
}
