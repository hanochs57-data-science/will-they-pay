const mongoose = require('mongoose');

const RfSchema = new mongooseSchema({
    Age: { type: Number, required: true},
    Income: {type: Number, required: true},
    LoanAmount: {type: Number, required: true},
    CreditScore: {type: Number, required: true},
    MonthsEmployed: {type: Number, required: true},
    NumCreditLines: {type: Number, required: true},
    InterestRate:  {type: Number, required: true},
    LoanTerm: {type: Number, required: true},
    DTIRatio: {type: Number, required: true},
    Education: {type: String, required: true},
    EmploymentType: {type: String, required: true},
    MaritalStatus: {type: String, required: true},
    HasMortgage:  {type: String, required: true},
    HasDependents: {type: String, required: true},
    LoanPurpose: {type: String, required: true},
    HasCoSigner: {type: Number, required: true}
});

module.exports = mongoose.model('RF',RFSchema);
