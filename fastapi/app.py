from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib

app = FastAPI()

# Add CORS middleware to allow requests from Express.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the input schema
class LoanApplicationInput(BaseModel):
    Age: int
    Income: float
    LoanAmount: float
    CreditScore: int
    MonthsEmployed: int
    NumCreditLines: int
    InterestRate: float
    LoanTerm: int
    DTIRatio: float
    Education: str
    EmploymentType: str
    MaritalStatus: str
    HasMortgage: bool
    HasDependents: bool
    LoanPurpose: str
    HasCoSigner: bool

# Load the trained model
try:
    with open('model.pkl', 'rb') as f:
        model = joblib.load(f)
except FileNotFoundError:
    model = None

# Categorical mappings
EDUCATION_MAP = {'High School': 0, "Bachelor's": 1, "Master's": 2, 'PhD': 3}
EMPLOYMENT_MAP = {'Full-time':0, 'Unemployed':1, 'Self-employed':2, 'Part-time':3}
MARITAL_MAP = {'Divorced':0, 'Married':1, 'Single':2}
LOAN_PURPOSE_MAP = {'Other':0, 'Auto':1, 'Business':2, 'Home':3, 'Education':4}

@app.post("/predict")
async def predict_default(input_data: LoanApplicationInput):
    """
    Predict loan default status based on user inputs from React -> Express.js -> FastAPI
    """
    if model is None:
        return {"error": "Model not loaded"}
    
    try:
        # Encode categorical features
        education_encoded = EDUCATION_MAP.get(input_data.Education, 0)
        employment_encoded = EMPLOYMENT_MAP.get(input_data.EmploymentType, 2)
        marital_encoded = MARITAL_MAP.get(input_data.MaritalStatus, 0)
        loan_purpose_encoded = LOAN_PURPOSE_MAP.get(input_data.LoanPurpose, 0)
        
        # Prepare feature array
        features = np.array([[
            input_data.Age,
            input_data.Income,
            input_data.LoanAmount,
            input_data.CreditScore,
            input_data.MonthsEmployed,
            input_data.NumCreditLines,
            input_data.InterestRate,
            input_data.LoanTerm,
            input_data.DTIRatio,
            education_encoded,
            employment_encoded,
            marital_encoded,
            int(input_data.HasMortgage),
            int(input_data.HasDependents),
            loan_purpose_encoded,
            int(input_data.HasCoSigner)
        ]])
        
        # Make prediction
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0]
        
        return {
            "prediction": int(prediction),
            "status": "Will Default" if prediction == 1 else "Will Not Default",
            "probability_no_default": round(float(probability[0]), 4),
            "probability_default": round(float(probability[1]), 4)
        }
    
    except Exception as e:
        return {"error": str(e)}

@app.get("/health")
async def health_check():
    return {"status": "API is running"}
