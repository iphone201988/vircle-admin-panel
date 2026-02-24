import React from "react";

const AiUseDisclaimer = () => {
    const dateObj = new Date();
  const Section = ({ title, children }) => (
    <section className="bg-[#2A3744] p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );

  return (
    <div className="bg-[#1E2931] text-white font-sans min-h-screen">
      <div className="max-w-4xl mx-auto p-6 md:p-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI Use Disclaimer
          </h1>
        </div>

        <div className="text-gray-200 space-y-8">
          <Section title="Overview">
            <p>
              This AI Use Disclaimer explains how Vircle.ai uses artificial intelligence in its products and the limitations, risks, and responsibilities associated with AI‑generated content. It should be read together with the Terms of Service and Privacy Policy.
            </p>
          </Section>

          <Section title="Who we are">
            <p>
              <strong>Provider:</strong> ITWORKED YAZILIM IC VE DIS TICARET LIMITED SIRKETI, operating the Vircle brand.
              <br />
              <strong>Address:</strong> Dumlupinar Mah. Baris Sk. A Blok No: 7a Iç Kapi No: 29 Kadiköy / Istanbul, Türkiye.
              <br />
              <strong>Contact:</strong>{" "}
              <a href="mailto:info@vircle.ai" className="text-blue-400 hover:underline">
                info@vircle.ai
              </a>
            </p>
          </Section>

          <Section title="Nature of AI interactions">
            <ul className="list-disc list-inside space-y-3">
              <li><strong>AI‑generated content:</strong> Vircle provides a context‑aware AI companion that generates messages, suggestions, and persona behaviors automatically based on inputs, settings, and usage context. Content may be inaccurate, incomplete, or offensive and may vary across similar prompts.</li>
              <li><strong>No human review by default:</strong> Interactions may not be reviewed by a human prior to display. Some content may be flagged and reviewed to ensure safety, comply with law, and enforce policies.</li>
            </ul>
          </Section>

          <Section title="Not professional advice or for emergencies">
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Informational only:</strong> AI outputs are for informational purposes only and do not constitute medical, legal, financial, mental‑health, or other professional advice.</li>
              <li><strong>No emergency use:</strong> The Service is not a substitute for emergency services or crisis hotlines. In an emergency or crisis, contact local emergency services immediately.</li>
            </ul>
          </Section>
          
          <Section title="Sensitive domains and safety measures">
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Restricted use:</strong> Vircle may restrict or apply safeguards to prompts, personas, and use cases in sensitive areas including health, legal, finance, elections, and minors.</li>
              <li><strong>Safety actions:</strong> Vircle may rate‑limit, block, remove, annotate, or demote content; suspend accounts for violations; and update safeguards without notice to protect users and the platform.</li>
            </ul>
          </Section>

          <Section title="User responsibilities">
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Independent verification:</strong> Do not rely on AI outputs as the sole source for important decisions; independently verify critical information.</li>
              <li><strong>No harmful or unlawful use:</strong> Do not request or generate illegal, harmful, or abusive content, including harassment, hate, doxxing, CSAM, self‑harm promotion, extremism, malware, phishing, or impersonation intended to mislead.</li>
              <li><strong>Impersonation and synthetic media:</strong> Impersonations must be clearly disclosed as parody/satire and must not cause confusion or harm; synthetic media that could mislead is restricted and may require labeling.</li>
              <li><strong>No scraping or model extraction:</strong> Do not scrape, bulk export, reverse engineer, attempt model extraction, or use outputs to train models or build competing services.</li>
            </ul>
          </Section>

          <Section title="Data handling and model training">
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Prompts/outputs and training:</strong> Prompts and outputs are excluded from model training for all users. Limited processing may occur for safety, abuse detection, debugging, reliability, analytics, and to operate features as described in the Privacy Policy.</li>
              <li><strong>Retention:</strong> After 1 year of account inactivity, only account identifiers and purchase records needed for tax/compliance may be retained, subject to lawful retention and backup exceptions.</li>
            </ul>
          </Section>

          <Section title="Accuracy, limitations, and risks">
            <ul className="list-disc list-inside space-y-3">
              <li><strong>No guarantee of results:</strong> Vircle does not guarantee accuracy, completeness, timeliness, availability, or that outputs will achieve any particular outcome.</li>
              <li><strong>Potential for offensive content:</strong> AI systems can generate unexpected or offensive content; discontinue use and report harmful content via in‑app channels.</li>
              <li><strong>Evolving technology:</strong> AI behavior may change as systems are updated; safeguards and outputs may vary over time and across users, devices, and locales.</li>
            </ul>
          </Section>

          <Section title="Third‑party models and services">
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Providers and flow‑downs:</strong> The Service may use third‑party model providers and infrastructure. Additional provider acceptable‑use and safety policies may apply and are flowed down to users.</li>
              <li><strong>No endorsement:</strong> Vircle is not responsible for third‑party content and does not endorse external materials referenced by the Service.</li>
            </ul>
          </Section>

          <Section title="Licensing and intellectual property">
            <ul className="list-disc list-inside space-y-3">
              <li><strong>User content:</strong> Users retain ownership of their inputs and personas, granting Vircle a license to host, process, adapt, and display content to operate and improve the Service, including safety and product improvements.</li>
              <li><strong>Output use:</strong> Subject to law and third‑party rights, outputs are licensed for personal, non‑commercial use unless otherwise stated in the app; users must not use outputs for training models, benchmarking, or building competing services.</li>
            </ul>
          </Section>

          <Section title="Reporting and enforcement">
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Reporting:</strong> Harmful or policy‑violating content can be reported via the in‑app contact/reporting channel or by emailing <a href="mailto:info@vircle.ai" className="text-blue-400 hover:underline">info@vircle.ai</a>.</li>
              <li><strong>Enforcement:</strong> Vircle may remove content, restrict features, warn, suspend, or terminate accounts to protect users and comply with law and policies. Repeat infringers may be terminated.</li>
            </ul>
          </Section>

          <Section title="No waiver of legal terms">
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Relationship to other policies:</strong> This AI Use Disclaimer supplements and does not replace the Terms of Service and Privacy Policy. In the event of conflict, the Terms of Service control for contractual obligations and the Privacy Policy controls for data‑processing disclosures.</li>
            </ul>
          </Section>

          <Section title="Changes to this disclaimer">
            <p>
              <strong>Notice:</strong> Material updates will be communicated with at least 15 days’ notice via in‑app notice and/or website posting (and email where available). Continued use after the effective date indicates acceptance; discontinuation before that date is an available option.
            </p>
          </Section>

          <Section title="Governing language">
            <p>
              English governs in case of any translation discrepancies.
            </p>
          </Section>
        </div>

        <footer className="text-center text-gray-400 text-sm border-t border-gray-700 mt-12 pt-6">
          © {new Date().getFullYear()} Itworked Systems. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AiUseDisclaimer;
