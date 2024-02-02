import React from 'react'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import videoplayer from '../Assests/videoplayer.png'
import { BASE_URL } from '../services/baseUrl';

function ProjectCard({project}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

    <Card onClick={handleShow} className='shadow rounded btn'>
      <Card.Img variant="top" height={'200px'} src={project?`${BASE_URL}/uploads/${project.projectImage}`:videoplayer} /> 
      <Card.Body>
        <Card.Title className='text-center'>{project.title}</Card.Title>    
      </Card.Body>
    </Card>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
             <Col md={6}>
               <img width={'100%'} height={'250px'} src={videoplayer} alt='no image'/>
             </Col>
             <Col md={6}>
              <h4>Description</h4>
              <p>{project.overview}</p>
              <p><span className='fs-5'>Technologies:</span>{project.language}</p>
             </Col>
          </Row>
          <div className='d-flex mt-4 mb-4'>
            <a href={project.github} target='_blank'><i class="fa-brands fa-github fa-2x ms-3" style={{color:'black'}}></i></a>
            <a href={project.website} target='_blank'><i class="fa-solid fa-link fa-2x ms-5" style={{color:'black'}}></i></a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard