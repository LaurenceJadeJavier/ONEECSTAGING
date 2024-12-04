// // CoorSidebar.tsx
// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ReactNode } from "react";
// import { FiUsers } from "react-icons/fi";
// import { MdOutlineAccountBalance } from "react-icons/md";
// import { HiOutlineShieldCheck } from "react-icons/hi";
// import { Button } from "./ui/button";
// import logo from "../../assets/image/whitelogo.png";
// import { useAuthContext } from "../../utils/useAuth";
// import { useRouter } from "next/navigation";
// import { useMutation } from "@tanstack/react-query";
// import { useLogout } from "../../utils/custom hooks/auth/useLogout";
// import { deleteCookie, getCookie } from "cookies-next";
// import toast from "react-hot-toast";
// import Spinner from "./ui/spinner";
// import { useCoorLogout } from "../../utils/custom hooks/auth/useCoordinatorAuth";

// interface MenuItem {
//   label: string;
//   key: string;
//   icon: ReactNode;
// }

// function CoorSidebar() {
//   const { user } = useAuthContext();

//   const sidebarItems: MenuItem[] = [
//     {
//       label: "Role Management",
//       key: "/role-management",
//       icon: <HiOutlineShieldCheck />,
//     },
//     {
//       label: "Users",
//       key: "/users",
//       icon: <FiUsers />,
//     },
//     {
//       label: "Statement of Accounts",
//       key: "/statement-of-accounts",
//       icon: <MdOutlineAccountBalance />,
//     },
//   ];

//   const generateMenuItems = () => {
//     if (!user?.role?.permission) {
//       return [];
//     }

//     const newItem: MenuItem[] = [];
//     user.role.permission.forEach((data) => {
//       if (!data) return;

//       if (data === "/role-management") {
//         newItem.push({
//           label: "Role Management",
//           key: data,
//           icon: <HiOutlineShieldCheck />,
//         });
//       }

//       if (data === "/users") {
//         newItem.push({
//           label: "Users",
//           key: data,
//           icon: <FiUsers />,
//         });
//       }

//       if (data === "/statement-of-accounts") {
//         newItem.push({
//           label: "Statement of Accounts",
//           key: "/statement-of-accounts",
//           icon: <MdOutlineAccountBalance />,
//         });
//       }
//     });

//     return newItem;
//   };

//   const renderItems = (items: MenuItem[]) => {
//     const router = useRouter();

//     const [searchText, setSearchText] = useState("");
//     const { mutateAsync, isPending } = useMutation({
//       mutationFn: useCoorLogout,
//       networkMode: "always",
//     });

//     async function handleLogout() {
//       const token = getCookie("token");
//       if (!token) {
//         toast.error("No token found. Please log in.");
//         return;
//       }
//       try {
//         const res = await mutateAsync(token);
//         if (res.status === 200) {
//           deleteCookie("token");
//           router.push("/admin-login");
//           toast.success("Logged out successfully.");
//         }
//       } catch (error: any) {
//         toast.error(error.message);
//       }
//     }

//     return (
//       <div className="w-56 bg-[#263238] min-h-screen flex flex-row fixed h-full">
//         <div className="w-full flex flex-col justify-between my-6 px-2">
//           <div className="mx-auto">
//             <Image src={logo} alt="logo" />
//             <ul className="mt-6">
//               {items.map((item) => (
//                 <li key={item.key}>
//                   <Link href={item.key} passHref>
//                     <h1 className="flex items-center gap-3 text-white text-sm pt-4">
//                       {item.icon}
//                       <span>{item.label}</span>
//                     </h1>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <Button
//               size={"sm"}
//               variant={"ghost"}
//               className="w-full bg-[#74E291] text-[#272829]"
//               onClick={handleLogout}
//               disabled={isPending}
//             >
//               {isPending ? <Spinner /> : "Logout"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const filteredItems = generateMenuItems();

//   return (
//     <>
//       <aside>
//         <ul>{renderItems(filteredItems)}</ul>
//       </aside>
//     </>
//   );
// }

// export default CoorSidebar;
