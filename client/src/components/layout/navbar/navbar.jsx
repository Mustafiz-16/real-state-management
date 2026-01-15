import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, BellDot } from "lucide-react"; 
import Button from '../../common/button/button';
import './navbar.css';

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar_logo">
//         <Link to="/">Dwello</Link>
//       </div>
//       <ul className="navbar_links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/services">Services</Link></li>
//         <li><Link to="/properties">Properties</Link></li>
//         <li><Link to="/contact">Contact</Link></li>
//       </ul>
//       <div className="navbar_actions">
//         {/* <Button  variant="primary" size="small">Sign up</Button> */}
//         <Link to="/auth">
//           <Button variant="primary" size="small">Sign In</Button>
//         </Link>
//       </div>
//     </nav>
//   );
// }
// export default function Navbar({ isLoggedIn, userName, notificationsCount, onSignOut, onSignIn }) {
//   return (
//     <nav className="navbar">
//       <div className="navbar_logo">
//         <Link to="/">Dwello</Link>
//       </div>
//       <ul className="navbar_links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/services">Services</Link></li>
//         <li><Link to="/properties">Properties</Link></li>
//         <li><Link to="/contact">Contact</Link></li>
//       </ul>
//       <div className="navbar_actions">
//         {isLoggedIn ? (
//           <>
//             <span className="text-gray-800 mr-4">{userName}</span>
//             <button className="notification-btn">
//               🔔 {notificationsCount}
//             </button>
//             <Button variant="primary" size="small" onClick={onSignOut}>Sign Out</Button>
//           </>
//         ) : (
//           <Link to="/auth">
//             <Button variant="primary" size="small" onClick={onSignIn}>Sign In</Button>
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// }


export default function Navbar({
  isLoggedIn,
  userName,
  notificationsCount,
  onSignOut,
  onSignIn,
}) {
  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <Link to="/">Dwello</Link>
      </div>

      <ul className="navbar_links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/properties">Properties</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="navbar_actions">
        {isLoggedIn ? (
          <>
            <span className="navbar_username">{userName}</span>

            {/* Notification Button */}
            <button className="notification_btn badge_container">
              {notificationsCount > 0 ? (
                <BellDot size={22} />
              ) : (
                <Bell size={22} />
              )}

              {notificationsCount > 0 && (
                <span className="badge">{notificationsCount}</span>
              )}
            </button>

            <Button variant="primary" size="small" onClick={onSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <Link to="/auth">
            <Button variant="primary" size="small" onClick={onSignIn}>
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
