"use client";
import Navbar from '@/lib/navbar';

import Footer from '@/lib/footer';
import JoinUsPage from '@/lib/joinUs';
import CareerApply from '@/lib/careerApply';
import { useRef, useState } from "react";

export default function Page() {
  const ourWorkRef = useRef<HTMLDivElement>(null);
  const aboutUsRef = useRef<HTMLDivElement>(null);
  const contactUsRef = useRef<HTMLDivElement>(null);
  const ourSkillRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const CareerApplyRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const [page, setPage] = useState("home");

  return (
    <div className='w-full flex flex-col items-center justify-center overflow-hidden'>
      <Navbar link="career" page="Career" 
        onNavClick={{
        }}/>
      <JoinUsPage/>
      <CareerApply id="CareerApply" ref={CareerApplyRef} />
      <Footer
        link="career"
        page={page}
        onNavClick={{
          ourWork: () => {
            scrollToRef(ourWorkRef);
            setPage("Our Work");
          },
          aboutUs: () => {
            scrollToRef(aboutUsRef);
            setPage("About Us");
          },
          contactUs: () => {
            scrollToRef(contactUsRef);
            setPage("Contact Us");
          },
          ourSkill: () => {
            scrollToRef(ourSkillRef);
            setPage("About Us");
          },
          ourService: () => {
            scrollToRef(serviceRef);
            setPage("About Us");
          },
          careerApply: () => {
            scrollToRef(CareerApplyRef);
            setPage("Career");
          },
        }}
      />
    </div>
  )
}

