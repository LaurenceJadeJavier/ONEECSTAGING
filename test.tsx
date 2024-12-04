// "use client";
// import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/ui/datatable";
// import { ColumnDef, PaginationState } from "@tanstack/react-table";
// import { ArrowUpDown } from "lucide-react";
// import { LiaEditSolid } from "react-icons/lia";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { z } from "zod";
// import { combinedSchema } from "../../../../utils/schema/coordinator/useAddUserSchema";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect, useMemo, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import Spinner from "@/components/ui/spinner";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useGetAllRoles } from "../../../../utils/custom hooks/coor/useCoorItems";
// import MultipleSelector, { Option } from "@/components/ui/multi-selector";
// import { Coors } from "../../../../types/useCoorTypes";
// import {
//   useAddUser,
//   useDeleteCoorUser,
//   useGetCoor,
//   useUpdateCoor,
//   useUserTable,
// } from "../../../../utils/custom hooks/coor/useUsersItems";

// type FormValues = z.infer<typeof combinedSchema>;

// export default function UserPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const form = useForm<FormValues>({
//     defaultValues: {
//       address: "",
//       email: "",
//       first_name: "",
//       middle_name: "",
//       last_name: "",
//       contact_number: "",
//       roleIds: [],
//     },
//     resolver: zodResolver(combinedSchema),
//   });
//   const updateForm = useForm<FormValues>({
//     defaultValues: {
//       address: "",
//       email: "",
//       first_name: "",
//       middle_name: "",
//       last_name: "",
//       contact_number: "",
//       roleIds: [],
//     },
//     resolver: zodResolver(combinedSchema),
//   });

//   const [page, setPage] = useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//   const pagination = useMemo(
//     () => ({
//       pageIndex: page.pageIndex,
//       pageSize: page.pageSize,
//     }),
//     [page]
//   );

//   const { data, isLoading: load } = useUserTable(pagination);

//   const column = useMemo<ColumnDef<Coors>[]>(
//     () => [
//       {
//         accessorKey: "id",
//         header: ({ column }) => (
//           <Button
//             className="text-xs"
//             variant="table"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Id
//             <ArrowUpDown className="ml-2 h-3 w-3" />
//           </Button>
//         ),
//       },
//       {
//         accessorKey: "full_name",
//         header: ({ column }) => (
//           <Button
//             className="text-xs"
//             variant="table"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Full Name
//             <ArrowUpDown className="ml-2 h-3 w-3" />
//           </Button>
//         ),
//         cell: ({ row }) => {
//           const { first_name, middle_name, last_name } = row.original;
//           return `${first_name || ""} ${middle_name || ""} ${
//             last_name || ""
//           }`.trim();
//         },
//       },
//       {
//         accessorKey: "email",
//         header: ({ column }) => (
//           <Button
//             className="text-xs"
//             variant="table"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Email
//             <ArrowUpDown className="ml-2 h-3 w-3" />
//           </Button>
//         ),
//       },
//       {
//         accessorKey: "contact_number",
//         header: ({ column }) => (
//           <Button
//             className="text-xs"
//             variant="table"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Contact
//             <ArrowUpDown className="ml-2 h-3 w-3" />
//           </Button>
//         ),
//       },
//       {
//         accessorKey: "address",
//         header: ({ column }) => (
//           <Button
//             className="text-xs"
//             variant="table"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Address
//             <ArrowUpDown className="ml-2 h-3 w-3" />
//           </Button>
//         ),
//       },
//       {
//         id: "action",
//         header: "Action",
//         cell: ({ row }) => (
//           <div>
//             <Button
//               size="icon"
//               variant="link"
//               onClick={() => handleEditClick(row.original.id)}
//             >
//               <LiaEditSolid color="#2E65F3" size={20} />
//             </Button>
//             <Button
//               size="icon"
//               variant="link"
//               onClick={() => handleDeleteClick(row.original.id)}
//             >
//               <RiDeleteBin5Line color="#F32D2D" size={20} />
//             </Button>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const { mutate, isPending } = useAddUser();
//   const { mutate: updateCoor, isPending: coorLoading } = useUpdateCoor();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedCoopId, setSelectedCoopId] = useState<number | null>(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const { mutate: deleteCoor, isPending: deleteCoorLoading } =
//     useDeleteCoorUser();
//   const { data: getCoorData, isLoading: getCoorDataLoading } = useGetCoor(
//     selectedCoopId ?? 0
//   );
//   const { data: rolesData, isLoading } = useGetAllRoles();

//   const roles =
//     rolesData?.data.roles.map((role) => ({
//       value: role.id, // Assuming `id` is the unique identifier
//       label: role.name, // Assuming `name` is the display name
//     })) || [];

//   useEffect(() => {
//     if (getCoorData) {
//       const formattedRoleIds = getCoorData.data.role.map((roleId: string) => ({
//         label: roleId,
//         value: roleId,
//         disabled: false,
//       }));

