import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords }) {
  const baseTitle = 'Jyothu Travels and Tourism | Travel Agency in Hubli';
  const baseDescription =
    'Book travel packages, car rentals, and bus services from Hubli. 500+ happy travelers. Quick quotes, best prices, 24/7 support.';

  // Schema.org structured data for Local Business
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Jyothu Travels and Tourism',
    description: baseDescription,
    telephone: '+919742100545',
    email: 'jyothutravelsandtourism@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '#12, Shetter Layout, Lingarajnagar, Near Global College',
      addressLocality: 'Hubli',
      addressRegion: 'Karnataka',
      postalCode: '580031',
      addressCountry: 'IN'
    },
    areaServed: ['Hubli', 'Karnataka', 'India'],
    priceRange: '₹1000-₹50000',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '523'
    }
  };

  return (
    <Helmet>
      <title>{title ? `${title} | Jyothu Travels and Tourism` : baseTitle}</title>
      <meta name="description" content={description || baseDescription} />
      <meta
        name="keywords"
        content={
          keywords ||
          'travel agency Hubli, travel packages, car rental, bus booking, tours, tourism, Jyothu Travels'
        }
      />
      {/* OpenGraph Meta Tags */}
      <meta property="og:title" content={title ? `${title} | Jyothu Travels and Tourism` : baseTitle} />
      <meta property="og:description" content={description || baseDescription} />
      <meta property="og:type" content="business.business" />
      <meta property="og:site_name" content="Jyothu Travels and Tourism" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} | Jyothu Travels and Tourism` : baseTitle} />
      <meta name="twitter:description" content={description || baseDescription} />
      {/* Mobile Meta */}
      <meta name="theme-color" content="#0066cc" />
      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  );
}

