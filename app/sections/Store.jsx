import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function Store({ products }) {
  return (
    <section
      id="store"
      className="section-stack section-alt relative pb-32   px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-6 mb-16">
          <h2 className="section-title font-display text-6xl md:text-8xl font-bold text-gradient">
            Store
          </h2>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 border border-subtle lg:px-5 px-3 py-2 text-xs uppercase tracking-[0.35em] hover-text-accent hover-border-accent transition"
          >
            <IoIosArrowRoundForward className="h-5 w-5" />
            View More
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product, i) => (
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
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                  <p className="text-accent font-bold">{product.price}</p>
                </div>
                <button className="btn-cart-inline">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="mt-0.5">Buy</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-end">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-subtle hover-text-accent transition"
          >
            See More
            <IoIosArrowRoundForward className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
