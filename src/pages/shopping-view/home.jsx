import { Button } from "@/components/ui/button";
import {
  // Airplay,
  // BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  // FootprintsIcon,
  // ShirtIcon,
  // CloudLightning,
  // Heater,
  // Images,
  // Shirt,
  // ShirtIcon,
  // ShoppingBasket,
  // WashingMachine,
} from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  // fetchProductDetails,
  fetchTopSellingProducts,
} from "@/store/shop/products-slice";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";

import { getFeatureImages } from "@/store/common-slice";
import Footer from "@/components/shopping-view/footer";
import ShoppingListing from "./listing";

// const categoriesWithIcon = [
//   // { id: "Boys", label: "Boys", icon: ShirtIcon },
//   // { id: "Girls", label: "Girls", icon: CloudLightning },
//   { id: "clothing", label: "Clothing", icon: ShirtIcon },
//   { id: "Shoes", label: "Shoes", icon: FootprintsIcon },
// ];

// const brandsWithIcon = [
//   { id: "nike", label: "Nike", icon: Shirt },
//   { id: "adidas", label: "Adidas", icon: WashingMachine },
//   { id: "puma", label: "Puma", icon: ShoppingBasket },
//   { id: "levi", label: "Levi's", icon: Airplay },
//   { id: "zara", label: "Zara", icon: Images },
//   { id: "h&m", label: "H&M", icon: Heater },
// ];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails, topSellingProducts } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // Filter featured products
  const featuredProducts = productList
    ? productList.filter((product) => product.featured)
    : [];

  // Filter top product
  // const topProducts =
  //   topSellingProducts?.map((item) => ({
  //     ...item.product,
  //     totalQuantitySold: item.totalQuantitySold,
  //     totalRevenue: item.totalRevenue,
  //   })) || [];

  // function handleNavigateToListingPage(getCurrentItem, section) {
  //   sessionStorage.removeItem("filters");
  //   const currentFilter = {
  //     [section]: [getCurrentItem.id],
  //   };

  //   sessionStorage.setItem("filters", JSON.stringify(currentFilter));
  //   navigate(`/shop/listing`);
  // }

  // function handleGetProductDetails(getCurrentProductId) {
  //   dispatch(fetchProductDetails(getCurrentProductId));
  // }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
    dispatch(
      fetchTopSellingProducts({
        filterParams: {},
        sortParams: "quantity-hightolow",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(
    featuredProducts,
    topSellingProducts,
    productList,
    productDetails
  );
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[300px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <ShoppingListing />
      </section>

      <Footer />
    </div>
  );
}

export default ShoppingHome;
