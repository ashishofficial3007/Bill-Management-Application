package com.highradius.h2h;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;
	

public class InvoiceDOA {
	final static String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	final static String DB_URL = "jdbc:mysql://localhost/h2h_internship";

	final static String USER = "root";
	final static String PASS = "root";


	static int addInvoice(Pojoclass obj) {
	    int status=0;
	    try{  

	    	Connection conn = null;
	    	Statement stmt = null;
	      PreparedStatement statement = null;
	      Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(DB_URL,USER,PASS);
			stmt = conn.createStatement(); 
	            String sql = "INSERT INTO invoice_details(cust_number,name_customer,doc_id,due_in_date,total_open_amount,notes,invoice_currency) VALUES(?,?,?,?,?,?,'USD')";
	            statement= conn.prepareStatement(sql);  
	      
	            
	      statement.setObject(1, obj.getCust_number());
	      statement.setObject(2, obj.getName_customer());
	    
	      statement.setObject(3, obj.getDoc_id());
	      
	      statement.setObject(4, obj.getDue_in_date());

	      statement.setObject(5, obj.getTotal_open_amount());
	            statement.setObject(6,obj.getNotes());
	            status=statement.executeUpdate();  
	              
	            conn.close();
	            statement.close();
	        }catch(Exception ex){ex.printStackTrace();}  
	          
	        return status;  
	  }

}
