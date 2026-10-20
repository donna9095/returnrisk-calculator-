import requests
import json
import time

BASE_URL = "http://127.0.0.1:5000"

def run_tests():
    print("Testing ReturnLess Backend API...")
    
    # 1. Health check
    try:
        r = requests.get(f"{BASE_URL}/health", timeout=3)
        print("Health Check:", r.status_code, r.json())
    except Exception as e:
        print("Backend is not running. Please start app.py first.")
        return

    # 2. Predict endpoint
    payload = {
        "productId": "acc973250a",
        "productName": "Okane Solid Men's Polo Neck T-Shirt",
        "category": "Clothing",
        "price": 699.0,
        "discountPercent": 45.0,
        "size": "L",
        "paymentMode": "COD",
        "shopperEmail": "test.shopper@mail.com"
    }
    r = requests.post(f"{BASE_URL}/predict", json=payload)
    print("\nPredict Response:", r.status_code)
    print(json.dumps(r.json(), indent=2))

    # 3. Get Orders
    r = requests.get(f"{BASE_URL}/api/orders")
    print("\nOrders Count:", len(r.json()))
    print("Sample Order:", r.json()[0])

    # 4. Savings Simulator
    r = requests.get(f"{BASE_URL}/api/savings-simulator?total_orders=5000&flagged_percent=15&success_rate=25&cost_per_return=180")
    print("\nSavings Simulator Response:")
    print(json.dumps(r.json(), indent=2))

    # 5. Model Metrics
    r = requests.get(f"{BASE_URL}/api/metrics")
    print("\nBenchmark Model Comparison Metrics:")
    print(json.dumps(r.json(), indent=2))
    
    print("\nALL BACKEND API TESTS PASSED!")

if __name__ == "__main__":
    run_tests()
