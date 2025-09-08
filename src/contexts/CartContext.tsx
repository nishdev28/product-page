// src/contexts/CartContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from 'react';
import type { Product } from '../types/Product';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  orderPlaced:boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'INCREMENT_QUANTITY'; payload: number }
  | { type: 'DECREMENT_QUANTITY'; payload: number }
  | { type: 'CLEAR_CART' }
  | { type: 'PLACE_ORDER' }
  | { type: 'RESET_ORDER' };

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  clearCart: () => void;
  placeOrder: () => void;
  getCartCount: () => number;
  resetOrder: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price,
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      };
    }

    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - itemToRemove.price * itemToRemove.quantity,
      };
    }

    case 'INCREMENT_QUANTITY': {
      const item = state.items.find((item) => item.id === action.payload);
      if (!item) return state;

      const updatedItems = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return {
        ...state,
        items: updatedItems,
        total: state.total + item.price,
      };
    }

    case 'DECREMENT_QUANTITY': {
      const item = state.items.find((item) => item.id === action.payload);
      if (!item || item.quantity <= 1) return state;

      const updatedItems = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      return {
        ...state,
        items: updatedItems,
        total: state.total - item.price,
      };
    }

    case 'CLEAR_CART':{
      return {
        items: [],
        total: 0,
        orderPlaced: false,
      };}

    case 'PLACE_ORDER':{
        return {
          ...state,
          orderPlaced: true,
        };
    }
    case 'RESET_ORDER':
  return {
    ...state,
    orderPlaced: false
  };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, orderPlaced: false });

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const incrementQuantity = (productId: number) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: productId });
  };

  const decrementQuantity = (productId: number) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const placeOrder = () => {
    dispatch({ type: 'PLACE_ORDER' });
  };
  
  const getCartCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const resetOrder = () => {
    dispatch({ type: 'RESET_ORDER' });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        placeOrder,
        getCartCount,
        resetOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
