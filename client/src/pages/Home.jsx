import Category from "../components/Category";
import FlashSale from "../components/FlashSale";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Products from "../components/Products";
import { useCategoryStore } from "../store/useCategoryStore";

const Home = () => {
    const { selectedCategory } = useCategoryStore();
    return (
        <main className='min-h-screen'>
            <HeroSection />
            <FlashSale />
            <Category />
            <Products
                layout='home'
                category={selectedCategory}
            />
            <HowItWorks />
        </main>
    );
};

export default Home;
