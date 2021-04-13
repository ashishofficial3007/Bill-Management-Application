package com.highradius.h2h;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.google.gson.Gson;

/**
 * Servlet implementation class FromDataServerlet
 */
@WebServlet("/InsertData")
public class InsertData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InsertData() {
        super();
        // TODO Auto-generated constructor stub
    }
    

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		
		
		
		  PrintWriter out=response.getWriter();
		    
	        Pojoclass newInvoice = new Pojoclass();
	        newInvoice.setName_customer(request.getParameter("name_customer"));
	        newInvoice.setCust_number(request.getParameter("cust_number"));
	        Long invoiceId = Long.parseLong(request.getParameter("doc_id"));
	        newInvoice.setDoc_id(invoiceId);
	        java.util.Date dueInDate;
	    try {
	    	SimpleDateFormat newFormat = new SimpleDateFormat("yyyyMMdd");
	    	
	    	newInvoice.due_in_date = (newFormat.parse(request.getParameter("due_in_date")));
	    } catch (ParseException e) {
	      dueInDate= null;
	    }
	     long amount = (long)Double.parseDouble(request.getParameter("total_open_amount"));
	       newInvoice.setTotal_open_amount(amount);
	        newInvoice.setDue_in_date(newInvoice.due_in_date);
	        newInvoice.setNotes(request.getParameter("notes"));
	        
	        
	        int n = InvoiceDOA.addInvoice(newInvoice);
	        if(n>0){  
	            out.print("<p>Record saved successfully!</p>"); 
	            request.getRequestDispatcher("index.html").include(request, response);  
	        }else{  
	            out.println("Sorry! unable to save record");  
	        }  
	          
	        out.close();
	        Gson gson = new Gson();
	        String data = gson.toJson(newInvoice);
	        System.out.println(data);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
		
		
		
		//STEP 3: Open a connection
	}

}
