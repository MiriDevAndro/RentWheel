import React,{useEffect} from 'react'
import { Col, Container, Row,Button } from 'react-bootstrap'
import TopHeader from '../comp/TopHeader'
import { Link } from 'react-router-dom'

const About = () => {
  useEffect(()=>{window.scrollTo({ top: 0, behavior: 'smooth' });},[])
  return (
    <>
    <TopHeader he='300px' title='About Us'/>
    <Container>
        <Row className='mt-5'>
          <Col sm={12}>
          <h1 >Who Are We</h1>
          <hr />
          </Col>
          <Col  sm={3}>
          </Col>
          <Col sm={7}>
          <p>
          At Rent Wheel, we’re more than just a rental car service – we’re your trusted partner on the road. With years of experience in the car rental industry, we’re dedicated to providing our customers with a seamless, reliable, and convenient transportation experience, whether you're traveling for business, exploring a new city, or simply need a temporary ride.

Our extensive fleet ranges from economy cars perfect for budget-conscious travelers to luxury vehicles for those looking to travel in style. We take pride in offering meticulously maintained vehicles that meet the highest standards of safety, cleanliness, and comfort. Whatever your journey requires, we have the right vehicle to get you there.

What sets us apart is our commitment to customer satisfaction. We understand that every trip is unique, and our goal is to make the process of renting a car as simple and stress-free as possible. With flexible rental options, competitive pricing, and a dedicated team available to assist you 24/7, we ensure that your driving experience is smooth from start to finish.

Whether you need a car for a few hours, a day, or an extended period, we’re here to provide you with personalized service and a vehicle that fits your needs. Choose Rent Wheel for your next rental, and discover the freedom of the road with a partner you can rely on.
            </p>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col sm={12}>
            <h1>Why Choose Us?</h1>
            <hr/>
          </Col>
          <Col sm={3}>
          </Col>
          <Col sm={8}>
          <p>At Rent Wheel, we make renting a car fast, easy, and hassle-free. Here’s why thousands of customers trust us with their journeys:</p>
          <div>
          <h1>1. Wide Selection of Vehicles</h1>
          <p>From compact cars for city driving to luxury sedans and spacious SUVs for family trips, we have a diverse fleet to meet your needs, all regularly maintained to ensure safety and comfort.</p>
          </div>
          <div>
          <h1>2. Competitive Pricing</h1>
          <p>We offer transparent, affordable rates with no hidden fees, giving you the best value for your money. Plus, enjoy exclusive deals and discounts when you book online.</p>
          </div>
          <div>
          <h1>3. Convenient Pickup and Drop-off Locations</h1>
          <p>With numerous locations near airports, city centers, and other key spots, we make your travel experience as seamless as possible. Wherever you’re headed, we’ve got a location near you.</p>
          </div>
          <div>
          <h1>4. Flexible Rental Options</h1>
          <p>Whether you need a car for a day, a week, or even longer, we offer flexible rental terms to fit your schedule. Book with ease, knowing you’re in control of your rental period.</p>
          </div>
          <div>
          <h1>5. Exceptional Customer Service</h1>
          <p>Our friendly and knowledgeable staff is here 24/7 to answer your questions and assist with bookings. We go the extra mile to ensure your experience is nothing short of excellent.</p>
          </div>
          <div>
          <h1>6. Safe and Sanitized Vehicles</h1>
          <p>Your safety is our top priority. We follow rigorous cleaning protocols and ensure every car is sanitized and ready for your journey.</p>
          </div>
          <div>
          <h1>7. Simple Online Booking</h1>
          <p>Our user-friendly website lets you book your rental car in just a few clicks. Choose your car, pick your dates, and hit the road—it’s that easy!</p>
          </div>
          </Col>
        </Row>
        <Row className='mt-5'>
        <Col sm={12}>
        <Link className='link' to='/contact/'>
          <h1 >Get in touch with us</h1>
        </Link>
            <hr/>
          </Col>
          <Col  sm={3}>
          </Col>
          <Col>
          <p>
          Feel free to reach out anytime — we pride ourselves on quick responses and excellent customer service. You can also visit us at Tirana for in-person support.
          </p><p>
          At Rent Wheel, your journey is our priority!


          </p>
          <Link className="btn btn-outline-light" to='/contact/'>Contact Us</Link>
          </Col>
        </Row>
    </Container>
    </>
  )
}

export default About
