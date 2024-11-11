import React, { useEffect ,useContext, useState} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams,useNavigate } from 'react-router-dom'
import TopHeader from '../comp/TopHeader'
import ContextProvider  from '../Context'
import Card from '../home/Card'

const Search = () => {

  const [filcar,setFilcar]=useState({})

  const nav=useNavigate()
  const {val} =useParams()
  const {cars} = useContext(ContextProvider)



  useEffect(()=>{
    
    if(!val){
      nav('/all/')
    }else{
      if(cars.length >0){
        setFilcar(cars.filter(ca => String(ca.title).toLowerCase().includes(val.toLowerCase()) || String(ca.des).toLowerCase().includes(val) || String(ca.specs).toLowerCase().includes(val) ))
      }
    }
  },[val])

  return (
    <>
    <TopHeader he='300px' title={'Search For '+val}/>
    <Container className='mt-5'>
      <Row>
        { filcar.length >0 && filcar.map((dt)=>{
                return(
                    <Col md={6} lg={4}  sm={12} key={dt._id}>
                        <Card data={dt}/>
                    </Col>
                )
            })}
      </Row>
    </Container>
    </>
  )
}

export default Search
