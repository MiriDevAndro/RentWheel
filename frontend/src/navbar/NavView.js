import React, { useEffect, useState,useContext } from 'react'
import {Navbar , Container,Nav,Form} from 'react-bootstrap';
import Logos from '../Logos';
import { Link,useNavigate } from 'react-router-dom';
import ContextProvider from '../Context';
import Login from '../auth/Login';

const NavView = () => {
    const [scroll,setScroll] =useState(true)
    const [hover,setHover] = useState(false)
    const [mobile,setMobile] = useState(false)
    const { category } = useContext(ContextProvider)
    const [last,setLast] =useState(0)

    
    const navigate = useNavigate()

    
    useEffect(()=>{
      
        document.addEventListener('scroll',()=>{
          if(window.scrollY === 0 ){
            setScroll(true)
          }else{
            setScroll(false)
          }
        })
      
      if(window.innerWidth<=992){
        setMobile(true)
      }
      window.onresize = ()=>{
        if(window.innerWidth<=992){
          setMobile(true)
        }else{
          setMobile(false)
        }
      }
    },[])
    
  return (
    // 
    <Navbar expand='lg' style={scroll && !mobile?{}:{backgroundColor: '#141a1c'}} className={(scroll && !mobile?'bg-transparent text-dark':'text-white')+' ttt '} fixed='top'>
        <Container>
          <Navbar.Brand className={scroll && !mobile?'text-dark':'text-white '} href='/'>
            <Logos color='#ffffff'></Logos>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Link to="/" className={'text-white nav-link'+(last == 0 ? ' nav-last':'')} onMouseEnter={()=>setLast(0)}>Home</Link>

                {/* <NavDropdown menuVariant='dark' title="Our Cars" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/all/">All</NavDropdown.Item>
                    <NavDropdown.Item href="/mercedes/">Mercedes</NavDropdown.Item>
                    <NavDropdown.Item href="/ferrari/">Ferrari</NavDropdown.Item>
                </NavDropdown> */}

                <div className={'nav-item dropdown'+(hover || mobile ? ' show ':'')+(last == 1 ? ' nav-last':'')} onMouseEnter={()=>{setHover(true)
                  setLast(1)
                }} onMouseLeave={()=>setHover(false)}>
                    <Link to='/all/' className={'dropdown-toggle text-white nav-link '+(hover || mobile ? ' show ':'')} aria-expanded='true'>Our Cars</Link>
                    <div aria-labelledby="basic-nav-dropdown" data-bs-popper="static" className={"dropdown-menu dropdown-menu-dark"+(hover || mobile? ' show ':'')}>

                      { 
                      category.length > 0 &&
                        category.map((c,index)=>
                          <Link to={"/cars/"+c.toLowerCase()} data-rr-ui-dropdown-item="" key={index} className="dropdown-item nav-link text-white">{c}</Link>)
                      }

                      {/* <Link to="/cars/mercedes/" data-rr-ui-dropdown-item="" className="dropdown-item nav-link text-white">Mercedes</Link>
                      <Link to="/cars/ferrari/" data-rr-ui-dropdown-item="" className="dropdown-item nav-link text-white">Ferrari</Link>
                      <Link to="/cars/lambo/" data-rr-ui-dropdown-item="" className="dropdown-item nav-link text-white">Lamborghini</Link>
                      <Link to="/cars/bmw/" data-rr-ui-dropdown-item="" className="dropdown-item nav-link text-white">BMW</Link>
                      <Link to="/cars/audi/" data-rr-ui-dropdown-item="" className="dropdown-item nav-link text-white">Audi</Link> */}
                      
                    </div>
                </div>
                
                <Link className={'text-white nav-link'+(last == 2 ? ' nav-last':'')} to="/about/" onMouseEnter={()=>setLast(2)}>About</Link>
                <Link className={'text-white nav-link'+(last == 3 ? ' nav-last':'')} to="/contact/" onMouseEnter={()=>setLast(3)}>Contact</Link>
            </Nav>
            <Form className="d-flex">
            <Form.Control
                type="search"
                placeholder="Search for Cars"
                className="me-2"
                aria-label="Search"
                onChange={(e)=>{
                  navigate('/search/'+e.target.value)
                }}
                onKeyDown={(e)=>{
                  if(e.keyCode === 13){
                    e.preventDefault()
                    return false
                  }
                  }}
              />
            </Form>
            
            <Login />
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavView
