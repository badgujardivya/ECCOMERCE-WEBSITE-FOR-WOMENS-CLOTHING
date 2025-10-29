import { Button } from "@/components/ui/button";
import {
  Airplay, BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Heater,
  Images, Shirt, ShirtIcon, ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

const categoriesWithIcon = [
  { id: "Casual", label: "Casual", icon: ShirtIcon },
  { id: "Western", label: "Western", icon: CloudLightning },
  { id: "Traditional", label: "Traditional", icon: BabyIcon },
  { id: "Accessories", label: "Accessories", icon: WatchIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

// 👇 video paths
const bannerVideos = [
  "/src/assets/yt_vdo3.mp4",
  "/src/assets/yt_vdo2.mp4",
  "/src/assets/yt_vdo1.mp4",
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product is added to cart" });
      }
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerVideos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({
      filterParams: {},
      sortParams: "price-lowtohigh",
    }));
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🎥 Video Banner Carousel */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {bannerVideos.map((video, index) => (
          <video
            key={index}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + bannerVideos.length) % bannerVideos.length
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
            setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerVideos.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/*  Categories Section */}
      <section className="py-12 bg-black-50">
        <div className="container mx-auto px-4 bg-[#FFFFFF]">
          <h2 className="text-3xl font-bold text-center mb-8 text-black"> 🔖Shop by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-[#FFFFFF]">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                className="h-32 flex items-center justify-center text-lg font-bold cursor-pointer transition-colors duration-300 bg-[#AEC6CF] hover:bg-[#D0F0C0]"
                key={categoryItem.id}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 🏷️ Brands Section */}
      <section className="py-12 bg-black-50">
        <div className="container mx-auto px-4 bg-[#FFFFFF]">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">🏷️Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 bg-[#FFFFFF]">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="h-32 flex items-center justify-center text-lg font-bold cursor-pointer transition-colors duration-300 bg-[#AEC6CF] hover:bg-[#D0F0C0]"
                key={brandItem.id}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 🛒 Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">🛒 Feature Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0 &&
              productList.map((productItem) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                  key={productItem.id}
                />
              ))}
          </div>
        </div>
      </section>

      {/* 🔍 Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
