import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthTokenContext } from '../context/ContextShare'

function Header({dashboard}) {
  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  const navigate = useNavigate()
   const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    navigate('/')
    setIsAuthToken(false)
   }

  return (
    <div style={{width:'100%',height:'6rem'}} className='bg-success d-flex'>
      <div style={{width:'80%'}}>
        <Link to={'/'} style={{textDecoration:'none'}}>
        <h3 className='p-4' style={{color:'white'}}>Project Fair</h3>
        </Link>
        </div>

        {
          dashboard &&
          <div className='ms-5 mt-3'>
          <button onClick={handleLogout} className='btn btn-warning'>Logout<i class="fa-solid fa-power-off"></i></button>
          </div>

        }
    </div>
  )
}

export default Header