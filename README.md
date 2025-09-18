
# Money Tracker – Demo App Overview

This small demo application is designed to help users efficiently manage and track their household income and expenses through a structured, project-based approach.

## Purpose
The app enables users to monitor their finances by organizing them into distinct money tracking projects, with detailed control over how money is allocated and spent within each project.

## App Structure

The application is built around three main layers:

### 1. Projects Layer
Users can create **unlimited money tracking projects**, each defined by:  
- An initial amount of money  
- A fixed duration  
- A unique status: projects can be explicitly terminated by the user or automatically closed once their time period ends  
Only **one project can be active at a time**. Projects can be **created and deleted**, but not updated.

### 2. Budgets Layer
Within each project, users can create **unlimited budgets**.  
- Budgets are allocated a portion of the project’s total funds  
- They serve as containers for income and expense entries  
- Budgets can be **created, updated, and deleted**

### 3. Entries Layer
Budgets consist of **unlimited entries**, which represent specific **income or expense records**.  
- Entries can be **created, updated, and deleted**

## Activity Log
A comprehensive log allows users to **review all financial movements** within any project—active or terminated—providing a full history of income, expenses, and changes made throughout the app.

## ⚠️ Demo Limitation
Please note that this is a **demo version** of the application.  
**No data is persisted beyond the current browser session.**  
All money tracking efforts will be **lost once the browser is closed or refreshed**.
