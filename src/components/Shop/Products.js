import ProductItem from './ProductItem';
import classes from './Products.module.css';

const data = [{
    id: 'p1',
    price: 11,
    title: 'Toilet paper',
    description: 'The softest paper you ever feel'
  },
  {
    id: 'p2',
    price: 8,
    title: 'Soap',
    description: 'No need desription'
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {data.map(product => 
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        )}
      </ul>
    </section>
  );
};

export default Products;
