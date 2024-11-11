import React, { useEffect, useState } from 'react'
import { Col, Container, Row,Button,Form } from 'react-bootstrap'
import axios from 'axios'
import TopHeader from '../comp/TopHeader'


const Contact = () => {

  const [form,setForm]=useState({name:'',email:'',mes:''})
  const [msg,setMsg] = useState(false)
  const [validated, setValidated] = useState(false);

  useEffect(()=>{window.scrollTo({ top: 0, behavior: 'smooth' });},[])

  const handleSubmit = (e) =>{
    e.preventDefault()
    const formm = e.currentTarget;
    if (formm.checkValidity() === false) {
      e.stopPropagation();
    }else{

      axios.post('http://localhost:5000/createContact', form)
      .then(res =>{
          setMsg(true)
      }).catch(err =>{
          console.log("SMS not sended: "+err)
      })
    }

    setValidated(true);

    
}

  return (
   <>
   <TopHeader he='300px' title='Contact Us'/>

    <Container>
      <Row className='mt-5 contactus'>
        <Col sm={12}>
        <h1 className='mb-5' style={{textAlign:'center'}}>Contact Us For Any Inquiries or Booking</h1>
        <hr/>
        </Col>
        <Col sm={4} >
        
        <Row style={{alignItems:'center'}} >
          <Col sm={1}>
          <i className="fa-regular fa-envelope"></i>
          </Col>
          <Col sm={11} className=''>
          <h3>Email US</h3>
          </Col>
          <Col sm={1}>
          </Col>
          <Col sm={8}>
          <a className='link gri' href='mailto:support@rentwheel.com'>support@rentwheel.com</a>
          </Col>
        </Row>
        
        </Col>
        <Col sm={4} >
        <Row style={{alignItems:'center'}}>
          <Col sm={1}>
          <i className="fa-solid fa-phone-volume"></i>
          </Col>
          <Col sm={11}>
          <h3>Call US</h3>
          </Col>
          <Col sm={1}>
          </Col>
          <Col sm={8}>
          <a className='link gri' href='tel:3556854514564'>+3556854514564</a>
          </Col>
        </Row>
        
        </Col>
        <Col sm={4} >
        <Row style={{alignItems:'center'}}>
          <Col sm={1}>
          <i className="fa-solid fa-location-dot"></i>
          </Col>
          <Col sm={11}>
          <h3>Find US</h3>
          </Col>
          <Col sm={1}>
          </Col>
          <Col sm={8}>
          <a className='link gri' href='https://maps.app.goo.gl/WbUbmia9vd2Def5V6' target='_blank'>Tirana,Albania</a>
          </Col>
        </Row>

        
        
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col sm={2}>
        </Col>
        <Col sm={7}>
        {msg?<h1>Message Sent!</h1>:
          <Form onSubmit={handleSubmit} noValidate  validated={validated}>
          <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Name" />
              <Form.Control.Feedback type="invalid">
              Please choose a name.
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}  placeholder="name@example.com" />
              <Form.Control.Feedback type="invalid">
              Please choose a valid email.
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="mes">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" required value={form.mes} onChange={(e)=>setForm({...form,mes:e.target.value})}  rows={3} />
              <Form.Control.Feedback type="invalid">
              You need to write a message.
            </Form.Control.Feedback>
            </Form.Group>
            <Button variant="outline-light" type="submit">Send</Button>
          </Form>
        }
        </Col>
      </Row>
      <Row className='mt-5'>
          <Col sm={12}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.162686965418!2d19.819639076474793!3d41.32707559973347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135031109cf2c445%3A0xb7637ce202e190ff!2sToptani%20Plaza%2C%20Sh%C3%ABtitorja%20Murat%20Toptani%2C%20Tirana%2C%20Shqip%C3%ABria!5e0!3m2!1ssq!2s!4v1729071931496!5m2!1ssq!2s" width="100%" height="700" style={{border:'0'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </Col>
        </Row>

        <Row className='mt-5 terms' id='terms'>
          <Col sm={12}>
          <h1 style={{textAlign:'center'}}>Terms & Conditions</h1>
          </Col>
          <Col sm={12}>
          <ul>
            <li>The renter and any additional drivers must be at least 20 years old and possess a valid local driving license. Probationary license holders are not eligible.</li>
            <li>All vehicles are provided with a reasonable amount of fuel and must be returned with the same fuel level. If the vehicle is returned with less fuel, a refueling service charge will be applied. Please note that all vehicles use unleaded petrol.</li>
            <li>The renter is responsible for any parking or traffic violations incurred during the rental period. Traffic fines will be deducted from the security deposit if not settled by the renter.</li>
            <li>The vehicle must be returned in the same condition as when rented or delivered. Any damage or additional cleaning required will be charged to the renter.</li>
            <li>The renter must provide a photocopy of a valid Identification Card (IC), driving license, and a recent utility bill as part of the rental agreement verification process.</li>
            <li>Any extension of the rental period must be requested at least 12 hours prior to the original return date. Failure to notify RentWheels within this timeframe may result in penalties or non-availability.</li>
            <li>In the event of an accident, the renter must inform RentWheels immediately and refrain from taking any actions until further consultation with RentWheels. This is to prevent any potential issues between both parties.</li>
            <li>RentWheels reserves the right to void all payments and deposits, as well as reclaim the vehicle immediately if it is found to be used for illegal activities.</li>
            <li>Only the individual(s) whose Identification Card (IC) has been submitted and approved by RentWheels is permitted to drive the vehicle. Third-party drivers are strictly prohibited. If RentWheels discovers that an unauthorized driver is operating the vehicle, the rental agreement will be terminated immediately, the vehicle will be reclaimed, and all payments and deposits will be forfeited.</li>
            <li>Should the renter fail to return the vehicle as required or engage in any illegal activity, RentWheels reserves the right to report the matter to the relevant authorities.</li>
            <li>If the vehicle is seized by authorities due to illegal activities or other reasons related to the renter’s actions, the renter will be responsible for all associated costs to recover the vehicle.</li>
            <li>If full payment for the rental is not made as agreed, RentWheels reserves the right to reclaim the vehicle before the end of the rental period, and any prior payments made will be forfeited.</li>
         
          </ul>
          
          </Col>


        </Row>
    </Container>

   </>
  )
}

export default Contact
