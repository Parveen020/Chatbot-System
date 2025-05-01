# 🛠️ Ticketing System - MERN Stack

## 📦 Setup Instructions

1. **Clone the repository**  
   ```bash
   git clone <repository-link>
   ```

2. **Install dependencies**  
   Open the project in **VS Code**, then:

   - Install frontend dependencies:  
     ```bash
     cd FrontEnd
     npm i
     ```

   - Install backend dependencies:  
     ```bash
     cd ../BackEnd
     npm i
     ```

3. **Run the application**

   - Start the backend server:  
     ```bash
     npm run server
     ```

   - Run the frontend app:  
     ```bash
     npm run dev
     ```

4. After starting the frontend, a working link will appear in the terminal. Click it to access the website and test all features.

---

## 🚀 Features Implemented

1. **Landing Page**
2. **Signup & Registration Page**  
   - Signup and login buttons available on the top right.  
   - Admin login/signup required before accessing the dashboard.

3. **Dashboard with Ticket Sections**

4. **All Tickets**  
   - View all submitted tickets.

5. **Resolved Tickets**  
   - View tickets that have been marked as resolved.

6. **Unresolved Tickets**  
   - View tickets that are still unresolved.

7. **Ticket Search Functionality**  
   - Search tickets by ID, message, name, email, or phone number.

8. **Default Ticket Assignment to Admin**  
   - Newly created tickets are randomly assigned to an admin.

9. **Mark Tickets as Resolved or Unresolved**  
   - Assigned user can toggle status.

10. **Assign Tickets to Team Members**  
    - Admin can reassign tickets to team members.

11. **Team Page to Manage Members**  
    - Add, update, or delete team members.

12. **Analytics Page for Ticket Tracking**  
    - Graphs for missed chats, average response time, resolved tickets, and total tickets.

13. **Chat Window for Customer Support**  
    - Assigned member handles user messages and can reply/resolve chats.

14. **Chatbot Widget Customization Page**  
    - Customize chatbot header, background color, etc.

15. **Dummy Website with Chatbot Widget**  
    - Chatbot always visible; introduction form required before chat.

16. **Missed Chat Timer**  
    - Admin-set timer tags chat as missed if no reply is sent in time.

17. **Edit Profile Feature**  
    - Each user can update credentials and is logged out after update.

18. **Team Members Must Sign Up Using Invited Email**  
    - Use registered email + admin password to log in; change password after first login.

19. **Supports Multiple Admins with Respective Team Members**  
    - Multiple admins supported, each managing their own teams.

---
