import React, { useEffect, useState } from 'react';
import a from '../../assets/banner-1.webp';
import b from '../../assets/banner-2.webp';
import c from '../../assets/banner-3.webp';
import { Button } from '@/components/ui/button';
import {
  Airplay,
  BabyIcon,
  CatIcon,
  ChevronLeft,
  ChevronRight,
  CloudLightning,
  HeaterIcon,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts } from '@/store/shop/productSlice';
import ShopingProductTile from '@/components/shoping-view/ShopingProductTile';
import { useNavigate } from 'react-router-dom';

const categoriesWithIcon = [
  { id: 'men', label: 'Men', icon: ShirtIcon },
  { id: 'women', label: 'Women', icon: CloudLightning },
  { id: 'kids', label: 'Kids', icon: BabyIcon },
  { id: 'accessories', label: 'Accessories', icon: WatchIcon },
  { id: 'footwear', label: 'Footwear', icon: UmbrellaIcon },
];

const brand = [
  { id: 'nike', label: 'Nike', icon: ShirtIcon },
  { id: 'adidas', label: 'Adidas', icon: WashingMachine },
  { id: 'puma', label: 'Puma', icon: ShoppingBasket },
  { id: 'levi', label: "Levi's", icon: Airplay },
  { id: 'zara', label: 'Zara', icon: CatIcon },
  { id: 'h&m', label: 'H&M', icon: HeaterIcon },
];

export default function ShopingHome() {
  const slides = [a, b, c];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList } = useSelector((state) => state.shoppingProducts);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timerId);
  }, [slides.length]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ query: {}, sort: 'price-lowtohigh' }));
  }, [dispatch]);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem('filter');
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem('filter', JSON.stringify(currentFilter));
    navigate('/shop/listing');
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Shop by Category Section */}
      <section className="p-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((item) => (
              <Card
                onClick={() => handleNavigateToListingPage(item, 'category')}
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Brand Section */}
      <section className="p-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brand.map((item) => (
              <Card
                onClick={() => handleNavigateToListingPage(item, 'brand')}
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0 ? (
              productList.map((productItem) => (
                <ShopingProductTile product={productItem} key={productItem._id} />
              ))
            ) : (
              <p className="text-center col-span-full">No products found!</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
