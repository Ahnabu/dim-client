import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { useToast } from "@/components/ui/use-toast";

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();

  // Sample products (image, pieces, price only)
  const sampleProducts = [
    {
      id: 1,
      image: "sample1.jpg",
      pieces: 10,
      price: 9.99,
      name: "Sample Product 1",
    },
    {
      id: 2,
      image: "sample2.jpg",
      pieces: 5,
      price: 19.99,
      name: "Sample Product 2",
    },
    {
      id: 3,
      image: "sample3.jpg",
      pieces: 2,
      price: 29.99,
      name: "Sample Product 3",
    },
  ];

  function handleAddtoCart(product) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: product.id,
        quantity: 1,
        price: product.price,
        image: product.image,
        name: product.name,
        pieces: product.pieces,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleGetProductDetails(productId) {
    dispatch(fetchProductDetails({ productId }));
    setOpenDetailsDialog(true);
  }

  useEffect(() => {
    dispatch(fetchCartItems({ userId: user?.id }));
  }, [dispatch, user?.id]);

  return (
    <div className="p-4 md:p-6 grid gap-6">
      {/* Sample products display */}
      <h2 className="text-lg mx-auto text-center font-extrabold">
        Sample Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sampleProducts.map((sample) => (
          <Card
            key={sample.id}
            className="group w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg bg-white/95"
          >
            <div
              onClick={() => handleGetProductDetails(sample.id)}
              className="cursor-pointer relative overflow-hidden"
            >
              <img
                src={sample.image}
                alt={`Sample ${sample.id}`}
                className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-neutral-600 mb-2">
                Pieces: {sample.pieces}
              </p>
              <p className="text-base font-semibold text-gray-800">
                Price: ${sample.price}
              </p>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                className="w-full"
                onClick={() => handleAddtoCart(sample)}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Display products fetched from the store (existing functionality) */}
      {productList && productList.length > 0 && (
        <div className="bg-background w-full rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-extrabold mb-4">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {productList.map((productItem) => (
              <Card
                key={productItem.id}
                className="group w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg bg-white/95"
              >
                <div
                  onClick={() => handleGetProductDetails(productItem.id)}
                  className="cursor-pointer relative overflow-hidden"
                >
                  <img
                    src={productItem.image}
                    alt={`Product ${productItem.id}`}
                    className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 text-center ">
                  <p className=" text-neutral-600 mb-2 text-center">
                    Pieces: {productItem.pieces}
                  </p>
                  <p className="text-base font-semibold text-gray-800">
                    Price: ${productItem.price}
                  </p>
                </CardContent>
                <CardFooter className="p-4">
                  <Button
                    className="w-full"
                    onClick={() => handleAddtoCart(productItem)}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingListing;
