export interface Product {
    id: string;
    name: string;
    price: number;
    sizes: string[];
    colors: string[];
    images: string[];
    installments?: {
        count: number;
        value: number;
    };
    description?: string;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'T-shirt Prime',
        price: 58.54,
        sizes: ['P', 'M', 'G', 'GG', 'XG'],
        colors: ['Preta', 'Azul marinho', 'Vermelho', 'Laranja', 'Verde'],
        images: [
            'https://montink.s3.amazonaws.com/produto_imagens/243795/phprG2vXn.png', // Preta
            'https://montink.s3.amazonaws.com/produto_imagens/243795/phpGu9Edk.png', // Azul marinho
            'https://montink.s3.amazonaws.com/produto_imagens/243795/phpNN6Lf2.png', // Vermelho
            'https://montink.s3.amazonaws.com/produto_imagens/243795/phpwxsRTV.png', // Laranja
            'https://montink.s3.amazonaws.com/produto_imagens/243795/phpaqHK0c.png', // Verde
        ],
        installments: { count: 3, value: 19.51 },
        description: 'Camiseta de alta qualidade, corte reto e tecido respirável.',
    },
    {
        id: '2',
        name: 'Copo Térmico',
        price: 73.4,
        sizes: ['473ML'],
        colors: ['Preto', 'Branco'],
        images: [
            'https://montink.s3.amazonaws.com/mockups/243795/Preto_3797261.png',
            'https://montink.s3.amazonaws.com/produto_imagens/243795/phpsJ9qC5.png',
        ],
        installments: { count: 3, value: 24.47 },
        description: 'Copo térmico inox com vedação hermética e ótimo acabamento.',
    },
    {
        id: '3',
        name: 'Moletom Blusão Prime',
        price: 122.9,
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['Azul Marinho', 'Off White'],
        images: [
            'https://montink.s3.amazonaws.com/mockups/243795/Azul-Marinho_4116366.png',
            'https://montink.s3.amazonaws.com/mockups/243795/Off-White_4116366.png',
        ],
        installments: { count: 3, value: 40.97 },
        description: 'Moletom felpado por dentro, super quentinho.',
    },
];
