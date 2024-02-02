import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { loginAPI, registerAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../context/ContextShare';


function Auth({register}) {
  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  const [userData , setUserData] = useState({
    username:"",
    email:"",
    password:""
  })
  const navigate = useNavigate()
  //console.log(userData);
  const RegisterForm = register ? true : false

  //function to register
  const handleRegister = async(e)=>{
    e.preventDefault()
    const {username,email,password} = userData

    if(!username || !email ||!password){
      toast.info('please fill the form completely')
    }
    else{
      const result = await registerAPI(userData)
      console.log(result);
      if(result.status===200){
         toast.success(`${result.data.username} registered successfully`)
         setUserData({
          username:"",email:"",password:""
         })
         
         navigate('/login')

      }
      else{
        toast.error(`${result.response.data}`)
      }
    }
  }

  //function to login

  const handleLogin =async (e)=>{
    e.preventDefault()

    const {email,password}=userData
    if(!email || !password){
      toast.info('please fill the form completely')
    }
    else{
      const result = await loginAPI(userData)
      console.log(result);

      if(result.status===200){
        setIsAuthToken(true)
        //store data
        //in session storage key:string,value:string
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)

        toast.success('login successful')

        setUserData({
          username:"",email:"",password:""
        })
        
        setTimeout(() => {
          navigate('/')
        },2000);


      }
      else{
        toast.error(result.response.data)
      }
      
    }
  }

   
  return (
    <>
    <div>
      <Link to={'/'} className='text-danger'><i class="fa-solid fa-arrow-left"></i>Back To Home</Link>
       <div className='bg-success' style={{margin:'10rem',width:'75%',height:'25rem'}}>
          <Row>
             <Col lg={6} sm={12} md={4}>

             </Col>
             <Col lg={6} sm={12} md={4}>
                <h1 className='text-light'>Project Fair</h1>
                <h5 className='text-light ms-5 mt-4'>
                  {
                     RegisterForm?"sign up to your account":"sign in to your account"
                  }
                </h5>
                
                  
                  <form className='p-4'>
                     { RegisterForm &&
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter Username" value={userData.username} onChange={(e)=>{setUserData({...userData,username:e.target.value})}} />
                </Form.Group>
                  }

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Enter your mail id" value={userData.email} onChange={(e)=>{setUserData({...userData,email:e.target.value})}}  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="password" placeholder="Enter password" value={userData.password} onChange={(e)=>{setUserData({...userData,password:e.target.value})}} />
                </Form.Group>

                {
                  RegisterForm?
                  <div>
                <button className='btn btn-warning' onClick={handleRegister}>Register</button>
                <p className='text-light'>Already a user? click here to<Link to={'/login'}>Login</Link></p>
                </div>
                :
                <div>
                <button className='btn btn-warning' onClick={handleLogin}>Login</button>
                <p className='text-light'>New user? click here to<Link to={'/register'}>Register</Link></p>
                </div>
               }
               
               </form>
                
             </Col>

          </Row>
       </div>

    </div>

    <ToastContainer theme='colored' autoClose={2000} position='top-center' />


    </>
  )
}

export default Auth