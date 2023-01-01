import { ActionType } from './type'; 

 const { SAVE_INFO } = ActionType


const initialState = {
  info: {},
};
    
const reducer = (state = initialState, action) => {

  switch (action.type) {
    
    case SAVE_INFO:return{
        ...state,
        info:action.payLoad
    };
    default: return state;
  }
};

export default reducer;