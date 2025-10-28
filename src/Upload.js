import {supabase} from "./supabaseClient";
import { useEffect, useState } from "react";
const Upload=()=>{
    const logout=(e)=>{
        e.preventDefault();
        localStorage.removeItem("name");
        window.location.href="/";
    }
    const [file,setFile]=useState(null);
    const [preview,setPreview]=useState(null);
useEffect(()=>{
    
    if(!localStorage.getItem("name"))
    {
alert("you have to login first");
window.location.href="/";
    }
})
    const Upl=async(e)=>{
        e.preventDefault();
        const fname=document.getElementById("name").value;
        const sem=document.getElementById("sem").value;
        const uname=localStorage.getItem("name");
        try{
        if(!file)
        {
            alert("please select a file!!");
            return;
        }
        const uniqueFileName = `${Date.now()}_${file.name}`;
      const uniquePreviewName = `${Date.now()}_${preview.name}`;
        console.log(file.name);
        const {data:data1,error:error1}=await supabase.storage
        .from("Drive")
        .upload(uniqueFileName,file);
        const {data:data2,error:error2}=await supabase.storage
        .from("preview")
        .upload(uniquePreviewName,preview);

        console.log(data1);
        if((data1.path===uniqueFileName)&&(data2.path===uniquePreviewName))
        {

            const {data:urlData1}=supabase.storage
            .from("Drive")
            .getPublicUrl(uniqueFileName);
            const {data:urlData2}=supabase.storage
            .from("preview")
            .getPublicUrl(uniquePreviewName);
            console.log(urlData2.publicUrl);
            const fileurll=urlData1.publicUrl;
            const fileurl2=urlData2.publicUrl;
const { data, error } = await supabase
  .from("file_data")
  .select("*")
  .eq("file_name", fname);

if (error) {
  console.log("Error checking file name:", error.message);
}

if (data && data.length > 0) {
  alert("file name already found!!");
  return;
}

else{
            const { data:dat1, error:err1 } = await supabase
              .from("file_data")
              .insert([{ "file_name":fname,"url":fileurll,"sem":sem,"preview":fileurl2,"uname":uname}])
              .select();
            console.log(dat1);
            alert("successfully uploded the file!!");
}

        }
        else if(error1)
        {
            alert(error1+"in the uploading the file");
            console.log(error1);
        }
        else if(error2)
        {
            alert(error2+"in the uploading the preview");
            console.log(error1);
        }
        }
        catch(err)
        {
            alert(err);
            console.log(err);

        }        
    }
    return(
<div>
    <div className="logout">
            <button onClick={logout}>log out</button>
            </div>
            <br/>
            <br/>
            <br/>

<div>
    <center>
        <div id="upload">
    <form onSubmit={Upl}>
  <br/>
  <br/>
  <br/>

  <input type="file" name="file" required onChange={(e)=>setFile(e.target.files[0])} placeholder="file"/>
  <br/>
  <br/>

  <input type="file" name="preview" required onChange={(e)=>setPreview(e.target.files[0])} placeholder="preview"/>
  <br/>
  <br/>

  <input type="text" name="name" required autoComplete="off" id="name" placeholder="file name"/>
  <br/>
  <br/>

  <input type="text" name="sem" required autoComplete="off" id="sem" placeholder="sem"/>
  <br/>
  <br/>

  <button type="submit">Upload</button>
</form>
</div>
</center>

</div>
</div>
    );

 }
export default Upload;