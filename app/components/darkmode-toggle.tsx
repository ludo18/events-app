import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import useDarkMode from '@/hook/useDarkMode';

export default function DarkModeToggle() {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <div>
      <span
        className="bg-slate-400 dark:bg-slate-800 rounded-full shadow-lg  flex items-center justify-center w-7 h-7"
        onClick={() => {
          setTheme(colorTheme);
        }}
      >
        {colorTheme === 'dark' ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </span>
    </div>
  );
}
