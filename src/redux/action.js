import { ActionType } from './type'; 

 const { SAVE_INFO  } = ActionType

export function info(value) {
    return {
      type: SAVE_INFO,
      payLoad: value
    };
  }