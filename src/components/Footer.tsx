export default function Footer() {
  return (
    <footer className="w-full mt-12 border-t border-white/10 bg-brand-primary py-6 text-center text-sm text-brand-secondary">
      <div className="container mx-auto flex flex-col items-center gap-2 md:flex-row md:justify-between md:gap-0 px-4">
        <div>
          <p className="text-brand-primary font-semibold">Back to Bold Career Coach</p>
        </div>
        <div className="text-xs text-brand-muted">
          © 2024 Back to Bold. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 