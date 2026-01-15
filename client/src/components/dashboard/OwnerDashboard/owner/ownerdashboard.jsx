// import React, { useState, useEffect } from "react";
// import Navbar from "../../../layout/navbar/navbar";
// import Footer from "../../../layout/footer/footer";

// import OwnerProfileSummary from "../components/OwnerProfileSummary/OwnerProfileSummary";
// import OwnerSummaryCard from "../components/SummaryCard/ownersummarycard";

// import PropertiesTab from "../components/TabContent/properties/ownerpropertiestab";
// import OwnerBookingTab from "../components/TabContent/booking/ownerbookingtab";
// import DocumentsTab from "../components/TabContent/documents/ownerdocumentstab";
// import OwnerMessagesTab from "../components/TabContent/messages/ownermessagestab";

// import {
//     getOwnerProperties,
//     createProperty,
//     deleteProperty as deletePropertyAPI,
// } from "../../../../Api/property.api";

// import { getConversations } from "../../../../Api/conversation.api";
// import { getMessages } from "../../../../Api/message.api";

// import useChatSocket from "../../../../hooks/usechatsocket";
// import socket from "../../../../utils/socket";

// //import { getSocket } from "../../../../utils/socket";

// import "./ownerdashboard.css";
// import "../components/TabContent/tab.css"

// // ------------ Dummy Data ---------------
// const ownerProfile = {
//     name: "Rahman",
//     email: "rahman456@example.com",
//     totalProperties: 2,
//     pendingRequests: 3,
//     totalDocuments: 5
// };

// // const ownerProperties = [
// //     { id: "p1", title: "Modern Villa in Gulshan", status: "Active", bookings: 2 },
// //     { id: "p2", title: "Lake View Apartment", status: "Pending Approval", bookings: 0 },
// // ];

// const bookingRequests = [
//     { id: "b1", propertyTitle: "Modern Villa in Gulshan", buyerName: "Karim", date: "2025-01-10", time: "11:00 AM", status: "Pending" },
//     { id: "b2", propertyTitle: "Modern Villa in Gulshan", buyerName: "Ratul", date: "2025-01-12", time: "2:00 PM", status: "Pending" },
//     { id: "b3", propertyTitle: "Lake View Apartment", buyerName: "Nadia", date: "2025-01-18", time: "4:00 PM", status: "Pending" },
// ];

// const documents = [
//     { id: "d1", name: "Ownership Deed.pdf", propertyTitle: "Modern Villa in Gulshan", uploaded: "2025-01-01" },
//     { id: "d2", name: "Floor Plan.jpg", propertyTitle: "Modern Villa in Gulshan", uploaded: "2025-01-02" },
//     { id: "d3", name: "Flat Layout.png", propertyTitle: "Lake View Apartment", uploaded: "2025-01-03" },
// ];

// // const conversations = [
// //     { id: "c1", propertyTitle: "Modern Villa in Gulshan", withName: "Karim", lastMessage: "When can we visit?" },
// //     { id: "c2", propertyTitle: "Lake View Apartment", withName: "Ratul", lastMessage: "Is rent negotiable?" },
// // ];

// // const messagesByConversation = {
// //     c1: [
// //         { id: "m1", from: "buyer", text: "Hi, when can we visit?" },
// //         { id: "m2", from: "me", text: "Tomorrow 11 AM is fine." },
// //         { id: "m3", from: "buyer", text: "Perfect, see you!" },
// //     ],
// //     c2: [
// //         { id: "m4", from: "buyer", text: "Is rent negotiable?" },
// //     ],
// // };

// export default function OwnerDashboard() {
//     const user = JSON.parse(localStorage.getItem("user"));
//     //const socket = getSocket(user._id);
//     const userId = user?._id;
//     const [activeTab, setActiveTab] = useState("properties");
//     // const [selectedConversationId, setSelectedConversationId] = useState("c1");
//     // const [newMessage, setNewMessage] = useState("");

//     const [properties, setProperties] = useState([]);
//     const [loadingProperties, setLoadingProperties] = useState(true);

//     //const [properties, setProperties] = useState(ownerProperties); // <-- state for properties
//     //const [selectedConversationId, setSelectedConversationId] = useState(conversations[0]?.id || null);
//     //const [newMessage, setNewMessage] = useState("");
//     //const [messages, setMessages] = useState(messagesByConversation[selectedConversationId] || []);

