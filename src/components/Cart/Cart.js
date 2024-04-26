import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

import { useSelector } from 'react-redux';

const Cart = (props) => {
  const cartList = useSelector(state => state.cart.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartList.map(cartItem => (<li key={cartItem.id}>
          <CartItem
            item={{
              id: cartItem.id,
              title: cartItem.name, 
              quantity: cartItem.quantity, 
              total: cartItem.totalPrice, 
              price: cartItem.price, 
              
            }}
          />
        </li> ))}
        
      </ul>
    </Card>
  );
};

export default Cart;
