import Footer from "@/components/footer";
import JobCard from "@/components/JobCard";
import JoinUs from "@/components/JoinUs";
import NavbarCarrier from "@/lib/navbarCarrier";
import Image from "next/image";
import React from "react";

const CareerPage: React.FC = () => {
  return (
   <div className="relative pt-45 bg-white text-gray-800 min-h-screen w-full overflow-hidden">
       <section className="relative z-20 px-12 md:px-20 py-10">
  <h3 className="text-4xl font-bold text-[#2C507A] mb-4 font-poppins absolute right-48 top-1 ">Our Skills</h3>
  <div className="flex flex-row flex-wrap gap-11 w-70 place-items-center absolute right-19 top-15 z-5">
    <Image width={140} height={140} src="/go.svg" alt="Go" className="w-13"/> 
    <Image width={140} height={140} src="/postgresql.svg" alt="PostgreSQL" className="w-13" />
    <Image width={140} height={140} src="/python.svg" alt="Python" className="w-13" />
    <Image width={140} height={140} src="/java.svg" alt="Java" className="w-13" />
    <Image width={140} height={140} src="/mysql.svg" alt="MySQL" className="w-13" />
  </div>
</section>

        <div className='absolute -right-45 top-9 w-115 h-115 rounded-full bg-[#D6FFDC] z-10'></div>


      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <NavbarCarrier />
        <JoinUs />        
        <div className="min-h-screen bg-teal-700 p-10 flex flex-wrap gap-8 justify-center">
      <JobCard
        title="Django Developer"
        shortDesc="Build new features across the whole technology stack. Participate in the scrum process."
        longDesc={
          <ul className="list-disc list-inside space-y-1">
            <li>Refining and estimating user stories</li>
            <li>Providing technical input to the product team</li>
            <li>Collaborating with other developers</li>
            <li>Mentoring less experienced devs</li>
          </ul>
        }
      />

      <JobCard
        title="iOS Developer"
        shortDesc="Mobile iOS Developer will be working on..."
        longDesc={
          <ul className="list-disc list-inside space-y-1">
            <li>Designing and developing POC apps</li>
            <li>Participating in Agile/Scrum practices</li>
            <li>Working with product & QA teams</li>
          </ul>
        }
      />

      <JobCard
        title="Administrator"
        shortDesc="We are looking for Administrator to join our team."
        longDesc={
          <ul className="list-disc list-inside space-y-1">
            <li>Responsible for internal admin tasks</li>
            <li>Coordinate office operations</li>
            <li>Manage communication & scheduling</li>
          </ul>
        }
      />
    </div>
        {/* Latest Careers */}
        {/* <div className="w-[925px] h-[526px] relative">
          <div className="w-[925px] h-[526px] right-0 top-0 absolute bg-gradient-to-b from-blue-100 to-purple-500 rounded-tl-[100px] rounded-tr-[20px] rounded-bl-[10px] rounded-br-[10px] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]" />
            <h3 className="text-xl font-bold text-purple-800 mb-6">Latest Careers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Django Developer",
                desc: "Build new features across the whole technology stack. Participate in the scrum process."
              },
              {
                title: "Administrator",
                desc: "We are looking for Administrator to join our team. Get your position now!"
              },
              {
                title: "iOS Developer",
                desc: "Mobile iOS Developer will be working on..."
              }
            ].map((job, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-bold mb-2">{job.title}</h4>
                <p className="text-sm text-gray-700 mb-4">{job.desc}</p>
                <div className="flex justify-between">
                  <button className="px-4 py-1 text-sm border rounded">Detail</button>
                  <button className="px-4 py-1 text-sm bg-purple-800 text-white rounded">Apply</button>
                </div>
              </div>
            ))}
          </div>
        </div> */}

      </div>

      <Footer />
    </div>
  );
};

export default CareerPage;