//     const [conversations, setConversations] = useState([]);
//     const [selectedConversationId, setSelectedConversationId] = useState(null);

//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");

//     const [loadingConversations, setLoadingConversations] = useState(true);

//     //const currentMessages = messagesByConversation[selectedConversationId] || [];

//     useEffect(() => {
//         getOwnerProperties()
//             .then(res => {
//                 setProperties(res.data);
//             })
//             .catch(err => console.error(err))
//             .finally(() => setLoadingProperties(false));
//     }, []);

//     const addProperty = async (formData) => {
//         try {
//             const res = await createProperty(formData);
//             setProperties(prev => [...prev, res.data]);
//         } catch (err) {
//             alert("Failed to add property");
//         }
//     };

//     const deleteProperty = async (id) => {
//         try {
//             await deletePropertyAPI(id);
//             setProperties(prev => prev.filter(p => p._id !== id));
//         } catch (err) {
//             alert("Cannot delete property");
//         }
//     };

//     useEffect(() => {
//         if (!userId) return;

//         setLoadingConversations(true);
//         getConversations()
//             .then(res => {
//                 setConversations(res.data);
//                 if (res.data.length > 0) {
//                     setSelectedConversationId(res.data[0]._id);
//                 }
//             })
//             .catch(err => console.error(err))
//             .finally(() => setLoadingConversations(false));
//     }, [userId]);

//     useEffect(() => {
//         if (!selectedConversationId) return;

//         getMessages(selectedConversationId)
//             .then(res => setMessages(res.data))
//             .catch(err => console.error(err));
//     }, [selectedConversationId]);

//     // useChatSocket(selectedConversationId, (message) => {
//     //     setMessages(prev => [
//     //         ...prev,
//     //         {
//     //             id: message._id,
//     //             text: message.text,
//     //             from: message.sender_id === "owner123" ? "me" : "buyer"
//     //         }
//     //     ]);
//     // });

//     useChatSocket(selectedConversationId, (message) => {
//         setMessages(prev => [
//             ...prev,
//             {
//                 _id: message._id,
//                 text: message.text,
//                 from: message.sender_id === userId ? "me" : "other"
//             }
//         ]);
//     });

//     const handleSendMessage = () => {
//         if (!newMessage.trim()) return;
//         if (!selectedConversationId) {
//             alert("Select a conversation first");
//             return;
//         }

//         socket.emit("sendMessage", {
//             conversationId: selectedConversationId,
//             senderId: userId,
//             text: newMessage
//         });

//         setNewMessage("");
//     };

//     // const handleSendMessage = () => {
//     //     if (!newMessage.trim()) return;

//     //     socket.emit("sendMessage", {
//     //         conversationId: selectedConversationId,
//     //         //senderId: "owner123", // logged-in owner ID
//     //         text: newMessage
//     //     });

//     //     setNewMessage("");
//     // };

//     const handleSignOut = () => {
//         localStorage.removeItem("user");
//         localStorage.removeItem("token");
//         window.location.href = "/auth";
//     };

//     // const addProperty = (newProp) => {
//     //     setProperties([...properties, newProp]);
//     // };

//     const updateProperty = (updatedProp) => {
//         setProperties(
//             properties.map((p) => (p.id === updatedProp.id ? updatedProp : p))
//         );
//     };

//     // const deleteProperty = (id) => {
//     //     setProperties(properties.filter((p) => p.id !== id));
//     // };

//     return (
//         <div className="owner-dashboard-page">

//             {/* <Navbar isLoggedIn={true} userName={"Owner"} /> */}

//             <Navbar
//                 isLoggedIn={!!user}
//                 userName={user.name.split(" ")[0]}
//                 notificationsCount={user.notificationsCount || 0}
//                 onSignOut={handleSignOut}
//             />

//             <main className="owner-dashboard-main">

//                 <header className="owner-header">
//                     <h1>Owner Dashboard</h1>
//                     <p>Manage Properties, Booking Requests & Messages</p>
//                 </header>

//                 {/* <OwnerProfileSummary owner={ownerProfile} /> */}
//                 <OwnerProfileSummary owner={user} />

//                 <section className="owner-summary-cards">
//                     <OwnerSummaryCard label="Active Properties" value={ownerProfile.totalProperties} />
//                     <OwnerSummaryCard label="Pending Requests" value={ownerProfile.pendingRequests} />
//                     <OwnerSummaryCard label="Documents" value={ownerProfile.totalDocuments} />
//                 </section>

