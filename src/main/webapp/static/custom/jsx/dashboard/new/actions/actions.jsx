export const changeStatus = (status) => {
    console.log("State changed to : ", status);
    return {
        type: 'STATE_CHANGED',
        payload: status
    }
};