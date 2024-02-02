import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import {BASE_URL} from '../services/baseUrl'
import { editprofileAPI } from '../services/allAPI';

function Profile() {
    const [open, setOpen] = useState(false);
    const [userProfile,setUserProfile] = useState({
      username:"",
      email:"",
      password:"",
      github:"",
      linkedin:"",
      profile:""
    })
    const [isUpdate,setIsUpdate] = useState(false)
//once an image is uploaded ,then thatimage will be stored in existing image
    const [existingImage,setExistingImage] = useState("")
//to hold the url of the new image    
    const [preview,setPreview] = useState("")

    useEffect(()=>{
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin,profile:""})

      setExistingImage(user.profile)
    },[isUpdate])

    useEffect(()=>{
      if(userProfile.profile){
        setPreview(URL.createObjectURL(userProfile.profile))
      }
      else{
         setPreview("")
      }
    },[userProfile.profile])

    const handleProfileUpdate = async()=>{
      const {username,email,password,github,linkedin,profile} = userProfile
      if(!github || !linkedin){
        alert("please fill the form completely")
      }
      else{
        const reqBody = new FormData()
        reqBody.append("username",username)
        reqBody.append("email",email)
        reqBody.append("password",password)
        reqBody.append("github",github)
        reqBody.append("linkedin",linkedin)
        preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)
      
      const token = sessionStorage.getItem("token")

      if(preview){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const result = await editprofileAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
          alert("profile updated successfully")
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
          setIsUpdate(true)
        }
        else{
          console.log(result.response.data);
        }
      }
      else{
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await editprofileAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
          alert("profile updated successfully")
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
          setIsUpdate(true)
        }
        else{
          console.log(result.response.data);
        }
      }
     } 
    }
  
  return (
    <div className='card shadow p-5'>
        <div className='d-flex justify-content-between'>
           <h2>Profile</h2>
           <button onClick={() => setOpen(!open)} className='btn btn-outline-info'><i class="fa-solid fa-angle-down"></i></button>
        </div>

        <Collapse in={open}>
        <div className='row justify-content-center mt-4'>
            <label htmlFor="profile">
                <input id='profile' type="file" style={{display:'none'}} onChange={(e)=>setUserProfile({...userProfile,profile:e.target.files[0]})} />
                {existingImage==""?
                  <img width={'200px'} height={'200px'} src={preview?preview:"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"} alt="no image" className='rounded-circle'/>:
                  <img width={'200px'} height={'200px'} src={preview?preview:`${BASE_URL}/uploads/${existingImage}`} alt="no image" className='rounded-circle'/> }
            </label>
            <div className='mb-3 mt-5'>
               <input type="text" placeholder='Github' className='form-control' value={userProfile.github} onChange={(e)=>setUserProfile({...userProfile,github:e.target.value})} />
            </div>
            <div className='mb-3'>
               <input type="text" placeholder='LinkedIn' className='form-control' value={userProfile.linkedin} onChange={(e)=>setUserProfile({...userProfile,linkedin:e.target.value})}  />
            </div>
            <div className='mb-3 mt-3'>
               <button onClick={handleProfileUpdate} className='btn btn-success rounded w-100'>Update</button>
            </div>

        </div>
        </Collapse>

    </div>
  )
}

export default Profile