//                 <section className="owner-tabs-section">
//                     <div className="owner-tabs-nav">
//                         {["properties", "bookings", "documents", "messages"].map((tab) => (
//                             <button
//                                 key={tab}
//                                 onClick={() => setActiveTab(tab)}
//                                 className={activeTab === tab ? "active" : ""}
//                             >
//                                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                             </button>
//                         ))}
//                     </div>

//                     <div className="owner-tab-content">
//                         {/* {activeTab === "properties" && <PropertiesTab properties={ownerProperties} />} */}
//                         {/* <PropertiesTab
//                             properties={ownerProperties}
//                             addProperty={addProperty}
//                             updateProperty={updateProperty}
//                             deleteProperty={deleteProperty}
//                         /> */}
//                         <PropertiesTab
//                             properties={properties} // <-- state
//                             addProperty={addProperty}
//                             updateProperty={updateProperty}
//                             deleteProperty={deleteProperty}
//                         />

//                         {activeTab === "bookings" && <OwnerBookingTab bookings={bookingRequests} />}
//                         {activeTab === "documents" && <DocumentsTab documents={documents} />}
//                         {activeTab === "messages" && (
//                             <OwnerMessagesTab
//                                 conversations={conversations}
//                                 selectedConversationId={selectedConversationId}
//                                 setSelectedConversationId={setSelectedConversationId}
//                                 //messages={currentMessages}
//                                 messages={messages}

//                                 newMessage={newMessage}
//                                 setNewMessage={setNewMessage}
//                                 handleSendMessage={handleSendMessage}
//                                 loadingConversations={loadingConversations}
//                             />
//                         )}
//                     </div>
//                 </section>
//             </main>

//             <Footer />
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../../layout/navbar/navbar";
import Footer from "../../../layout/footer/footer";

import OwnerProfileSummary from "../components/OwnerProfileSummary/OwnerProfileSummary";
//import OwnerSummaryCard from "../components/SummaryCard/ownersummarycard";

import PropertiesTab from "../components/TabContent/properties/ownerpropertiestab";
import OwnerMessagesTab from "../components/TabContent/messages/ownermessagestab";
import NotificationsTab from "../components/TabContent/notifications/NotificationsTab";

import {
  getOwnerProperties,
  createProperty,
  deleteProperty as deletePropertyAPI,
} from "../../../../Api/property.api";

import { getConversations } from "../../../../Api/conversation.api";
import { getMessages } from "../../../../Api/message.api";

import useChatSocket from "../../../../hooks/usechatsocket";
import socket from "../../../../utils/socket";

import "./ownerdashboard.css";
import "../components/TabContent/tab.css";

