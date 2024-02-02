import React ,{useContext, useEffect, useState}from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../services/baseUrl';
import { editprojectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../context/ContextShare';

function EditProject({project}) {
    const {editProjectResponse,seteditProjectResponse} = useContext(editProjectResponseContext)
    const [show, setShow] = useState(false);
    //state to hold the values of input box
    const [projectDetails , setProjectDetails] = useState({
        id:project._id,
        title:project.title,
        language:project.language,
        github:project.github,
        website:project.website,
        overview:project.overview,
        projectImage:""
      })

      const [preview,setPreview] = useState("")
    const handleClose =()=>{ setShow(false)
       handleClose1()
    }
    const handleShow = () => setShow(true);

    useEffect(()=>{
      if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
      }
    },[projectDetails.projectImage])

    const handleClose1 =()=>{
      setProjectDetails({
        title:project.title,
        language:project.language,
        github:project.github,
        website:project.website,
        overview:project.overview,
        projectImage:""
      })
      setPreview("")
    }

    const handleUpdate = async(e)=>{
      e.preventDefault()

      const {id,title,language,github,website,overview,projectImage} = projectDetails
      
      if(!title ||!language ||!github ||!website ||!overview){
         alert('please fill the form completely')
      }
      else{

      const reqBody = new FormData()

      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage) 
      
      

      const token = sessionStorage.getItem("token")

      if(preview){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const result = await editprojectAPI(id,reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
          alert('updated successfully')
          handleClose()
          seteditProjectResponse(result.data)
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
        const result = await editprojectAPI(id,reqBody,reqHeader)
        console.log(result); 
        if(result.status===200){
          alert('updated successfully')
          handleClose()
          seteditProjectResponse(result.data)
        } 
        else{
          console.log(result.response.data);
        }
      }

      }

    }
    
    
  
  return (
    <div>
        <button onClick={handleShow} className='btn'><i class="fa-regular fa-pen-to-square"></i></button>

        <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Project Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div className='row'>
            <div className='col-lg-6'>
                <label htmlFor='upload'>
                    <input id='upload' type="file" style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
                    <img className='img-fluid' src={preview?preview:`${BASE_URL}/uploads/${project.projectImage}`} alt="image" />
                </label>
            </div>
            <div className='col-lg-6'>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='project title' value={projectDetails.title}  onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/>
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='language' value={projectDetails.language}  onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} />
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Github Link' value={projectDetails.github}  onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} />
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Website Link' value={projectDetails.website}  onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} />
                </div>
                <div className='mb-3 w-100'>
                    <textarea name='' id='' cols='30' rows='3' type="text" className='form-control' placeholder='Project overview' value={projectDetails.overview}  onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} />
                </div>
            </div>
        </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleClose1}>
        Cancel
      </Button>
      <Button variant="success" onClick={handleUpdate}>
        update
      </Button>
    </Modal.Footer>
  </Modal>
    </div>
  )
}

export default EditProject