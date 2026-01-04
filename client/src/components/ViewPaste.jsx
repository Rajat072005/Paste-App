// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import '../styling/viewpaste.css';
// import { Copy, Share2, Download } from "lucide-react";

// const ViewPaste = () => {
//   const { id } = useParams();
//   const [paste, setPaste] = useState(null);

//   useEffect(() => {
//     const storedPastes = JSON.parse(localStorage.getItem("pastes")) || [];
//     const foundPaste = storedPastes.find((p) => p.id === id);
//     setPaste(foundPaste);
//   }, [id]);

//   if (!paste) {
//     return (
//       <div className="viewpaste-container">
//         <p className="not-found">⚠️ Paste not found</p>
//       </div>
//     );
//   }

//   const handleCopy = () => {
//     navigator.clipboard.writeText(paste.content);
//     alert("✅ Content copied to clipboard!");
//   };

//   const handleShare = () => {
//     const shareUrl = `${window.location.origin}/view/${paste.id}`;
//     navigator.clipboard.writeText(shareUrl);
//     alert("🔗 Link copied to clipboard!");
//   };

//   const handleDownload = () => {
//     const blob = new Blob([paste.content], { type: "text/plain;charset=utf-8" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `${paste.title || "untitled"}.txt`;
//     link.click();
//   };

//   return (
//     <div className="viewpaste-container">
//       <div className="paste-card-view animate-fade">
//         <div className="view-header">
//           <h1>{paste.heading || "Untitled Paste"}</h1>
//           <p className="meta">
//             🕒 {new Date(paste.createdAt).toLocaleString()} | 📁 {paste.mode}
//           </p>
//         </div>

//         <div
//           className={`view-content ${
//             paste.mode === "Code" ? "code-view" : "note-view"
//           }`}
//         >
//           <pre>{paste.content}</pre>
//         </div>

//         <div className="view-actions">
//           <button onClick={handleCopy} className="btn copy-btn">
//             <Copy size={16} /> Copy
//           </button>
//           <button onClick={handleShare} className="btn share-btn">
//             <Share2 size={16} /> Share
//           </button>
//           <button onClick={handleDownload} className="btn download-btn">
//             <Download size={16} /> Download
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewPaste;

import Prism from "prismjs";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styling/viewpaste.css";
import { Copy, Share2, Download } from "lucide-react";

import "prismjs/themes/prism-tomorrow.css"; // VS Code–like dark theme
import "prismjs/components/prism-jsx"; // optional, for JS/React syntax

const ViewPaste = () => {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  
  useEffect(() => {
    //const storedPastes = JSON.parse(localStorage.getItem("pastes")) || [];
    
    const viewPaste = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          `https://paste-app-backend.onrender.com/api/paste/view/${id}`,
          {
            method : "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log("data : ",data);
        setPaste(data.paste);

      } catch (error) {
      console.log("Error fetching paste", error);
      }
    }
    viewPaste();
    
  }, [id]);

  useEffect(() => {
    Prism.highlightAll(); // triggers syntax highlighting
  }, [paste]);

  if (!paste) {
    return (
      <div className="viewpaste-container">
        <p className="not-found">⚠️ Paste not found</p>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    alert("✅ Content copied to clipboard!");
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/view/${paste.id}`;
    navigator.clipboard.writeText(shareUrl);
    alert("🔗 Link copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([paste.content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${paste.heading || "untitled"}.txt`;
    link.click();
  };

  return (
    <div className="viewpaste-container">
      <div className="paste-card-view animate-fade">
        <div className="view-header">
          <h1>{paste.title || "Untitled Paste"}</h1>
        </div>

        <div
          className={`view-content ${
            paste.mode === "Code" ? "code-view" : "note-view"
          }`}
        >
          {paste.mode === "Code" ? (
            <pre>
              <code className="language-js">{paste.content}</code>
            </pre>
          ) : (
            <p>{paste.content}</p>
          )}
        </div>

        <div className="view-actions">
          <button onClick={handleCopy} className="btn copy-btn">
            <Copy size={16} /> Copy
          </button>
          <button onClick={handleShare} className="btn share-btn">
            <Share2 size={16} /> Share
          </button>
          <button onClick={handleDownload} className="btn download-btn">
            <Download size={16} /> Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;



