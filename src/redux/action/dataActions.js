import axios from 'axios';
import * as actionTypes from '../constants/dataConstants';

export const getProducts = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`https://reqres.in/api/users?page=1`);

        let page = 2, results = data.data,total_pages=data.total_pages;
        do {
            const {data} = await axios.get(`https://reqres.in/api/users?page=${page++}`);
            results = results.concat(data.data);

        } while(page <= data.total_pages);
        data.data=results;
        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.response });
    }
};



