// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import LogoutButton from "@/components/auth/LogoutButton";

// import {
//   Menu,
//   X,
//   LucideIcon,
// } from "lucide-react";

// type NavItem = {
//   label: string;
//   href: string;
//   icon: LucideIcon;
// };

// type MobileNavProps = {
//   title: string;
//   links: NavItem[];
//   showLogout?: boolean;
// };

// export default function MobileNav({
//   title,
//   links,
//   showLogout = true,
// }: MobileNavProps) {
//   const pathname = usePathname();

//   const [open, setOpen] =
//     useState(false);

//   return (
//     <>
//       {/* Mobile Header */}

//       <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-white px-5 py-4 shadow lg:hidden">

//         <h1 className="text-lg font-bold text-slate-900">
//           {title}
//         </h1>

//         <button
//           type="button"
//           onClick={() =>
//             setOpen(!open)
//           }
//           className="rounded-xl bg-slate-900 p-2 text-white transition hover:bg-slate-800"
//         >
//           {open ? (
//             <X size={22} />
//           ) : (
//             <Menu size={22} />
//           )}
//         </button>

//       </header>

//       {/* Mobile Drawer */}

//       {open && (

//         <div className="border-b bg-white shadow-lg lg:hidden">

//           <nav className="space-y-2 p-4">

//             {links.map((link) => {
//               const Icon =
//                 link.icon;

//               const active =
//                 pathname ===
//                 link.href;

//               return (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   onClick={() =>
//                     setOpen(false)
//                   }
//                   className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
//                     active
//                       ? "bg-slate-900 text-white"
//                       : "text-slate-700 hover:bg-slate-100"
//                   }`}
//                 >
//                   <Icon size={20} />

//                   {link.label}
//                 </Link>
//               );
//             })}

//             {showLogout && (

//               <div className="mt-4 border-t pt-4">

//                 <LogoutButton />

//               </div>

//             )}

//           </nav>

//         </div>

//       )}

//     </>
//   );
// }