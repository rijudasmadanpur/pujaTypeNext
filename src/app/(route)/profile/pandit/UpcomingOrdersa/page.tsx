// "use client";
// import React, { useState, useMemo } from "react";
// import {
//   Calendar,
//   Clock,
//   User,
//   Filter,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// interface Booking {
//   id: string;
//   clientName: string;
//   event: string;
//   date: string;
//   time: string;
//   status: "confirmed" | "pending" | "cancelled";
//   duration?: string;
//   location?: string;
// }

// // Sample booking data
// const sampleBookings: Booking[] = [
//   {
//     id: "1",
//     clientName: "Rajesh Kumar",
//     event: "Durga Puja",
//     date: "2024-10-25",
//     time: "15:00",
//     status: "confirmed",
//     duration: "4 hours",
//     location: "Community Hall, Kolkata",
//   },
//   {
//     id: "2",
//     clientName: "Priya Sharma",
//     event: "Wedding Photography",
//     date: "2024-10-28",
//     time: "10:00",
//     status: "confirmed",
//     duration: "8 hours",
//     location: "Grand Palace, Delhi",
//   },
//   {
//     id: "3",
//     clientName: "Amit Patel",
//     event: "Birthday Party",
//     date: "2024-11-02",
//     time: "18:00",
//     status: "pending",
//     duration: "3 hours",
//     location: "Home, Mumbai",
//   },
//   {
//     id: "4",
//     clientName: "Sunita Das",
//     event: "Corporate Event",
//     date: "2024-11-05",
//     time: "09:00",
//     status: "confirmed",
//     duration: "6 hours",
//     location: "Office Complex, Bangalore",
//   },
//   {
//     id: "5",
//     clientName: "Vikram Singh",
//     event: "Diwali Celebration",
//     date: "2024-11-12",
//     time: "19:00",
//     status: "cancelled",
//     duration: "5 hours",
//     location: "Community Center, Jaipur",
//   },
// ];

// const BookingSection: React.FC = () => {
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

//   const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const formatTime = (timeString: string): string => {
//     const [hours, minutes] = timeString.split(":");
//     const hour = parseInt(hours);
//     const ampm = hour >= 12 ? "PM" : "AM";
//     const displayHour = hour % 12 || 12;
//     return `${displayHour}:${minutes} ${ampm}`;
//   };

//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case "confirmed":
//         return "bg-green-100 text-green-800 hover:bg-green-200";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
//       case "cancelled":
//         return "bg-red-100 text-red-800 hover:bg-red-200";
//       default:
//         return "bg-gray-100 text-gray-800 hover:bg-gray-200";
//     }
//   };

//   const filteredBookings = useMemo(() => {
//     return sampleBookings.filter(
//       (booking) => statusFilter === "all" || booking.status === statusFilter
//     );
//   }, [statusFilter]);

//   // Calendar logic
//   const getDaysInMonth = (date: Date): Date[] => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startDate = new Date(firstDay);
//     startDate.setDate(startDate.getDate() - firstDay.getDay());

//     const days: Date[] = [];
//     for (let i = 0; i < 42; i++) {
//       days.push(new Date(startDate));
//       startDate.setDate(startDate.getDate() + 1);
//     }
//     return days;
//   };

//   const getBookingsForDate = (date: Date): Booking[] => {
//     const dateStr = date.toISOString().split("T")[0];
//     return filteredBookings.filter((booking) => booking.date === dateStr);
//   };

//   const navigateMonth = (direction: "prev" | "next") => {
//     const newMonth = new Date(currentMonth);
//     newMonth.setMonth(newMonth.getMonth() + (direction === "next" ? 1 : -1));
//     setCurrentMonth(newMonth);
//   };

//   const calendarDays = getDaysInMonth(currentMonth);

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
//         <div className="flex items-center gap-4">
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-40">
//               <Filter className="h-4 w-4 mr-2" />
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Status</SelectItem>
//               <SelectItem value="confirmed">Confirmed</SelectItem>
//               <SelectItem value="pending">Pending</SelectItem>
//               <SelectItem value="cancelled">Cancelled</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <Tabs defaultValue="list" className="w-full">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="list">List View</TabsTrigger>
//           <TabsTrigger value="calendar">Calendar View</TabsTrigger>
//         </TabsList>

