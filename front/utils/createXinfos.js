import { v4 as uuid } from "uuid";
import {kll} from "../main";

const LS_USERID_KEY = "rc__userId";

export function getUserId() {  

    const existId = localStorage.getItem(LS_USERID_KEY);
    if(existId) return existId;
    const newId = uuid();
    localStorage.setItem(LS_USERID_KEY, newId);
    return newId;
}

export function createHeaderXInfo(){
    const {params} = kll.parseRoute()
    const res = {
        ['X-USER-ID']: getUserId(),
    }
    if(params.editor ) res['X-editor-ID'] = params.broadcast
    if(params.viewer ) res['X-viewer-ID'] = params.broadcast

    return {
        headers: res
    };
}