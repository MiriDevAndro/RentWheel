import React, { useContext, useEffect, useState} from 'react'
import TopHeader from '../comp/TopHeader'
import {Button, Col, Container, Row}  from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination';
import Card from '../home/Card'
import ContextProvider from '../Context'

const AllCars = () => {
    
    const {cars} = useContext(ContextProvider)
    const [end,setEnd] = useState(6)
    const sa = 6
    const faqe = cars.length / sa
    const [start,setStart]= useState(0)
    const [newc,setNewC]=useState([])
    const [last,setLast]=useState(1)
    let page = Array.apply(null, {length: faqe}).map(Number.call, Number);
    useEffect(()=>{window.scrollTo({ top: 0, behavior: 'smooth' });},[])


    const  isFloat=(n)=>{
        return Number(n) === n && n % 1 !== 0;
    }

    useEffect(()=>{
        setNewC(cars.slice(start, (isFloat && cars.length <=11 ? cars.length : end)))
    },[start,end,cars])

  return (
    <>
    <TopHeader he='300px' title='All Cars'/>
    <Container >
        <Row>
            <Col sm={12} style={{textAlign:'end'}} className=' mt-5 mb-5'>
                
            </Col>
            {
            cars.length >0 && newc.map((dt,index)=>{
                return(
                    <Col md={6} lg={4}  sm={12} key={dt._id}>
                        <Card data={dt}/>
                    </Col>
                )
            })
            }

        </Row>
        
        <Row>
            <Col sm={12} style={{justifyItems:'center'}}  data-bs-theme="dark">
            <Pagination>
                <Pagination.First onClick={()=>{
                    setEnd(sa)
                    setStart(0)
                    setLast(1)
                }} />
                <Pagination.Prev onClick={()=>{
                    if(page.length == (last-1)){
                        setStart((last-1)*sa-sa)
                        setEnd(cars.length)
                        setLast(1)
                    }else if(last != 1){
                        setStart((last-1)*sa-sa)
                        setEnd((last-1)*sa)
                        setLast(last-1)
                    }
                        
                    
                }}/>
                {
                    page.length > 0  &&
                    page.map((p,i)=>{
                        return(
                            <Pagination.Item active={last-1==i?true:false} key={i}
                            onClick={()=>{
                                i=i+1
                                if(page.length == i){
                                    setStart(i*sa-sa)
                                    setEnd(cars.length)
                                }else if(i == 0){
                                    setStart(0)
                                    setEnd(sa)
                                } else{
                                    setStart(i*sa-sa)
                                    setEnd(i*sa)
                                }
                                setLast(i)
                            }}>{i}</Pagination.Item>
                        )
                    })
                }
                
                {start != page.length &&
                    <Pagination.Next onClick={()=>{
                        if(page.length == (last+1)){
                            setStart((last+1)*sa-sa)
                            setEnd(cars.length)
                            setLast(last+1)
                        }else if(last == 1){
                            setStart((last+1)*sa-sa)
                            setEnd((last+1)*sa)
                            setLast(last+1)
                        }else if(page.length-1 == last){
                            setStart((last+1)*sa-sa)
                            setEnd(cars.length)
                            setLast(last+1)
                        }else if(page.length-1 < last){

                        }else{
                            setStart((last+1)*sa-sa)
                            setEnd((last+1)*sa)
                            setLast(last+1)
                        }
                        
                }} />}
                <Pagination.Last onClick={()=>{
                    setStart(page.length *sa  -sa)
                    setEnd(cars.length)
                    setLast(page.length)
                }} />
            </Pagination>
            </Col>
        </Row>
        
    </Container>
    </>
  )
}

export default AllCars
