import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <div className='d-flex align-items-center justify-content-center bg-dark p-3' style={{width:'100%'}}>
        <div style={{width:'200px'}} className='ms-5 me-5'>
            <h3 className='text-warning'>Project Fair</h3>
            <p className='text-primary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur natus dolorum blanditiis dignissimos.</p>
        </div>

        <div style={{width:'200px'}} className='ms-5  me-5 d-flex flex-column'>
            <h3 className='text-warning'>Links</h3>
            <Link to={'/'}>Home Page</Link>
            <Link to={'/login'}>Login Page</Link>
            <Link to={'/register'}>Register Page</Link>
        </div>

        <div style={{width:'200px'}} className='ms-5  me-5 d-flex flex-column'>
           <h3 className='text-warning'>Guides</h3>
           <Link to={'https://bootswatch.com/'}>React</Link>

          <Link to={'https://react-bootstrap.netlify.app/'} >React Bootstrap</Link>

          <Link to={'https://bootswatch.com/'}>Bootswatch</Link>
        </div>

        <div style={{width:'200px'}} className='ms-5  me-5'>
            <h3 className='text-warning'>Contact Us</h3>
            <input className='form-control' type="text" placeholder='enter your email' />
            <button className='btn btn-success rouded m-2'>Subscribe</button>
        </div>

        
    </div>

    </>
  )
}

export default Footer