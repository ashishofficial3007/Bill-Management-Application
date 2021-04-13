package com.highradius.h2h;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
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
 * Servlet implementation class CorrespondenceData
 */
@WebServlet("/CorrespondenceData")
public class CorrespondenceData extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Gson gson = new Gson();
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CorrespondenceData() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		response.getWriter().append("Served at: ").append(request.getContextPath());
		
		String serialdata = request.getParameter("doc_id");
		Long docId = Long.parseLong(serialdata);
		
		PrintWriter out = response.getWriter();
		//out.println("<h1>"+docId+"</h1>");
		
		final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
		final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
		
		final String USER = "root";
		final String PASS = "root";
		Connection conn = null;
		Statement stmt = null;
		 response.setContentType("text/html;charset=UTF-8");
         PrintWriter pw = response.getWriter();

		
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(DB_URL,USER,PASS);
			stmt = conn.createStatement();
			String SQL = "select * from invoice_details where doc_id="+docId;
			ResultSet rs = stmt.executeQuery(SQL);
			ArrayList<Pojoclass> items = new ArrayList<Pojoclass>();
			while(rs.next()){
				Pojoclass pojo = new Pojoclass();
				pojo.setInvoice_id(rs.getLong("invoice_id"));
				pojo.setDoc_id(rs.getLong("doc_id"));
				pojo.setPosting_date(rs.getDate("posting_date"));
				pojo.setDue_in_date(rs.getDate("due_in_date"));
				pojo.setInvoice_currency(rs.getString("invoice_currency"));
				pojo.setTotal_open_amount(rs.getLong("total_open_amount"));
				items.add(pojo);	
				
			}
			String userJsonString = this.gson.toJson(items);
			pw.print(userJsonString);
			pw.flush();
			
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