export default function OwnerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("properties");

  /* ---------------- Handle navigation state ---------------- */
  useEffect(() => {
    if (location.state?.openConversationId) {
      setActiveTab("messages");
      setSelectedConversationId(location.state.openConversationId);
    }
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  /* ---------------- 🔔 Notifications ---------------- */
  const [notificationsCount, setNotificationsCount] = useState(
    user?.notificationsCount || 0
  );

  /* ---------------- Properties ---------------- */
  const [properties, setProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(true);

  useEffect(() => {
    getOwnerProperties()
      .then((res) => setProperties(res.data))
      .catch(console.error)
      .finally(() => setLoadingProperties(false));
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await getOwnerProperties();
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);
  // const addProperty = async (formData) => {
  //   try {
  //     const res = await createProperty(formData);
  //     setProperties((prev) => [...prev, res.data]);
  //   } catch {
  //     alert("Failed to add property");
  //   }
  // };
  const addProperty = async (data) => {
    const res = await createProperty(data);
    setProperties((prev) => [...prev, res.data]);
    return res.data; // 🔑 REQUIRED for uploads
  };

  const deleteProperty = async (id) => {
    try {
      await deletePropertyAPI(id);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Cannot delete property");
    }
  };

  /* ---------------- Messages ---------------- */
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingConversations, setLoadingConversations] = useState(true);

  useEffect(() => {
    if (!userId) return;

    setLoadingConversations(true);
    getConversations()
      .then((res) => {
        setConversations(res.data);
        if (res.data.length) {
          setSelectedConversationId(res.data[0]._id);
        }
      })
      .catch(console.error)
      .finally(() => setLoadingConversations(false));
  }, [userId]);

  useEffect(() => {
    if (!selectedConversationId) return;

    getMessages(selectedConversationId)
      .then((res) => setMessages(res.data))
      .catch(console.error);
  }, [selectedConversationId]);

  useChatSocket(selectedConversationId, (message) => {
    setMessages((prev) => {
      if (prev.some((m) => m._id === message._id)) return prev; // ✅ duplicate fix
      return [
        ...prev,
        {
          _id: message._id,
          text: message.text,
          from: message.sender_id === userId ? "me" : "other",
        },
      ];
    });
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversationId) return;

    socket.emit("sendMessage", {
      conversationId: selectedConversationId,
      senderId: userId,
      text: newMessage,
    });

    setNewMessage("");
  };

  /* ---------------- 🔔 Admin Notification Socket ---------------- */
  useEffect(() => {
    if (!userId) return;

    // join personal room
    socket.emit("join", userId);

    const handleNotification = (data) => {
      console.log("Notification received:", data);

      alert(data.message); // simple UI for now

      setNotificationsCount((prev) => prev + 1);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [userId]);

  /* ---------------- Auth ---------------- */
  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/auth";
  };

  return (
    <div className="owner-dashboard-page">
      <Navbar
        isLoggedIn={!!user}
        userName={user?.name?.split(" ")[0]}
        notificationsCount={notificationsCount}
        onSignOut={handleSignOut}
      />

      <main className="owner-dashboard-main">
        <header className="owner-header">
          <h1>Owner Dashboard</h1>
          <p>Manage Properties & Messages</p>
        </header>

        <OwnerProfileSummary owner={user} />

        {/* <section className="owner-summary-cards">
          <OwnerSummaryCard label="Total Properties" value={properties.length} />
          <OwnerSummaryCard label="Conversations" value={conversations.length} />
          <OwnerSummaryCard label="Messages" value={messages.length} />
        </section> */}

        <section className="owner-tabs-section">
          <div className="owner-tabs-nav">
            {["properties", "messages", "notifications"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? "active" : ""}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === "notifications" && notificationsCount > 0 && (
                  <span className="tab-badge">{notificationsCount}</span>
                )}
              </button>
            ))}
          </div>

          <div className="owner-tab-content">
            {activeTab === "properties" && (
              // <PropertiesTab
              //   properties={properties}
              //   loading={loadingProperties}
              //   addProperty={addProperty}
              //   deleteProperty={deleteProperty}
              // />
              // <PropertiesTab
              //   properties={properties}
              //   loading={loadingProperties}
              //   addProperty={addProperty}
              //   deleteProperty={deleteProperty}
              //   updateProperty={(updated) => {
              //     setProperties(prev =>
              //       prev.map(p => p._id === updated._id ? updated : p)
              //     );
              //   }}
              // />
              <PropertiesTab
                properties={properties}
                addProperty={addProperty}
                deleteProperty={deleteProperty}
                updateProperty={(updated) => {
                  setProperties((prev) =>
                    prev.map((p) => (p._id === updated._id ? updated : p))
                  );
                }}
                refreshProperties={fetchProperties} // 🔑 pass this
              />
            )}

            {activeTab === "messages" && (
              <OwnerMessagesTab
                conversations={conversations}
                selectedConversationId={selectedConversationId}
                setSelectedConversationId={setSelectedConversationId}
                messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
                loadingConversations={loadingConversations}
              />
            )}

            {activeTab === "notifications" && (
              <NotificationsTab
                onNotificationRead={() =>
                  setNotificationsCount((prev) => Math.max(0, prev - 1))
                }
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
// import Navbar from "../../../layout/navbar/navbar";
// import Footer from "../../../layout/footer/footer";

// import OwnerProfileSummary from "../components/OwnerProfileSummary/OwnerProfileSummary";
// import OwnerSummaryCard from "../components/SummaryCard/ownersummarycard";

// import PropertiesTab from "../components/TabContent/properties/ownerpropertiestab";
// import OwnerBookingTab from "../components/TabContent/booking/ownerbookingtab";
// import DocumentsTab from "../components/TabContent/documents/ownerdocumentstab";
// import OwnerMessagesTab from "../components/TabContent/messages/ownermessagestab";

// import {
//   getOwnerProperties,
//   createProperty,
//   deleteProperty as deletePropertyAPI,
// } from "../../../../Api/property.api";

// import { getConversations } from "../../../../Api/conversation.api";
// import { getMessages } from "../../../../Api/message.api";

// import useChatSocket from "../../../../hooks/usechatsocket";
// import socket from "../../../../utils/socket";

// import "./ownerdashboard.css";
// import "../components/TabContent/tab.css";

// export default function OwnerDashboard() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?._id;

//   const [activeTab, setActiveTab] = useState("properties");

//   /* ---------------- Properties ---------------- */
//   const [properties, setProperties] = useState([]);
//   const [loadingProperties, setLoadingProperties] = useState(true);

//   useEffect(() => {
//     getOwnerProperties()
//       .then((res) => setProperties(res.data))
//       .catch(console.error)
//       .finally(() => setLoadingProperties(false));
//   }, []);

//   const addProperty = async (formData) => {
//     try {
//       const res = await createProperty(formData);
//       setProperties((prev) => [...prev, res.data]);
//     } catch {
//       alert("Failed to add property");
//     }
//   };

//   const deleteProperty = async (id) => {
//     try {
//       await deletePropertyAPI(id);
//       setProperties((prev) => prev.filter((p) => p._id !== id));
//     } catch {
//       alert("Cannot delete property");
//     }
//   };

//   /* ---------------- Messages ---------------- */
//   const [conversations, setConversations] = useState([]);
//   const [selectedConversationId, setSelectedConversationId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loadingConversations, setLoadingConversations] = useState(true);

//   useEffect(() => {
//     if (!userId) return;

//     setLoadingConversations(true);
//     getConversations()
//       .then((res) => {
//         setConversations(res.data);
//         if (res.data.length) {
//           setSelectedConversationId(res.data[0]._id);
//         }
//       })
//       .catch(console.error)
//       .finally(() => setLoadingConversations(false));
//   }, [userId]);

//   useEffect(() => {
//     if (!selectedConversationId) return;

//     getMessages(selectedConversationId)
//       .then((res) => setMessages(res.data))
//       .catch(console.error);
//   }, [selectedConversationId]);

//   useChatSocket(selectedConversationId, (message) => {
//     setMessages((prev) => [
//       ...prev,
//       {
//         _id: message._id,
//         text: message.text,
//         from: message.sender_id === userId ? "me" : "other",
//       },
//     ]);
//   });

//   const handleSendMessage = () => {
//     if (!newMessage.trim() || !selectedConversationId) return;

//     socket.emit("sendMessage", {
//       conversationId: selectedConversationId,
//       senderId: userId,
//       text: newMessage,
//     });

//     setNewMessage("");
//   };

//   /* ---------------- Auth ---------------- */
//   const handleSignOut = () => {
//     localStorage.clear();
//     window.location.href = "/auth";
//   };

//   return (
//     <div className="owner-dashboard-page">
//       <Navbar
//         isLoggedIn={!!user}
//         userName={user?.name?.split(" ")[0]}
//         notificationsCount={user?.notificationsCount || 0}
//         onSignOut={handleSignOut}
//       />

//       <main className="owner-dashboard-main">
//         <header className="owner-header">
//           <h1>Owner Dashboard</h1>
//           <p>Manage Properties, Booking Requests & Messages</p>
//         </header>

//         <OwnerProfileSummary owner={user} />

//         <section className="owner-summary-cards">
//           <OwnerSummaryCard label="Total Properties" value={properties.length} />
//           <OwnerSummaryCard label="Conversations" value={conversations.length} />
//           <OwnerSummaryCard label="Messages" value={messages.length} />
//         </section>

//         <section className="owner-tabs-section">
//           <div className="owner-tabs-nav">
//             {["properties","messages"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={activeTab === tab ? "active" : ""}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             ))}
//           </div>

//           <div className="owner-tab-content">
//             {activeTab === "properties" && (
//               <PropertiesTab
//                 properties={properties}
//                 loading={loadingProperties}
//                 addProperty={addProperty}
//                 deleteProperty={deleteProperty}
//               />
//             )}

//             {/* {activeTab === "bookings" && <OwnerBookingTab />}
//             {activeTab === "documents" && <DocumentsTab />} */}
//             {activeTab === "messages" && (
//               <OwnerMessagesTab
//                 conversations={conversations}
//                 selectedConversationId={selectedConversationId}
//                 setSelectedConversationId={setSelectedConversationId}
//                 messages={messages}
//                 newMessage={newMessage}
//                 setNewMessage={setNewMessage}
//                 handleSendMessage={handleSendMessage}
//                 loadingConversations={loadingConversations}
//               />
//             )}
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// }
