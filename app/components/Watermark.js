'use client';

import { useEffect, useState } from 'react';

export default function Watermark() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="watermark-grid-overlay" aria-hidden="true" />
  );
}
