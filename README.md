
# MPESA STK Push Integration Setup and Testing

This guide walks through the process of setting up an MPESA STK Push integration using a Node.js backend and a React frontend. The following sections outline the steps from signing up for Safaricom's Daraja API to testing the integration on a local development environment.

## Prerequisites
Before starting, ensure you have the following installed:
- Node.js and npm
- A Safaricom Daraja account for the sandbox environment
- React.js (for frontend)
- Postman (for testing API endpoints)

## Step 1: Sign Up for Safaricom Daraja API

1. Visit the [Safaricom Developer Portal](https://developer.safaricom.co.ke/).
2. Sign up for a developer account and log in.
3. Create an application in the portal, which will provide you with a `Consumer Key` and `Consumer Secret`.
4. Activate the **MPESA Express (STK Push)** API in the sandbox environment.

## Step 2: Set Up the Backend (Node.js + Express)

### 1. Initialize Node.js Project

```bash
mkdir mpesa-stk-push-backend
cd mpesa-stk-push-backend
npm init -y
```

### 2. Install Required Packages

```bash
npm install express axios dotenv body-parser
```

### 3. Set Up `.env` File
Create a `.env` file in the root directory of your project and add the following environment variables. Ensure you replace the placeholders with your actual credentials from the Safaricom Developer Portal:

```bash
CONSUMER_KEY=your_consumer_key
CONSUMER_SECRET=your_consumer_secret
SHORTCODE=your_shortcode
PASSKEY=your_passkey
CALLBACK_URL=http://yourdomain.com/callback
ACCOUNT_REFERENCE=your_reference
TRANSACTION_DESC=your_description
```

### 4. Start the Backend Server

```bash
node server.js
```

The backend server should now be running on `http://localhost:5000`.

## Step 3: Set Up the Frontend (React)

### 1. Initialize React Project

```bash
npx create-react-app mpesa-stk-push-frontend
cd mpesa-stk-push-frontend
```

### 2. Install Axios

```bash
npm install axios
```

### 3. Run the React App

```bash
npm start
```

The frontend should now be running on `http://localhost:3000`.

## Step 4: Testing the Integration

### 1. Generate Access Token
Use Postman or cURL to test the `/api/get-token` endpoint to ensure that your backend can successfully retrieve an access token from the Safaricom Daraja API.

### 2. Initiate STK Push from Frontend
From the React frontend:
- Enter the phone number and amount.
- Click the "Pay Now" button to trigger the STK Push request.
  
You should receive an MPESA prompt on your mobile device asking you to authorize the payment.

### 3. Example Image of STK Push Prompt
*(You can insert the image here once you receive the STK Push on your phone)*

![STK Push Confirmation](path_to_image)

## Step 5: Verify Payment in the MPESA Portal

1. Once you confirm the payment, you can check the transaction details on the Safaricom portal.
2. Verify that the callback URL receives the payment confirmation data.

---

By following these steps, you should have a fully functional MPESA STK Push integration. Ensure all environment variables are securely stored, especially when moving to production.
