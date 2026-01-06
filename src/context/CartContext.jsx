// --- Global State Management for the Shopping Cart ---
// This context provides cart state and actions (add, clear, etc.)
// to any component in the application, and persists the cart in localStorage.

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize state from localStorage for persistence
  const [items, setItems] = useState(() => {
    try {
      const localData = localStorage.getItem('hms_cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  // Effect to automatically save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('hms_cart', JSON.stringify(items));
  }, [items]);

  /**
   * Gets product price with proper fallback
   */
  const getProductPrice = (product) => {
    return Number(product?.product_price || product?.price || 0);
  };

  /**
   * Gets product name with proper fallback
   */
  const getProductName = (product) => {
    return product?.product_name || product?.name || 'Unknown Product';
  };

  /**
   * Gets product image with proper fallback
   */
  const getProductImage = (product) => {
    return product?.product_mainimage_url || product?.image || product?.product_image || '';
  };

  /**
   * Gets product slug with proper fallback
   */
  const getProductSlug = (product) => {
    return product?.slug || '';
  };

  /**
   * Gets product code with proper fallback
   */
  const getProductCode = (product) => {
    return product?.product_code || product?.code || '';
  };

  /**
   * Adds a product to the cart or updates its quantity if it already exists.
   * @param {object} product - The product object to add.
   * @param {number} quantity - The quantity to add.
   * @returns {object} - Returns the updated cart item and action type
   */
  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) {
      throw new Error('Produk tidak valid');
    }

    let actionType = 'added'; // 'added' or 'updated'
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
          price: getProductPrice(product), // Untuk kompatibilitas
          product_price: getProductPrice(product), // Property utama untuk harga
          product_mainimage_url: getProductImage(product),
          slug: getProductSlug(product),
          product_code: getProductCode(product),
          quantity: quantity,
          // Include all original product properties for backup
          original_product: product
        };
        return [...prevItems, updatedItem];
      }
    });

    return { actionType, item: updatedItem };
  };

  /**
   * Alternative function for components that use addItem instead of addToCart
   * This maintains backward compatibility
   */
  const addItem = (product, quantity = 1) => {
    return addToCart(product, quantity);
  };

  /**
   * Removes a product from the cart
   * @param {number} productId - The ID of the product to remove
   * @returns {object} - Returns the removed item
   */
  const removeFromCart = (productId) => {
    let removedItem = null;
    
    setItems(prevItems => {
      removedItem = prevItems.find(item => item.id === productId);
      return prevItems.filter(item => item.id !== productId);
    });

    return removedItem;
  };

  /**
   * Updates the quantity of a product in the cart
   * @param {number} productId - The ID of the product to update
   * @param {number} quantity - The new quantity
   */
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

  /**
   * Clears all items from the cart.
   */
  const clearCart = () => {
    setItems([]);
  };

  /**
   * Gets the total number of items in the cart
   */
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  /**
   * Gets the total price of all items in the cart with proper fallback
   */
  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const itemPrice = Number(item.product_price || item.price || 0);
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  /**
   * Gets the subtotal for a specific item
   */
  const getItemSubtotal = (item) => {
    const itemPrice = Number(item.product_price || item.price || 0);
    return itemPrice * item.quantity;
  };

  /**
   * Gets a specific item from the cart
   */
  const getItem = (productId) => {
    return items.find(item => item.id === productId);
  };

  /**
   * Checks if a product is already in the cart
   */
  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };

  /**
   * Debug function to log cart state
   */
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
        product_price: item.product_price,
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
      addItem, // Untuk backward compatibility
      removeFromCart, 
      updateQuantity, 
      clearCart,
      getTotalItems,
      getTotalPrice,
      getItemSubtotal,
      getItem,
      isInCart,
      debugCart // Untuk debugging
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easy access to the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};