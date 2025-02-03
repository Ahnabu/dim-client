/* eslint-disable react/prop-types */
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Star } from "lucide-react";

const ShoppingProductTile = ({ product, handleGetProductDetails }) => {
  if (!product) return null;

  const variants = product.variants || [];
  const firstVariant = variants[0] || {};
  const firstSize = firstVariant.sizes?.[0] || {};
  const isOutOfStock = product.totalStock === 0;
  const hasLowStock = product.totalStock < 10;

  return (
    <Card className="group w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg bg-white/95">
      <div
        onClick={() => handleGetProductDetails(product._id)}
        className="cursor-pointer"
      >
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold text-neutral-800 group-hover:text-rose-300 transition-colors line-clamp-2">
              {product.name}
            </h2>
            {product.averageReview > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">
                  {product.averageReview.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-3 text-sm text-neutral-600">
            <span>{product.category}</span>
            {product.subcategory && (
              <>
                <span>•</span>
                <span>{product.subcategory}</span>
              </>
            )}
            {product.brand && (
              <>
                <span>•</span>
                <span>{product.brand}</span>
              </>
            )}
          </div>

          <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
            {product.description}
          </p>

          <div className="flex justify-between items-center">
            <div className="flex items-baseline gap-2">
              {firstSize.salePrice ? (
                <>
                  <span className="text-lg font-bold text-rose-300">
                    ৳{firstSize.salePrice}
                  </span>
                  <span className="text-sm text-neutral-400 line-through">
                    ৳{firstSize.price}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-rose-300">
                  ৳{firstSize.price}
                </span>
              )}
            </div>
            <span className="text-sm text-neutral-500">
              Stock: {product.totalStock}
            </span>
          </div>
        </CardContent>
      </div>

      <CardFooter className="p-4 bg-neutral-50">
        <Button
          onClick={() => handleGetProductDetails(product._id)}
          className="w-full bg-rose-200 hover:bg-rose-300 text-neutral-700 flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
