import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  imageUrl: string;
  name: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, imageUrl, name, price }) => {
  return (
    <Link href={`/products/${id}`} className="block">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer">
        <div className="relative w-full">
          <Image
            src={imageUrl}
            alt={name}
            layout="responsive"
            width={1}
            height={1}
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-1 text-left">{name}</h3>
          <p className="text-gray-300 text-left">{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 