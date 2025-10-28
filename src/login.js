import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
const Login=()=>{
    const [name,setName]=useState(null);
    const [password,setPassword]=useState(null);
   
const handelSubmit=async(e)=>{
e.preventDefault();
try{
    if(localStorage.getItem("name")===name)
    {
        alert("already logged in as "+name);
        return;
    }
const nameTrimmed = name.trim().toLowerCase();
const passwordTrimmed = password.trim();

const { data, error } = await supabase
  .from("user")
  .select("*")
  .eq("name", nameTrimmed)
  .eq("password", passwordTrimmed)
  .single();
if(data){
    alert("logged in as "+data.name);
    localStorage.setItem("name",data.name);
    window.location.href="/upload";
}
else if(!data)
{
    alert("invalid username or password");
}
}
catch(err)
{
    console.log(err)
}
}
    return(
        <div>
            
            <center>
                <div id="login">
                    <form onSubmit={handelSubmit}>
<br/>
<br/>

<input type="text" required autoComplete="off" onChange={(e)=>setName(e.target.value)} placeholder="username"/>
<br/>
<br/>
<br/>

<input type="password" required autoComplete="off" onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
<br/>
<br/>

<input type="submit" value={"login"}/>
</form>
</div>
</center>
        </div>
    )
}
export default Login;
