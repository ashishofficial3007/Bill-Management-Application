import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import cross from '../assets/cross.svg'
import { InputAdornment } from '@material-ui/core';
import axios from "axios";


export default function DeleteDialog(props) {
  let[finalVal, setFinalVal]=React.useState([]);

  const deleteRow = () =>{

     var postData = {
      doc_id: props.value,
 
    };

    axios
    .get("http://localhost:8080/1806291/DataDelete", { params: postData })
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    }); 
    setOpen(false);
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
   
    if(!props.state){
      setOpen(true);
    console.log(props.value)
    setFinalVal(props.value)
    console.log(finalVal)
    }
  };  

  const handleClose = () => {
    setOpen(false);
  };

  return (
      
    <div>
        <Button style={{color:'white',  border:'1px solid #14AFF1', borderRadius:'10px',marginRight:'5px'}} onClick={handleClickOpen}>- Delete</Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
          <div style={{display:'flex'}}>
        <DialogTitle id="form-dialog-title" style={{backgroundColor:'#2A3E4C', borderBottom:'1px solid #1A262F',width:'88%',color:'white'}}>Delete Record(s)?</DialogTitle>
        <div style={{backgroundColor:'#2A3E4C'}}>
        <img src={cross} style={{paddingTop:'10px', cursor:'pointer'}} onClick={handleClose}/>
        </div>
        </div>
        <DialogContent style={{backgroundColor:'#2A3E4C'}}>
        <div style={{display:'flex'}}>
        <div>
          <DialogContentText style={{color:'#97A1A9',paddingTop:'10px'}}>
          You'll lose your record(s) after this action. We can't recover them once you delete.
          </DialogContentText>
      
          <DialogContentText style={{color:'#97A1A9',paddingTop:'10px'}}>
          Are you sure you want to <span style={{color:'#FF5E5E'}}>permanently delete</span> them?
          </DialogContentText>
          </div>
          </div>
        </DialogContent>
        <DialogActions style={{backgroundColor:'#2A3E4C', borderTop:'1px solid #1A262F'}}>
          <Button onClick={handleClose} style={{border: '1px solid #14AFF1',borderRadius:'10px',color:'white'}}>
            Cancel
          </Button>
          <Button onClick={deleteRow} style={{backgroundColor:'#14AFF1', borderRadius:'10px',color:'white'}}>
            Delete 
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}