// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import "../styling/paste.css";
// import { removeFromPastes } from "../features/counter/pasteslice";
// import toast from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";

// const Paste = () => {
//   const pastes = useSelector((state) => state.paste.pastes);
//   const dispatch = useDispatch();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [collapsed, setCollapsed] = useState(false);

//   const filteredData = pastes.filter((paste) =>
//     paste.heading.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Move cardVariants here so it can access filteredData
//   const cardVariants = {
//     expanded: { opacity: 1, y: 0, scale: 1, zIndex: 1 },
//     collapsed: (i) => ({
//       opacity: 1,
//       y: i * -10,
//       scale: 0.95 - i * 0.02,
//       zIndex: filteredData.length - i,
//     }),
//   };

//   function handleDelete(pasteId) {
//     const confirmation = window.confirm("Do you want to delete this paste?");
//     if (confirmation) {
//       dispatch(removeFromPastes(pasteId));
//     }
//   }

//   // Only show the stack when collapsed
//   const handleStackClick = () => {
//     if (collapsed) setCollapsed(false);
//   };

//   return (
//     <div className="AllPaste">
//       <input
//         type="search"
//         id="SearchBtn"
//         placeholder="Search Paste"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
//         <h2>Notifications</h2>
//         {!collapsed && (
//           <button
//             style={{
//               padding: "8px 16px",
//               borderRadius: 20,
//               background: "#222",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//             }}
//             onClick={() => setCollapsed(true)}
//           >
//             Collapse
//           </button>
//         )}
//       </div>

//       <div
//         className="cards"
//         style={{ position: "relative", minHeight: 200, cursor: collapsed ? "pointer" : "default" }}
//       >
//         <AnimatePresence>
//           {filteredData.length > 0 &&
//             filteredData.map((paste, idx) => (
//               <motion.div
//                 className="card"
//                 key={paste.id}
//                 custom={idx}
//                 variants={cardVariants}
//                 initial={collapsed ? "collapsed" : "expanded"}
//                 animate={collapsed ? "collapsed" : "expanded"}
//                 exit="collapsed"
//                 transition={{ type: "spring", stiffness: 400, damping: 30, delay: idx * 0.05 }}
//                 layout
//                 style={{
//                   position: collapsed ? "absolute" : "relative",
//                   width: "100%",
//                   top: collapsed ? 0 : undefined,
//                   left: 0,
//                   zIndex: filteredData.length - idx,
//                   marginBottom: collapsed ? 0 : 24,
//                   pointerEvents: collapsed && idx !== 0 ? "none" : "auto", // Only top card clickable
//                 }}
//                 onClick={collapsed && idx === 0 ? handleStackClick : undefined}
//               >
//                 <div>{paste.heading}</div>
//                 <div>{paste.content}</div>
//                 {!collapsed && (
//                   <div className="buttons">
//                     <button
//                       onClick={() => {
//                         navigator.clipboard.writeText(paste?.content);
//                         toast.success("copied to clipboard");
//                       }}
//                     >
//                       Copy
//                     </button>
//                     <button onClick={() => handleDelete(paste?.id)}>Delete</button>
//                     <button>
//                       <a href={`/?pasteId=${paste?.id}`}>Edit</a>
//                     </button>
//                     <button>
//                       <a href={`pastes/${paste?.id}`}>View</a>
//                     </button>
//                     <button>Share</button>
//                   </div>
//                 )}
//               </motion.div>
//             ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default Paste;


import React, { useState } from "react";
import { useEffect } from "react";
import '../styling/paste.css';
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../features/counter/pasteslice";
import { useNavigate } from "react-router-dom";
import {
  Copy,
  Eye,
  Trash2,
  Edit3,
  Share2,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";





const AllPastes = () => {
  const [backendPastes, setBackendPastes] = useState([]);
  const [search, setSearch] = useState("");
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  //const AllPastes = useSelector((state) => state.paste.pastes);
  const  fetchMyPastes = async()=> {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        "https://paste-app-backend.onrender.com/api/paste/my-pastes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setBackendPastes(data.pastes);
      }
    } catch (error) {
      console.log("Error fetching pastes", error);
    }
  }
  useEffect(() => {
    fetchMyPastes();
  }, []);

  const filteredPastes = backendPastes.filter((paste) =>
    paste.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this paste?")) {
      //dispatch(removeFromPastes(id));
      const token = localStorage.getItem("token");
      if(!token){
        alert("please login first");
        return;
      }
      try {
        const response = await fetch(`https://paste-app-backend.onrender.com/api/paste/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if(response.ok){
        //alert("paste deleted");
        //fetchMyPastes();
      }
      else{
        alert(data.message);
      }

    // Remove deleted paste from UI
    setBackendPastes((prev) => prev.filter((p) => p._id !== id));
  } catch (error) {
    console.error("Delete failed", error);
  }
};

  };

  const handleShare = (paste) => {
    navigator.clipboard.writeText(
      `${window.location.origin}/view/${paste._id}`
    );
    alert("Shareable link copied!");

  };
  let content;

  if (backendPastes.length === 0) {
    content = <p className="no-paste">No pastes yet.</p>;
  } 
  else if (filteredPastes.length === 0) {
    content = <p className="no-paste">No paste found.</p>;
  } 
  else {
    content = filteredPastes.map((paste) => (
                <div key={paste._id} className="paste-card">
                <h3>{paste.title}</h3>
                <p>{paste.content.slice(0, 100)}...</p>

                <div className="btn-row">
                  <button onClick={() => handleCopy(paste.content)}> 
                    <Copy size={16} /> Copy
                  </button>
                  <button onClick={() => handleDelete(paste._id)}>
                    <Trash2 size={16} /> Delete
                  </button>
                  <button onClick={() => navigate(`/?pasteId=${paste._id}`)}>
                    <Edit3 size={16} /> Edit
                  </button>
                </div>

                <div className="btn-row">
                  <button onClick={() => navigate(`/view/${paste._id}`)}>
                    <Eye size={16} /> View
                  </button>
                  <button onClick={() => handleShare(paste)}>
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>
            ));
            
  
  }


  return (
    <div className="allpastes-container">
      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search your pastes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
      </div>

      <div className="paste-grid">
        {content}
          
      </div>
    </div>
  );
};

export default AllPastes;
