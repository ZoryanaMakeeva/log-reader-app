// logContainer: [],
//     filterText: '',
//     commonOnly: false,
//     browserOnly: false,
//     pickedDateFrom: '',
//     pickedDateTo: '',
//     loading: false
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const SEARCH_TEXT = 'SEARCH_TEXT';

export function uploadFile() {
    return {type: UPLOAD_FILE}
}

export function searchText() {
    return {type: SEARCH_TEXT}
}