"use client";
import NavLink from '@/components/navLink';
import React, { use, useState } from "react";

type JobCardProps = {
  title: string;
  shortDesc: string;
  longDesc: React.ReactNode; // biar bisa isi <ul><li>...</li></ul> kalau mau
};

const JobCard: React.FC<JobCardProps> = ({ title, shortDesc, longDesc }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-[300px] bg-white p-4 rounded-xl shadow-lg flex flex-col justify-between min-h-[180px]">
      <div>
        <h3 className="text-lg font-bold text-purple-900 mb-2">{title}</h3>
        <div className="text-sm text-purple-900">
          {isExpanded ? longDesc : shortDesc}
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 border border-purple-700 rounded-md text-sm text-purple-700 hover:bg-purple-50 transition"
        >
          {isExpanded ? "Close" : "Detail"}
        </button>
        <button className="px-4 py-2 bg-purple-700 text-white rounded-md text-sm hover:bg-purple-800 transition">
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;
