import debounce from 'debounce-promise';

import { 
    SUCCESS_FETCHING_DATA, START_FETCHING_DATA, ERROR_FETCHING_DATA, SET_PAGE, SET_KEYWORD, SET_LIMIT, PREV_PAGE, NEXT_PAGE, //GET DATA
    PREVIEW_IMAGE, ERROR_STORE_DATA, SUCCESS_STORE_DATA, //STORE DATA
    SET_STATUS, SET_INPUT

} from './constants';

import { getData, saveData, detailData, editData } from '../../api/jabatanAPI';

let debouncedFetchData = debounce(getData, 1000);
let debouncedSaveData = debounce(saveData, 1000);
let debouncedUpdateData = debounce(editData, 1000);
let debouncedRowData = debounce(detailData, 1000);

export const fetchData = () => {
    return  async (dispatch, getState) => {
        dispatch(startFetchingData());

        let perPage = getState().jabatans.perPage || '';
        let currentPage = getState().jabatans.currentPage || 1;
        let keyword = getState().jabatans.keyword || '';

        let token = getState().auth.token || '';

        const params = { page_size: perPage, page: currentPage, search: keyword, }
        try{
            let { data: {data, count, message} } = await debouncedFetchData(params, token);
            dispatch(successFetchingData({data, count, message}));
        } catch(err) {
            dispatch(errorFetchingData(err));
        }
    }
}

export const startFetchingData = () => {
    return { type: START_FETCHING_DATA }
}

export const successFetchingData = (payload) => {
    return { type: SUCCESS_FETCHING_DATA, ...payload }
}

export const errorFetchingData = (err) => {
    return { type: ERROR_FETCHING_DATA, error: err }
}

export const setPage = (number = 1) => {
    return { type: SET_PAGE, currentPage: number }
}

export const goToNextPage = () => {
    return { type: NEXT_PAGE }
}

export const goToPrevPage = () => {
    return { type: PREV_PAGE }
}

export const setKeyword = keyword => {
    return { type: SET_KEYWORD, keyword } 
}

export const setLimit = limit => {
    return { type: SET_LIMIT, limit } 
}

export const setInput = (dataForm) => {
    return { type: SET_INPUT, dataForm } 
}

export const storeData = () => {
    return async (dispatch, getState) => {
        try {
            let token = getState().auth.token || '';
            let data = getState().jabatans.input || [];
            let result = await debouncedSaveData(data, token);
            return { type: SUCCESS_STORE_DATA, result }
        } catch (error) {
            return { type: ERROR_STORE_DATA, error }
        }
    }
}

export const updateData = () => {
    return async (dispatch, getState) => {
        try {
            let data = getState().jabatans.input || [];
            let token = getState().auth.token || '';
            let result = await debouncedUpdateData(data, token);
            return { type: SUCCESS_STORE_DATA, result }
        } catch (error) {
            return { type: ERROR_STORE_DATA, error }
        }
    }
}

export const imagePreview = image => {
    return { type: PREVIEW_IMAGE, image } 
}

export const setStatus = (status, message = '') => {
    return { type: SET_STATUS, status, message } 
}

export const getDataRow = (id) => {
    return async (dispatch, getState) => {
        try {
            let token = getState().auth.token || '';
            return await debouncedRowData(id, token);
        } catch (err) {
            return { type: ERROR_FETCHING_DATA, err: err }
        }
    }
}

