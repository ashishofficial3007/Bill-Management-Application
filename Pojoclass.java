package com.highradius.h2h;

import java.sql.Date;

class Pojoclass{
	String cust_number;
	String name_customer;
	java.util.Date due_in_date;
	long total_open_amount;
	long doc_id;
	String notes;
	long invoice_id;
	java.util.Date posting_date;
	String invoice_currency;
	
	
	public long getInvoice_id() {
		return invoice_id;
	}
	public void setInvoice_id(long invoice_id) {
		this.invoice_id = invoice_id;
	}
	public java.util.Date getPosting_date() {
		return posting_date;
	}
	public void setPosting_date(java.util.Date posting_date) {
		this.posting_date = posting_date;
	}
	public String getInvoice_currency() {
		return invoice_currency;
	}
	public void setInvoice_currency(String invoice_currency) {
		this.invoice_currency = invoice_currency;
	}
	public String getCust_number() {
		return cust_number;
	}
	public void setCust_number(String cust_number) {
		this.cust_number = cust_number;
	}
	public String getName_customer() {
		return name_customer;
	}
	public void setName_customer(String name_customer) {
		this.name_customer = name_customer;
	}
	
	public java.util.Date getDue_in_date() {
		return due_in_date;
	}
	public void setDue_in_date(java.util.Date due_in_date) {
		this.due_in_date = due_in_date;
	}
	
	public long getTotal_open_amount() {
		return total_open_amount;
	}
	public void setTotal_open_amount(long total_open_amount) {
		this.total_open_amount = total_open_amount;
	}
	
	public long getDoc_id() {
		return doc_id;
	}
	public void setDoc_id(long doc_id) {
		this.doc_id = doc_id;
	}
	
	
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
}

