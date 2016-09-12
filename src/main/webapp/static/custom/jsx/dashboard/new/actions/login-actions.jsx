export const changeStatus = (status) => {
    console.log("State changed to : ", status);
    return {
        type: "STATUS_CHANGED",
        payload: status
    }
};