import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import cross from '../assets/cross.svg';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import jsPDF from 'jspdf';

export default function CorrespondencrDialog(props) {
  let [responseData, setResponseData] = React.useState([]);

  
  const [open, setOpen] = React.useState(false);
  let [finalVal, setFinalVal]=React.useState([]);

  const handleClickOpen = () => {
    
    if(!props.state){
      setOpen(true);
      setFinalVal(props.value)
      let fetchURL = `http://localhost:8080/1806291/CorrespondenceData`;
  
    var postData = {
      doc_id: props.value,
 
    };

    axios
      .get(fetchURL, { params: postData })
      .then((response) => {
        setResponseData(response.data);
        console.log(response);
      })

      .catch((error) => {
        console.log(error);
      });

      }
  };

  const handleClose = () => {
    setOpen(false);
  };


  var TopText = <DialogContentText style={{color:'#FFFFFF',paddingTop:'10px'}}>
  <span style={{color:'#97A1A9'}}>Subject:</span> Invoice Details -<br/><br/>
   Dear Sir/Madam, <br/><br/>
   Gentle reminder that you have one or more open invoices on your account.<br/>
    Please get back to us with an expected date of payment. If you have any specific issue with the invoice(s), please let us know so that we can address it at the earliest.<br></br> 
    Please find the details of the invoices below:
  </DialogContentText>
  var BottomText =  <DialogContentText style={{color:'#FFFFFF',paddingTop:'10px'}}>
  <span style={{color:'#C0C6CA'}}> In case you have already made a payment for the above items, please send us the details to ensure the payment is posted.<br/>
    Let us know if we can be of any further assistance. Looking forward to hearing from you.<br/><br/>
     Kind Regards,</span><br/>
      [Sender’s First Name][Sender’s Last Name] <br/>
      Phone : [Sender’s contact number] <br/>
      Fax : [If any]<br/>
       Email : [Sender’s Email Address]<br/>
        Company Name[Sender’s Company Name]
   </DialogContentText>

   var TableText =  <Table id="mytable">
   <TableHead>

 <TableRow style={{fontWeight:'bolder'}}>
   <TableCell style={{color:'white'}}>Invoice Number</TableCell>
   <TableCell style={{color:'white'}}>PO Number</TableCell>
   <TableCell style={{color:'white'}}>Invoice Date</TableCell>
   <TableCell style={{color:'white'}}>Due Date</TableCell>
   <TableCell style={{color:'white'}}>Currency</TableCell>
   <TableCell style={{color:'white'}}>Open Amount($)</TableCell>
 </TableRow>
 </TableHead>
  <TableBody>

 {responseData.map((data,index)=>(
   <TableRow key={index}>
     <TableCell style={{color:'white'}}>{data.invoice_id}</TableCell>
     <TableCell style={{color:'white'}}>{data.doc_id}</TableCell>
     <TableCell style={{color:'white'}}>{data.posting_date}</TableCell>
     <TableCell style={{color:'white'}}>{data.due_in_date}</TableCell>
     <TableCell style={{color:'white'}}>
       {data.invoice_currency}
       </TableCell>
     <TableCell style={{color:'white'}}>{data.total_open_amount}</TableCell>
   </TableRow>
 ))}
   
</TableBody>
 </Table>

const generatePDF = () => {
  var doc = new jsPDF('p', 'px', 'letter');
  doc.setFontSize(15);
  
 doc.text(10, 20, "Subject: Invoice Details -")
 doc.text(10, 40, "Dear Sir/Madam,")
 doc.text(10, 60, "Gentle reminder that you have one or more open invoices on your account. ")
 doc.text(10, 80, "Please get back to us with an expected date of payment. ")
 doc.text(10, 100, "If you have any specific issue with the invoice(s), ")
 doc.text(10, 120, "please let us know so that we can address it at the earliest.") 
 doc.text(10,140, "Please find the details of the invoices below:")
 {responseData.map(data=>{
  doc.text(10,160,"Invoice Number : "+String(data.invoice_id))
  doc.text(10,180,"PO Number : "+String(data.doc_id))
  doc.text(10,200,"Invoice Date : "+String(data.posting_date))
  doc.text(10,220,"Due Date : "+String(data.due_in_date))
  doc.text(10,240,"Invoice Currency : "+String(data.invoice_currency))
  doc.text(10,260,"Open Amount : "+String(data.total_open_amount))
})}

 doc.text(10, 280, "In case you have already made a payment for the above items,") 
 doc.text(10,300,"please send us the details to ensure the payment is posted.")
doc.text(10,320,"Let us know if we can be of any further assistance.")
 doc.text(10,340,"Looking forward to hearing from you.") 
 doc.text(10,360,"Kind Regards,")
 doc.text(10,380,"[Sender’s First Name][Sender’s Last Name] ")
 doc.text(10,400,"Phone : [Sender’s contact number] ")
 doc.text(10,420,"Fax : [If any]")
 doc.text(10,440,"Email : [Sender’s Email Address] ")
 doc.text(10,460,"Company Name[Sender’s Company Name]")

  
   doc.save('demo.pdf') 
}   

  return (
      
    <div>
        <Button variant="contained" style={{color:'white',backgroundColor:'#273D49CC'}} onClick={handleClickOpen}>View Correspondence</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth="true" maxWidth="lg">
        <div style={{display:'flex'}}>
        <DialogTitle id="form-dialog-title" style={{backgroundColor:'#2A3E4C',color:'white', borderBottom:'1px solid #1A262F',width:'94%'}}>View Correspondence</DialogTitle>
        <div style={{backgroundColor:'#2A3E4C'}}>
        <img src={cross} style={{paddingTop:'10px',marginRight:'5px', cursor:'pointer'}} onClick={handleClose}/>
        </div>
        </div>
        <DialogContent style={{backgroundColor:'#2A3E4C'}}>
          {TopText}
          <DialogContent>
            {TableText}
          </DialogContent>
         
          {BottomText}
  
        </DialogContent>
        <DialogActions style={{backgroundColor:'#2A3E4C', borderTop:'1px solid #1A262F'}}>
          <Button onClick={handleClose}  style={{color:'#14AFF1'}}>
            Cancel
          </Button>
          <Button onClick={generatePDF} style={{backgroundColor:'#14AFF1', borderRadius:'10px',color:'white'}}>
            Download
          </Button>
        </DialogActions>
      </Dialog>

      
    </div>
  );
}