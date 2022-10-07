import React from 'react';
import Link from 'next/link';

export default function DropdownLink(props) {
  let { href, children, locale, ...rest } = props;

  return (
    <Link href={href} locale={locale} passHref>
      <a {...rest}>{children}</a>
    </Link>
  );
}
