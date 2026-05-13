interface Product {
  id: number;
  name: string;
  category: 'electronics' | 'clothing' | 'food'; // literal union type  
  inStock: boolean;
  price: number;
  description?: string; // optional property
}

const products: Product[] = [
  { id: 1, name: 'Laptop', category: 'electronics', inStock: true, price: 999.99 },
  { id: 2, name: 'T-Shirt', category: 'clothing', inStock: false, price: 19.99 },
  { id: 3, name: 'Chocolate Bar', category: 'food', inStock: true, price: 2.49, description: 'Delicious dark chocolate' }
];

function getByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category);
}

function getAvailableProducts(): Product[] {
    return products.filter(p => p.inStock);
    }
function getTotalValue(): number {
    return products.reduce((total, p) => total + p.price, 0);
    }

console.log(getByCategory('electronics'));
console.log(getByCategory('food'));
console.log(getAvailableProducts());
console.log(getTotalValue());