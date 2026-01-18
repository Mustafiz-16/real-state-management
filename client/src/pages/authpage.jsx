import { useState } from "react";
import Navbar from "../components/layout/navbar/navbar";
import Footer from "../components/layout/footer/footer";
import Auth from "../components/auth/auth";

function AuthPage() {

  return (
    <div>
      <Navbar />
      <Auth />
      <Footer />
    </div>
  );
}

export default AuthPage;













// import { useState } from "react";
// import Navbar from "../components/layout/navbar/navbar";
// import Footer from "../components/layout/footer/footer";

// function AuthPage() {
//   const [mode, setMode] = useState("login"); // "login" | "signup"

//   return (
//     <div>
//       <Navbar />

//       <main className="min-h-[70vh] flex items-center justify-center px-4 py-10">
//         <div className="w-full max-w-md bg-white shadow-sm rounded-xl p-6 space-y-6">
//           <div className="flex gap-2 mb-2">
//             <button
//               className={`flex-1 py-2 text-sm rounded ${
//                 mode === "login" ? "bg-brown-600 text-white" : "bg-gray-100"
//               }`}
//               onClick={() => setMode("login")}
//             >
//               Login
//             </button>
//             <button
//               className={`flex-1 py-2 text-sm rounded ${
//                 mode === "signup" ? "bg-brown-600 text-white" : "bg-gray-100"
//               }`}
//               onClick={() => setMode("signup")}
//             >
//               Sign up
//             </button>
//           </div>

//           <form className="space-y-3">
//             <select className="w-full border rounded px-3 py-2 text-sm">
//               <option>Select role</option>
//               <option>Buyer</option>
//               <option>Owner</option>
//               <option>Agent</option>
//               <option>Admin</option>
//             </select>

//             {mode === "signup" && (
//               <input
//                 className="w-full border rounded px-3 py-2 text-sm"
//                 placeholder="Full name"
//               />
//             )}

//             <input
//               className="w-full border rounded px-3 py-2 text-sm"
//               placeholder="Email address"
//             />
//             <input
//               type="password"
//               className="w-full border rounded px-3 py-2 text-sm"
//               placeholder="Password"
//             />
//             {mode === "signup" && (
//               <input
//                 type="password"
//                 className="w-full border rounded px-3 py-2 text-sm"
//                 placeholder="Confirm password"
//               />
//             )}

//             <button className="w-full bg-brown-600 text-white rounded py-2 text-sm">
//               {mode === "login" ? "Login" : "Create account"}
//             </button>
//           </form>

//           {mode === "login" && (
//             <p className="text-xs text-gray-500 text-center">Forgot password? (UI only)</p>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default AuthPage;


