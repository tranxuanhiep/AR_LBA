import {
    FETCH_NOTIFICATION,
    FETCH_NOTIFICATION_SUCCESS,
    FETCH_NOTIFICATION_FAILED
} from "../actions/actionsType/actionTypeNotification";
import { put, takeLatest } from "redux-saga/effects";
import { ApiNotification } from "../../api/functionsApi/getNotification";

function* fetchNotification(action) {
    console.log(action.username);
    console.log(action.radius);
    console.log(action.lat);
    console.log(action.lng);
    try {
        const Notification = yield ApiNotification.getNotification(
            action.username,
            action.radius,
            action.lat,
            action.lng
        );
        yield put({ type: FETCH_NOTIFICATION_SUCCESS, Notification });
    } catch (error) {
        yield put({ type: FETCH_NOTIFICATION_FAILED, error });
    }
}
export function* watchFetchNotification() {
    yield takeLatest(FETCH_NOTIFICATION, fetchNotification);
}