//       updateForm.reset({
//         first_name: getCoorData.data.first_name || "",
//         middle_name: getCoorData.data.middle_name || "",
//         last_name: getCoorData.data.last_name || "",
//         address: getCoorData.data.address || "",
//         contact_number: getCoorData.data.contact_number || "",
//         email: getCoorData.data.email || "",
//         roleIds: formattedRoleIds,
//       });
//     }
//   }, [getCoorData, updateForm]);

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleSubmitValue = (value: FormValues) => {
//     const payload = {
//       data: {
//         first_name: value.first_name,
//         middle_name: value.middle_name,
//         last_name: value.last_name,
//         email: value.email,
//         contact_number: value.contact_number,
//         address: value.address,
//       },
//       roleIds: value.roleIds,
//     };
//     mutate(payload, {
//       onSuccess: () => {
//         setIsModalOpen(false);
//       },
//     });
//   };

//   const handleDeleteClick = (id: number) => {
//     setIsDeleteModalOpen(true);
//     setSelectedCoopId(id);
//   };

//   const handleConfirmDelete = () => {
//     if (selectedCoopId !== null) {
//       deleteCoor(selectedCoopId, {
//         onSuccess: () => {
//           setIsDeleteModalOpen(false);
//           setSelectedCoopId(null);
//         },
//       });
//     }
//   };

//   const handleEditClick = (id: number) => {
//     setSelectedCoopId(id);
//     setIsUpdateModalOpen(true);
//   };

//   return (
//     <>
//       <div className="w-full px-10">
//         <div className="w-full py-2">
//           <Button onClick={handleOpenModal}>Add User</Button>
//         </div>
//         <DataTable
//           columns={column}
//           data={data?.data || []}
//           isLoading={load}
//           pageCount={data?.totalPages || 0}
//           pagination={pagination}
//           onPageChange={setPage}
//         />
//         <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
//           <DialogHeader>
//             <DialogTitle>Add User</DialogTitle>
//           </DialogHeader>
//           <DialogContent>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(handleSubmitValue)}
//                 className="space-y-4"
//               >
//                 <FormField
//                   control={form.control}
//                   name="first_name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>First Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="First Name" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="middle_name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Middle Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Middle Name" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="last_name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Last Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Last Name" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Email" type="email" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="contact_number"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Contact Number</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Contact Number"
//                           type="tel"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="address"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Address</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Address" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="roleIds"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Roles</FormLabel>
//                       <FormControl>
//                         <MultipleSelector
//                           options={roles}
//                           {...field}
//                           value={field.value || []}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button type="submit" disabled={isPending}>
//                   {isPending ? <Spinner /> : "Submit"}
//                 </Button>
//               </form>
//             </Form>
//           </DialogContent>
//         </Dialog>
//         <Dialog
//           open={isUpdateModalOpen}
//           onOpenChange={() => setIsUpdateModalOpen(false)}
//         >
//           <DialogHeader>
//             <DialogTitle>Edit User</DialogTitle>
//           </DialogHeader>
//           <DialogContent>
//             <Form {...updateForm}>
//               <form
//                 onSubmit={updateForm.handleSubmit((value) => {
//                   if (selectedCoopId !== null) {
//                     const payload = {
//                       ...value,
//                       id: selectedCoopId,
//                     };
//                     updateCoor(payload, {
//                       onSuccess: () => {
//                         setIsUpdateModalOpen(false);
//                         setSelectedCoopId(null);
//                       },
//                     });
//                   }
//                 })}
//                 className="space-y-4"
//               >
//                 <FormField
//                   control={updateForm.control}
//                   name="first_name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>First Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="First Name" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={updateForm.control}
//                   name="middle_name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Middle Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Middle Name" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={updateForm.control}
//                   name="last_name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Last Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Last Name" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={updateForm.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Email" type="email" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={updateForm.control}
//                   name="contact_number"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Contact Number</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Contact Number"
//                           type="tel"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={updateForm.control}
//                   name="address"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Address</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Address" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={updateForm.control}
//                   name="roleIds"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Roles</FormLabel>
//                       <FormControl>
//                         <MultipleSelector
//                           options={roles}
//                           {...field}
//                           value={field.value || []}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button type="submit" disabled={coorLoading}>
//                   {coorLoading ? <Spinner /> : "Update"}
//                 </Button>
//               </form>
//             </Form>
//           </DialogContent>
//         </Dialog>
//         <Dialog
//           open={isDeleteModalOpen}
//           onOpenChange={() => setIsDeleteModalOpen(false)}
//         >
//           <DialogHeader>
//             <DialogTitle>Confirm Delete</DialogTitle>
//           </DialogHeader>
//           <DialogContent>
//             <p>Are you sure you want to delete this user?</p>
//             <Button onClick={handleConfirmDelete} disabled={deleteCoorLoading}>
//               {deleteCoorLoading ? <Spinner /> : "Delete"}
//             </Button>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </>
//   );
// }
