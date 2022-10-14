import Image from 'next/image';
import React from 'react';

export default function Background({ children }) {
  return (
    <div>
      {/** main container */}
      <div className="h-full w-full">{children}</div>

      <div className="bgWrap">
        {/** other fixed elements (menus, strips, banners) */}
        <div className="bgVariant">
          {/* Environment name strip */}
          {process.env.NEXT_PUBLIC_ENV_NAME !== 'prod' && (
            <div className="bg-orange-500  mx-auto h-auto p-0.5 w-full flex justify-center text-orange-700 text-xs">
              ENV: {process.env.NEXT_PUBLIC_ENV_NAME}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
