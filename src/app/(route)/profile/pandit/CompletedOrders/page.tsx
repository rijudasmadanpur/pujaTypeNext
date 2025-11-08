// "use client";
// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Calendar, MapPin, Clock, Star, Filter, Search } from "lucide-react";

// interface PastOrder {
//   id: string;
//   pujaName: string;
//   date: string;
//   time: string;
//   location: string;
//   status: "completed" | "cancelled";
//   amount: number;
//   rating?: number;
//   panditName: string;
//   category: string;
//   image?: string;
// }

// const PastOrdersDashboard: React.FC = () => {
//   const [selectedFilter, setSelectedFilter] = useState<
//     "all" | "completed" | "cancelled"
//   >("all");
//   const [searchTerm, setSearchTerm] = useState("");

//   // Sample data - replace with your actual data source
//   const pastOrders: PastOrder[] = [
//     {
//       id: "1",
//       pujaName: "Ganesh Chaturthi Puja",
//       date: "2024-08-15",
//       time: "10:00 AM",
//       location: "Mumbai, Maharashtra",
//       status: "completed",
//       amount: 2500,
//       rating: 5,
//       panditName: "Pandit Rajesh Sharma",
//       category: "Festival Puja",
//       image:
//         "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
//     },
//     {
//       id: "2",
//       pujaName: "Griha Pravesh Ceremony",
//       date: "2024-07-22",
//       time: "6:00 AM",
//       location: "Delhi, India",
//       status: "completed",
//       amount: 5000,
//       rating: 4,
//       panditName: "Pandit Suresh Kumar",
//       category: "House Warming",
//       image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400",
//     },
//     {
//       id: "3",
//       pujaName: "Satyanarayan Puja",
//       date: "2024-06-10",
//       time: "7:00 PM",
//       location: "Pune, Maharashtra",
//       status: "completed",
//       amount: 1500,
//       rating: 5,
//       panditName: "Pandit Amit Joshi",
//       category: "Religious Ceremony",
//       image:
//         "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=400",
//     },
//     {
//       id: "4",
//       pujaName: "Navratri Special Puja",
//       date: "2024-05-18",
//       time: "8:00 PM",
//       location: "Ahmedabad, Gujarat",
//       status: "cancelled",
//       amount: 3000,
//       panditName: "Pandit Vishnu Patel",
//       category: "Festival Puja",
//       image:
//         "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400",
//     },
//     {
//       id: "5",
//       pujaName: "Diwali Lakshmi Puja",
//       date: "2024-04-05",
//       time: "6:30 PM",
//       location: "Jaipur, Rajasthan",
//       status: "completed",
//       amount: 2000,
//       rating: 4,
//       panditName: "Pandit Mohan Lal",
//       category: "Festival Puja",
//       image:
//         "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400",
//     },
//   ];

//   const filteredOrders = pastOrders.filter((order) => {
//     const matchesFilter =
//       selectedFilter === "all" || order.status === selectedFilter;
//     const matchesSearch =
//       order.pujaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.panditName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.category.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   const renderStars = (rating?: number) => {
//     if (!rating) return null;
//     return (
//       <div className="flex items-center gap-1">
//         {[...Array(5)].map((_, i) => (
//           <Star
//             key={i}
//             className={`w-4 h-4 ${
//               i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
//             }`}
//           />
//         ))}
//         <span className="ml-1 text-sm text-gray-600">({rating})</span>
//       </div>
//     );
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "completed":
//         return (
//           <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
//             Completed
//           </Badge>
//         );
//       case "cancelled":
//         return (
//           <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
//             Cancelled
//           </Badge>
//         );
//       default:
//         return <Badge variant="secondary">{status}</Badge>;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Completed Orders</h1>
//           {/* <p className="text-lg text-gray-600">
//             View your completed and past puja bookings
//           </p> */}
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-green-100">Total Completed</p>
//                   <p className="text-3xl font-bold">
//                     {pastOrders.filter((o) => o.status === "completed").length}
//                   </p>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-full">
//                   <Calendar className="w-6 h-6" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-red-400 to-red-500 text-white">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-blue-100">Total Amount Spent</p>
//                   <p className="text-3xl font-bold">
//                     ₹
//                     {pastOrders
//                       .filter((o) => o.status === "completed")
//                       .reduce((sum, o) => sum + o.amount, 0)
//                       .toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-full">
//                   <Star className="w-6 h-6" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-purple-100">Average Rating</p>
//                   <p className="text-3xl font-bold">
//                     {(
//                       pastOrders
//                         .filter((o) => o.rating)
//                         .reduce((sum, o) => sum + (o.rating || 0), 0) /
//                       pastOrders.filter((o) => o.rating).length
//                     ).toFixed(1)}
//                   </p>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-full">
//                   <MapPin className="w-6 h-6" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Filters and Search */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by puja name, pandit, or category..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="flex gap-2">
//             <Button
//               variant={selectedFilter === "all" ? "default" : "outline"}
//               onClick={() => setSelectedFilter("all")}
//               className="flex items-center gap-2"
//             >
//               <Filter className="w-4 h-4" />
//               All Orders
//             </Button>
//             <Button
//               variant={selectedFilter === "completed" ? "default" : "outline"}
//               onClick={() => setSelectedFilter("completed")}
//             >
//               Completed
//             </Button>
//             <Button
//               variant={selectedFilter === "cancelled" ? "default" : "outline"}
//               onClick={() => setSelectedFilter("cancelled")}
//             >
//               Cancelled
//             </Button>
//           </div>
//         </div>

//         {/* Orders Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredOrders.map((order) => (
//             <Card
//               key={order.id}
//               className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
//             >
//               {order.image && (
//                 <div className="h-48 overflow-hidden">
//                   <img
//                     src={order.image}
//                     alt={order.pujaName}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                   />
//                 </div>
//               )}
//               <CardHeader className="pb-2">
//                 <div className="flex justify-between items-start mb-2">
//                   <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
//                     {order.pujaName}
//                   </CardTitle>
//                   {getStatusBadge(order.status)}
//                 </div>
//                 <CardDescription className="text-sm text-gray-600">
//                   {order.category}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="pt-0">
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Calendar className="w-4 h-4 text-orange-500" />
//                     <span>
//                       {new Date(order.date).toLocaleDateString("en-IN", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </span>
//                     <Clock className="w-4 h-4 text-orange-500 ml-2" />
//                     <span>{order.time}</span>
//                   </div>

//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <MapPin className="w-4 h-4 text-orange-500" />
//                     <span>{order.location}</span>
//                   </div>

//                   <div className="text-sm text-gray-600">
//                     <span className="font-medium">Pandit:</span>{" "}
//                     {order.panditName}
//                   </div>

//                   {order.status === "completed" && order.rating && (
//                     <div>{renderStars(order.rating)}</div>
//                   )}

//                   <div className="flex justify-between items-center pt-3 border-t">
//                     <span className="text-xl font-bold text-orange-600">
//                       ₹{order.amount.toLocaleString()}
//                     </span>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="hover:bg-orange-50 hover:border-orange-200"
//                     >
//                       View Details
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {filteredOrders.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">🕉️</div>
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               No orders found
//             </h3>
//             <p className="text-gray-500">
//               Try adjusting your search or filter criteria
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PastOrdersDashboard;
// page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export default async function CompletedOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Please log in to view your completed orders</div>;
  }

  return (
    <div>
      <h1>Completed Orders</h1>
      <p>Your completed orders will appear here</p>
    </div>
  );
}