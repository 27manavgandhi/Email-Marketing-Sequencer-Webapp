import axios from "axios";

const BASE_URL = !import.meta.env.PROD ? "http://localhost:3000/api/emailsequence" : "/api/emailsequence";

export const getAllEmailSequence = async () => {
    try {
        const { data } = await axios.get(BASE_URL, {
            headers: {
                Authorization: localStorage.getItem("futureBlinkToken")
            }
        });
        return data.emailSequences;
    } catch (error) {
        throw error.response.data.msg;
    }
}



export const createEmailSequence = async (sequenceData) => {
    try {
        const { data } = await axios.post(BASE_URL, sequenceData, {
            headers: {
                Authorization: localStorage.getItem("futureBlinkToken")
            }
        });
        return data.emailSequence;
    } catch (error) {
        throw error.response.data.msg;
    }
}


export const updateEmailSequence = async (sequenceData, sequenceId) => {
    try {
        const { data } = await axios.put(BASE_URL + "/" + sequenceId, sequenceData, {
            headers: {
                Authorization: localStorage.getItem("futureBlinkToken")
            }
        });
        return data.emailSequence;
    } catch (error) {
        throw error.response.data.msg;
    }
}


export const getSingleEmailSequence = async (sequenceId) => {
    try {
        const { data } = await axios.get(BASE_URL + "/" + sequenceId, {
            headers: {
                Authorization: localStorage.getItem("futureBlinkToken")
            }
        });
        return data.emailSequence;
    } catch (error) {
        throw error.response.data.msg;
    }
}


export const deleteEmailSequence = async (sequenceId) => {
    try {
        const { data } = await axios.delete(BASE_URL + "/" + sequenceId, {
            headers: {
                Authorization: localStorage.getItem("futureBlinkToken")

            }
        });
        return data;
    } catch (error) {
        throw error.response.data.msg;
    }
}