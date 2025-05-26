'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Warning, Info, X } from 'phosphor-react';

interface ToastProps {
    message: string;
    duration?: number;
    onClose: () => void;
    type?: 'success' | 'error' | 'info';
}

const icons = {
    success: <CheckCircle weight="bold" className="w-5 h-5 text-white" />,
    error: <Warning weight="bold" className="w-5 h-5 text-white" />,
    info: <Info weight="bold" className="w-5 h-5 text-white" />,
};

const colors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
};

export default function Toast({ message, duration = 3000, onClose, type = 'success' }: ToastProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // entra
        const enter = setTimeout(() => setVisible(true), 10);
        // começa a sair antes de remover
        const exit = setTimeout(() => setVisible(false), duration - 300);
        // remove de fato
        const hide = setTimeout(onClose, duration);

        return () => {
            clearTimeout(enter);
            clearTimeout(exit);
            clearTimeout(hide);
        };
    }, [duration, onClose]);

    return (
        <div
            className={`
        fixed bottom-6 right-6 z-50 flex items-start gap-3
        max-w-xs rounded-lg shadow-lg text-white px-4 py-3
        transform transition-all duration-300 ease-in-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${colors[type]}
      `}
        >
            {icons[type]}
            <span className="flex-1">{message}</span>
            <button
                className="ml-2 p-1 hover:opacity-80"
                onClick={() => {
                    setVisible(false);
                    setTimeout(onClose, 300);
                }}
            >
                <X weight="bold" className="w-4 h-4 text-white" />
            </button>
        </div>
    );
}
