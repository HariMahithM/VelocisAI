import { useState } from "react";
import api from "../services/api";

import ProgressBar from "./ProgressBar";
import VideoInfo from "./VideoInfo";
import VideoPreview from "./VideoPreview";

function UploadBox({

videoURL,
setVideoURL,

uploadedFile,
setUploadedFile

}){

const [metadata,setMetadata]=useState(null);

const [progress,setProgress]=useState(0);

const chooseFile=(e)=>{

const file=e.target.files[0];

if(!file) return;

setUploadedFile(file);

const url=URL.createObjectURL(file);

setVideoURL(url);

const video=document.createElement("video");

video.src=url;

video.onloadedmetadata=()=>{

setMetadata({

width:video.videoWidth,

height:video.videoHeight,

duration:video.duration

});

};

};

const uploadVideo=async()=>{

if(!uploadedFile){

alert("Choose a video");

return;

}

const formData=new FormData();

formData.append("video",uploadedFile);

try{

await api.post(

"/upload",

formData,

{

headers:{

"Content-Type":"multipart/form-data"

},

onUploadProgress:(event)=>{

const percent=Math.round(

(event.loaded*100)/event.total

);

setProgress(percent);

}

}

);

alert("Upload Successful");

}

catch{

alert("Upload Failed");

}

};

return(

<div className="upload-card">

<h2>

Upload Traffic Video

</h2>

<input

type="file"

accept="video/*"

onChange={chooseFile}

/>

<VideoInfo

file={uploadedFile}

metadata={metadata}

/>

<ProgressBar

progress={progress}

/>

<VideoPreview

videoURL={videoURL}

/>

<div className="button-row">

<button

onClick={uploadVideo}

>

Upload

</button>

<button

onClick={()=>{

setUploadedFile(null);

setVideoURL("");

setMetadata(null);

setProgress(0);

}}

>

Remove

</button>

</div>

</div>

);

}

export default UploadBox;