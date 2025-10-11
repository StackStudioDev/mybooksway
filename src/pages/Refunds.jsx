// src/pages/Refunds.jsx
export default function Refunds() {
  return (
    <section className="container">
      <h2>Returns & Refunds</h2>
      <p><strong>Return window:</strong> 7 days from delivery for unused, undamaged books in original condition.</p>
      <h4>Eligible cases</h4>
      <ul>
        <li>Wrong item delivered / printing defect / transit damage (with unboxing photos).</li>
        <li>Unopened item in resaleable condition (return shipping may apply).</li>
      </ul>
      <h4>How to request</h4>
      <ol>
        <li>Write to <a href="mailto:support@mybooksaway.com">support@mybooksaway.com</a> with order ID & photos (if damaged).</li>
        <li>On approval, we arrange pickup or share a return address.</li>
        <li>Once inspected, refund is issued to original payment method within 5–7 working days.</li>
      </ol>
      <p className="muted">Exclusions: eBooks, heavily used/marked books, customized items.</p>
    </section>
  );
}