//         <TabsContent value="list" className="space-y-4">
//           <div className="grid gap-4">
//             {filteredBookings.length === 0 ? (
//               <Card>
//                 <CardContent className="flex items-center justify-center py-8">
//                   <p className="text-gray-500">No bookings found</p>
//                 </CardContent>
//               </Card>
//             ) : (
//               filteredBookings.map((booking) => (
//                 <Card
//                   key={booking.id}
//                   className="hover:shadow-md transition-shadow"
//                 >
//                   <CardContent className="p-6">
//                     <div className="flex justify-between items-start">
//                       <div className="space-y-3 flex-1">
//                         <div className="flex items-center gap-3">
//                           <h3 className="text-xl font-semibold text-gray-900">
//                             {booking.event}
//                           </h3>
//                           <Badge className={getStatusColor(booking.status)}>
//                             {booking.status.charAt(0).toUpperCase() +
//                               booking.status.slice(1)}
//                           </Badge>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
//                           <div className="flex items-center gap-2">
//                             <User className="h-4 w-4" />
//                             <span>Client: {booking.clientName}</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Calendar className="h-4 w-4" />
//                             <span>{formatDate(booking.date)}</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Clock className="h-4 w-4" />
//                             <span>{formatTime(booking.time)}</span>
//                             {booking.duration && (
//                               <span>({booking.duration})</span>
//                             )}
//                           </div>
//                           {booking.location && (
//                             <div className="flex items-center gap-2 col-span-1 md:col-span-2">
//                               <span className="text-sm">
//                                 📍 {booking.location}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       <div className="flex gap-2 ml-4">
//                         <Button variant="outline" size="sm">
//                           View Details
//                         </Button>
//                         <Button variant="outline" size="sm">
//                           Contact Client
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))
//             )}
//           </div>
//         </TabsContent>

//         <TabsContent value="calendar" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <div className="flex justify-between items-center">
//                 <CardTitle className="text-2xl">
//                   {currentMonth.toLocaleDateString("en-IN", {
//                     month: "long",
//                     year: "numeric",
//                   })}
//                 </CardTitle>
//                 <div className="flex gap-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => navigateMonth("prev")}
//                   >
//                     <ChevronLeft className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => navigateMonth("next")}
//                   >
//                     <ChevronRight className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-7 gap-2">
//                 {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
//                   (day) => (
//                     <div
//                       key={day}
//                       className="p-2 text-center font-semibold text-gray-500 text-sm"
//                     >
//                       {day}
//                     </div>
//                   )
//                 )}

//                 {calendarDays.map((day, index) => {
//                   const bookingsForDay = getBookingsForDate(day);
//                   const isCurrentMonth =
//                     day.getMonth() === currentMonth.getMonth();
//                   const isToday =
//                     day.toDateString() === new Date().toDateString();

//                   return (
//                     <div
//                       key={index}
//                       className={`min-h-20 p-2 border rounded-lg ${
//                         isCurrentMonth ? "bg-white" : "bg-gray-50"
//                       } ${
//                         isToday ? "ring-2 ring-orange-500" : ""
//                       } hover:bg-gray-50 transition-colors`}
//                     >
//                       <div
//                         className={`text-sm font-medium ${
//                           isCurrentMonth ? "text-gray-900" : "text-gray-400"
//                         }`}
//                       >
//                         {day.getDate()}
//                       </div>

//                       <div className="space-y-1 mt-1">
//                         {bookingsForDay.slice(0, 2).map((booking) => (
//                           <div
//                             key={booking.id}
//                             className={`text-xs p-1 rounded text-white truncate ${
//                               booking.status === "confirmed"
//                                 ? "bg-green-500"
//                                 : booking.status === "pending"
//                                 ? "bg-yellow-500"
//                                 : "bg-red-500"
//                             }`}
//                             title={`${booking.event} - ${
//                               booking.clientName
//                             } at ${formatTime(booking.time)}`}
//                           >
//                             {booking.event}
//                           </div>
//                         ))}
//                         {bookingsForDay.length > 2 && (
//                           <div className="text-xs text-gray-500">
//                             +{bookingsForDay.length - 2} more
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default BookingSection;
"use client";
import React, { useState, useMemo, useEffect } from "react";
// ... your other imports

const BookingSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isClient, setIsClient] = useState(false);

  // This ensures the component only renders on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ... rest of your component logic

  if (!isClient) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <div className="animate-pulse bg-gray-200 h-10 w-40 rounded"></div>
        </div>
        <div className="animate-pulse bg-gray-200 h-64 rounded"></div>
      </div>
    );
  }

  // ... rest of your return JSX
};

export default BookingSection;