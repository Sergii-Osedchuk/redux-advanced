import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';

let isInitial = true;

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    const sentCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'sending...',
        message: 'sending cart data...'
      }));
      const response = await fetch('https://sergio-3628a-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT', 
        body: JSON.stringify(cart)
      });
      
      if (!response.ok) {
        throw new Error('Sending data to server failed');
      }
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'success',
          message: 'send cart data successfully'
        })
      );
    };

    if(isInitial) {
      isInitial = false;
      return;
    }

    sentCartData().catch(error => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'error',
          message: 'sending data to cart failed'
        })
      )
    })
  }, [cart, dispatch]);

  return (
    <>
      {notification && 
        <Notification 
          status={notification.status} 
          title={notification.title} 
          message={notification.message}  
        />
      }
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
