import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  jsonLd?: Record<string, any>;
  noindex?: boolean;
}

const BASE_URL = "https://pinetoolshub.com";

export function SEOHead({
  title,
  description,
  canonical,
  keywords,
  ogImage = `${BASE_URL}/og-image.png`,
  ogType = "website",
  twitterCard = "summary_large_image",
  jsonLd,
  noindex = false,
}: SEOHeadProps) {
  const fullTitle = title.includes("PineToolsHub") ? title : `${title} | PineToolsHub`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content="PineToolsHub" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@PineToolsHub" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}

// Reusable JSON-LD generators
export function webPageSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `https://pinetoolshub.com${url}`,
    publisher: organizationSchema(),
  };
}

export function articleSchema(title: string, description: string, url: string, datePublished: string, dateModified?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `https://pinetoolshub.com${url}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": "Organization", name: "PineToolsHub" },
    publisher: organizationSchema(),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function softwareSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PineToolsHub",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Free AI-powered productivity OS with PDF tools, image processing, content creation, and workflow automation.",
    url: "https://pinetoolshub.com",
  };
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    name: "PineToolsHub",
    url: "https://pinetoolshub.com",
    logo: "https://pinetoolshub.com/logo.png",
    sameAs: [
      "https://twitter.com/PineToolsHub",
      "https://linkedin.com/company/pinetoolshub",
    ],
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://pinetoolshub.com${item.url}`,
    })),
  };
}
