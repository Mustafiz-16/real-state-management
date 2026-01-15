import React, { useState, useEffect } from "react";
import Navbar from "../../layout/navbar/navbar";
import Footer from "../../layout/footer/footer";
import ProfileSummary from "./components/profileSummary/profilesummary";
import SummaryCard from "./components/summarycard/summarycard";
import BookingsTab from "./components/TabContent/booking/booking";
import SavedPropertiesTab from "./components/TabContent/savedproperties/Savedproperties";
//import PaymentsTab from "../TabContent/payment/payment";


import { useLocation } from "react-router-dom";


import NotificationsTab from "./components/TabContent/notification/notification";
import { getConversations } from "../../../Api/conversation.api";
import { getMessages } from "../../../Api/message.api";


import MessagesTab from "./components/TabContent/message/message";
import useChatSocket from "../../../hooks/usechatsocket";
//import { getSocket } from "../../../utils/socket";
import socket from "../../../utils/socket";
import { Calendar, Clock, Heart } from 'lucide-react';
import "./buyerdashboard.css";

const PRIMARY_COLOR = "#ff6b36";

// ... [All static data here as before]
const userProfile = {
    name: "Mustafizur Rahaman",
    email: "mustafizur245@gmail.com",
    isVerified: true,
    purchasedCount: 0,
    wishlistCount: 3,
    upcomingVisitsCount: 2,
    notificationsCount: 4,
};

const notifications = [
    "Price dropped for Lake View Apartment",
    "New property available in your preferred area",
    "Your booking has been approved",
    "Visit confirmed for tomorrow",
];

const buyerSummary = { totalBookings: 4, upcomingVisits: 2, savedCount: 3 };

const buyerBookings = [
    { id: "b1", propertyTitle: "Modern Villa in Rajghonj", location: "Rajghonj, Cumilla", date: "2025-01-10", time: "11:00 AM", status: "Pending" },
    { id: "b2", propertyTitle: "Lake View Apartment", location: "Tomsombridge, Cumilla", date: "2025-01-15", time: "3:30 PM", status: "Confirmed" },
    { id: "b3", propertyTitle: "Commercial Space", location: "Kandirpur, Cumilla", date: "2025-01-22", time: "10:00 AM", status: "Cancelled" },
];

const savedProperties = [
    { id: "p1", title: "Cozy Studio in Banani", location: "Banani, Dhaka", price: "৳ 18,000 / month" },
    { id: "p2", title: "Spacious Family Flat", location: "Mirpur, Dhaka", price: "৳ 75,00,000" },
    { id: "p3", title: "Penthouse in Uttara", location: "Uttara, Dhaka", price: "৳ 1,20,00,000" },
];

// const payments = [
//     { id: "pay1", property: "Lake View Apartment", amount: "৳ 50,000", status: "Paid" },
//     { id: "pay2", property: "Modern Villa (Advance)", amount: "৳ 20,000", status: "Pending" },
// ];

// const conversations = [
//     { id: "c1", propertyTitle: "Modern Villa in Gulshan", withName: "Rahim (Owner)", lastMessage: "Sure, see you tomorrow!" },
//     { id: "c2", propertyTitle: "Lake View Apartment", withName: "Rana (owner)", lastMessage: "I can arrange a visit this Friday." },
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



