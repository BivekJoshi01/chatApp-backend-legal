// store/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PoductPurchaseCartItem {
  pm_id: string;
  productName: string;
  quantity: number;
  unit: string;
  remarks: string;
  price: number;
  totalPrice: number;
}

interface CartState {
  items: PoductPurchaseCartItem[];
}

const initialState: CartState = {
  items: [],
};

const purchaseCartSlice = createSlice({
  name: "purchaseCart",
  initialState,
  reducers: {
    purchaseAddToCart(state, action: PayloadAction<PoductPurchaseCartItem>) {
      state.items.push(action.payload);
    },
    purchaseRemoveFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.pm_id !== id);
    },
  },
});

export const { purchaseAddToCart, purchaseRemoveFromCart } =
  purchaseCartSlice.actions;
export default purchaseCartSlice.reducer;
