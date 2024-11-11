import React,{useState,useEffect,useContext} from 'react'
import { Col, Container, Row,Form,Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ContextProvider from '../Context'



const AddCars = () => {
    
    const { userInfo,setMes,category} = useContext(ContextProvider);

    const [newItem, setNewItem] = useState({
        title: '',
        des: '',
        price: '',
        tipi:'',
        specs:''
    })
    
    const [uploadedImage, setUploadedImage] = useState([]);
    const navigate = useNavigate()

    const {id} = useParams()
    useEffect(()=>{window.scrollTo({ top: 0, behavior: 'smooth' });},[])

    useEffect(()=>{
        if(id){
           const getCar =async()=>{
            await axios.get('http://localhost:5000/car/'+id)
            .then((d)=>setNewItem(d.data))
            .catch((e)=>{
                console.log(e.message)
                setMes(e.message)
            })
           }
           getCar()  
        }else{
            setNewItem({
                title: '',
                des: '',
                price: '',
                tipi:'',
                specs:''
            })
        }
      },[id])


    const handleSubmit = (e) =>{
        e.preventDefault()

        if(id){
            const formData = new FormData();
            Object.entries(newItem).forEach(([key, value]) => {
            formData.append(key, value);
            });
            formData.append('userId',userInfo.id)
            axios.patch('http://localhost:5000/updateCar/' + id, formData)
            .then(res =>{
                navigate('/all/')
                navigate(0)
            }).catch(err=>{
                console.log(err.message)
                setMes(err.message)
            })
        }else{
            const formData = new FormData();
            Object.entries(newItem).forEach(([key, value]) => {
            formData.append(key, value);
            });
            
            formData.append('userId',userInfo.id)
            axios.post('http://localhost:5000/addCars', formData)
            .then(res =>{
                navigate('/all/')
                navigate(0)
            }).catch(err=>{
                console.log("Not Added:" +err)
                setMes(err.message)
            })
        }
    }
    const handlePhoto = (e) => {
       
        if(e.target.files.length >4){
            setMes('Max 4 images!')
            navigate(0)
        }

        if(e.target.files[0] !== undefined){
            setNewItem((newItem) => ({
                ...newItem, image: e.target.files[0]
            }));
            setUploadedImage((uploadedImage)=>({...uploadedImage,image: URL.createObjectURL(e.target.files[0])}));
        }
        if(e.target.files[1] !== undefined){
            setNewItem((newItem) => ({
                ...newItem, image2: e.target.files[1]
            }));
            setUploadedImage((uploadedImage)=>({...uploadedImage,image2: URL.createObjectURL(e.target.files[1])}));
        }
        if(e.target.files[2] !== undefined){
            setNewItem((newItem) => ({
                ...newItem, image3: e.target.files[2]
            }));
            setUploadedImage((uploadedImage)=>({...uploadedImage,image3: URL.createObjectURL(e.target.files[2])}));
        }
        if(e.target.files[3] !== undefined){
            setNewItem((newItem) => ({
                ...newItem, image4: e.target.files[3]
            }));
            setUploadedImage((uploadedImage)=>({...uploadedImage,image4: URL.createObjectURL(e.target.files[3])}));
        }
    };

  return (
    <Container className='mt-5'>
        <Row className='mt-5'>
            <Col className='mt-5' md={6} sm={12}>
            <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control required type="text" value={newItem.title} onChange={(e)=>setNewItem({...newItem, title:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3 w-50" controlId="price">
                <Form.Label>Car Price</Form.Label>
                <Form.Control required type="number" value={newItem.price} onChange={(e)=>setNewItem({...newItem, price:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3 w-50"   style={{width:'20%'}} controlId="tipi">
                    <Form.Label>Car Type</Form.Label>
                    <Form.Select required type="text" value={newItem.tipi} onChange={(e)=>setNewItem({...newItem, tipi:e.target.value})}>
                    <option>Select Car Type</option>
                    {category.length >0
                    && category.map((d,index)=>{
                        return(
                            <option value={d.toLowerCase()} key={index}>{d.charAt(0).toUpperCase()+d.slice(1)}</option>
                        )
                    })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="des">
                <Form.Label>Car Description</Form.Label>
                <Form.Control required as="textarea" rows={3} value={newItem.des} onChange={(e)=>setNewItem({...newItem, des: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="des">
                <Form.Label>Other Car Specification</Form.Label>
                <Form.Control placeholder='Like Fuel, Transmission,Seats,Engine,Year,Top Speed... with coma seperated! '  as="textarea" rows={3} value={newItem.specs} onChange={(e)=>setNewItem({...newItem, specs: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Car Image</Form.Label>
                    <Form.Control multiple type="file" onChange={handlePhoto}/>
                </Form.Group>
                <Button type="submit" variant="outline-light">{id?'Update':'Add'}</Button>
            </Form>
            </Col>
            <Col md={6} sm={12} className='mt-5'>
                <Row>
                    {
                        uploadedImage.image ? 
                        <Col sm={12} md={6} className='mt-5'>
                            <img src={uploadedImage.image} alt={newItem.title} className='img-fluid' />
                        </Col>
                        :
                        newItem.image  && id &&
                        <Col sm={12} md={6} className='mt-5'>
                            <img src={'http://localhost:5000/images/' + newItem.image} alt={newItem.title} className='img-fluid' />
                        </Col>
                    }
                    {
                        uploadedImage.image2 ? 
                        <Col sm={12} md={6} className='mt-5'>
                            <img src={uploadedImage.image2} alt={newItem.title} className='img-fluid' />
                        </Col>
                        :
                        newItem.image2 && id &&
                        <Col sm={12} md={6} className='mt-5'>
                            <img src={'http://localhost:5000/images/' + newItem.image2} alt={newItem.title} className='img-fluid' />
                        </Col>
                    }
                    {
                        uploadedImage.image3 ? 
                        <Col sm={12} md={6} className='mt-5'>
                            <img src={uploadedImage.image3} alt={newItem.title} className='img-fluid' />
                        </Col>
                        :
                        newItem.image3 && id &&
                        <Col sm={12} md={6} className='mt-5'>
                            <img src={'http://localhost:5000/images/' + newItem.image3} alt={newItem.title} className='img-fluid' />
                        </Col>
                    }
                    {
                        uploadedImage.image4 ? 
                        <Col sm={12} md={6} className='mt-5'>
                            <img src={uploadedImage.image4} alt={newItem.title} className='img-fluid' />
                        </Col>
                        :
                        newItem.image4 && id &&
                        <Col sm={12} md={6} className='mt-5'>
                            <img src={'http://localhost:5000/images/' + newItem.image4} alt={newItem.title} className='img-fluid' />
                        </Col>
                    }
                </Row>
            </Col>
        </Row>
    </Container>
  )
}

export default AddCars
