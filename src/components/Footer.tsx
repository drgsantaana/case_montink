// src/components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-white text-gray-600 text-sm py-4">
            <div className="max-w-6xl mx-auto text-center">
                © {year} Todos os direitos reservados.{' '}
                <Link
                    href="https://www.linkedin.com/in/drgsantaana/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-gray-800"
                >
                    @drgsantaana
                </Link>
            </div>
        </footer>
    );
}
