import { ToolLandingPage } from "@/components/ToolLandingPage";
import { Lock } from "lucide-react";

export default function ProtectPdfLanding() {
  return (
    <ToolLandingPage
      toolId="protect"
      title="Protect PDF"
      seoTitle="Password Protect PDF Online Free — Lock PDF With Password Security (2026)"
      seoDescription="Password protect PDF files online for free. Add encryption and password security to your PDF documents. Prevent unauthorized access to sensitive files. No signup, no watermarks. 100% browser-based — your files never leave your device."
      canonical="/protect-pdf"
      keywords="password protect pdf online free, lock pdf with password, encrypt pdf, pdf security, protect pdf from editing free 2026"
      icon={Lock}
      iconGradient="from-red-500 to-rose-600"
      heroTitle="Password Protect PDF — Free & Secure"
      heroSubtitle="Lock your PDF documents with password encryption. Prevent unauthorized access to sensitive files."
      features={[
        { title: "Password Encryption", description: "Add a password that must be entered to open and view the PDF." },
        { title: "100% Browser-Based", description: "Encryption happens locally. Your password and files never touch any server." },
        { title: "Instant Processing", description: "Your protected PDF is ready to download in seconds." },
        { title: "Strong Security", description: "Industry-standard PDF encryption protects your documents." },
        { title: "Works Everywhere", description: "Protected PDFs can be opened in any PDF reader with the correct password." },
        { title: "Free & Unlimited", description: "No signup, no limits — protect as many PDFs as you need." },
      ]}
      howToSteps={[
        { step: "Upload Your PDF", description: "Select the PDF document you want to protect." },
        { step: "Set a Password", description: "Enter a strong password for your PDF." },
        { step: "Protect & Download", description: "Click Process to encrypt your PDF and download the protected file." },
      ]}
      faqs={[
        { question: "How to password protect a PDF for free?", answer: "Upload your PDF to PineToolsHub, enter your desired password, and click Process. Your encrypted PDF downloads instantly — free and private." },
        { question: "Is the encryption secure?", answer: "Yes. PineToolsHub uses standard PDF encryption. The password and file processing happen entirely in your browser for maximum security." },
        { question: "Can I unlock a protected PDF later?", answer: "Yes, use PineToolsHub's Unlock PDF tool or enter the password in any PDF reader." },
      ]}
      relatedTools={[
        { name: "Unlock PDF", url: "/unlock-pdf", description: "Remove restrictions" },
        { name: "Watermark PDF", url: "/add-watermark-pdf", description: "Add watermarks" },
        { name: "Merge PDF", url: "/merge-pdf", description: "Combine PDFs" },
        { name: "Compress PDF", url: "/compress-pdf", description: "Reduce size" },
      ]}
      longDescription={`Protecting PDF documents with passwords is crucial when sharing sensitive information like financial reports, legal contracts, medical records, or confidential business proposals.

PineToolsHub's free PDF protection tool adds password encryption to your documents entirely in your browser. Your password is never transmitted to any server, making this the most secure way to protect PDFs online.`}
      toolLink="/pdf-tools"
    />
  );
}
