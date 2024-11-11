import React, { useEffect, useState } from 'react'
import lambovideo from  '../video/lambo.mp4'
import ferrari from  '../video/ferrari.mp4'
import mercedes from  '../video/mercedes.mp4'
import bmw from  '../video/bmw.mp4'
import audi from  '../video/audi.mp4'
import { useLocation } from 'react-router-dom';

const TopHeader = ({he,title}) => {

  const [ca,setCa]=useState('')

  useEffect(()=>{
    // console.log(title)
    setCa(title)
  },[title])
  return (
    <>
    <div style={{position:'relative',height:he}}>
      <div className='video-back' style={{height:he,zIndex:'0'}}>
        <video src={ca && ca.toLowerCase().includes('ferrari')?ferrari:(ca && ca.toLowerCase().includes('mercedes')?mercedes:(ca && ca.toLowerCase().includes('bmw')?bmw:(ca && ca.toLowerCase().includes('audi')? audi: lambovideo)))} loop muted autoPlay className='m-0 p-0' width='100%' height='100%' style={{overflow:'hidden',objectFit:'cover',position:'relative'}}></video>
      </div>
      <div style={{position:'absolute',top:'50%',left:'50%',transform: 'translate(-50%, -50%)',color:'white',textAlign:'center',zIndex:'2'}}>
        <h1 className='txtsh'>{title}</h1>
      </div>
    </div>
    </>
  )
}

export default TopHeader
