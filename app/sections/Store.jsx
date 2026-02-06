import React from "react";
import Image from "next/image";

export default function Store({ products }) {
  return (
    <section
      id="store"
      className="section-stack section-alt relative pb-32 lg:pt-32  px-6"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-20 text-gradient">
          Store
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <div key={i} className="store-item card-hover cursor-pointer">
              <div className="relative aspect-square rounded-lg mb-4 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-accent font-bold">{product.price}</p>
              <button className="w-full mt-4 py-3 border border-subtle hover-bg-accent hover-text-accent-contrast hover-border-accent transition-all tracking-wider">
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
