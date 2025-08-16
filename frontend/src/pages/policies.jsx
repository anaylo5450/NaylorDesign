import "./policies.css";

export default function Policies() {
  return (
    <div className="pol-page">
      <section className="pol-container">
        <h1 className="pol-title">Policies</h1>
        <p className="pol-lede">
          Simple, fair, and clear. If you have any questions, email
          {" "}
          <a href="mailto:apnaylor@frostburg.edu">apnaylor@frostburg.edu</a>
          {" "}or call{" "}
          <a href="tel:+12405842968">240-584-2968</a>.
        </p>

        <div className="pol-block">
          <h2>Shipping</h2>
          <p>Most Items are Print-to-order. shipping usually takes around 2 weeks</p>
        </div>

        <div className="pol-block">
          <h2>Returns</h2>
          <p>Unused, uninstalled items may be returned within 14 days of delivery for a refund (minus shipping). Items must be in original condition and packaging. Custom/made-to-order parts are not returnable unless defective on arrival.</p>
        </div>

        <div className="pol-block">
          <h2>Warranty</h2>
          <p>Manufacturing defects are covered for 90 days from delivery. Normal wear, improper installation, or misuse is not covered. If you experience an issue, contact us and include your order number, photos, and a description.</p>
        </div>

        <div className="pol-block">
          <h2>Lead Times (Custom / Made-to-Order)</h2>
          <p>Lead times vary by part and workload. Typical targets are 1–3 weeks for prints, could be longer based on . We’ll communicate estimates up front and update you if anything changes.</p>
        </div>

        <div className="pol-block">
          <h2>Fitment & Installation</h2>
          <p>Verify part compatibility with your specific vehicle and trim. Professional installation is recommended. We’re happy to answer pre-install questions to help you avoid issues.</p>
        </div>

        <div className="pol-block">
          <h2>Damaged or Lost in Transit</h2>
          <p>If your package arrives damaged or is lost, contact us within 7 days. Keep all packaging and provide photos so we can file a carrier claim and send a replacement if applicable.</p>
        </div>

        <div className="pol-block">
          <h2>Order Changes & Cancellations</h2>
          <p>We can modify or cancel an order before it ships. Custom/made-to-order work cannot be canceled once materials are cut/printed or production has started.</p>
        </div>

        <div className="pol-block">
          <h2>Payments, Taxes & Duties</h2>
          <p>We accept major payment methods shown at checkout. Sales tax is collected where required. International customers are responsible for any import duties, VAT, or brokerage fees.</p>
        </div>

        <div className="pol-block">
          <h2>Privacy</h2>
          <p>We only collect information needed to fulfill orders and support customers. We do not sell your data. For privacy requests, contact us at the email above.</p>
        </div>

        <div className="pol-block">
          <h2>Liability</h2>
          <p>Use of parts is at the customer’s own risk. Naylor Design is not liable for incidental or consequential damages arising from use or installation. Always follow safe practices.</p>
        </div>

        <div className="pol-block">
          <h2>Intellectual Property</h2>
          <p>All designs, images, and content are the property of Naylor Design unless otherwise stated. Do not reproduce without permission.</p>
        </div>

        <div className="pol-updated">Last updated: <span>August 2025</span></div>
      </section>
    </div>
  );
}
