import { supabase } from "./supabaseClient";
import { useState,useEffect } from "react";
 const Download=()=>{
    const logout=(e)=>{
        e.preventDefault();
        localStorage.removeItem("name");
        window.location.href="/";

    }
    useEffect(()=>{
    if(!localStorage.getItem("name"))
    {
alert("you have to login first");
window.location.href="/";
    }
})
    const [files,getFiles]=useState([]);
    const [txt,getTxt]=useState([]);

    useEffect(()=>{
        colfile();
    },[]);
    const del=async(x,y)=>{
        if(window.confirm("delete the file ??"))
        {
const {data,error}=await supabase
.from("file_data")
.delete()
.eq("id",x);
if (error) {
      console.error("Error deleting:", error.message);
    } else {
      alert(`${y} deleted successfully!`);
    }
}
    }
    const colfile=async ()=>{
        const {data,error}=await supabase
        .from("file_data")
        .select("*")
        .order("id", { ascending: false });
        if(data.length===0)
        {
            alert("No files Found!!");
            
        }
        if (error)
        {
            alert(error);
        }
        else{
            getFiles(data);
            
        }

        const {data:data1,error:err1}=await supabase
        .from("txt_data")
        .select("*")
        .order("id", { ascending: false });
        if(data1.length===0)
        {
            alert("No txt Found!!");
            
        }
        if (err1)
        {
            alert(error);
        }
        else{
            getTxt(data1);
        }
        if(data.length==0&&data1.length==0)
        {
            window.location.href="/upload"
        }

    }
   const dels=async(x)=>{
    if(window.confirm("delete the text ??")){
const {data,error}=await supabase
.from("txt_data")
.delete()
.eq("id",x);
if (error) {
      console.error("Error deleting:", error.message);
    } else {
      alert("deleted successfully!");
    }
}
    }
    return(
        <div>
            <center>
            
            <div className="logout">
            <button onClick={logout}>log out</button>
            </div>
            <div id="filediv">
                {files.map((e)=>{
                    return(
                    <div className="files">
                        <br/>
                        <div className="infile">
                        <img src={e.preview} loading="lazy" alt="error"/>
                        </div>
                        <br/>
                        <p>{e.file_name}</p>
                        <p>{e.uname}</p>
                        <p>{e.sem}</p>
                        <a href={e.url}><button>view</button></a>
                        <br/>
                        <br/>
                    

                        <button onClick={()=>del(e.id,e.file_name)}>detele</button>
                        </div>
                    );
                })}
          
            
             </div>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>

              <div id="txt_div">
                {
                    txt.map((e)=>{
return(
    <div className="downtxt">
        <textarea id="txre" value={e.txt+" from "+e.user}>

                </textarea>
                <button onClick={()=>dels(e.id)} >
                    x
                </button>
 
        </div>
)
                    })
 }
            </div>
        
              </center>
              
              
        </div>
    )
 }
 export default Download