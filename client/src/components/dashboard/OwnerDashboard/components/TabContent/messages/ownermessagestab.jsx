import React, { useRef, useEffect, useState } from "react";
import { 
  MessageSquare, 
  Send, 
  Home, 
  MapPin, 
  Clock, 
  CheckCheck, 
  Search,
  MessageCircle,
  Smile,
  User
} from "lucide-react";
import "./ownermessagestab.css";

export default function OwnerMessagesTab({
  conversations,
  selectedConversationId,
  setSelectedConversationId,
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  loadingConversations
}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const messagesEndRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const currentConversation =
    conversations.find(c => c._id === selectedConversationId) || null;

  const showEmptyState = conversations.length === 0;
  const isConversationSelected = !!selectedConversationId;

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Get the other person's name (for owner, it's the buyer)
  const getOtherPersonName = (convo) => {
    if (!convo) return "Unknown";
    if (convo.owner_id?._id === userId) {
      return convo.buyer_id?.name || "Buyer";
    }
    return convo.owner_id?.name || "Owner";
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };

  // Format message timestamp
  const formatMessageTime = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  // Filter conversations by search
  const filteredConversations = conversations.filter(c => {
    const searchLower = searchQuery.toLowerCase();
    return (
      c.property_id?.title?.toLowerCase().includes(searchLower) ||
      getOtherPersonName(c).toLowerCase().includes(searchLower)
    );
  });

  // Group messages by date
  const groupMessagesByDate = (msgs) => {
    const groups = [];
    let currentDate = null;
    
    msgs.forEach(msg => {
      const msgDate = msg.createdAt ? new Date(msg.createdAt).toDateString() : new Date().toDateString();
      if (msgDate !== currentDate) {
        currentDate = msgDate;
        groups.push({ type: "date", date: msgDate });
      }
      groups.push({ type: "message", ...msg });
    });
    
    return groups;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="owner-messaging-container">
      {/* LEFT SIDEBAR: Conversations List */}
      <div className="owner-conversations-sidebar">
        <div className="owner-sidebar-header">
          <h3>
            <MessageSquare size={20} />
            <span>Inquiries</span>
          </h3>
          <span className="owner-conversation-count">{conversations.length}</span>
        </div>

        {/* Search Bar */}
        <div className="owner-conversation-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by buyer or property..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Conversations List */}
        <div className="owner-conversations-list-wrapper">
          {loadingConversations ? (
            <div className="owner-loading-state">
              <div className="owner-loading-spinner"></div>
              <p>Loading inquiries...</p>
            </div>
          ) : showEmptyState ? (
            <div className="owner-empty-conversations">
              <MessageCircle size={48} strokeWidth={1.5} />
              <h4>No inquiries yet</h4>
              <p>Buyers will contact you when they're interested in your properties.</p>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="owner-empty-conversations">
              <Search size={48} strokeWidth={1.5} />
              <h4>No results found</h4>
              <p>Try a different search term</p>
            </div>
          ) : (
            <ul className="owner-conversations-list">
              {filteredConversations.map(c => (
                <li
                  key={c._id}
                  onClick={() => setSelectedConversationId(c._id)}
                  className={`owner-conversation-item ${c._id === selectedConversationId ? "active" : ""}`}
                >
                  <div className="owner-conversation-avatar">
                    {getInitials(getOtherPersonName(c))}
                    <span className="owner-online-indicator"></span>
                  </div>
                  <div className="owner-conversation-info">
                    <div className="owner-conversation-header">
                      <span className="owner-conversation-name">{getOtherPersonName(c)}</span>
                      <span className="owner-conversation-time">{formatTime(c.updatedAt)}</span>
                    </div>
                    <div className="owner-conversation-property-badge">
                      <Home size={12} />
                      <span>{c.property_id?.title || "Property"}</span>
                    </div>
                    <p className="owner-conversation-preview">
                      {c.lastMessage || "Waiting for first message..."}
                    </p>
                  </div>
                  {c.unreadCount > 0 && (
                    <span className="owner-unread-badge">{c.unreadCount}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* RIGHT: Chat Area */}
      <div className="owner-chat-area">
        {!isConversationSelected ? (
          <div className="owner-no-conversation-selected">
            <div className="owner-no-chat-icon">
              <MessageSquare size={64} strokeWidth={1.5} />
            </div>
            <h3>Select an inquiry</h3>
            <p>Choose a conversation to respond to potential buyers</p>
          </div>
        ) : (
          <>
            {/* Chat Header with Buyer & Property Info */}
            <div className="owner-chat-header">
              <div className="owner-chat-contact-info">
                <div className="owner-contact-avatar">
                  {getInitials(getOtherPersonName(currentConversation))}
                  <span className="owner-online-dot"></span>
                </div>
                <div className="owner-contact-details">
                  <h4>{getOtherPersonName(currentConversation)}</h4>
                  <span className="owner-contact-role">
                    <User size={12} />
                    Interested Buyer
                  </span>
                </div>
              </div>
              
              <div className="owner-chat-property-card">
                <div className="property-icon-wrapper">
                  <Home size={18} />
                </div>
                <div className="owner-property-info">
                  <span className="owner-property-label">Property Inquiry</span>
                  <span className="owner-property-title">{currentConversation?.property_id?.title}</span>
                  {currentConversation?.property_id?.location && (
                    <span className="owner-property-location">
                      <MapPin size={12} />
                      {currentConversation.property_id.location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="owner-chat-messages-area">
              {messages.length === 0 ? (
                <div className="owner-empty-messages">
                  <Smile size={48} strokeWidth={1.5} />
                  <h4>Start responding!</h4>
                  <p>A buyer is interested in <strong>{currentConversation?.property_id?.title}</strong>. Send a message to connect!</p>
                </div>
              ) : (
                <div className="owner-messages-container">
                  {groupedMessages.map((item, index) => {
                    if (item.type === "date") {
                      return (
                        <div key={`date-${index}`} className="owner-date-separator">
                          <span>{item.date === new Date().toDateString() ? "Today" : item.date}</span>
                        </div>
                      );
                    }
                    
                    const isMine = item.sender_id === userId || item.from === "me";
                    return (
                      <div
                        key={item._id || index}
                        className={`owner-message-wrapper ${isMine ? "sent" : "received"}`}
                      >
                        {!isMine && (
                          <div className="owner-message-avatar">
                            {getInitials(getOtherPersonName(currentConversation))}
                          </div>
                        )}
                        <div className="owner-message-content">
                          <div className={`owner-message-bubble ${isMine ? "sent" : "received"}`}>
                            <p>{item.text}</p>
                          </div>
                          <div className="owner-message-meta">
                            <span className="owner-message-time">
                              <Clock size={10} />
                              {formatMessageTime(item.createdAt)}
                            </span>
                            {isMine && (
                              <span className="owner-message-status">
                                <CheckCheck size={14} />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="owner-chat-input-area">
              <div className="owner-input-wrapper">
                <input
                  type="text"
                  placeholder="Reply to buyer..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                />
                <button
                  className={`owner-send-button ${newMessage.trim() ? "active" : ""}`}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
