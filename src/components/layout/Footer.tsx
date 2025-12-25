export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lake-900 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-paper-400 text-sm">
            {currentYear} DIY Lake USV Mapping Project
          </p>
          <a
            href="https://github.com/lniemi/DIY-Lake-USV-NMEA-Mapping"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lake-400 hover:text-lake-300 transition-colors text-sm"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
