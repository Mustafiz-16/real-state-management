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
  Smile
} from "lucide-react";
import "./message.css";

export default function MessagesTab({
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

  // Get the other person's name in conversation
  const getOtherPersonName = (convo) => {
    if (!convo) return "Unknown";
    if (convo.buyer_id?._id === userId) {
      return convo.owner_id?.name || "Owner";
    }
    return convo.buyer_id?.name || "Buyer";
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
    <div className="messaging-container">
      {/* LEFT SIDEBAR: Conversations List */}
      <div className="conversations-sidebar">
        <div className="sidebar-header">
          <h3>
            <MessageSquare size={20} />
            <span>Messages</span>
          </h3>
          <span className="conversation-count">{conversations.length}</span>
        </div>

        {/* Search Bar */}
        <div className="conversation-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Conversations List */}
        <div className="conversations-list-wrapper">
          {loadingConversations ? (
            <div className="loading-state">
              <div className="loading-spinner-anim"></div>
              <p>Loading conversations...</p>
            </div>
          ) : showEmptyState ? (
            <div className="empty-conversations">
              <MessageCircle size={48} strokeWidth={1.5} />
              <h4>No conversations yet</h4>
              <p>Contact a property owner to start chatting about properties you're interested in.</p>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="empty-conversations">
              <Search size={48} strokeWidth={1.5} />
              <h4>No results found</h4>
              <p>Try a different search term</p>
            </div>
          ) : (
            <ul className="conversations-list">
              {filteredConversations.map(c => (
                <li
                  key={c._id}
                  onClick={() => setSelectedConversationId(c._id)}
                  className={`conversation-item ${c._id === selectedConversationId ? "active" : ""}`}
                >
                  <div className="conversation-avatar">
                    {getInitials(getOtherPersonName(c))}
                    <span className="online-indicator"></span>
                  </div>
                  <div className="conversation-info">
                    <div className="conversation-header">
                      <span className="conversation-name">{getOtherPersonName(c)}</span>
                      <span className="conversation-time">{formatTime(c.updatedAt)}</span>
                    </div>
                    <div className="conversation-property-name">
                      <Home size={12} />
                      <span>{c.property_id?.title || "Property"}</span>
                    </div>
                    <p className="conversation-preview">
                      {c.lastMessage || "No messages yet"}
                    </p>
                  </div>
                  {c.unreadCount > 0 && (
                    <span className="unread-badge">{c.unreadCount}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* RIGHT: Chat Area */}
      <div className="chat-area">
        {!isConversationSelected ? (
          <div className="no-conversation-selected">
            <div className="no-chat-icon">
              <MessageSquare size={64} strokeWidth={1.5} />
            </div>
            <h3>Select a conversation</h3>
            <p>Choose a conversation from the list to start messaging</p>
          </div>
        ) : (
          <>
            {/* Chat Header with Property & Contact Info */}
            <div className="chat-header">
              <div className="chat-contact-info">
                <div className="contact-avatar">
                  {getInitials(getOtherPersonName(currentConversation))}
                  <span className="online-dot"></span>
                </div>
                <div className="contact-details">
                  <h4>{getOtherPersonName(currentConversation)}</h4>
                  <span className="contact-role">Property Owner</span>
                </div>
              </div>
              
              <div className="chat-property-card">
                <Home size={16} />
                <div className="property-info">
                  <span className="property-title">{currentConversation?.property_id?.title}</span>
                  {currentConversation?.property_id?.location && (
                    <span className="property-location">
                      <MapPin size={12} />
                      {currentConversation.property_id.location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="chat-messages-area">
              {messages.length === 0 ? (
                <div className="empty-messages">
                  <Smile size={48} strokeWidth={1.5} />
                  <h4>Start the conversation!</h4>
                  <p>Send a message to the property owner about <strong>{currentConversation?.property_id?.title}</strong></p>
                </div>
              ) : (
                <div className="messages-container">
                  {groupedMessages.map((item, index) => {
                    if (item.type === "date") {
                      return (
                        <div key={`date-${index}`} className="date-separator">
                          <span>{item.date === new Date().toDateString() ? "Today" : item.date}</span>
                        </div>
                      );
                    }
                    
                    const isMine = item.sender_id === userId;
                    return (
                      <div
                        key={item._id || index}
                        className={`message-wrapper ${isMine ? "sent" : "received"}`}
                      >
                        {!isMine && (
                          <div className="message-avatar">
                            {getInitials(getOtherPersonName(currentConversation))}
                          </div>
                        )}
                        <div className="message-content">
                          <div className={`message-bubble ${isMine ? "sent" : "received"}`}>
                            <p>{item.text}</p>
                          </div>
                          <div className="message-meta">
                            <span className="message-time">
                              <Clock size={10} />
                              {formatMessageTime(item.createdAt)}
                            </span>
                            {isMine && (
                              <span className="message-status">
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
            <div className="chat-input-area">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                />
                <button
                  className={`send-button ${newMessage.trim() ? "active" : ""}`}
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
