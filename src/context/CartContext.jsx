import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const localData = localStorage.getItem('hms_cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('hms_cart', JSON.stringify(items));
  }, [items]);

  const getProductPrice = (product) => {
    return Number(product?.product_price || product?.price || 0);
  };

  const getProductName = (product) => {
    return product?.product_name || product?.name || 'Unknown Product';
  };

  const getProductImage = (product) => {
    return product?.product_mainimage_url || product?.image || product?.product_image || '';
  };

  const getProductSlug = (product) => {
    return product?.slug || '';
  };

  const getProductCode = (product) => {
    return product?.product_code || product?.code || '';
  };

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) {
      throw new Error('Produk tidak valid');
    }

    let actionType = 'added';
    let updatedItem = null;

    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        actionType = 'updated';
        updatedItem = { 
          ...existingItem, 
          quantity: existingItem.quantity + quantity 
        };
        return prevItems.map(item =>
          item.id === product.id ? updatedItem : item
        );
      } else {
        actionType = 'added';
        updatedItem = { 
          id: product.id,
          product_name: getProductName(product),
          price: getProductPrice(product),
          product_price: getProductPrice(product),
          product_mainimage_url: getProductImage(product),
          slug: getProductSlug(product),
          product_code: getProductCode(product),
          show_price: product.show_price,
          quantity: quantity,
          original_product: product
        };
        return [...prevItems, updatedItem];
      }
    });

    return { actionType, item: updatedItem };
  };

  const addItem = (product, quantity = 1) => {
    return addToCart(product, quantity);
  };

  const removeFromCart = (productId) => {
    let removedItem = null;
    
    setItems(prevItems => {
      removedItem = prevItems.find(item => item.id === productId);
      return prevItems.filter(item => item.id !== productId);
    });

    return removedItem;
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const itemPrice = Number(item.product_price || item.price || 0);
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const getItemSubtotal = (item) => {
    const itemPrice = Number(item.product_price || item.price || 0);
    return itemPrice * item.quantity;
  };

  const getItem = (productId) => {
    return items.find(item => item.id === productId);
  };

  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };

  const debugCart = () => {
    console.log('=== CART DEBUG ===');
    console.log('Total items:', getTotalItems());
    console.log('Total price:', getTotalPrice());
    console.log('Cart items:', items);
    items.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, {
        id: item.id,
        name: item.product_name,
        price: item.price,
        show_price: item.show_price,
        quantity: item.quantity,
        subtotal: getItemSubtotal(item)
      });
    });
    console.log('==================');
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      addItem,
      removeFromCart, 
      updateQuantity, 
      clearCart,
      getTotalItems,
      getTotalPrice,
      getItemSubtotal,
      getItem,
      isInCart,
      debugCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};