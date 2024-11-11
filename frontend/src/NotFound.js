import React from 'react'
import {Container,Row,Col} from  'react-bootstrap'
import Logos from './Logos'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <Container style={{marginTop:'10%'}}>
      <Row>
        <Col sm={4}  style={{textAlign:'end'}}>
          <Logos color='#fff'/>
        </Col>
        <Col sm={4}>
          <h1>NOT FOUND</h1>
        </Col>
        <Col style={{textAlign:'center'}} sm={10}>
          <Link className='link' to='/'>Return to Home page?</Link>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound
