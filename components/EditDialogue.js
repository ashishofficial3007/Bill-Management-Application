import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import cross from '../assets/cross.svg'
import edit from '../assets/edit.svg'
import { InputAdornment } from '@material-ui/core';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    border: '1px solid #356680',
    borderRadius:'10px',
    color:'white',
    
  },
}));

export default function EditDialog(props) {
  let [checkedInvoice, setCheckedInvoice] = React.useState("");
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [invAmount, setInvAmount] = React.useState("");
  const [newNote, setNewNote] = React.useState("");


  const handleReset=()=>{
    setInvAmount("");
    setNewNote("");
  }

  const handleClickOpen = () => {
    
    if(!props.state){
      setOpen(true);
      setCheckedInvoice(props.value);
      
    }
    console.log(props.value)
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  const handleAmountChange=(e)=>{
    setInvAmount(e.target.value)
  }

  const handleNoteChange=(e)=>{
    setNewNote(e.target.value)
  }

  const postValue=()=>{

    if(invAmount === "" || newNote===""){
      alert("All the fileds are compulsory!!!")
    }
    
      var postData = {
        doc_id: checkedInvoice,
        total_open_amount: invAmount,
        notes: newNote
        
      };
  
      
      axios
        .get("http://localhost:8080/1806291/EditData", { params: postData })
        .then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
        setOpen(false);
  
  }


  return (
      
    <div>
        <Button style={{color:'white', border:'1px solid #97A1A9', borderRadius:'10px',marginRight:'5px'}} onClick={handleClickOpen}><span><img src={edit} style={{paddingRight:'8px',paddingTop:'5px'}}/></span>Edit</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="true">
          <div style={{display:'flex'}}>
        <DialogTitle id="form-dialog-title" style={{backgroundColor:'#2A3E4C', borderBottom:'1px solid #1A262F',width:'80%',color:'white'}}>Edit Invoice</DialogTitle>
        <div style={{backgroundColor:'#2A3E4C'}}>
        <img src={cross} style={{paddingTop:'10px',marginRight:'3px', cursor:'pointer'}} onClick={handleClose}/>
        </div>
        </div>
        <DialogContent style={{backgroundColor:'#2A3E4C'}}>
        <div style={{display:'flex'}}>
        <div>
        <div style={{display:'flex'}}>
          <DialogContentText style={{color:'#97A1A9',paddingTop:'10px'}}>
          Invoice Amount
          </DialogContentText>
          <TextField 
          value={invAmount}
          onChange={handleAmountChange}
          variant="outlined"
            margin="dense"
            name="name"
            InputProps={{
              startAdornment: <InputAdornment position="start"><span style={{color:'white'}}>$</span></InputAdornment>,
              className: classes.textField,
              style:{
                color:'white'
              }
            }}
            
            
          />
          </div>

          <div style={{display:'flex', paddingLeft:'0px'}}>
          <DialogContentText style={{color:'#97A1A9',paddingTop:'10px'}}>
          Notes
          </DialogContentText>
          <TextField style={{marginLeft:'70px'}}
          values={newNote}
          onChange={handleNoteChange}
          variant="outlined"
            margin="dense"
            name="notes"
            multiline
          rows={5}
          InputProps={{
            className: classes.textField,
            style:{
              color:'white'
            }
          }}
           
          />
          </div>
          </div>
          </div>
        </DialogContent>
        <DialogActions style={{backgroundColor:'#2A3E4C', borderTop:'1px solid #1A262F'}}>
        <Button onClick={handleClose} style={{color:'#14AFF1',marginRight:'auto'}}>
            Cancel
          </Button>
          <Button onClick={handleReset} style={{border: '1px solid #14AFF1',borderRadius:'10px',color:'white'}}>
            Reset
          </Button>
          <Button onClick={postValue} style={{backgroundColor:'#14AFF1', borderRadius:'10px',color:'white'}}>
            Save
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}