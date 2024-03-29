package com.highradius.h2h;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class EditData
 */
@WebServlet("/EditData")
public class EditData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EditData() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		String serialdata = request.getParameter("doc_id");
		Long docId = Long.parseLong(request.getParameter("doc_id"));
		Long amount = Long.parseLong(request.getParameter("total_open_amount"));
		String notes = request.getParameter("notes");
		
		PrintWriter out = response.getWriter();
		out.println("<h1>"+docId+"</h1>");
		
		final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
		final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
		
		final String USER = "root";
		final String PASS = "root";
		Connection conn = null;
		Statement stmt = null;
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(DB_URL,USER,PASS);
			String SQL;
			SQL = "UPDATE invoice_details SET total_open_amount=?, notes=? WHERE doc_id=?";
			PreparedStatement pstmt = conn.prepareStatement(SQL);

			//Set auto-commit to false
			conn.setAutoCommit(false);
			
			pstmt.setLong(1, amount);
			pstmt.setString(2, notes);
			pstmt.setLong(3, docId);
			
			pstmt.addBatch();
			pstmt.executeBatch();
			
			/*String sql = "select * from assignment where serial=";
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next()) {
				System.out.println(rs.getString("fname"));
			}*/
			conn.commit();
		}catch(Exception e){
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
