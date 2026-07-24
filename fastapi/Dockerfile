FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .

# FIX: Changed pip3 to pip
RUN python3 -m pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
