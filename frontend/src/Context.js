import { createContext, useState, useEffect } from "react";
import axios from "axios";

const Context = createContext();

export function ContextProvider({ children }) {

    const [val,setVal] =useState({})
    const [cars,setCars] =useState([])
    const [mes,setMes] = useState('')
    const [category,setCategory] = useState([])
    const [userInfo, setUserInfo] = useState({});
    const [contact,setContact] = useState({})
    const [contacta,setContacta] = useState({})



    useEffect(() => {
      if (!userInfo.username) {
        axios.get('http://localhost:5000/user/', {
          withCredentials: true,
        })
          .then(res => {
              setUserInfo(res.data);
          })
          .catch(err => {
              console.error('Error fetching user data:', err);
              // setMes(err.message)
          });
      }
    },[]);

    useEffect(()=>{
      const getC=async()=>{
        axios.post('http://localhost:5000/Contact/',{userId: userInfo.id})
        .then((d)=>{
          setContact(d.data)
        }
        ).catch((e)=>console.log(e.message))
      }
      if(userInfo.id){
        getC()
      }
    },[userInfo])

    useEffect(()=>{
      const getC=async()=>{
        axios.post('http://localhost:5000/allContact/',{userId: userInfo.id})
        .then((d)=>{
          setContacta(d.data)
        }
        ).catch((e)=>console.log(e.message))
      }
      if(userInfo.id){
        getC()
      }
    },[userInfo])

    useEffect(()=>{
      const getCars = async() =>{
          await axios.get('http://localhost:5000/allCars')
              .then((d)=>{setCars(d.data)
              })
              .catch((e)=>{
                console.log(e)
                setMes(e.message)
              })     
      }
      getCars()
    },[])

    useEffect(()=>{
      const getCat= async()=>{
        await axios.get('http://localhost:5000/category')
        .then((d)=>{setCategory(d.data.category)
        })
        .catch((e)=>{
          console.log(e.message)
          setMes(e.message)})
      }
      getCat()
    },[])

  return (
    <Context.Provider
      value={{
        val,setVal,
        cars,
        category,
        userInfo, setUserInfo,
        mes,setMes,
        contact,contacta
      }}
    >
      {children}
    </Context.Provider>
  );

}

export default Context