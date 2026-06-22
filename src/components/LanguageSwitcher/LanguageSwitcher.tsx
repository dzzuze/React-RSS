'use client';

import { usePathname, useRouter } from 'next/navigation';

const locales = ['en', 'ru'];

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (locale: string) => {
    const newPath = pathname.replace(/^\/(en|ru)/, '') || '/';
    router.push(`/${locale}${newPath}`);
  };

  return (
    <div className="flex gap-2">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
