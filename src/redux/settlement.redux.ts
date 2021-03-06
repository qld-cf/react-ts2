import update from 'immutability-helper';
import { Dispatch } from 'redux';
import { ISettlementList } from '@typings/settlementTypes';
import mockData from '@api/mock'

// types
const SET_SETTLEMENT_LIST = 'SET_SETTLEMENT_LIST';

// interface
interface IInitState {
  settlementList: ISettlementList;
}

// state
const initState: IInitState = {
  settlementList: {
    total: 0,
    list: [],
    loading: true
  }
};

// actions
function setSettlementList (data: ISettlementList) {
  return {
    type: SET_SETTLEMENT_LIST,
    payload: data
  }
}
// 获取settlement列表信息
export function getSettlementList (p) {
  return async (dispatch: Dispatch) => {
    const result: any = mockData
    console.log('result', result)
    if (!result) {
      console.error('getSettlementListERROR', result)
      return
    }
    dispatch(setSettlementList({
      total: result.total,
      list: result.list,
      loading: false
    }))
  }
}

// 解耦控制loading
export function setSettlementLoading (p: boolean) {
  return async (dispatch: Dispatch, getState: any) => {
    dispatch(setSettlementList({
      ...getState().settlementList,
      loading: p
    }))
  }
}

// reducer
export default function settlement (state = initState, action: { type: string; payload: any }) {
  switch (action.type) {
    case SET_SETTLEMENT_LIST:
      return update(state, {
        settlementList: {
          $set: action.payload
        }
      });
    default:
      return state;
  }
}
