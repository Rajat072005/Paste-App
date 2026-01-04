import Paste from "../models/Paste.js"; 


export const createPaste = async (req, res) => {

  try {
    const {title, content} = req.body;

    if (!title || !content) {
      return res.status(403).json({ message: "All fields required" });
    }

    const paste = await Paste.create({
      title,
      content,
      user: req.id, // 👈 THIS LINE
    });

    res.status(201).json({
      paste,
      sucess : true,
      message : "paste created successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const fetchPastes = async (req,res) => {
  try {
    const userId = req.id;
    const pastes = await Paste.find({user : userId}).sort({createdAt : -1});

    return res.status(200).json({
      success : true,
      message : "pastes fetched successfully",
      pastes
    })

  } catch (error) {
    return res.status(500).json({
      sucess : false,
      message : "server error"
    })
  }

};

export const deletePaste = async (req,res) => {
  try {
    const userId = req.id;
    const pasteId = req.params.id;

    const paste = await Paste.findById(pasteId);
    if(!paste){
      return res.status(403).json({
        success : false,
        message  : "paste not found"
      })
    }

    if(paste.user.toString() !== userId){
      return res.status(401).json({
        success:false,
        message : "unauthorised user"
      })
    }
    await Paste.findByIdAndDelete(pasteId);
    return res.status(200).json({
      success: true,
      message : "paste deleted successfully",
      paste
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success : false,
      message : "server error"
    })
  } 
}

export const viewPaste = async (req,res) => {
  const pasteId = req.params.id;

  const paste = await Paste.findById(pasteId);

  if(!paste){
    return res.status(403).json({
      success : false,
      message : "paste not found"
    })
  }

  return res.status(200).json({
    success : true,
    message : "paste found",
    paste
  })
  
}

export const editPaste = async (req,res) => {
  const userId = req.id;
  const pasteId = req.params.id;

  try {
    const paste = await Paste.findById(pasteId);

    if(!paste){
      return res.status(403).json({
        success : false,
        message : "paste not found"
      })

    }
    if(paste.user.toString() !== userId){
      return res.status(401).json({
        success : false,
        message : "unauthorised user"
      })
    }

    const {title , content} = req.body;

    const updatedPaste = await Paste.findByIdAndUpdate(pasteId , {title  , content  } , { new: true });
    return res.status(200).json({
      success : true,
      message : "paste updated successfully",
      
      updatedPaste
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"server error"
    })
  }
}