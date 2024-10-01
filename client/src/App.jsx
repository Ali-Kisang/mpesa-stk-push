import { useState } from "react";
import axios from "axios";
const server = "http://localhost:5000";
const Payment = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const initiateSTKPush = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Basic validation for phone number and amount
    if (!phone.match(/^(2547)[0-9]{8}$/) || amount <= 0) {
      setMessage("Please enter a valid phone number and amount.");
      setLoading(false);
      return;
    }

    try {
      const tokenRes = await axios.post(`${server}/api/get-token`);
      const token = tokenRes.data.access_token;
      //console.log("Access_token:", token);
      const stkPushRes = await axios.post(
        `${server}/api/stkpush`,
        { phone, amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        `STK Push Sent. Check your phone. Transaction ID: ${
          stkPushRes.data.CheckoutRequestID || "N/A"
        }`
      );
    } catch (error) {
      console.error("Error initiating STK Push:", error);
      setMessage("Error initiating STK Push. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Mpesa Payment
        </h2>
        <form onSubmit={initiateSTKPush} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-md ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {loading ? "Processing..." : "Pay with Mpesa"}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default Payment;
