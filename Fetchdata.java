package com.highradius.h2h;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;



/**
 * Servlet implementation class Fetchdata
 */
@WebServlet(name="/Fetchdata", urlPatterns = "/userServlet")
public class Fetchdata extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Gson gson = new Gson();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Fetchdata() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		//Pojoclass pojo = new Pojoclass();
		
		Integer page = Integer.parseInt(request.getParameter("pageNumber"));
		Integer limits = Integer.parseInt(request.getParameter("limit"));
		final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
		final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
		
		final String USER = "root";
		final String PASS = "root";
		Connection conn = null;
		Statement stmt = null;
		 response.setContentType("text/html;charset=UTF-8");
         PrintWriter out = response.getWriter();

		
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(DB_URL,USER,PASS);
			stmt = conn.createStatement();
			String SQL = "select * from invoice_details limit 0, 100";
			/*PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setInt(1, (1+limits)*(page-1));
			pstmt.setInt(2, (page*limits));*/
			ResultSet rs = stmt.executeQuery(SQL);
			ArrayList<Pojoclass> items = new ArrayList<Pojoclass>();
			while(rs.next()){
				Pojoclass pojo = new Pojoclass();
				pojo.setName_customer(rs.getString("name_customer"));
				pojo.setCust_number(rs.getString("cust_number"));
				pojo.setDoc_id(rs.getLong("doc_id"));
				pojo.setTotal_open_amount(rs.getLong("total_open_amount"));
				pojo.setDue_in_date(rs.getDate("due_in_date"));
				pojo.setNotes(rs.getString("notes"));
				pojo.setInvoice_id(rs.getLong("invoice_id"));
				pojo.setPosting_date(rs.getDate("posting_date"));
				pojo.setInvoice_currency(rs.getString("invoice_currency"));
				items.add(pojo);	
				
			}
			String userJsonString = this.gson.toJson(items);
			out.print(userJsonString);
			out.flush();
			
		rs.close();
		stmt.close();
		conn.close();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
