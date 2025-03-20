# Pharmaceutical Inventory System

A robust software application designed to manage and track the stock, procurement, and distribution of pharmaceutical products. This system ensures accurate inventory control and efficient supply chain management while incorporating AI-based predictions for automated reordering.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Innovation](#innovation)
- [Technical Feasibility](#technical-feasibility)
- [Scalability](#scalability)
- [System Architecture](#system-architecture)
- [Technologies Used](#technologies-used)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [AI Integration](#ai-integration)
- [Future Improvements](#future-improvements)
- [License](#license)
- [Contact](#contact)

---

## Overview

The Pharmaceutical Inventory System is a comprehensive solution that automates the management of pharmaceutical products. It offers real-time tracking of product stock levels, supplier details, and expiry dates. Additionally, the system integrates AI to predict restock needs based on historical sales data, ensuring that pharmacies and hospitals can maintain optimal inventory levels and reduce waste.

---

## Features

- **Product Tracking:**
  - View product name, batch number, expiry date, stock quantity, price, and supplier details.
- **Stock Alerts:**
  - Automated alerts for low-stock or expired medicines.
- **Automated Reordering:**
  - AI-based predictions estimate when to restock products based on historical sales trends.
- **CRUD Operations:**
  - Create, read, update, and delete medicines.
- **Sales & Purchase Management:**
  - Record sales (decreasing stock) and purchases (increasing stock) with automatic updates.
- **User Authentication:**
  - Secure registration and login functionality with JWT.
- **Responsive UI:**
  - Modern frontend built with Next.js, TypeScript, Tailwind CSS, and ShadCN UI components.

---

## Innovation

The solution stands out by integrating a simple AI model that predicts the number of days until a medicine needs to be restocked based on recent sales data. This innovative feature enables:

- **Proactive Inventory Management:** Automated suggestions for reordering help minimize stockouts and overstock situations.
- **Enhanced Decision-Making:** Real-time data and AI predictions improve operational efficiency and cost management.
- **Impact on Patient Care:** Timely restocking ensures the availability of essential medications, directly impacting patient outcomes.

---

## Technical Feasibility

- **Backend:**  
  Developed using FastAPI with SQLAlchemy for ORM, Pydantic for data validation, and Alembic for database migrations. This stack is highly efficient, asynchronous, and scalable.
- **Frontend:**  
  Built with Next.js and TypeScript, ensuring a fast, SEO-friendly, and responsive user interface. Tailwind CSS and ShadCN UI components enhance the visual design.
- **AI Integration:**  
  Uses NumPy for data analysis and a simple prediction algorithm to calculate days until restock based on a 7-day average of sales. While basic, this model can be enhanced over time with more advanced machine learning techniques.
- **Authentication:**  
  Secure JWT-based authentication is implemented, ensuring that only authorized users can access inventory data.

---

## Scalability

- **Modular Architecture:**  
  The project is divided into clear modules for authentication, inventory management, and AI prediction, which allows independent scaling and maintenance.
- **Database:**  
  The use of PostgreSQL (or any relational database) with SQLAlchemy ensures efficient querying and data integrity as the dataset grows.
- **Backend:**  
  FastAPI supports asynchronous operations, making it well-suited for handling a large number of requests concurrently.
- **Frontend:**  
  Next.js enables server-side rendering and static site generation for improved performance and scalability.
- **Future Enhancements:**  
  As the user base and dataset grow, you can integrate caching mechanisms, load balancing, and a more advanced AI model to further improve performance.

---

## System Architecture

- **User Interface:**  
  Next.js frontend with pages for inventory dashboard, login, registration, and blog/landing page.
- **API Layer:**  
  FastAPI endpoints handling CRUD operations for medicines, sales, and purchases, plus an AI endpoint for restock predictions.
- **Database:**  
  A relational database (e.g., PostgreSQL) managed with SQLAlchemy and migrations via Alembic.
- **AI Module:**  
  A Python-based module using NumPy to analyze historical sales and predict restock timings.
- **Authentication:**  
  JWT-based secure authentication integrated into both backend endpoints and frontend routing.

---

## Technologies Used

- **Backend:**
  - FastAPI
  - SQLAlchemy
  - Alembic
  - Pydantic
  - NumPy
  - psycopg2 (PostgreSQL driver)
- **Frontend:**
  - Next.js
  - TypeScript
  - Tailwind CSS
  - ShadCN UI components
- **AI Integration:**
  - A custom prediction function using NumPy for basic trend analysis

---

## Setup & Installation

### **Backend Setup**

1. **Clone the repository:**

   ```
   git clone git@github.com:Dannynsikak/Pharmaceutical_inventory.git
   cd Pharmaceutical_inventory
   Create and activate a virtual environment:
   ```

   python -m venv .venv
   source .venv/bin/activate # On Windows: .venv\Scripts\activate
   Install dependencies:

   pip install -r requirements.txt
   Configure environment variables: Create a .env file with your database URL and secret key:

   env

   DATABASE_URL=postgresql://user:password@localhost/pharma_db
   SECRET_KEY=your_secret_key
   Run database migrations:

   alembic upgrade head
   Start the FastAPI server:

   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

### **Frontend Setup**

    Navigate to the frontend directory:

    cd pharma_inventory #
    Install dependencies using pnpm :

    pnpm install
    Start the Next.js development server:

    pnpm run dev
    Usage
    Access the Landing Page:
    The landing page (blog page) provides an overview of the system’s impact and benefits.

Dashboard:

    Log in to view the inventory dashboard, which includes:
    A paginated table of medicines.
    Stock alerts (low stock, expired).
    AI-based restock predictions.
    Options to add, update, and delete medicine entries.

Authentication:

    Secure login and registration flows ensure only authorized users can access the inventory data.

AI Predictions:

    The system uses historical sales data to predict restock timings. If there is insufficient data, it shows a fallback message.

AI Integration

    The AI module in the backend calculates the average daily sales over the last 7 days and predicts the number of days until a medicine needs restocking.

Prediction Endpoint:

    GET /aimodel/predict-restock/{medicine_id} returns a JSON response with the predicted days until restock.

Model Logic:

    python
    def predict_restock(medicine_id, sales_data):
    avg_sales = np.mean(sales_data[-7:]) # Last 7 days avg
    current_stock = sales_data[-1]
    days_left = current_stock / avg_sales if avg_sales > 0 else 0
    return days_left

UI Integration:

    The frontend fetches predictions and displays them in the inventory table. If stock is above 50, it displays "Stock is sufficient". If below 30, it shows "Needs to restock", along with the AI prediction.

# Future Improvements

Enhanced AI Models:
Integrate advanced machine learning models (e.g., using TensorFlow or PyTorch) for more accurate predictions.
Real-Time Data:
Implement WebSocket support for live updates.
User Role Management:
Fine-grained access controls based on user roles (e.g., admin, pharmacist, store manager).
Mobile Responsiveness:
Further refine the UI for mobile devices.
Reporting & Analytics:
Add detailed dashboards and reporting tools for inventory analytics.

# License

This project is licensed under the MIT License.

# Contact

For questions or further information, please contact nsikakdanny11@gmail.com.

This README is designed to be comprehensive and SEO-friendly, highlighting the innovation, technical soundness, and scalability of the Pharmaceutical Inventory System.
