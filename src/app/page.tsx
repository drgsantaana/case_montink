'use client'

import Link from 'next/link'
import Image from 'next/image'
import { products } from '../data/products'

export default function CatalogPage() {
  return (
    <main className="max-w-6xl mx-auto p-6 font-figtree">
      <h1 className="text-4xl font-semibold mb-8">Catálogo de Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="block"
          >
            <div className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-80">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-4 bg-white">
                <h2 className="text-lg font-medium text-gray-800">
                  {product.name}
                </h2>
                <p className="text-xl text-gray-900 mt-1">
                  R$ {product.price.toFixed(2)}
                </p>
                {product.installments && (
                  <p className="text-sm text-gray-600 mt-1">
                    ou {product.installments.count}x de R${' '}
                    {product.installments.value.toFixed(2)} sem juros
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