export default function BuyerDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    //const socket = getSocket(user._id);

    const location = useLocation();


    const userId = user?._id;

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [activeTab, setActiveTab] = useState("bookings");
    //const [selectedConversationId, setSelectedConversationId] = useState(conversations[0]?.id || null);


    const [conversations, setConversations] = useState([]); // initially empty

    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [messages, setMessages] = useState([]); // initially empty

    const [newMessage, setNewMessage] = useState("");
    //const userId = "buyer123"; // dummy user id

    // const [messages, setMessages] = useState(
    //     messagesByConversation[selectedConversationId] || []
    // );

    // useEffect(() => {
    //     setMessages(messagesByConversation[selectedConversationId] || []);
    // }, [selectedConversationId]);

    useEffect(() => {
        if (location.state?.openConversationId) {
            setActiveTab("messages");
            setSelectedConversationId(location.state.openConversationId);
        }
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);







    const userName = userProfile.name.split(' ')[0];
    //const currentMessages = (selectedConversationId && messagesByConversation[selectedConversationId]) || [];


    // useChatSocket(selectedConversationId, (message) => {
    //     setMessages((prev) => [...prev, {
    //         id: message._id,
    //         text: message.text,
    //         from: message.sender_id === userId ? "me" : "them"
    //     }]);
    // });
    // useEffect(() => {
    //     if (!userId) return;

    //     getConversations()
    //         .then(res => {
    //             setConversations(res.data);
    //             //if (res.data.length > 0) setSelectedConversationId(res.data[0].id);
    //             if (res.data.length > 0) {
    //                 setSelectedConversationId(res.data[0]._id);
    //             }

    //         })
    //         .catch(err => console.error("Error fetching conversations:", err));
    // }, [userId]);


    useEffect(() => {
        if (!userId) return;

        getConversations()
            .then(res => {
                setConversations(res.data);

                // ✅ IMPORTANT: overwrite করবে না
                if (res.data.length > 0 && !selectedConversationId) {
                    setSelectedConversationId(res.data[0]._id);
                }
            })
            .catch(err => console.error("Error fetching conversations:", err));
    }, [userId, selectedConversationId]);



    useEffect(() => {
        if (!selectedConversationId) return;

        getMessages(selectedConversationId)
            .then(res => setMessages(res.data))
            .catch(err => console.error("Error fetching messages:", err));
    }, [selectedConversationId]);

    // useEffect(() => {
    //     if (!selectedConversationId) return;

    //     // 🔥 এটা যোগ করো
    //     socket.emit("joinRoom", selectedConversationId);

    //     console.log("Joined room:", selectedConversationId); // Debug করতে
    // }, [selectedConversationId]);



    // useChatSocket(selectedConversationId, (message) => {
    //     setMessages(prev => [
    //         ...prev,
    //         {
    //             id: message._id,
    //             text: message.text,
    //             from: message.sender_id === userId ? "me" : "them"
    //         }
    //     ]);
    // });

    // useChatSocket(openConversationId, (msg) => {
    //     setMessages(prev => [...prev, msg]);
    // });


    useChatSocket(selectedConversationId, (msg) => {
        // Prevent duplicates and format message properly
        setMessages(prev => {
            if (prev.some(m => m._id === msg._id)) return prev;
            return [...prev, {
                _id: msg._id,
                text: msg.text,
                sender_id: msg.sender_id,
                createdAt: msg.createdAt
            }];
        });
    });





    // const handleSendMessage = () => {
    //     if (!newMessage.trim()) return;

    //     socket.emit("sendMessage", {
    //         conversationId: selectedConversationId,
    //         senderId: userId,
    //         text: newMessage
    //     });

    //     setNewMessage("");
    // };

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        console.log("🔥 Sending message:", {
            conversationId: selectedConversationId,
            senderId: userId,
            text: newMessage
        });

        socket.emit("sendMessage", {
            conversationId: selectedConversationId,
            senderId: userId,
            text: newMessage
        });

        setNewMessage("");
    };

    // const handleSendMessage = () => {
    //     if (!newMessage.trim() || !selectedConversationId) return;
    //     console.log("Send message:", { conversationId: selectedConversationId, text: newMessage });
    //     setNewMessage("");
    // };

    const handleSignOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setIsLoggedIn(false);             // state update
        window.location.href = "/auth";   // redirect login page e
    };




    return (
        <div className="dashboard-page">
            {/* <Navbar
                isLoggedIn={isLoggedIn}
                // userName={userName}
                userName={user.name.split(" ")[0]}
                notificationsCount={userProfile.notificationsCount}
                onSignOut={() => setIsLoggedIn(false)}
                onSignIn={() => setIsLoggedIn(true)}
            /> */}
            {/* <Navbar
                isLoggedIn={!!user}
                userName={userName}
                notificationsCount={user.notificationsCount || 0}
                onSignOut={handleSignOut}
            /> */}
            <Navbar
                isLoggedIn={!!user}
                userName={user.name.split(" ")[0]}
                notificationsCount={user.notificationsCount || 0}
                onSignOut={handleSignOut}
            />

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h1>Your Dashboard</h1>
                    <p>Quickly overview and manage all your property interactions.</p>
                </header>

                {/* <ProfileSummary user={userProfile}  user={user} /> */}
                <ProfileSummary user={user} />
                <section className="summary-cards">
                    <SummaryCard label="Total Bookings" value={buyerSummary.totalBookings} Icon={Calendar} />
                    <SummaryCard label="Upcoming Visits" value={buyerSummary.upcomingVisits} Icon={Clock} />
                    <SummaryCard label="Saved Properties" value={buyerSummary.savedCount} Icon={Heart} />
                </section>

                <section className="tab-section">
                    <div className="tabs-nav">
                        {["bookings", "saved", "notifications", "messages"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={activeTab === tab ? "active" : "inactive"}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="tab-content">
                        {activeTab === "bookings" && <BookingsTab bookings={buyerBookings} />}
                        {activeTab === "saved" && <SavedPropertiesTab properties={savedProperties} />}
                        {/* {activeTab === "payments" && <PaymentsTab payments={payments} />} */}
                        {activeTab === "notifications" && <NotificationsTab notifications={notifications} />}
                        {activeTab === "messages" && (
                            <MessagesTab
                                conversations={conversations}
                                selectedConversationId={selectedConversationId}
                                setSelectedConversationId={setSelectedConversationId}
                                //messages={currentMessages}
                                messages={messages}
                                newMessage={newMessage}
                                setNewMessage={setNewMessage}
                                handleSendMessage={handleSendMessage}
                            />
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
// import React, { useState, useEffect } from "react";
// import Navbar from "../../layout/navbar/navbar";
// import Footer from "../../layout/footer/footer";
// import ProfileSummary from "../profileSummary/profilesummary";
// import SummaryCard from "../summarycard/summarycard";
// import BookingsTab from "../TabContent/booking/booking";
// import SavedPropertiesTab from "../TabContent/savedproperties/Savedproperties";
// import PaymentsTab from "../TabContent/payment/payment";
// import NotificationsTab from "../TabContent/notification/notification";
// import MessagesTab from "../TabContent/message/message";
// import useChatSocket from "../../../hooks/usechatsocket";
// import socket from "../../../utils/socket";
// import { Calendar, Clock, Heart } from 'lucide-react';
// import { getConversations } from "../../../Api/conversation.api";
// import { getMessages } from "../../../Api/message.api";
// import "./buyerdashboard.css";

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

// export default function BuyerDashboard() {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const userId = user?._id;

//     const [isLoggedIn, setIsLoggedIn] = useState(true);
//     const [activeTab, setActiveTab] = useState("bookings");
//     const [conversations, setConversations] = useState([]);
//     const [selectedConversationId, setSelectedConversationId] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");

//     const userName = userProfile.name.split(' ')[0];

//     // Load conversations
//     useEffect(() => {
//         if (!userId) return;

//         getConversations()
//             .then(res => {
//                 setConversations(res.data);
//                 if (res.data.length > 0) setSelectedConversationId(res.data[0].id);
//             })
//             .catch(err => console.error("Error fetching conversations:", err));
//     }, [userId]);

//     // Load messages for selected conversation
//     useEffect(() => {
//         if (!selectedConversationId) {
//             setMessages([]);
//             return;
//         }

//         getMessages(selectedConversationId)
//             .then(res => setMessages(res.data))
//             .catch(err => console.error("Error fetching messages:", err));
//     }, [selectedConversationId]);

//     // Socket listener for incoming messages
//     useChatSocket(selectedConversationId, (message) => {
//         setMessages(prev => [
//             ...prev,
//             {
//                 id: message._id,
//                 text: message.text,
//                 from: message.sender_id === userId ? "me" : "them"
//             }
//         ]);
//     });

//     const handleSendMessage = () => {
//         if (!newMessage.trim() || !selectedConversationId) return;

//         socket.emit("sendMessage", {
//             conversationId: selectedConversationId,
//             senderId: userId,
//             text: newMessage
//         });

//         setNewMessage("");
//     };

//     const handleSignOut = () => {
//         localStorage.removeItem("user");
//         setIsLoggedIn(false);
//         window.location.href = "/auth";
//     };

//     return (
//         <div className="dashboard-page">
//             <Navbar
//                 isLoggedIn={!!user}
//                 userName={userName}
//                 notificationsCount={user.notificationsCount || 0}
//                 onSignOut={handleSignOut}
//             />

//             <main className="dashboard-main">
//                 <header className="dashboard-header">
//                     <h1>Your Dashboard</h1>
//                     <p>Quickly overview and manage all your property interactions.</p>
//                 </header>

//                 <ProfileSummary user={userProfile} />

//                 <section className="summary-cards">
//                     <SummaryCard label="Total Bookings" value={buyerSummary.totalBookings} Icon={Calendar} />
//                     <SummaryCard label="Upcoming Visits" value={buyerSummary.upcomingVisits} Icon={Clock} />
//                     <SummaryCard label="Saved Properties" value={buyerSummary.savedCount} Icon={Heart} />
//                 </section>

//                 <section className="tab-section">
//                     <div className="tabs-nav">
//                         {["bookings", "saved", "payments", "notifications", "messages"].map((tab) => (
//                             <button
//                                 key={tab}
//                                 onClick={() => setActiveTab(tab)}
//                                 className={activeTab === tab ? "active" : "inactive"}
//                             >
//                                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                             </button>
//                         ))}
//                     </div>

//                     <div className="tab-content">
//                         {activeTab === "bookings" && <BookingsTab bookings={buyerBookings} />}
//                         {activeTab === "saved" && <SavedPropertiesTab properties={savedProperties} />}
//                         {activeTab === "payments" && <PaymentsTab payments={payments} />}
//                         {activeTab === "notifications" && <NotificationsTab notifications={notifications} />}
//                         {activeTab === "messages" && (
//                             <>
//                                 {conversations.length === 0 ? (
//                                     <p style={{ textAlign: "center", marginTop: "5rem" }}>Loading conversations...</p>
//                                 ) : (
//                                     <MessagesTab
//                                         conversations={conversations}
//                                         selectedConversationId={selectedConversationId}
//                                         setSelectedConversationId={setSelectedConversationId}
//                                         messages={messages}
//                                         newMessage={newMessage}
//                                         setNewMessage={setNewMessage}
//                                         handleSendMessage={handleSendMessage}
//                                     />
//                                 )}
//                             </>
//                         )}
//                     </div>
//                 </section>
//             </main>
//             <Footer />
//         </div>
//     );
// }



// import React, { useState, useEffect } from "react";
// import Navbar from "../../layout/navbar/navbar";
// import Footer from "../../layout/footer/footer";
// import ProfileSummary from "../profileSummary/profilesummary";
// import SummaryCard from "../summarycard/summarycard";
// import BookingsTab from "../TabContent/booking/booking";
// import SavedPropertiesTab from "../TabContent/savedproperties/Savedproperties";
// import PaymentsTab from "../TabContent/payment/payment";
// import NotificationsTab from "../TabContent/notification/notification";
// import MessagesTab from "../TabContent/message/message";
// import { getConversations, createConversation } from "../../../Api/conversation.api";
// import { getMessages } from "../../../Api/message.api";
// import useChatSocket from "../../../hooks/usechatsocket";
// import socket from "../../../utils/socket";
// import { Calendar, Clock, Heart } from 'lucide-react';
// import "./buyerdashboard.css";

// const userProfile = {
//   name: "Mustafizur Rahaman",
//   notificationsCount: 4,
// };

// const notifications = [
//     "Price dropped for Lake View Apartment",
//     "New property available in your preferred area",
//     "Your booking has been approved",
//     "Visit confirmed for tomorrow",
// ];

// const buyerSummary = { totalBookings: 4, upcomingVisits: 2, savedCount: 3 };
// const buyerBookings = [
//   { id: "b1", propertyTitle: "Modern Villa in Rajghonj", location: "Rajghonj, Cumilla", date: "2025-01-10", time: "11:00 AM", status: "Pending" },
//   { id: "b2", propertyTitle: "Lake View Apartment", location: "Tomsombridge, Cumilla", date: "2025-01-15", time: "3:30 PM", status: "Confirmed" },
//   { id: "b3", propertyTitle: "Commercial Space", location: "Kandirpur, Cumilla", date: "2025-01-22", time: "10:00 AM", status: "Cancelled" },
// ];

// const savedProperties = [
//   { id: "p1", title: "Cozy Studio in Banani", location: "Banani, Dhaka", price: "৳ 18,000 / month" },
//   { id: "p2", title: "Spacious Family Flat", location: "Mirpur, Dhaka", price: "৳ 75,00,000" },
//   { id: "p3", title: "Penthouse in Uttara", location: "Uttara, Dhaka", price: "৳ 1,20,00,000" },
// ];

// const payments = [
//   { id: "pay1", property: "Lake View Apartment", amount: "৳ 50,000", status: "Paid" },
//   { id: "pay2", property: "Modern Villa (Advance)", amount: "৳ 20,000", status: "Pending" },
// ];

// export default function BuyerDashboard() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?._id;

//   const [isLoggedIn, setIsLoggedIn] = useState(true);
//   const [activeTab, setActiveTab] = useState("bookings");
//   const [conversations, setConversations] = useState([]);
//   const [selectedConversationId, setSelectedConversationId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loadingConversations, setLoadingConversations] = useState(true);
//   const [loadingMessages, setLoadingMessages] = useState(false);

//   const userName = userProfile.name.split(' ')[0];

//   // Load Conversations
//   useEffect(() => {
//     if (!userId) return;
//     setLoadingConversations(true);

//     getConversations()
//       .then(res => {
//         setConversations(res.data);
//         if (res.data.length > 0) setSelectedConversationId(res.data[0]._id);
//       })
//       .catch(err => console.error(err))
//       .finally(() => setLoadingConversations(false));
//   }, [userId]);

//   // Load Messages when conversation changes
//   useEffect(() => {
//     if (!selectedConversationId) return;
//     setLoadingMessages(true);

//     getMessages(selectedConversationId)
//       .then(res => setMessages(res.data))
//       .catch(err => console.error(err))
//       .finally(() => setLoadingMessages(false));
//   }, [selectedConversationId]);

//   // Socket for real-time messages
//   useChatSocket(selectedConversationId, (message) => {
//     setMessages(prev => [...prev, {
//       id: message._id,
//       text: message.text,
//       from: message.sender_id === userId ? "me" : "them"
//     }]);
//   });


//   const handleStartConversation = async (ownerId, propertyId) => {
//   try {
//     const res = await createConversation({ ownerId, propertyId });
//     // নতুন conversation add করো state এ
//     setConversations(prev => [...prev, res.data]);
//     setSelectedConversationId(res.data._id);
//   } catch (err) {
//     console.error("Error creating conversation:", err);
//   }
// };


//   const handleSendMessage = () => {
//     if (!newMessage.trim() || !selectedConversationId) return;

//     socket.emit("sendMessage", {
//       conversationId: selectedConversationId,
//       senderId: userId,
//       text: newMessage,
//     });

//     setNewMessage("");
//   };

//   const handleSignOut = () => {
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     window.location.href = "/auth";
//   };

//   return (
//     <div className="dashboard-page">
//       <Navbar
//         isLoggedIn={!!user}
//         userName={userName}
//         notificationsCount={user.notificationsCount || 0}
//         onSignOut={handleSignOut}
//       />

//       <main className="dashboard-main">
//         <header className="dashboard-header">
//           <h1>Your Dashboard</h1>
//           <p>Quickly overview and manage all your property interactions.</p>
//         </header>

//         <ProfileSummary user={userProfile} />

//         <section className="summary-cards">
//           <SummaryCard label="Total Bookings" value={buyerSummary.totalBookings} Icon={Calendar} />
//           <SummaryCard label="Upcoming Visits" value={buyerSummary.upcomingVisits} Icon={Clock} />
//           <SummaryCard label="Saved Properties" value={buyerSummary.savedCount} Icon={Heart} />
//         </section>

//         <section className="tab-section">
//           <div className="tabs-nav">
//             {["bookings", "saved", "payments", "notifications", "messages"].map(tab => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={activeTab === tab ? "active" : "inactive"}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             ))}
//           </div>

//           <div className="tab-content">
//             {activeTab === "bookings" && <BookingsTab bookings={buyerBookings} />}
//             {activeTab === "saved" && <SavedPropertiesTab properties={savedProperties} />}
//             {activeTab === "payments" && <PaymentsTab payments={payments} />}
//             {activeTab === "notifications" && <NotificationsTab notifications={[]} />}
//             {activeTab === "messages" && (
//               <MessagesTab
//                 conversations={conversations}
//                 selectedConversationId={selectedConversationId}
//                 setSelectedConversationId={setSelectedConversationId}
//                 messages={messages}
//                 newMessage={newMessage}
//                 setNewMessage={setNewMessage}
//                 handleSendMessage={handleSendMessage}
//                 loadingConversations={loadingConversations}
//                 loadingMessages={loadingMessages}
//               />
//             )}
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// }
