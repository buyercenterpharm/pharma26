import { useState } from 'react';
import type { Brand } from '../data/brands';

/** A neutral typographic name is intentional; it never imitates an unavailable trademark logo. */
export default function BrandMark({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false);
  const logo = brand.logo;
  if (!failed && logo?.identityVerified && logo.usageApproved && logo.src.startsWith('/')) {
    return <img className="brand-mark-image" src={logo.src} alt={brand.name} width={logo.width} height={logo.height} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
  }
  return <span className="brand-mark-name">{brand.name}</span>;
}
