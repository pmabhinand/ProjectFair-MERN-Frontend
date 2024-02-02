import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import MyProjects from '../components/MyProjects'
import Profile from '../components/Profile'

function Dashboard() {

  const [username,setUsername]=useState("")

  useEffect(()=>{
    setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
  },[])

  return (
    <>
    <Header dashboard/>

    <h2 className='mt-3 ms-3'>WELCOME <span className='text-warning'>{username}</span></h2>

    <Row className='container-fluid mt-5 mb-5'>
      <Col md={8}><MyProjects/></Col>

      <Col md={4}><Profile/></Col>
    </Row>
    </>
  )
}

export default Dashboard