import React, { useState ,useContext} from 'react'
import {Button, Form, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import ContextProvider from '../Context'

const Login = () => {
    const { setUserInfo ,userInfo,setMes} = useContext(ContextProvider);
    const [show,setShow] = useState(false)
    const [userLog, setUserLog] = useState({
        username: "",
        password: ""
    })
    const [userReg, setUserReg] = useState({
        username: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()
    const [reg,setReg] =useState(false)

    // Marrja e informacioneve nga input-et
    const handleChange = (e) => {
        setUserLog({ ...userLog, [e.target.name]: e.target.value })
    }

    const handleChangeReg = (e) => {
        setUserReg({ ...userReg, [e.target.name]: e.target.value })
    }

    const handleLogin  = async(e)=>{
        e.preventDefault();
        // Disa validime nga frontend
        if (!userLog.username) {
            setMes('Username should not be empty');
            return;
        }
        if (userLog.password.length < 8) {
            setMes('Password should have at least 8 characters!');
            return;
        }
        // Therritja e apit
        // Informacionet do te kalohen tek route per kontrollin e te dhenave
        await axios.post('http://localhost:5000/login/', userLog, {
            withCredentials: true // kalon cookies me ane te kerkeses (perdoret per token qe eshte marre nga jwt)
        })
        .then((res) => {
            // Nese user logohen te dhenat ruhen ne nje cookie/session 
            // Testim
            console.log(res.data);
            // Behet update tek UserContext
            setUserInfo(res.data);
            setMes('')
            navigate('/')
        })
        // Nese nuk ndodh login
        .catch(err => {
            console.log("User not login", err);
            if (err.res && err.res.status === 404 && err.res.data === 'User not found') {
                setMes('Incorrect email. Please check your email and try again.');
            } else {
                setMes('Login failed. Please check your credentials and try again.');
            }
        });
    }

    const handleReg  = async(e)=>{
        e.preventDefault();
        // Disa validime nga frontend
        if (!userReg.username) {
            setMes('Username should not be empty');
            return;
        }
        if (!userReg.email) {
            setMes('Email should not be empty');
            return;
        }
        if (userReg.password.length < 8) {
            setMes('Password should have at least 8 characters!');
            return;
        }
        // Therritja e apit
        // Informacionet do te kalohen tek route per kontrollin e te dhenave
        await axios.post('http://localhost:5000/register/', userReg)
        .then((res) => {
            // Nese user logohen te dhenat ruhen ne nje cookie/session 
            // Testim
            console.log(res.data);
            // Pasi eshte loguar dergohet tek faqja kryesore
            // Mund te dergohen edhe ne komponente te tjere
            setMes('')
            setReg(false)
        })
        // Nese nuk ndodh login
        .catch(err => {
            console.log("User not added " + err)
            setMes("User not created")
        });
    }

    const handelLogout = () => {
        // { withCredentials: true } kalon cookies me ane te kerkese (perdoret per token qe eshte marre nga jwt)
        axios.post('http://localhost:5000/logout', null, { withCredentials: true })
          .then(res => {
            // Fshin te dhenat nga UserContext
            setUserInfo({});
            // Kalon te komponenti i login
            setMes('')
            navigate('/');
          })
          // Nese nuk ndodh logout
          .catch(error => {
            console.error('Error logging out:', error);
          });
      }

  return (
    <div className='nav-item dropdown d-block' style={{position:'relative'}}>
    <svg onClick={()=>setShow(!show)} className='dropdown-toggle login' style={{backgroundColor:'black',borderRadius:'50px',padding:'4px',border:'2px solid white',cursor:'pointer'}} version="1.0" xmlns="http://www.w3.org/2000/svg" width="30pt" height="30pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
    fill="#fff" stroke="none">
    <path d="M2420 4794 c-298 -38 -551 -162 -761 -373 -237 -238 -359 -510 -375
    -841 -16 -321 97 -653 304 -890 l39 -44 -101 -67 c-193 -129 -336 -273 -471
    -474 -258 -386 -404 -920 -409 -1497 -1 -205 1 -212 68 -262 l27 -21 1819 0
    1819 0 27 21 c56 41 69 69 73 157 4 106 -16 399 -39 557 -102 699 -391 1217
    -846 1519 l-101 67 39 44 c206 236 319 564 304 885 -15 333 -138 610 -375 846
    -185 185 -380 293 -631 350 -83 19 -331 33 -410 23z m371 -343 c179 -46 319
    -127 449 -260 129 -130 212 -278 257 -457 24 -95 24 -333 0 -428 -46 -182
    -125 -323 -257 -456 -137 -139 -280 -221 -466 -267 -98 -24 -324 -24 -424 0
    -364 88 -636 359 -727 723 -24 95 -24 333 0 428 46 182 128 328 261 462 158
    157 305 231 556 278 59 11 277 -3 351 -23z m-797 -2076 c193 -95 346 -130 566
    -130 220 0 373 35 566 131 l91 44 44 -18 c24 -11 76 -38 114 -62 324 -198 543
    -509 671 -952 54 -189 83 -370 109 -690 l5 -58 -1600 0 -1599 0 5 73 c55 785
    290 1302 724 1592 57 38 197 115 209 115 3 0 46 -20 95 -45z"/>
    </g>
  </svg>
  <div className={'rounded ttt dropdown-menu dropdown-menu-dark p-2 mt-1 position-lg-only-static '+(show?' show':'')} style={{left:'-150px',top:'40px',width:'200px'}}>

    {
        userInfo.username ? 
        <Container>
            <Row className='panel'>
                <Col sm={6} className='p-0' style={{textAlign:'center',alignContent:'center'}}>
                    <h5 style={{fontSize:'10px'}} className='m-0 w-100'>Logged as <b>{(userInfo.username).toUpperCase()}</b></h5>
                </Col>
                <Col sm={6} className='mb-2'>
                    <Button style={{fontSize:'10px'}} variant='outline-light' onClick={handelLogout}>Logout</Button>
                </Col>
               <hr className='m-0'/> 
               
                <Col sm={12} className='sel pb-2 pt-2'>
                    <Link className='link' to='/panel/'>Panel</Link> 
                </Col>

                { userInfo && userInfo.username === 'admin' &&
                <Col sm={12} style={{textAlign:'end',alignContent:'center'}} className=' p-0 m-0'>
                    <Link to='/read/' className='link ' style={{fontSize:'10px'}}>Show All Messages</Link>
                </Col>
}
                <hr className='m-0' />
               
                <Col sm={12} className='sel pb-2 pt-2'>
                    <Link to='/add/' className='link'>Add <i className="fa-solid fa-plus"></i></Link>
                </Col>
                
            </Row>
        </Container>
        :

        reg ?
        <div>
           <Form onSubmit={handleReg}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control required onChange={handleChangeReg} name='username' value={userReg.username} type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control required onChange={handleChangeReg} name='email' value={userReg.email} type="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control required onChange={handleChangeReg} name='password' value={userReg.password} type='password' />
            </Form.Group>
            <Button type='submit' variant='outline-light'>Register</Button>
            </Form>
            <p className='mt-3 mx-auto' style={{fontSize:'12px'}}>
                Dont have an account ? <Button variant='outline-light' onClick={()=>setReg(!reg)}>Login</Button>
            </p>
        </div>
        :
        <div>
           <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control required value={userLog.username} name='username' onChange={handleChange}  type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control required value={userLog.password} name='password' onChange={handleChange}  type='password' />
            </Form.Group>
            <Button type='submit' variant='outline-light'>Login</Button>
            </Form>
            <p className='mt-3 mx-auto' style={{fontSize:'12px'}}>
                Dont have an account ? <Button variant='outline-light' onClick={()=>setReg(!reg)}>Register</Button>
            </p>
        </div>
    }

  </div>
  </div>
  )
}

export default Login
