import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleImage from '../Assests/nubelson-fernandes-gTs2w7bu3Qo-unsplash.jpg'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeprojectAPI } from '../services/allAPI'

function Home() {
  const [islogin , setIsLogin] = useState(false)
  const [homeProject , setHomeProject] = useState([])

   useEffect(()=>{
     if(sessionStorage.getItem("token")){
      setIsLogin(true)
     }
   },[])

   const getHomeProject = async()=>{
     const result = await homeprojectAPI()
     console.log(result.data);
     setHomeProject(result.data)
   }
   useEffect(()=>{
     getHomeProject()
   },[])

  return (
    <>
    <div style={{width:'100%',height:'100vh',backgroundColor:'yellowgreen'}}>
        <div className='container-fluid rounded'>
          <Row className='align-items-center p-5'>
            <Col sm={12} md={6}>
          
          <h1 style={{fontSize:'80px',color:'white'}}>Project fair</h1>
          <p>one stop destination for all software development project</p>
          {
            islogin ?
            <Link to={'/dashboard'} className='btn btn-success rounded'>Manage Project<i class="fa-solid fa-arrow-right ms-2"></i></Link>
            :
          
          <Link to={'/login'} className='btn btn-success rounded'>Get started<i class="fa-solid fa-arrow-right ms-2"></i></Link>
          }

          </Col>
          <Col sm={12} md={6}>
            <img src={titleImage} style={{width:'20rem',height:'20rem'}} alt="no image" />
          </Col>

          </Row>
        </div> 
    </div>

    <div className='mt-5 all-project mb-5'>
        <h1 className='text-center '>Explore our projects</h1>

        <marquee scrollAmount={20} className='mt-5'>
        <div className='d-flex'>

          { homeProject?.length>0?
            homeProject?.map((item)=>(
            <div style={{width:'500px'}} className='ms-5'>
                <ProjectCard project={item}/>
            </div>)) : null

          } 

            
        </div>
        </marquee>

        <div className='text-center mt-5'>
            <Link to={'/project'}>See more options</Link>
        </div>

    </div>

    </>
  )
}

export default Home