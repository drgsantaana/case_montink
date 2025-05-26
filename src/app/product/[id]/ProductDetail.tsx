'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { ArrowLeft, ShoppingCart, MapPin } from 'phosphor-react';
import { Product } from '../../../data/products';
import { usePersistedState } from '../../../hooks/usePersistedState';
import Toast from '@/components/Toast';

interface Address {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
}

export default function ProductDetail({ product }: { product: Product }) {
    const TTL = 15 * 60 * 1000;
    const zoomLevel = 4;

    const [imgIdx, setImgIdx] = usePersistedState<number>('imgIdx', 0, TTL);
    const [size, setSize] = usePersistedState<string>('size', product.sizes[0], TTL);
    const [color, setColor] = usePersistedState<string>('color', product.colors[0], TTL);
    const [cep, setCep] = usePersistedState<string>('cep', '', TTL);
    const [addr, setAddr] = usePersistedState<Address | null>('address', null, TTL);
    const [err, setErr] = useState<string>('');
    const [showZoom, setShowZoom] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
    const [dims, setDims] = useState<{ w: number; h: number }>({
        w: 0,
        h: 0,
    });

    const containerRef = useRef<HTMLDivElement>(null);

    function onColorChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const c = e.target.value;
        setColor(c);
        const idx = product.colors.findIndex((col) => col === c);
        if (idx >= 0) setImgIdx(idx);
    }

    function handleMouseEnter() {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setDims({ w: rect.width, h: rect.height });
        setShowZoom(true);
    }
    function handleMouseMove(e: React.MouseEvent) {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setZoomPos({
            x: Math.min(Math.max(0, x / rect.width), 1),
            y: Math.min(Math.max(0, y / rect.height), 1),
        });
    }
    function handleMouseLeave() {
        setShowZoom(false);
    }

    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error' | 'info';
    } | null>(null);

    function handleAddToCart() {
        setToast({ message: 'Funcionalidade nao implementada!', type: 'error' });
    }

    async function checkCep() {
        setErr('');
        const c = cep.replace(/\D/g, '');
        if (c.length !== 8) {
            setToast({ message: 'CEP inválido!', type: 'error' });

            setErr('CEP inválido');
            setAddr(null);
            return;
        }
        try {
            const res = await fetch(`https://viacep.com.br/ws/${c}/json/`);
            const data = await res.json();
            if (data.erro) {
                setToast({ message: 'CEP não encontrado!', type: 'error' });
                setErr('CEP não encontrado');
                setAddr(null);
            } else {
                setToast({ message: 'CEP encontrado!', type: 'success' });
                setAddr({
                    cep: data.cep,
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    localidade: data.localidade,
                    uf: data.uf,
                });
            }
        } catch {
            setToast({ message: 'Erro na consulta!', type: 'error' });

            setErr('Erro na consulta');
            setAddr(null);
        }
    }

    return (
        <main className="max-w-6xl mx-auto p-6">
            <button
                onClick={() => history.back()}
                className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
            >
                <ArrowLeft size={24} /> Voltar
            </button>

            <div className="mt-6 flex flex-col md:flex-row gap-8">
                <div className="md:w-3/4 w-full">
                    <div
                        ref={containerRef}
                        className="relative w-full flex justify-center items-center overflow-hidden rounded"
                        style={{ maxHeight: '600px' }}
                        onMouseEnter={handleMouseEnter}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Image
                            src={product.images[imgIdx]}
                            alt={`${product.name} - ${product.colors[imgIdx]}`}
                            width={800}
                            height={800}
                            className="object-contain cursor-crosshair"
                            priority
                        />

                        {showZoom && (
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    backgroundImage: `url(${product.images[imgIdx]})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: `${dims.w * zoomLevel}px ${dims.h * zoomLevel}px`,
                                    backgroundPosition: `-${zoomPos.x * (dims.w * (zoomLevel - 1))}px -${
                                        zoomPos.y * (dims.h * (zoomLevel - 1))
                                    }px`,
                                }}
                            />
                        )}
                    </div>

                    <div className="flex gap-2 mt-4">
                        {product.images.map((src, i) => (
                            <button
                                key={i}
                                onClick={() => setImgIdx(i)}
                                className={`border-2 rounded overflow-hidden ${
                                    i === imgIdx ? 'border-blue-600' : 'border-transparent'
                                }`}
                            >
                                <div className="relative w-16 h-16">
                                    <Image src={src} alt={product.colors[i]} fill className="object-cover" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="md:w-1/4 w-full flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold">{product.name}</h1>
                        <p className="text-2xl text-gray-900 mt-2">R$ {product.price.toFixed(2)}</p>
                        {product.installments && (
                            <p className="text-sm text-gray-600">
                                ou {product.installments.count}x de R$ {product.installments.value.toFixed(2)} sem juros
                            </p>
                        )}
                        {product.description && <p className="text-gray-700 mt-4">{product.description}</p>}

                        <div className="mt-6 flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">Tamanho</label>
                                <select
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                >
                                    {product.sizes.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Cor */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">Cor</label>
                                <select
                                    value={color}
                                    onChange={onColorChange}
                                    className="w-full border rounded px-3 py-2"
                                >
                                    {product.colors.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium mb-1">
                                <MapPin className="inline-block mr-1" />
                                CEP para frete
                            </label>
                            <div className="flex gap-2">
                                <input
                                    maxLength={8}
                                    value={cep}
                                    onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
                                    placeholder="00000000"
                                    className="flex-1 border rounded px-3 py-2"
                                />
                                <button
                                    onClick={checkCep}
                                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 cursor-pointer"
                                >
                                    <MapPin size={16} weight="fill" />
                                    Verificar
                                </button>
                            </div>
                            {err && <p className="text-red-500 mt-1 text-sm">{err}</p>}
                            {addr && (
                                <div className="mt-3 p-3 bg-gray-100 rounded text-sm">
                                    {addr.logradouro}, {addr.bairro} <br />
                                    {addr.localidade} - {addr.uf} <br />
                                    CEP: {addr.cep}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="cursor-pointer mt-6 w-full bg-green-600 text-white py-3 rounded-lg
                   flex items-center justify-center gap-2 hover:bg-green-700
                   transition"
                    >
                        <ShoppingCart size={20} /> Adicionar ao carrinho
                    </button>
                    {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
                </div>
            </div>
        </main>
    );
}
