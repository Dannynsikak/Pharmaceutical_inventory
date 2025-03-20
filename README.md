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
- [Reporting & Analytics](#reporting--analytics)
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
- **Reporting & Analytics:**
  - Interactive dashboards displaying stock levels and sales trends using charts.

---

## Innovation

The solution stands out by integrating a simple AI model that predicts the number of days until a medicine needs to be restocked based on recent sales data. This innovative feature enables:

- **Proactive Inventory Management:** Automated suggestions for reordering help minimize stockouts and overstock situations.
- **Enhanced Decision-Making:** Real-time data and AI predictions improve operational efficiency and cost management.
- **Impact on Patient Care:** Timely restocking ensures the availability of essential medications, directly impacting patient outcomes.

---

## Reporting & Analytics

The **Reporting & Analytics** module provides real-time insights into inventory stock levels and sales trends:

- **Stock Level Visualization:**
  - A dynamic chart displays the available stock for all medicines, allowing users to quickly assess inventory status.
- **Sales Trends Analysis:**
  - A visual representation of sales trends over time, helping users understand demand patterns and optimize stock replenishment.
- **Enhanced Decision-Making:**
  - Data-driven insights enable better forecasting and inventory control.

This feature improves the system’s efficiency by providing pharmacy managers and healthcare providers with crucial data at a glance.

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

## Future Improvements

- **Enhanced AI Models:**
  - Integrate advanced machine learning models (e.g., using TensorFlow or PyTorch) for more accurate predictions.
- **Real-Time Data:**
  - Implement WebSocket support for live updates.
- **User Role Management:**
  - Fine-grained access controls based on user roles (e.g., admin, pharmacist, store manager).
- **Mobile Responsiveness:**
  - Further refine the UI for mobile devices.
- **Advanced Reporting & Analytics:**
  - Add more in-depth insights, predictive analytics, and downloadable reports.

---

## License

This project is licensed under the MIT License.

---

## Contact

For questions or further information, please contact nsikakdanny11@gmail.com.

This README is designed to be comprehensive and SEO-friendly, highlighting the innovation, technical soundness, and scalability of the Pharmaceutical Inventory System.
