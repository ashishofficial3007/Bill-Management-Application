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
    
  },
  input: {
      color: 'white'
  }
}));

export default function AddDialog() {

const postValue=()=>{

  if(invoiceNo === ""||invoiceAmount === "" || notesValue===""||custName===""||custNo===""||dueDate===""){
    alert("All the fileds are compulsory!!!")
  }
  
    var postData = {
      doc_id: invoiceNo,
      total_open_amount: invoiceAmount,
      notes: notesValue,
      name_customer: custName,
      cust_number: custNo,
      due_in_date: dueDate,
    };

    
    axios
      .get("http://localhost:8080/1806291/InsertData", { params: postData })
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
      setOpen(false);

}
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
   
  };

  const handleClear = () =>{
    setCustName("");
    setCustNo("");
    setInvoiceAmount("");
    setInvoiceNo("");
    setDueDate("");
    setNotesValue("");
  }

  const[custName, setCustName] = React.useState("");
  const[custNo, setCustNo] = React.useState("");
  const[invoiceNo, setInvoiceNo] = React.useState("");
  const[invoiceAmount, setInvoiceAmount] = React.useState("");
  const[dueDate, setDueDate] = React.useState("");
  const[notesValue, setNotesValue]=React.useState("");

  const handleNotesChange=(e)=>{
   setNotesValue(e.target.value);
  }

  const handleNameChange=(e)=>{
     setCustName(e.target.value)
   }
 
   const handleCustNoChange=(e)=>{
    setCustNo(e.target.value)
  }

  const handleInvoiceNoChange=(e)=>{
    setInvoiceNo(e.target.value)
  }

  const handleInvoiceAmountChange=(e)=>{
    setInvoiceAmount(e.target.value)
  }

  const handleDueDateChange=(e)=>{
    setDueDate(e.target.value)
  }

  return (
      
    <div>
        <Button style={{color:'white', border:'1px solid #14AFF1', borderRadius:'10px',marginRight:'5px'}} onClick={handleClickOpen}>+ Add</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="true">
          <div style={{display:'flex'}}>
        <DialogTitle id="form-dialog-title" style={{backgroundColor:'#2A3E4C',color:'white', borderBottom:'1px solid #1A262F',width:'89%'}}>Add Invoice</DialogTitle>
        <div style={{backgroundColor:'#2A3E4C'}}>
        <img src={cross} style={{paddingTop:'10px',marginRight:'7px', cursor:'pointer'}} onClick={handleClose}/>
        </div>
        </div>
        <DialogContent style={{backgroundColor:'#2A3E4C'}}>
        <div style={{display:'flex'}}>
        <div>
        <div style={{display:'flex'}}>
          <DialogContentText style={{color:'#97A1A9',paddingTop:'10px'}}>
          Customer Name <span style={{color:'#FF5B5B'}}>*</span>
          </DialogContentText>
          <TextField
          required
          value={custName}
          onChange={handleNameChange}
          variant="outlined"
            margin="dense"
            id="name"
            InputProps={{
              className:classes.textField,
              style:{
                color:'white'
              }
          }}
           
          />
          </div>
          <div style={{display:'flex'}}>
          <DialogContentText style={{color:'#97A1A9',paddingTop:'10px'}}>
          Customer No. <span style={{color:'#FF5B5B'}}>*</span>
          </DialogContentText>
          <TextField style={{marginLeft:'18px'}}
          required
          value={custNo}
          onChange={handleCustNoChange}
          variant="outlined"
            margin="dense"
            id="cust_no"
            InputProps={{
              className:classes.textField,
              style:{
                color:'white'
              }
          }}
          />
          </div>
          <div style={{display:'flex'}}>
          <DialogContentText style={{color:'#97A1A9',paddingTop:'10px'}}>
          Invoice No. <span style={{color:'#FF5B5B'}}>*</span>
          </DialogContentText>
          <TextField style={{marginLeft:'37px'}}
          required
          value={invoiceNo}
          onChange={handleInvoiceNoChange}
          variant="outlined"
            margin="dense"
            id="invoice_id"
            InputProps={{
              className:classes.textField,
              style:{
                color:'white'
              }
          }}
          />
          </div>
          <div style={{display:'flex'}}>
          <DialogContentText style={{color:'#97A1A9',paddingTop:'10px'}}>
          Invoice Amount <span style={{color:'#FF5B5B'}}>*</span>
          </DialogContentText>
          <TextField style={{marginLeft:'9px'}}
          required
          value={invoiceAmount}
          onChange={handleInvoiceAmountChange}
          variant="outlined"
            margin="dense"
            id="amount"
            InputProps={{
              className:classes.textField,
              style:{
                color:'white'
              }
          }}
          />
          </div>
          </div>
          <div>
          <div style={{display:'flex', paddingLeft:'20px'}}>
          <DialogContentText style={{color:'#97A1A9',paddingTop:'10px'}}>
          Due Date <span style={{color:'#FF5B5B'}}>*</span>
          </DialogContentText>
          
          <TextField
          required
          value={dueDate}
          onChange={handleDueDateChange}
          variant="outlined"
        id="date"
        varient="outlined"
        margin="dense"
        type="date"
        InputProps={{
          className:classes.textField,
          style:{
            color:'white'
          }
      }}
        InputLabelProps={{
          shrink: true,
        }}
      />

          </div>
          <div style={{display:'flex', paddingLeft:'20px'}}>
          <DialogContentText style={{color:'#97A1A9',paddingTop:'10px'}}>
          Notes <span style={{color:'#FF5B5B'}}>*</span>
          </DialogContentText>
          <TextField style={{marginLeft:'28px'}}
          required
          variant="outlined"
            margin="dense"
            id="notes"
            value={notesValue}
            onChange={handleNotesChange}
            InputProps={{
              className:classes.textField,
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
          <Button onClick={handleClear} style={{border: '1px solid #14AFF1',borderRadius:'10px',color:'white'}}>
            Clear
          </Button>
          <Button onClick={postValue} style={{backgroundColor:'#14AFF1', borderRadius:'10px',color:'white'}}>
            Add
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}