import requests

headers = {
    'Content-Type': 'application/json',
}

data = {"code":"value1", "lang":"value2"}

response = requests.post('http://localhost:8000/execute', headers=headers, data=data)
