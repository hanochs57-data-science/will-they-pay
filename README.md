Loan Default Prediction System
Overview

The Loan Default Prediction System is a full-stack Machine Learning application that predicts whether a loan applicant is likely to default based on demographic, financial, and employment information. The application integrates a React frontend, an Express.js backend, a FastAPI prediction service, and MongoDB for storing prediction records.

Features
Predicts loan default using a trained Machine Learning model
User-friendly React interface for entering applicant details
FastAPI REST API for model inference
Express.js backend to handle requests and database operations
MongoDB integration for storing prediction history
Dockerized architecture for easy deployment
Responsive and modern user interface
Tech Stack
Frontend
React (Vite)
HTML5
CSS3
JavaScript
Axios
Backend
Node.js
Express.js
Machine Learning
Python
FastAPI
Scikit-learn
Pandas
NumPy
Joblib
Database
MongoDB
DevOps
Docker
Docker Compose


Workflow
User enters loan applicant information.
React sends the data to the Express server.
Express forwards the request to the FastAPI service.
FastAPI preprocesses the input and performs prediction using the trained model.
The prediction result is returned to Express.
Express stores the prediction details in MongoDB.
The prediction is displayed to the user.
Installation
Clone the Repository
git clone https://github.com/your-username/will-they-pay.git

cd Loan-Default-Prediction
Build the Docker Containers
docker compose build
Start the Application
docker compose up
Access the Application
Service	URL
React Frontend	http://localhost:5173
Express API	http://localhost:5000
FastAPI Docs	http://localhost:8000/docs
MongoDB	localhost:27017
Machine Learning Model

The prediction model is built using Gradient Boosting Classifier from Scikit-learn.

Input Features
Age
Income
Loan Amount
Credit Score
Months Employed
Number of Credit Lines
Interest Rate
Loan Term
Debt-to-Income Ratio
Education
Employment Type
Marital Status
Mortgage Status
Dependents
Loan Purpose
Co-signer Availability
Output
Loan Status (Default / No Default)
Probability of Default
Probability of No Default
API Endpoint
Predict Loan Default

POST

POST /predict

Example Request

{
  "Age": 35,
  "Income": 65000,
  "LoanAmount": 20000,
  "CreditScore": 720,
  "MonthsEmployed": 48,
  "NumCreditLines": 3,
  "InterestRate": 9.5,
  "LoanTerm": 36,
  "DTIRatio": 0.32,
  "Education": "Bachelor's",
  "EmploymentType": "Full-time",
  "MaritalStatus": "Married",
  "HasMortgage": true,
  "HasDependents": false,
  "LoanPurpose": "Home",
  "HasCoSigner": true
}

Example Response

{
  "prediction": 0,
  "status": "No Default",
  "probability_default": 0.12,
  "probability_no_default": 0.88
}
Docker Services
Frontend (React)
Express Server
FastAPI Service
MongoDB
Future Enhancements
User authentication and authorization
Prediction history dashboard
Batch prediction using CSV upload
Model performance monitoring
Data visualization and analytics
Cloud deployment on AWS or Azure
Author

Hanoch Shetty

B.Sc. Information Technology Student | Machine Learning Enthusiast | Aspiring AI/ML Engineer
