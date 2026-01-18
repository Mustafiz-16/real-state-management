

import BuyerDashboard from "../components/dashboard/buyerdashboard/buyerdashboard";
export default function BuyerDashboardPage() {
    return (
        <div>
            <BuyerDashboard />
        </div>
    )
}


























// import React, { useState } from "react";
// import { Clock, Calendar, Heart } from 'lucide-react';
// import Navbar from "../components/layout/navbar/navbar";
// import Footer from "../components/layout/footer/footer";
// import ProfileSummary from "../components/dashboard/profileSummary/profilesummary";
// import SummaryCard from "../components/dashboard/summaryCard/summarycard";
// import BookingsTab from "../components/dashboard/TabContent/booking/booking";
// import SavedPropertiesTab from "../components/dashboard/TabContent/savedproperties/Savedproperties";
// import PaymentsTab from "../components/dashboard/TabContent/payment/payment";
// import NotificationsTab from "../components/dashboard/TabContent/notification/notification";
// import MessagesTab from "../components/dashboard/TabContent/message/message";

// // Color constants
// const PRIMARY_COLOR = "#ff6b36";

// // Static Data
// const userProfile = {
//     name: "Mustafizur Rahaman",
//     email: "mustafizur245@gmail.com",
//     isVerified: true,
//     purchasedCount: 0,
//     wishlistCount: 3,
//     upcomingVisitsCount: 2,
//     notificationsCount: 4,
// };

// const notifications = [
//     "Price dropped for Lake View Apartment",
//     "New property available in your preferred area",
//     "Your booking has been approved",
//     "Visit confirmed for tomorrow",
// ];

// const buyerSummary = { totalBookings: 4, upcomingVisits: 2, savedCount: 3 };

// const buyerBookings = [
//     { id: "b1", propertyTitle: "Modern Villa in Rajghonj", location: "Rajghonj, Cumilla", date: "2025-01-10", time: "11:00 AM", status: "Pending" },
//     { id: "b2", propertyTitle: "Lake View Apartment", location: "Tomsombridge, Cumilla", date: "2025-01-15", time: "3:30 PM", status: "Confirmed" },
//     { id: "b3", propertyTitle: "Commercial Space", location: "Kandirpur, Cumilla", date: "2025-01-22", time: "10:00 AM", status: "Cancelled" },
// ];

// const savedProperties = [
//     { id: "p1", title: "Cozy Studio in Banani", location: "Banani, Dhaka", price: "৳ 18,000 / month" },
//     { id: "p2", title: "Spacious Family Flat", location: "Mirpur, Dhaka", price: "৳ 75,00,000" },
//     { id: "p3", title: "Penthouse in Uttara", location: "Uttara, Dhaka", price: "৳ 1,20,00,000" },
// ];

// const payments = [
//     { id: "pay1", property: "Lake View Apartment", amount: "৳ 50,000", status: "Paid" },
//     { id: "pay2", property: "Modern Villa (Advance)", amount: "৳ 20,000", status: "Pending" },
// ];

// const conversations = [
//     { id: "c1", propertyTitle: "Modern Villa in Gulshan", withName: "Rahim (Owner)", lastMessage: "Sure, see you tomorrow!" },
//     { id: "c2", propertyTitle: "Lake View Apartment", withName: "Agent Sara", lastMessage: "I can arrange a visit this Friday." },
// ];

// const messagesByConversation = {
//     c1: [
//         { id: "m1", from: "me", text: "Hi, is the villa still available?" },
//         { id: "m2", from: "them", text: "Yes, it is available. What time works for you?" },
//         { id: "m3", from: "me", text: "Can we schedule a visit tomorrow at 11 AM?" },
//         { id: "m4", from: "them", text: "Sure, see you tomorrow!" },
//     ],
//     c2: [
//         { id: "m5", from: "me", text: "Can I get more photos of the apartment?" },
//         { id: "m6", from: "them", text: "I will upload them by evening. Is that okay?" },
//     ],
// };

// export default function BuyerDashboardPage() {
//     const [isLoggedIn, setIsLoggedIn] = useState(true);
//     const [activeTab, setActiveTab] = useState("bookings");
//     const [selectedConversationId, setSelectedConversationId] = useState(conversations[0]?.id || null);
//     const [newMessage, setNewMessage] = useState("");

//     const userName = userProfile.name.split(' ')[0];
//     const currentMessages = (selectedConversationId && messagesByConversation[selectedConversationId]) || [];

//     const handleSendMessage = () => {
//         if (!newMessage.trim() || !selectedConversationId) return;
//         console.log("Send message:", { conversationId: selectedConversationId, text: newMessage });
//         setNewMessage("");
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 font-sans">
//             <Navbar 
//                 isLoggedIn={isLoggedIn} 
//                 userName={userName} 
//                 notificationsCount={userProfile.notificationsCount} 
//                 onSignOut={() => setIsLoggedIn(false)}
//                 onSignIn={() => setIsLoggedIn(true)}
//             />
//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
//                 {/* Header */}
//                 <header className="space-y-3 pb-4 border-b border-gray-200">
//                     <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
//                         Your Dashboard
//                     </h1>
//                     <p className="text-lg text-gray-600">
//                         Quickly overview and manage all your property interactions.
//                     </p>
//                 </header>

//                 {/* Profile Summary */}
//                 <ProfileSummary user={userProfile} />

//                 {/* Summary Cards */}
//                 <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <SummaryCard label="Total Bookings" value={buyerSummary.totalBookings} Icon={Calendar} />
//                     <SummaryCard label="Upcoming Visits" value={buyerSummary.upcomingVisits} Icon={Clock} />
//                     <SummaryCard label="Saved Properties" value={buyerSummary.savedCount} Icon={Heart} />
//                 </section>

//                 {/* Tabs and Content */}
//                 <section className="bg-white shadow-2xl rounded-2xl p-6 border border-gray-100/70">
//                     {/* Tabs Navigation */}
//                     <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-6 flex-wrap">
//                         {["bookings", "saved", "payments", "notifications", "messages"].map((tab) => (
//                             <button
//                                 key={tab}
//                                 onClick={() => setActiveTab(tab)}
//                                 style={activeTab === tab ? { backgroundColor: PRIMARY_COLOR } : {}}
//                                 className={`flex-1 min-w-[120px] px-4 py-2 text-sm font-semibold rounded-xl transition duration-200 ${
//                                     activeTab === tab 
//                                         ? `text-white shadow-lg shadow-orange-500/50` 
//                                         : `text-gray-700 hover:bg-white hover:text-[${PRIMARY_COLOR}]`
//                                 }`}
//                             >
//                                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                             </button>
//                         ))}
//                     </div>

//                     {/* Tab Content */}
//                     <div>
//                         {activeTab === "bookings" && <BookingsTab bookings={buyerBookings} />}
//                         {activeTab === "saved" && <SavedPropertiesTab properties={savedProperties} />}
//                         {activeTab === "payments" && <PaymentsTab payments={payments} />}
//                         {activeTab === "notifications" && <NotificationsTab notifications={notifications} />}
//                         {activeTab === "messages" && (
//                             <MessagesTab
//                                 conversations={conversations}
//                                 selectedConversationId={selectedConversationId}
//                                 setSelectedConversationId={setSelectedConversationId}
//                                 messages={currentMessages}
//                                 newMessage={newMessage}
//                                 setNewMessage={setNewMessage}
//                                 handleSendMessage={handleSendMessage}
//                             />
//                         )}
//                     </div>
//                 </section>
//             </main>
//             <Footer />
//         </div>
//     );
// }