import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TableData from '../components/TableData';
import '../components/style.css'
import logo from '../assets/logo.svg'
import abc from '../assets/ABC Product.svg'


function CollectorDashboard() {

  return (
    <div>
      <div style={{display:'flex'}}>
        <div style={{display:'flex'}}>
        <div >{<img src={abc}/>}</div>
        </div>
        <div style={{marginLeft:'25vw'}}>{<img src={logo}/>}</div> 
      </div>
      <div>
        <p style={{color:'white', fontSize:'28px', marginLeft:'30px'}}>Invoice List</p>
        </div>
        
        <div style={{backgroundColor:'#273D49CC', marginLeft:'2vw', marginRight:'2vw',borderRadius:'10px',padding:'20px'}}>
            <TableData/>
        </div>
      
    </div>
  );
};

export default CollectorDashboard;
