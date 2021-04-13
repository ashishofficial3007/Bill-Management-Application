package com.highradius.h2h;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class DataEdit
 */
@WebServlet("/DataEdit")
public class DataEdit extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DataEdit() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
		String serial_s = request.getParameter("serial");
		int serial = Integer.parseInt(serial_s);
		String alias = request.getParameter("alias");
		String quote = request.getParameter("quote");
		
		
		//System.out.println(Roll+ " "+name);
		PrintWriter out = response.getWriter();
		out.println("<h1>"+serial+"</h1>");
		
		final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
		final String DB_URL = "jdbc:mysql://localhost/sakila";
		
		final String USER = "root";
		final String PASS = "root";
		Connection conn = null;
		Statement stmt = null;
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(DB_URL,USER,PASS);
			String SQL = "UPDATE assignment SET Alias=?, quote=? WHERE serial=?";
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			conn.setAutoCommit(false);
			pstmt.setString(1, alias);
			pstmt.setString(2,quote);
			pstmt.setInt(3, serial);
			
			pstmt.addBatch();
			pstmt.executeBatch();

			//Explicitly commit statements to apply changes
			conn.commit();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

}
