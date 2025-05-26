import { products, type Product } from '../../../data/products';
import ProductDetail from './ProductDetail';

type Props = {
    params: Promise<{
        id: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params }: Props) {
    const { id } = await params;
    const prod = products.find((p) => p.id === id);

    if (!prod) {
        return (
            <main className="max-w-md mx-auto p-6">
                <h1 className="text-2xl font-bold">Produto não encontrado</h1>
            </main>
        );
    }

    return <ProductDetail product={prod} />;
}

export type ProductDetailProps = {
    product: Product;
};
