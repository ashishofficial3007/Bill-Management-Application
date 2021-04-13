import React from "react";
import {useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Checkbox } from '@material-ui/core';
import './Tabledata.css';
import Deletedia from './DelDialog'
import Adddialogue from '../components/AddDialogue'
import Editdialog from '../components/EditDialogue'
import Correspondencedialog from '../components/CorrespondenceDialog'
import { InputBase, TextField, OutlinedInput, Button } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Searching from '../components/Seaching'

const useStyles = makeStyles((theme)=>({
  tableheader: {
    color:'#97A1A9'
  },
  searchicon:{
    marginTop:"0.8", 
    marginRight:5, 
    background:"#5DADE2",
     borderRadius:"100%"
  },
  row:{
    backgroundColor:'red'
  }
}))

function TableData() {
  const classes = useStyles();
  let [inputVal, setInputVal] = React.useState("");   
  let [checkedInvoice, setCheckedInvoice] = React.useState([]);
  let [checkboxstate, setCheckboxState] = React.useState(true);
  let [responseData, setResponseData] = React.useState([]);
  let [isNext, setIsNext] = React.useState(true);
  let [pageNumber, setPageNumber] = React.useState(1);
  let fetchURL = `http://localhost:8080/1806291/userServlet?page=${pageNumber}&limit=10`;
  const fetchData = () => {
    axios
    .get(fetchURL)
    .then((response) => {
      setResponseData([...responseData, ...response.data]);
      console.log(response);
    })
      .catch((error) => {
        console.log(error);
      })
    
  };

  const fetchMoreData=()=> {
    
    if (responseData.length > 100) {
      setIsNext(false);
    }else{
      setPageNumber(pageNumber + 1);
      fetchData();
      
    }
    
  }

  // didMount phase the isNext will change to true
  React.useEffect(() => {
    setIsNext(true);
    fetchMoreData();
  },[]);

  const getId=(e)=>{
    setCheckboxState(!checkboxstate)
    setCheckedInvoice(e.target.value)
    console.log(checkedInvoice)
    console.log(checkboxstate)
    
  }
  
  const rowClick=(e)=>{
    console.log(e.target.value)
  }

  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [noValue,setnoValue] = useState(false);

  const debouncedSearchValue = Searching(searchValue, 2000);

 
  useEffect(
    () => {
      if (debouncedSearchValue) {
        setIsSearching(true);
        const filter = responseData.filter(autho => {
         
          return autho.cust_number.toLowerCase().startsWith(debouncedSearchValue.toLowerCase());
        });
        
        setIsSearching(false);
        if(IsnoValue(filter)===1 ){
          
          setnoValue(true);
          setResponseData([])

        }else{
          setnoValue(false);
          setResponseData(filter);
        }
        
      } else {

        fetchMoreData();
      }
    },
    [debouncedSearchValue]
  );

  function IsnoValue(result){
    if(result.length==0){
      return 1;
    }
    return null;
 }  


  return (

    <div style={{backgroundColor:'#273D49CC'}}>
      <div style={{display:'flex'}}>
      <div style={{display:'flex'}}>
      <Button variant="contained" disabled style={{color:'white',backgroundColor:'#97A1A9', marginRight:'10px'}}>Predict</Button>
        <Correspondencedialog state={checkboxstate} value={checkedInvoice} />
      </div>
      <div style={{marginLeft:'45vw',display:'flex'}}>
      <Adddialogue/>
      <Editdialog state={checkboxstate} value={checkedInvoice}/>
      <Deletedia state={checkboxstate} value={checkedInvoice}/>

       <InputBase
                            
         style={{ color:"#fff", border:'1px solid #356680',borderRadius:'10px'}}
         onChange={e => {setSearchValue(e.target.value); if(e.target.value == '')setnoValue(false); }}
        placeholder="Search by Customer Number"
        inputProps={{ 'aria-label': 'search customer' }}
        startAdornment={
          <InputAdornment position="end">
            <SearchIcon  />
          </InputAdornment>
            }
        />
        {isSearching && <div>Searching ...</div>}
       
       </div>
      </div>
      <InfiniteScroll
        dataLength={responseData.length}
        
        next={fetchMoreData}
        hasMore={isNext}
        loader={
          <div
            style={{ height: "80%", paddingLeft: "45%", overflow: "hidden" }}
          >
            <CircularProgress />
          </div>
        }
        /* scrollableTarget="mytable" */
      >
        <TableContainer  style={{ maxHeight: 550, maxWidth:2000 }}>
        {noValue && <div><p style={{textAlign:"center",color:"white"}}>No Results Found</p></div>}
       
        <Table style={{ marginLeft:'auto',marginRight:'auto'}} >
          <TableHead>
            <TableRow style={{borderBottom:'0px'}}>
            <Checkbox
              indeterminate
              inputProps={{ 'aria-label': 'indeterminate checkbox' }}
            />
              <TableCell className={classes.tableheader}>Customer Name</TableCell>
              <TableCell className={classes.tableheader}>Customer Number</TableCell>
              <TableCell className={classes.tableheader}>Invoice Id </TableCell>
              <TableCell className={classes.tableheader}>Invoice Amount</TableCell>
              <TableCell className={classes.tableheader}>Due in Date</TableCell>
              <TableCell className={classes.tableheader}>Predicted payment date</TableCell>
              <TableCell className={classes.tableheader}>Predicted aging bucket</TableCell>
              <TableCell className={classes.tableheader}>Notes</TableCell>
              
            </TableRow>
          </TableHead>
          
          <TableBody>

            {responseData.map((data,index) => (
              <TableRow key={index} style={(index%2==0)?{backgroundColor:'#283A46'}:{backgroundColor:'#273D49CC'} }>
                <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} value={data.doc_id} onChange={(e)=>getId(e)}/>
                <TableCell style={{color:'white'}}>{data.name_customer}</TableCell>
                <TableCell style={{color:'white'}}>{data.cust_number}</TableCell>
                <TableCell style={{color:'white'}}>{data.doc_id}</TableCell>
                <TableCell style={{color:'white'}}>{data.total_open_amount}</TableCell>
                <TableCell style={{color:'#FF5B5B'}}>{data.due_in_date}</TableCell>
                <TableCell style={{color:'white',textAlign:'center'}}>-</TableCell>
                <TableCell style={{color:'white',textAlign:'center'}}>-</TableCell>
                <TableCell style={{color:'white'}}>{data.notes}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        </TableContainer>
        </InfiniteScroll>
      
    </div>
  );
  
}

export default TableData;