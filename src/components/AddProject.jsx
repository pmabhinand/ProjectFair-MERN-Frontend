import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../context/ContextShare';

function AddProject() {
  
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)


  //state to hold values from input box
  const [projectDetails , setProjectDetails] = useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImage:""
  })

    const [show, setShow] = useState(false);
    //state to hold the url of the file
    const [preview , setPreview] = useState("")
    //state to hold token
    const [token , setToken] = useState("")

    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        setToken(sessionStorage.getItem("token"))
      }
    },[])

    useEffect(()=>{
      projectDetails.projectImage &&
      setPreview(URL.createObjectURL(projectDetails.projectImage)) //URL is a predefined method in javascript which has createObjectURL method which can convert file into url

    },[projectDetails.projectImage])

    console.log(preview);

    //display state
    console.log(projectDetails);

    const handleClose =()=>{
      setShow(false)
      handleClose1()

    }

  const handleClose1= () =>{ 
  
    setProjectDetails({
      title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImage:""
    })
    setPreview("")
  }
  const handleShow = () => setShow(true);

  //function to add project
   const handleProject = async(e)=>{
    e.preventDefault()
    const {title,language,github,website,overview,projectImage} = projectDetails

    if(!title || !language ||!github ||!website ||!overview ||!projectImage){
      alert(`please fill the form completely`)
    }
    else{
      //reqBody
      //1)create an object for formdata class - since we have uploaded content
      const reqBody = new FormData()
      //2)add data - append() - it can add only single data at a time
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)

      //reqHeader
      if(token){
      const reqHeader ={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }


      const result = await addProjectAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status===200){
        console.log(result.data);
        alert('project added successfully')
        handleClose()

        setAddProjectResponse(result.data)

      }
      else{
        alert(result.response.data);
        handleClose1()
      }
    }
    }

   }

  return (
    <div>
        <Button variant="success" onClick={handleShow}>
    Add project
  </Button>

  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add Project Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div className='row'>
            <div className='col-lg-6'>
                <label htmlFor='upload'>
                    <input id='upload' type="file" style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
                    <img className='img-fluid' src={preview?preview:"https://cdn.pixabay.com/photo/2023/08/23/12/52/ai-generated-8208497_640.jpg"} alt="" />
                </label>
            </div>
            <div className='col-lg-6'>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='project title' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='language' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}  />
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Github Link' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}  />
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Website Link' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}   />
                </div>
                <div className='mb-3 w-100'>
                    <textarea name='' id='' cols='30' rows='3' type="text" className='form-control' placeholder='Project overview' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}    />
                </div>
            </div>
        </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose1}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleProject}>
        Add
      </Button>
    </Modal.Footer>
  </Modal>
  </div>
  )
}

export default AddProject