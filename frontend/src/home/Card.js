import React ,{useContext} from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import ContextProvider from '../Context'


const Card = ({data}) => {
  const navigate = useNavigate()
  
  const { userInfo} = useContext(ContextProvider);

  // useEffect(()=>{
  //   console.log(data,userInfo)
  // },[])

  const handledel = async(e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append('userId',userInfo.id)
    await axios.post('http://localhost:5000/delCar/'+data._id,{'userId': userInfo.id})
    .then((m)=>{
      navigate(0)
    })
    .catch((e)=>console.log(e.message))
  }
  return (
    <>
    {data &&
    <div className='cardview '>
        <img className='imagecard' src={'http://localhost:5000/images/'+data.image}  alt={data.title}/>

        <div className='info'>
            <p className='textmaxx infop'>{data.des}</p>
            
            <Link to={'/car/'+data._id} className='link textmax infoa'><h1>{data.title}</h1></Link>

            <div style={{minWidth:'100px'}}>
            {(userInfo.username === 'admin' || userInfo.id === data.ownerItem)  &&
              <Link to={'/add/'+data._id}><i className="fa-regular fa-pen-to-square" style={{color:'green'}}></i></Link>
            }
            {(userInfo.username === 'admin' || userInfo.id === data.ownerItem)  &&
              <i className="fa-solid fa-trash-can" style={{color:'red'}} onClick={handledel}></i>
            }
            </div>
            
        </div>
        <div className='headt ttt '>
          <h5 className='textmax carttitle changa-one-regular'>{data.title}</h5>
        </div>
    </div>  }
    </>
  )
}

export default Card
