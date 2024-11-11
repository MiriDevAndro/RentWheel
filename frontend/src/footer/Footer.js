import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Logos from '../Logos'
import { Link } from "react-router-dom" 

const Footer = () => {
  return (
    <footer className='bd-footer mt-5 pt-5'>
      <Container className='mt-5'>
      <hr  />
        <Row>
          <Col className='mb-3' lg={2}>
          <a href='/'>
            <Logos color='#fff'/>
          </a>
          <ul className='list-unstyled small'>
            <li>We are a well established car rental agency operating since 2017. We have many cars in our fleet suited for any occasion.</li>
          </ul>
          </Col>
          <Col className='mb-3 offset-lg-2' lg={4} sm={6}>
            <h5>Links</h5>
            <ul className='list-unstyled'>
              <li className='mb-2'>
                <a href='/' className='link'>Home</a>
              </li>
              <li className='mb-2'>
                <a href='/all/' className='link'>Our Cars</a>
              </li>
              <li className='mb-2'>
                <a href='/about/' className='link'>About</a>
              </li>
              <li className='mb-2'>
                <a href='/contact/' className='link'>Contact</a>
              </li>
            </ul>
          </Col>
          <Col className='mb-3' lg={4} sm={6}>
            <h5>Cars</h5>
            <ul className='list-unstyled'>
              <li className='mb-2'>
                <a href='/cars/mercedes/' className='link'>Mercedes</a>
              </li>
              <li className='mb-2'>
                <a href='/cars/lambo/' className='link'>Lamborghini</a>
              </li>
              <li className='mb-2'>
                <a href='/cars/bmw/' className='link'>BMW</a>
              </li>
              <li className='mb-2'>
                <a href='/cars/audi/' className='link'>Audi</a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col sm={6} className='mb-3'>
          <div style={{display:'flex',flexDirection:'row',alignItems:'center',textAlign:'center'}}>
            <h6 className='m-0'>© Copyright all rights reserved</h6>
            {/* <a className='link ms-1' href='/contact#terms'>Terms and Conditions</a> */}
            <Link className='link ms-1' to='/contact/#terms'>Terms and Conditions</Link>
          </div>
            
          </Col>
          <Col sm={6}  className='mb-3'>
            <div className='social' style={{textAlign:'end'}}>
              <a href='https://fb.com' target='_blank' rel='noreferrer'><i className="fa-brands fa-facebook"></i></a>
            <a href='https://instagram.com' target='_blank' rel='noreferrer'><i className="fa-brands fa-instagram"></i></a>
            <a href='https://tw.com' target='_blank' rel='noreferrer'><i className="fa-brands fa-twitter"></i></a>
            
            </div>
          </Col>
        </Row>
      </Container>

    </footer>
  )
}

export default Footer
