// action type บอกว่า Redux ตัวนี้ สามารถทำอะไรได้บ้าง
export const actionTypes = {
  RESET: "[RESET] Action",
  SELECT_PRODUCTGROUP: "[SELECT_PRODUCTGROUP] Action",
  SELECT_PRODUCT: '[SELECT_PRODUCT] Action',
  UPDATE_CART:'[UPDATE_CART] Action'
};

// state ค่าที่ถูกเก็บไว้
const initialState = {
  selectedProductGroupId: 0,
  selectedProductId: 0,
  cartItems: [
    //  {id:1,name:'abc',quantity: 1,price:20},
    //  {id:2,name:'def',quantity: 2,price:30},
  ],
};

// reducer แต่ละ Action จะไป update State อย่างไร
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET: {
      return { ...state, selectedProductGroupId:0,selectedProductId: 0, cartItems:[] };
    }

    case actionTypes.SELECT_PRODUCTGROUP: {
      return { ...state, selectedProductGroupId: action.payload };
    }

    case actionTypes.SELECT_PRODUCT: {
      return { ...state, selectedProductId: action.payload };
    }

    case actionTypes.UPDATE_CART: {
      return { ...state, cartItems: action.payload };
    }

    default:
      return state;
  }
};

//action เอาไว้เรียกจากข้างนอก เพื่อเปลี่ยน state
export const actions = {
  reset: () => ({ type: actionTypes.RESET }),
  selectProductGroup: (payload) => ({
    type: actionTypes.SELECT_PRODUCTGROUP,
    payload,
  }),
  selectProduct: (payload) => ({
    type: actionTypes.SELECT_PRODUCT,
    payload,
  }),
  updateCart: (payload) => ({
    type: actionTypes.UPDATE_CART,
    payload,
  }),
  getTotal: () => {
    let total = reducer.cartItems.reduce(function(prev, cur) {
      return prev + cur.price;
    }, 0);
    return total;
  }
};