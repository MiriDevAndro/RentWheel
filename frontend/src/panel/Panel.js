import axios from 'axios'
import React, { useEffect,useContext,useState } from 'react'
import {Container,Row,Col,Form, Table} from 'react-bootstrap'
import ContextProvider from '../Context'
import { useNavigate } from 'react-router-dom'

const Panel = () => {
    const {userInfo} = useContext(ContextProvider)
    const [users,setUsers] = useState([])
    const [userData,setUserData] = useState({})
    const [carsown,setCarsOwn] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const getU=async()=>{
            await axios.post('http://localhost:5000/allUsers', {'userId': userInfo.id} )
            .then((d)=>setUsers(d.data))
            .catch((er)=>console.log(er.message))
            
        }
        if(userInfo.id){
            getU()
        }
        
    },[userInfo.id])

    const handledel = async(id)=>{
        await axios.post('http://localhost:5000/delCar/'+ id,{'userId': userInfo.id})
        .then((m)=>{
          navigate(0)
        })
        .catch((e)=>console.log(e.message))
      }


    const getUserInfo=async(u)=>{
        await axios.post('http://localhost:5000/userData/'+u,{'userId': userInfo.id})
        .then((d)=>{
            setUserData(d.data)
            getCarsOwn(d.data._id)
            console.log(d.data)
        })
        .catch((e)=>console.log(e.message))
    }

    const getCarsOwn=async(u)=>{
        await axios.post('http://localhost:5000/allCarsOwner/'+u,{'userId': userInfo.id})
        .then((d)=>{
            setCarsOwn(d.data)
        })
        .catch((e)=>console.log(e.message))
    }

    useEffect(()=>{
        if(userInfo.id){
            getUserInfo(userInfo.id)
        }
    },[userInfo])

  return (
    <Container style={{marginTop:'100px'}}>
        <Row>
            <Col sm={12} md={2}>
                {userInfo && userInfo.username === 'admin' ?<Form.Group controlId="users">
                    <Form.Label>Select User</Form.Label>
                    <Form.Select required type="text" value={userData._id} onChange={(e)=>getUserInfo(e.target.value)}>
                    <option>Select User</option>
                    {users.length >0
                    && users.map((d)=>{
                        return(
                            <option value={d._id} key={d._id}>{d.username}</option>
                        )
                    })}
                    </Form.Select>
                </Form.Group>
                :
                <h1>User</h1>}
            </Col>
            <Col sm={12} md={10} className=''>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Sa makina</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{userData ? userData._id :userInfo.id}</td>
                            <td>{userData ? userData.username :userInfo.username}</td>
                            <td>{userData ? userData.email : userInfo.email}</td>
                            <td>{carsown ? carsown.length :'0'}</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
            <hr/>
        </Row>

        <Row>
            
            <Col sm={12} md={2}>
                <h1>Cars</h1>
            </Col>
            <Col sm={12} md={10}>
                <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Type</th>
                                <th>Rate</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {carsown &&  
                            carsown.map((d)=>{
                                return(
                                <tr key={d._id}>
                                <td>{d._id}</td>
                                <td><a style={{color:'black',textDecoration:'none'}} href={'/car/'+d._id}>{d.title}</a></td>
                                <td>{d.price}</td>
                                <td>{d.tipi}</td>
                                <td>{d.rate}</td>
                                <td style={{textAlign:'center'}}><a href={'/add/'+d._id} style={{color:'black'}}><i className="fa-solid fa-pen-to-square" style={{cursor:'pointer'}}></i></a></td>
                                <td style={{textAlign:'center'}}><i className="fa-solid fa-trash-can" style={{cursor:'pointer'}} onClick={(e)=>{
                                    e.preventDefault()
                                    handledel(d._id)}}></i></td>

                            </tr>
                                )
                            })}
                            
                        </tbody>
                    </Table>
            </Col>
        </Row>
        
    </Container>
  )
}

export default Panel