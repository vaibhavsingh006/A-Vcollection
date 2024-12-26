import { ToastContainer } from 'react-toastify';
import AllProductContainer from '../components/AllProductContainer';
import { useProductContext } from '../contexts/ProductContext'; // Import useProductContext
import Header from '../components/Header';
import Footer from '../components/Footer';

function AllProductPage() {
    // Get products from the context
    const { products } = useProductContext();
    // console.log("AllProductPage products:");
    // console.log(products);

    // If the products are not yet loaded or the length is zero, show a loading message
    if (!products || products.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <ToastContainer />
            <AllProductContainer products={products} /> {/* Pass products to AllProductContainer */}
            <Footer/>
        </>
    );
}

export default AllProductPage;
