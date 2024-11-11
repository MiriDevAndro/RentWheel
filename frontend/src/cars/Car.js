import React, { useEffect, useState } from 'react'
import TopHeader from '../comp/TopHeader'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Container, Row,Col, Button } from 'react-bootstrap'

const Car = () => {
    const [car,setCar]=useState({})
    const [sel,setSel]=useState(0)
    const [rat,setRat]=useState(0)
    const [im,setIm]=useState('')
    const {id}=useParams()
    useEffect(()=>{window.scrollTo({ top: 0, behavior: 'smooth' });},[])
    
    useEffect(()=>{
        const getCar =async()=>{
            await axios.get('http://localhost:5000/car/'+id)
            .then((d)=>{
              setCar(d.data)
              setIm(d.data.image)
              setRat(d.data.rate)
            })
            .catch((e)=>console.log(e.message))
           }
           getCar()  
    },[])

    const rate =(r)=>{
      setRat(r)
      axios.patch('http://localhost:5000/rate/'+id,{rate: r})
      .then((d)=>{})
      .catch((e)=>console.log(e.message))
    }

  return (
    <>
    <TopHeader he='300px' title={car.title}/>
    <Container>
      <Row>
        <Col sm={12} md={8} className='mt-5'> 
          <Row>
            <Col sm={12} style={{textAlign:'center'}}>
              {car.image && <img src={'http://localhost:5000/images/'+im} className='img-fluid img-view-zoom ttt rounded'/>}
            </Col>
            <Col sm={6} md={5} lg={4} xl={2} className='mt-5 img-view'>
              {car.image && <img src={'http://localhost:5000/images/'+car.image} className={'img-fluid'+(sel==0 ? ' border':'')} style={{height:'100px'}} onClick={()=>{setIm(car.image)
                setSel(0)
              }}/>}
            </Col>
            <Col sm={6} md={5} lg={4} xl={2} className='mt-5 img-view'>
              {car.image2 && <img src={'http://localhost:5000/images/'+car.image2} className={'img-fluid'+(sel==1 ? ' border':'')} style={{height:'100px'}} onClick={()=>{setIm(car.image2)
                setSel(1)
              }}/>}
            </Col>
            <Col sm={6} md={5} lg={4} xl={2} className='mt-5 img-view'>
              {car.image3 && <img src={'http://localhost:5000/images/'+car.image3} className={'img-fluid'+(sel==2 ? ' border':'')} style={{height:'100px'}} onClick={()=>{setIm(car.image3)
                setSel(2)
              }}/>}
            </Col>
            <Col sm={6} md={5} lg={4} xl={2} className='mt-5 img-view'>
              {car.image4 && <img src={'http://localhost:5000/images/'+car.image4} className={'img-fluid'+(sel==3 ? ' border':'')} style={{height:'100px'}} onClick={()=>{setIm(car.image4)
                setSel(3)
              }}/>}
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={4} className='mt-5'>
          <Row>
            <Col sm={12}>
              <h1>{car.title}</h1>
            </Col>
            <Col sm={12} className='mt-3'>
            <i className={"fa-star "+( rat >=1?'fa-solid':'fa-regular')} onClick={()=>rate(1)}></i>
            <i className={"fa-star "+( rat >=2?'fa-solid':'fa-regular')} onClick={()=>rate(2)}></i>
            <i className={"fa-star "+( rat >=3?'fa-solid':'fa-regular')} onClick={()=>rate(3)}></i>
            <i className={"fa-star "+(rat >=4?'fa-solid':'fa-regular')} onClick={()=>rate(4)}></i>
            <i className={"fa-star "+( rat >=5?'fa-solid':'fa-regular')} onClick={()=>rate(5)}></i>
            </Col>
            <Col sm={12} className='mt-3'>
              <h5>Daily Price starts from {car.price}$ /day</h5>
            </Col>
            <Col sm={12} className='mt-3'>
              <h6 className='dessp'>Specification: </h6>
            </Col>
            {car.specs && car.specs.split(',').length >0
            && car.specs.split(',').map((d)=>{
              return(
                <>
                <Col sm={2}></Col>
                <Col sm={10}>
                  <h6>{d}</h6>
                </Col>
                </>
              )
            })
            
            }
            
            <Col sm={10} className='mt-1' style={{minHeight:'500px'}}>
              <hr/>
              <p className='des dm-serif-text-regula'>{car.des}</p>
            </Col>
          </Row>
        </Col>
        <Col>
        <hr/>
        <Row>
          <Col sm={10} style={{textAlign:'end',justifyItems:'center'}}>
          <h1>Contact Us Now</h1>
          </Col>
          <Col sm={2} style={{textAlign:'center',alignContent:'center'}}>
          <Button variant='outline-light' href='/contact/'>Contact Us</Button>
          </Col>
        </Row>
        
        
        </Col>
      </Row>
      
    </Container>
    
    </>
  )
}

export default Car
