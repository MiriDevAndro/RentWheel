import React,{useContext, useEffect, useState} from 'react'
import ContextProvider from '../Context';

const AlertView = () => {
    
    const { mes, setMes} = useContext(ContextProvider);
    const [showhide,setShowHide] = useState(false)
    var time = undefined
    useEffect(()=>{

      if(mes != ''){
        setShowHide(true)
        time  != undefined && clearTimeout(time)
        time = setTimeout(()=>{
          setMes('')
          setShowHide(false)
        },5000)
      }

    },[mes])
  return (
    mes &&
        <div className={"alert alert-danger alert-dismissible fade"+(showhide ? ' show':'')} role="alert" style={{position:'fixed',bottom:'0',right:'0'}}>
            <strong>You got an error!</strong> {mes}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{
                setShowHide(false)
                setMes('')}}></button>
        </div>
    
  )
}

export default AlertView