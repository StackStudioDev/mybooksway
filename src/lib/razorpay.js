// src/lib/razorpay.js  (with full debug logs)
console.log("⚙️ [razorpay.js] Module loaded...");

export function loadRazorpayScript() {
  console.log("🚀 [loadRazorpayScript] Called...");

  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      console.log("✅ [loadRazorpayScript] Razorpay already loaded in window.");
      return resolve(true);
    }

    console.log("🧩 [loadRazorpayScript] Creating <script> element...");
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";

    s.onload = () => {
      console.log("✅ [loadRazorpayScript] Razorpay SDK loaded successfully!");
      resolve(true);
    };

    s.onerror = (err) => {
      console.error("❌ [loadRazorpayScript] Razorpay SDK failed to load!", err);
      reject(new Error("Razorpay SDK failed to load"));
    };

    document.body.appendChild(s);
    console.log("📎 [loadRazorpayScript] Script tag appended to DOM:", s.src);
  });
}

/**
 * Server pe order create karo. Yahi pe notes bhejne hain.
 * params = { amount, currency, receipt, notes }
 */
export async function createOrderOnServer(params) {
  console.log("🟦 [createOrderOnServer] Called with params:", params);

  const base = import.meta.env.VITE_API_BASE || "";
  console.log("🌐 [createOrderOnServer] Using API base URL:", base);

  const url = `${base}/api/payments/create-order`;
  console.log("📡 [createOrderOnServer] Fetch URL:", url);

  try {
    console.log("📤 [createOrderOnServer] Sending POST request body:", JSON.stringify(params, null, 2));

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
      credentials: "include",
    });

    console.log("📥 [createOrderOnServer] Response received, status:", res.status);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("❌ [createOrderOnServer] Order creation failed! Response text:", text);
      throw new Error(`Failed to create order (${res.status}): ${text || "unknown"}`);
    }

    const data = await res.json();
    console.log("✅ [createOrderOnServer] Order created successfully:", data);
    return data;
  } catch (err) {
    console.error("❌ [createOrderOnServer] Unexpected error:", err);
    throw err;
  }
}

/**
 * (Optional) Dev fallback – hata sakte ho jab server ready ho
 */
export function createDevOrder({ amount, currency = "INR", receipt = "DEV", notes = {} }) {
  console.log("🧪 [createDevOrder] Using dev fallback order generator...");
  console.log("🧾 [createDevOrder] Params:", { amount, currency, receipt, notes });

  const id = "order_DEV_" + Date.now();
  const mockOrder = { id, amount, currency, receipt, notes };

  console.log("✅ [createDevOrder] Mock order generated:", mockOrder);
  return Promise.resolve(mockOrder);
}
