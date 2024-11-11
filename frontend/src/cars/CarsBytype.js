import React, { useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom';
import {Container,Row,Col} from 'react-bootstrap'
import TopHeader from '../comp/TopHeader'
import ContextProvider from '../Context'
import Card from '../home/Card';

const CarsByType = () => {
    let {tipi} = useParams()
    const {cars} = useContext(ContextProvider)
    useEffect(()=>{window.scrollTo({ top: 0, behavior: 'smooth' });},[])
    
    
  return (
    <>
     <TopHeader he='300px' title={tipi.toUpperCase()}/>
     <Container>
      <Row>
        {cars && cars.map((d)=>{
          if(d.tipi === tipi){
            return(
            <Col  md={6} lg={4}  sm={12} key={d._id}>
              <Card data={d}/>
            </Col>
          )
          }
          
        })}
      </Row>
     </Container>
    </>
  )
}

export default CarsByType
