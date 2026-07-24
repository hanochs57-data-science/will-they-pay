import { useState } from "react";
import axios from "axios";
import "./App.css";

const initialData = {
  Age: "",
  Income: "",
  LoanAmount: "",
  CreditScore: "",
  MonthsEmployed: "",
  NumCreditLines: "",
  InterestRate: "",
  LoanTerm: "",
  DTIRatio: "",
  Education: "",
  EmploymentType: "",
  MaritalStatus: "",
  HasMortgage: "",
  HasDependents: "",
  LoanPurpose: "",
  HasCoSigner: ""
};

export default function App() {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let err = {};

    if (formData.Age < 18 || formData.Age > 69)
      err.Age = "Age must be between 18 and 69";

    if (formData.Income < 15000 || formData.Income > 150000)
      err.Income = "Income must be between 15000 and 150000";

    if (formData.LoanAmount < 5000 || formData.LoanAmount > 250000)
      err.LoanAmount = "Loan Amount must be between 5000 and 250000";

    if (formData.CreditScore < 300 || formData.CreditScore > 850)
      err.CreditScore = "Credit Score must be between 300 and 850";

    if (formData.MonthsEmployed < 0 || formData.MonthsEmployed > 120)
      err.MonthsEmployed = "Months Employed must be between 0 and 120";

    if (formData.NumCreditLines < 1 || formData.NumCreditLines > 4)
      err.NumCreditLines = "Credit Lines must be between 1 and 4";

    if (formData.InterestRate < 2 || formData.InterestRate > 25)
      err.InterestRate = "Interest Rate must be between 2 and 25";

    if (formData.LoanTerm < 12 || formData.LoanTerm > 60)
      err.LoanTerm = "Loan Term must be between 12 and 60";

    if (formData.DTIRatio < 0.1 || formData.DTIRatio > 0.9)
      err.DTIRatio = "DTI Ratio must be between 0.1 and 0.9";

    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") {
        err[key] = "Required";
      }
    });

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const payload = {
        Age: Number(formData.Age),
        Income: Number(formData.Income),
        LoanAmount: Number(formData.LoanAmount),
        CreditScore: Number(formData.CreditScore),
        MonthsEmployed: Number(formData.MonthsEmployed),
        NumCreditLines: Number(formData.NumCreditLines),
        InterestRate: Number(formData.InterestRate),
        LoanTerm: Number(formData.LoanTerm),
        DTIRatio: Number(formData.DTIRatio),

        Education: formData.Education,
        EmploymentType: formData.EmploymentType,
        MaritalStatus: formData.MaritalStatus,
        LoanPurpose: formData.LoanPurpose,

        HasMortgage: formData.HasMortgage === "Yes",
        HasDependents: formData.HasDependents === "Yes",
        HasCoSigner: formData.HasCoSigner === "Yes"
      };

      const res = await axios.post(
        "http://localhost:5000/api/submit",
        payload
      );

      setPrediction(res.data.fastapiData);
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.error);
      } else {
        alert("Prediction Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <h2>Loan Default Prediction</h2>

      <form onSubmit={handleSubmit}>

        <div className="grid">

          <Input label="Age" name="Age" type="number" value={formData.Age} change={handleChange} error={errors.Age}/>
          <Input label="Income" name="Income" type="number" value={formData.Income} change={handleChange} error={errors.Income}/>
          <Input label="Loan Amount" name="LoanAmount" type="number" value={formData.LoanAmount} change={handleChange} error={errors.LoanAmount}/>
          <Input label="Credit Score" name="CreditScore" type="number" value={formData.CreditScore} change={handleChange} error={errors.CreditScore}/>
          <Input label="Months Employed" name="MonthsEmployed" type="number" value={formData.MonthsEmployed} change={handleChange} error={errors.MonthsEmployed}/>
          <Input label="Credit Lines" name="NumCreditLines" type="number" value={formData.NumCreditLines} change={handleChange} error={errors.NumCreditLines}/>
          <Input label="Interest Rate" name="InterestRate" type="number" step="0.01" value={formData.InterestRate} change={handleChange} error={errors.InterestRate}/>
          <Input label="Loan Term" name="LoanTerm" type="number" value={formData.LoanTerm} change={handleChange} error={errors.LoanTerm}/>
          <Input label="DTI Ratio" name="DTIRatio" type="number" step="0.01" value={formData.DTIRatio} change={handleChange} error={errors.DTIRatio}/>

          <Select label="Education" name="Education" value={formData.Education} change={handleChange} options={["High School","Bachelor's","Master's","PhD"]} error={errors.Education}/>

          <Select label="Employment Type" name="EmploymentType" value={formData.EmploymentType} change={handleChange} options={["Full-time","Part-time","Self-employed","Unemployed"]} error={errors.EmploymentType}/>

          <Select label="Marital Status" name="MaritalStatus" value={formData.MaritalStatus} change={handleChange} options={["Single","Married","Divorced"]} error={errors.MaritalStatus}/>

          <Select label="Has Mortgage" name="HasMortgage" value={formData.HasMortgage} change={handleChange} options={["Yes","No"]} error={errors.HasMortgage}/>

          <Select label="Has Dependents" name="HasDependents" value={formData.HasDependents} change={handleChange} options={["Yes","No"]} error={errors.HasDependents}/>

          <Select label="Loan Purpose" name="LoanPurpose" value={formData.LoanPurpose} change={handleChange} options={["Home","Auto","Business","Education","Other"]} error={errors.LoanPurpose}/>

          <Select label="Has Co-Signer" name="HasCoSigner" value={formData.HasCoSigner} change={handleChange} options={["Yes","No"]} error={errors.HasCoSigner}/>

        </div>

        <button type="submit">
          {loading ? "Predicting..." : "Predict Loan Default"}
        </button>

      </form>

      {prediction && (
        <div className="result">
          <h3>{prediction.status}</h3>

          <p><strong>Prediction:</strong> {prediction.prediction}</p>

          <p><strong>Probability of Default:</strong> {prediction.probability_default}</p>

          <p><strong>Probability of No Default:</strong> {prediction.probability_no_default}</p>
        </div>
      )}

    </div>
  );
}

function Input(props) {
  return (
    <div>
      <label>{props.label}</label>

      <input
        type={props.type}
        step={props.step}
        name={props.name}
        value={props.value}
        onChange={props.change}
      />

      <small>{props.error}</small>
    </div>
  );
}

function Select(props) {
  return (
    <div>
      <label>{props.label}</label>

      <select
        name={props.name}
        value={props.value}
        onChange={props.change}
      >
        <option value="">Select</option>

        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <small>{props.error}</small>
    </div>
  );
}
