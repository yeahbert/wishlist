import {postData, sendDelete} from '../tools/api'
export const CREATE_WISH = 'CREATE_WISH'
export const CREATE_WISH_SUCCESS = 'CREATE_WISH_SUCCESS'
export const DELETE_WISH = 'DELETE_WISH'
export const DELETE_WISH_SUCCESS = 'DELETE_WISH_SUCCESS'

export const createWish = values => {
  return dispatch =>{
      dispatch(createWishInit())
      postData("wish", values, function(persistedWish) {
        dispatch(persistWishSuccess(persistedWish))
      })
  }
}

export function createWishInit() {
  return {
    type: CREATE_WISH
  }
}

export function persistWishSuccess(wish) {
  return {
    type: CREATE_WISH_SUCCESS,
    wish: wish
  }
}

export const deleteWish = id => {
  return dispatch =>
    {
      dispatch(deleteWishInit(id))
      sendDelete("wish", id, function() {
        dispatch(deleteWishSuccess(id))
      })
  }
}

export function deleteWishInit(id) {
  return {
    type: DELETE_WISH,
    id: id
  }
}

export function deleteWishSuccess(id) {
  return {
    type: DELETE_WISH_SUCCESS,
    id: id
  }
}
