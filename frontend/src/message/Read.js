import React,{useContext, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ContextProvider from '../Context'
import axios from 'axios';

const Read = () => {
    const {contacta,userInfo} = useContext(ContextProvider);
    useEffect(()=>{
        const upC=async()=>{
            await axios.post('http://localhost:5000/upContact',{userId: userInfo.id})
            .then((d)=>console.log(d.data))
            .catch((e)=>console.log(e.message))
        }
        upC()
    },[])
  return (
    <>
    <div style={{height:'100px'}}></div>
    <Container className='mt-5'>
        <Row className='mt-5'>
            {contacta.length >0 &&
                contacta.map((d,index)=>{
                    return(
                        <Col sm={12} key={index}>
                            <h1>{d.name}</h1>
                            <h6 style={{textAlign:'end',fontSize:'13px'}}>{d.email}</h6>
                            <p>{d.mes}</p>
                            <hr />
                        </Col>
                    )
                })
            }
        </Row>
    </Container></>
  )
}

export default Read