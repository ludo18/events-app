import Image from 'next/image';
import React, { ReactElement } from 'react';

export default function Background({
  children,
  darkModeTailwindcolor,
  lightModeTailwindcolor,
  imagePath,
  showEnvironmentStrip,
}: {
  children: ReactElement | ReactElement[];
  darkModeTailwindcolor: string;
  lightModeTailwindcolor: string;
  imagePath: string;
  showEnvironmentStrip: boolean;
}) {
  return (
    <div>
      <div className="bgWrap blur-sm">
        <Image
          src={imagePath}
          alt="bg"
          layout="fill"
          quality={50}
          objectFit="cover"
          objectPosition="top"
        />
      </div>

      <div
        className={` bgWrap backdrop-blur-sm bg-${lightModeTailwindcolor}/80 dark:bg-${darkModeTailwindcolor}/80`}
      ></div>

      <div className="bgVariant">
        {/* Environment name strip */}
        {showEnvironmentStrip === true &&
          process.env.NEXT_PUBLIC_ENV_NAME !== 'prod' && (
            <div className="bg-orange-500  mx-auto h-auto p-0.5 w-full flex justify-center text-orange-700 text-xs">
              ENV: {process.env.NEXT_PUBLIC_ENV_NAME}
            </div>
          )}
        {/** below, you can add other fixed elements (menus, headers, strips, banners) */}
      </div>
      {children}
    </div>
  );
}
