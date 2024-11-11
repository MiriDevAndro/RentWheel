import React,{useContext,useEffect} from 'react'
import {  Button, Col, Container, Row } from 'react-bootstrap'
import lambovideo from '../video/lambo.mp4'
import Card from './Card'
import audi from  '../video/audi.mp4'
import ContextProvider from '../Context'
import { Link } from 'react-router-dom'

const Home = () => {
  const {cars} = useContext(ContextProvider)
  useEffect(()=>{window.scrollTo({ top: 0, behavior: 'smooth' });},[])
  return (
    <>
    
    <div style={{position:'relative',height:'500px'}} >
      <div className='video-back'>
        <video src={lambovideo} loop muted autoPlay className='m-0 p-0' width='100%' height='100%' style={{overflow:'hidden',objectFit:'cover'}}></video>
      </div>
      <div style={{position:'absolute',top:'50%',left:'50%',transform: 'translate(-50%, -50%)',color:'white',textAlign:'center',zIndex:'2'}}>
        <h1 className='txtsh'>"The car that takes you beyond the destination."</h1>
        <p className='merienda'>
        Rent A Luxury Car Anywhere. Supercar Rentals, Sports Car Rental And Limousine Rentals Available. Let Us Serve You
        </p>
        <Link className='btn btn-outline-light' to='/contact/'>Contact Us</Link>
      </div>
    </div>
    <Container>
      <div style={{textAlign:'center',marginTop:'5%'}}>
        <h1 className='dm-serif-text-regular'>Who Are We:</h1>
        <p>At Rent Wheel, we’re more than just a rental car service – we’re your trusted partner on the road. With years of experience in the car rental industry, we’re dedicated to providing our customers with a seamless, reliable, and convenient transportation experience, whether you're traveling for business, exploring a new city, or simply need a temporary ride.</p>
      </div>
      
      <Row style={{marginTop:'5%'}}>
        
        {cars && cars.map((d,index)=>{
          return(
          index <6 && 
          <Col md={6} lg={4}  sm={12} key={d._id}>
            <Card data={d}/>
          </Col>)
        })} 
      </Row>

      {/* <Row style={{marginTop:'10px',justifyContent:'center'}}>
        <Col sm={1}>
          <a className='buttonn link ttt' href='/all/'>View All</a>
        </Col>
      </Row> */}

      <Row style={{marginTop:'10%',justifyContent:'center'}} >
        <Col sm={12}>
          <h1 className='dm-serif-text-regular'>Why Choose Rent Wheel</h1>
        </Col>
        <hr />
        <Col md={4} sm={12} className='p-0' style={{position:'relative'}}>
        <div className='video-backk'>
          <video src={audi} loop muted autoPlay className='m-0 p-0' style={{overflow:'hidden',objectFit:'cover',position: 'relative',width:'100%',height:'248px'}} />
          </div>
          <div style={{height:'248px'}}>

          </div>
        </Col >
        <Col sm={4}>
        <h2>Affordable Price</h2>
        <p>Rent luxury cars for an affordable price. Guaranteed satisfaction and customer service.</p>
        </Col>
        <Col sm={4}>
        <h2>Security & Safe</h2>
        <p>Best cars with security and safety.</p>
        </Col>
        <Col sm={4}>
        </Col >
        <Col sm={4}>
        <h2>24/7 Pickup & Return Access</h2>
        <p>24/7 pickup and drop off.</p>
        </Col>
        <Col sm={4}>
        <h2>Multiple Drop-Off Locations</h2>
        <p>Multiple Drop off locations for your ease.</p>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default Home
