import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <h2>For any questions, or to reach us directly about a project, Please contact us at:</h2>
        <p>
          Email:{" "}
          <a href="mailto:apnaylor@frostburg.edu">
            apnaylor@frostburg.edu
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href="tel:+12405842968">
            240-584-2968
          </a>
        </p>
      </div>
    </div>
  );
}
