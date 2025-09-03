// // app/page/dashboard.tsx (Next.js 13+ App Router)
// 'use client';

// import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGooglePlusG } from 'react-icons/fa';
// import { FiMenu } from 'react-icons/fi';


// export default function DashboardPage() {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
//         <div className="p-6 flex items-center gap-4 border-b border-blue-700">
//           <img
//             src="https://i.pravatar.cc/40"
//             alt="Profile"
//             width={40}
//             height={40}
//             className="rounded-full"
//           />
//           <div>
//             <p className="font-semibold">John David</p>
//             <p className="text-sm text-blue-300">UI/UX</p>
//           </div>
//         </div>
//         <nav className="p-4 text-sm space-y-4">
//           <p className="text-gray-300 uppercase text-xs">General</p>
//           <ul className="space-y-2">
//             <li>
//               <a href="#" className="block px-2 py-1 rounded hover:bg-blue-700">Tabel Pesan Kontak</a>
//             </li>
//             <li>
//               <a href="#" className="block px-2 py-1 rounded hover:bg-blue-700">Tabel Informasi Lamaran</a>
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold">Dashboard</h1>
//           <button className="text-2xl text-gray-600 md:hidden">
//             <FiMenu />
//           </button>
//         </div>

//         {/* Top Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           <Card title="2500" subtitle="Welcome" color="bg-orange-400" />
//           <Card title="123.50" subtitle="Average Time" color="bg-blue-400" />
//           <Card title="1,805" subtitle="Collections" color="bg-green-400" />
//           <Card title="54" subtitle="Comments" color="bg-pink-400" />
//         </div>

//         {/* Social Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <SocialCard icon={<FaFacebookF />} title="38k" subtitle="Friends" />
//           <SocialCard icon={<FaTwitter />} title="58.4k" subtitle="Followers" />
//           <SocialCard icon={<FaLinkedinIn />} title="756+" subtitle="Contacts" />
//           <SocialCard icon={<FaGooglePlusG />} title="40+" subtitle="Followers" />
//         </div>

//         {/* Placeholder for Chart */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold mb-2">Extra Area Chart</h2>
//           <div className="h-40 bg-gray-200 rounded flex items-center justify-center text-gray-500">
//             Grafik placeholder
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// function Card({ title, subtitle, color }: { title: string; subtitle: string; color: string }) {
//   return (
//     <div className={`p-4 rounded shadow text-white ${color}`}>
//       <p className="text-xl font-semibold">{title}</p>
//       <p className="text-sm">{subtitle}</p>
//     </div>
//   );
// }

// function SocialCard({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
//   return (
//     <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
//       <div className="text-blue-600 text-xl">{icon}</div>
//       <div>
//         <p className="font-semibold">{title}</p>
//         <p className="text-sm text-gray-500">{subtitle}</p>
//       </div>
//     </div>
//   );
// }
