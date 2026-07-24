from sklearn.ensemble import GradientBoostingClassifier
import joblib
from sklearn.model_selection import train_test_split
gb_model = GradientBoostingClassifier(n_estimators=100, random_state=42,learning_rate=0.1)

X = joblib.load('X.pkl')
Y = joblib.load('Y.pkl')
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

gb_model.fit(X_train, Y_train)

joblib.dump(gb_model, "model.pkl")