import { Helmet } from "react-helmet-async";
import { SITE_URL, SITE_IMAGE } from "../utils/seoConfig";

export default function SEO({
  title,
  description,
  keywords,
  ogType = "website",
  ogImage = SITE_IMAGE,
  canonical,
  children,
  schema,
}) {
  const fullTitle = title.includes("ADFincas") ? title : `${title} | ADFincas`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Spanish" />

      {/* Open Graph Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical || SITE_URL} />
      <meta property="og:site_name" content="ADFincas" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}

      {children}
    </Helmet>
  );
}
