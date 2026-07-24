import joblib

model = joblib.load("model.pkl")
print(type(model))
print(model.__module__)