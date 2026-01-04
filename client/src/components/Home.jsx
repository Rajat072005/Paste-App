
import React, { useState, useEffect } from "react";
import "../styling/home.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPaste, updateToPaste } from "../features/counter/pasteslice";
import toast from "react-hot-toast";
// CodeMirror Imports
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { getToken ,setToken, removeToken , isLoggedIn } from "../utils/auth";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //const [mode, setMode] = useState("note"); // note | code
  const [language, setLanguage] = useState("note");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isEdit , setIsEdit] = useState(false);
  const pasteId = searchParams.get("pasteId");
  const navigate = useNavigate();
  

  //const dispatch = useDispatch();
  //const AllPastes = useSelector((state) => state.paste.pastes);

   useEffect(() => {
    if(!pasteId)return;

    async function fetchPaste() {
      const token = localStorage.getItem("token")
      const response = await fetch(`https://paste-app-backend.onrender.com/api/paste/view/${pasteId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      
    });
    const data = await response.json();
    console.log("API RESPONSE 👉", data);
    setTitle(data.paste.title);
    setContent(data.paste.content);
    setIsEdit(true);
    // if(response.ok){
      
    // }
    }
    fetchPaste();
   }, [pasteId]);

  async function editPaste() {
    const token = localStorage.getItem("token");

    if(!token){
      alert("please login first");
      return;
    }

    const response = await fetch(`https://paste-app-backend.onrender.com/api/paste/update/${pasteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({title , content}),
    });
    const data = await response.json();

    if(data.success){
      toast.success("paste updated successfully");
      navigate("/pastes")
    }
  }
  async function  createPaste() {
    //if (title.trim() === "") return alert("Please enter a title!");
    //console.log("SENDING:", { title, content });
    const paste = {
      heading: title,
      content: content,
      language,
      id: pasteId || Date.now().toString(36),
    };

    const token = getToken();
    if(!token){
      toast.error("please login first");
      return;
    }
    const response = await fetch("https://paste-app-backend.onrender.com/api/paste/CreatePaste", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({title , content}),
    });

    const data = await response.json();
    if(response.status === 401 ){
      removeToken();
      toast.error(data.message);
      return;
    }
    if(response.ok){
      toast.success(data.message);
      setTitle(""); 
      setContent("");
      setSearchParams({});
      
    }
    else{
      toast.error(data.message);
    }
    //console.log("RESPONSE:", data)
    //pasteId ? dispatch(updateToPaste(paste)) : dispatch(addToPaste(paste));

    
  }

  // Dynamic CodeMirror language extension
  const getLanguageExtension = () => {
    switch (language) {
      case "c":
      case "cpp":
        return cpp();
      case "java":
        return java();
      case "python":
        return python();
      case "javascript":
        return javascript();
      default:
        return [];
    }
  };

  

  return (
    <div className="home-container">
      <h1 className="home-title">Paste • Save • Share</h1>
      <p className="home-subtitle">A smooth space for notes & code snippets.</p>

      <div className="editor-card">
        <input
          id="title-input"
          type="text"
          placeholder="Enter Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Unified Dropdown */}
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="note">Note</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>

        {/* Editor based on selection */}
        {language === "note" ? (
          <textarea
            id="note-box"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <CodeMirror
            value={content}
            height="350px"
            theme={oneDark}
            extensions={[getLanguageExtension()]}
            onChange={(val) => setContent(val)}
          />
        )}

        <button id="create-btn" onClick= {isEdit ? editPaste : createPaste}>
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>
    </div>
  );
};

export default Home;
