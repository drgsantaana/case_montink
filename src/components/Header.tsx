'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <>
            <header className="bg-black text-white">
                <div className="max-w-6xl mx-auto flex items-center p-4 gap-6">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image
                                src="https://montink.s3.amazonaws.com/323433373935/912c085e6ac448a05298019a072d5d6d.png"
                                alt="Montink Logo"
                                width={150}
                                height={36}
                                priority
                            />
                        </Link>
                    </div>

                    {/*
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full py-2 pl-3 pr-10 rounded bg-white text-black
                         placeholder-gray-500 focus:outline-none"
            />
            <MagnifyingGlass
              size={20}
              weight="bold"
              className="absolute right-3 top-1/2 transform -translate-y-1/2
                         text-gray-500"
            />
          </div>
          */}
                </div>
            </header>

            <div className="bg-red-600 text-white text-center text-sm py-1">
                Este não é o site oficial, apenas um caso de teste. Para acessar o site da empresa,{' '}
                <Link
                    href="https://montink.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium"
                >
                    clique aqui
                </Link>
                .
            </div>
        </>
    );
}
