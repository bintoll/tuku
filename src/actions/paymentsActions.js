import Axios from 'axios';
import config from '../config';
import {
  SETTLEMENTS_REQUEST,
  SETTLEMENTS_SUCCESS,
  SETTLEMENTS_FAIL,
  NOTIFICATION_SHOW,
} from '../constants';

import Api from '../services/api';
import store from '../store';
import i18n from '../utils/i18n';
import { getTheVeryBaseUrl } from '../utils/url';
import base64 from 'base-64';

export function settlements(data) {
  const state = store.getState();
  return (dispatch) => {
    dispatch({ type: SETTLEMENTS_REQUEST });
    const theVeryBaseUrl = getTheVeryBaseUrl(config.baseUrl)
    return Axios.post(`${theVeryBaseUrl}/payment/`, `order_id=${data.order_id}`, {
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Cache-Control": 'no-cache',
        "Storefront-Api-Access-Key": config.apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${base64.encode(
          state.auth.token,
        )}:`
      },
    })
      .then((response) => {
        console.log('response.data', response.data.data)
        dispatch({
          type: SETTLEMENTS_SUCCESS,
          payload: response.data,
        });

        return response
      })
      .catch((error) => {
        dispatch({
          type: NOTIFICATION_SHOW,
          payload: {
            type: 'error',
            title: i18n.t('Error'),
            text: i18n.t('Something went wrong. Please try again later.'),
          },
        });
        dispatch({
          type: SETTLEMENTS_FAIL,
          error,
        });
        throw error
      })
  };
}
