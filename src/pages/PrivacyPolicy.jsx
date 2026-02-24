import React from "react";

const PrivacyPolicy = () => {
  const dateObj = new Date();
  return (
    <div className="bg-[#1E2931] text-white font-sans min-h-screen">
      <div className="max-w-4xl mx-auto p-6 md:p-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="w-full md:w-2/5 flex justify-center">
            <img
              src="/banner.png"
              alt="Privacy Policy Banner"
              className="rounded-2xl shadow-2xl max-w-xs h-auto transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="w-full md:w-3/5 text-center md:text-left">
            <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-gray-300 text-lg">
              Effective date: <strong>{dateObj.toLocaleDateString()}</strong>
            </p>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="text-gray-200 space-y-8">
          {/* Introduction */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Introduction</h2>
            <p>
              This Privacy Policy explains how ITWORKED YAZILIM IC VE DIS TICARET LIMITED SIRKETI,
              operating the Vircle brand (“Vircle,” “we,” “us”), collects, uses, shares, and protects
              personal data when the Vircle iOS/Android apps and related services are used (the
              “Service”). By using the Service, this Policy and any updates communicated with notice
              are agreed.
            </p>
          </section>

          {/* Who we are */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Who we are</h2>
            <p>
              <strong>Controller:</strong> ITWORKED YAZILIM IC VE DIS TICARET LIMITED SIRKETI,
              Dumlupinar Mah. Baris Sk. A Blok No: 7a Iç Kapi No: 29 Kadiköy / Istanbul, Türkiye.
              <br />
              <strong>Contact:</strong>{" "}
              <a href="mailto:info@vircle.ai" className="text-blue-400 hover:underline">
                info@vircle.ai
              </a>
              <br />
              <strong>Governing language:</strong> English.
            </p>
          </section>

          {/* What we collect */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">What we collect</h2>
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Account and identifiers:</strong> email, display name, authentication identifiers (Apple/Google/email), device and app identifiers.</li>
              <li><strong>Usage and technical data:</strong> app interactions, logs, timestamps, device/OS version, crash diagnostics, IP address, coarse location inferred from IP, language, and settings.</li>
              <li><strong>Content data:</strong> prompts/inputs, AI outputs, personas/character settings, feedback (e.g., ratings, reports).</li>
              <li><strong>Transaction data:</strong> subscription tier, purchase confirmations, renewal status, and app‑store region; store‑provided payment metadata (no full card data is stored).</li>
              <li><strong>Communications:</strong> support requests, abuse reports, legal and IP notices.</li>
              <li><strong>Inferences:</strong> engagement metrics, feature usage patterns, and capped frequency signals for product operation, abuse prevention, and analytics.</li>
            </ul>
          </section>

          {/* What we do not seek to collect */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">What we do not seek to collect</h2>
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Special category data:</strong> health, biometric, racial/ethnic, political opinions, religious beliefs, sexual life, or similar sensitive data are not sought; voluntary disclosure in prompts should be avoided.</li>
              <li><strong>Children’s data:</strong> eligibility follows app store minimums and applicable laws; the Service is not directed to children below those thresholds.</li>
            </ul>
          </section>

          {/* How we use data */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">How we use data</h2>
            <ul className="list-disc list-inside space-y-3">
                <li><strong>Provide and maintain the Service:</strong> authentication, session management, message routing, persona configuration, content delivery, troubleshooting, and support.</li>
                <li><strong>Safety and integrity:</strong> abuse detection, spam/phishing/malware screening, rate limiting, fraud prevention, violation investigation, and legal compliance.</li>
                <li><strong>Improve features and quality:</strong> performance tuning, crash analysis, product analytics, and UX research; prompts and outputs are excluded from model‑training by default.</li>
                <li><strong>Communications:</strong> in‑app notices about features, policy updates, and critical incidents; optional service‑related emails where available.</li>
                <li><strong>Legal:</strong> compliance with legal obligations, enforcing Terms, managing disputes, and responding to lawful requests.</li>
            </ul>
          </section>

          {/* AI, content, and training position */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">AI, content, and training position</h2>
            <p className="mb-3">
              AI outputs are generated by machine‑learning systems and may be inaccurate, offensive, or unreliable; they are provided for informational use and are not professional advice or a substitute for emergency services.
            </p>
            <p>
              Prompts and outputs are excluded from model training for all users; limited processing of data may occur for safety, debugging, reliability, analytics, and to operate core features as described here.
            </p>
          </section>

          {/* Legal bases */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Legal bases (where applicable, e.g., EEA/UK)</h2>
            <ul className="list-disc list-inside space-y-3">
                <li><strong>Contract:</strong> to provide the Service requested.</li>
                <li><strong>Legitimate interests:</strong> safety, security, fraud prevention, service improvement, and analytics proportionate to user expectations.</li>
                <li><strong>Consent:</strong> where required for optional features, notifications, or certain local requirements.</li>
                <li><strong>Legal obligation:</strong> compliance with consumer, tax, and record‑keeping laws.</li>
            </ul>
          </section>

          {/* Data retention */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Data retention</h2>
            <ul className="list-disc list-inside space-y-3">
                <li><strong>Active accounts:</strong> retained as long as needed to provide the Service.</li>
                <li><strong>Inactive accounts:</strong> after 1 year of inactivity, only account identifiers and purchase records necessary for tax/compliance are retained, subject to lawful retention, backup, and legal‑hold exceptions.</li>
                <li><strong>Logs and diagnostics:</strong> retained for operational and security purposes for a limited period consistent with this Policy and applicable law.</li>
                <li><strong>Deletion:</strong> when an account is deleted in‑app, processing ceases for that account, subject to lawful retention, safety investigations, dispute resolution, and backup/legal‑hold exceptions.</li>
            </ul>
          </section>
          
          {/* Sharing and disclosures */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Sharing and disclosures</h2>
            <ul className="list-disc list-inside space-y-3">
                <li><strong>Service providers (processors):</strong> cloud hosting, authentication, analytics, crash reporting, content moderation, and model infrastructure, bound by contracts and confidentiality.</li>
                <li><strong>App stores:</strong> Apple and Google receive transaction and subscription data and manage billing, renewals, and refunds.</li>
                <li><strong>Compliance and safety:</strong> disclosures to law enforcement or authorities when legally required or necessary to protect users, the Service, or others.</li>
                <li><strong>Corporate events:</strong> in mergers, acquisitions, or reorganizations, personal data may transfer in accordance with this Policy and applicable law.</li>
                <li><strong>No sale of personal data:</strong> personal data is not sold. No sharing for cross‑context behavioral advertising where restricted by applicable law.</li>
            </ul>
          </section>
          
          {/* International transfers */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">International transfers</h2>
            <p>
                Data may be processed in countries where Vircle or service providers operate. Appropriate safeguards are used as required by law (e.g., contractual protections) and a risk‑based approach for international transfers.
            </p>
          </section>

          {/* Security */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Security</h2>
            <p>
              Technical and organizational measures are applied, including encryption in transit and at rest, access controls, key management, audit logs, vulnerability management, and least‑privilege access. No method is 100% secure. Suspected incidents can be reported to{" "}
              <a href="mailto:info@vircle.ai" className="text-blue-400 hover:underline">
                info@vircle.ai
              </a>.
            </p>
          </section>

          {/* User choices and controls */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">User choices and controls</h2>
             <ul className="list-disc list-inside space-y-3">
                <li><strong>Account settings:</strong> manage profile, personas, and, where available, certain privacy preferences.</li>
                <li><strong>Access and deletion:</strong> in‑app account deletion is available; data subject rights requests can be sent to <a href="mailto:info@vircle.ai" className="text-blue-400 hover:underline">info@vircle.ai</a>.</li>
                <li><strong>Communications:</strong> control store‑level notifications and, where enabled, in‑app or OS notification permissions.</li>
                <li><strong>Sensitive content:</strong> avoid entering sensitive personal data in prompts or profiles.</li>
            </ul>
          </section>

          {/* Regional rights */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Regional rights (illustrative, non‑exhaustive)</h2>
            <ul className="list-disc list-inside space-y-3">
                <li><strong>EEA/UK:</strong> rights to access, rectification, erasure, restriction, portability, and objection where applicable; right to lodge a complaint with a supervisory authority.</li>
                <li><strong>California and similar jurisdictions:</strong> rights to know, delete, correct, and to opt‑out of certain disclosures; non‑discrimination for exercising rights. No sale or sharing for cross‑context behavioral advertising as defined by applicable law.</li>
                <li><strong>Türkiye:</strong> rights under applicable Turkish data protection and consumer laws, including applications to the data controller and complaint rights to the competent authority.</li>
            </ul>
          </section>

          {/* Children */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Children</h2>
            <p>
                Eligibility follows app store minimums and local law. Where a jurisdiction requires parental consent for minors, such consent should be obtained and supervised use ensured. The Service is not intended for children below the applicable thresholds.
            </p>
          </section>

          {/* Cookies and tracking */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Cookies and tracking</h2>
            <p>
                The mobile apps primarily rely on device identifiers and SDK‑based analytics/crash telemetry rather than browser cookies. Platform‑level identifiers and SDKs may capture usage, diagnostics, and performance metrics to operate and improve the Service.
            </p>
          </section>

          {/* Third-party links and content */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Third‑party links and content</h2>
            <p>
                The Service may reference third‑party content or links. Those parties’ privacy practices are not controlled, and their policies should be reviewed for details.
            </p>
          </section>

          {/* User responsibilities */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">User responsibilities</h2>
            <ul className="list-disc list-inside space-y-3">
                <li>Do not include sensitive or unlawful content in prompts.</li>
                <li>Maintain account security and comply with the Acceptable Use rules described in the Terms.</li>
                <li>Use discretion with public sharing of personas or chats if/when enabled.</li>
            </ul>
          </section>

          {/* Changes to this Policy */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Changes to this Policy</h2>
            <p>
                Material changes will be communicated with at least 15 days’ notice via in‑app notice and/or website posting (and email where available). Continued use after the effective date indicates acceptance; discontinuation before that date is an available option.
            </p>
          </section>
          
          {/* Contact */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Contact</h2>
            <p>
              <strong>Controller:</strong> ITWORKED YAZILIM IC VE DIS TICARET LIMITED SIRKETI
              <br />
              <strong>Address:</strong> Dumlupinar Mah. Baris Sk. A Blok No: 7a Iç Kapi No: 29 Kadiköy / Istanbul, Türkiye
              <br />
              <strong>Email:</strong>{" "}
              <a href="mailto:info@vircle.ai" className="text-blue-400 hover:underline">
                info@vircle.ai
              </a>
            </p>
          </section>

          {/* Language and interpretation */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Language and interpretation</h2>
            <p>
                This Privacy Policy is provided in English and governs in case of any translation discrepancy.
            </p>
          </section>

          {/* Optional add-ons to confirm or adjust */}
          <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Optional add‑ons to confirm or adjust</h2>
            <ul className="list-disc list-inside space-y-3">
                <li>Data subject request SLA (e.g., respond within 30 days where required).</li>
                <li>SDK/vendor list disclosure style: categorical in the Policy, with a live list linked in‑app or on the website for transparency.</li>
                <li>Data residency note: indicate main hosting region(s) if preferred (e.g., EU region for EU users, multi‑region otherwise).</li>
                <li>Incident notifications: add a dedicated status page link if one will be used for security or availability incidents.</li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm border-t border-gray-700 mt-12 pt-6">
          © {dateObj.getFullYear()} Itworked Systems. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
