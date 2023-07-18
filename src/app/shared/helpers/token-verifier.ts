/* EXPORT MODULE | DECODE_TOKEN */
export const DECODE_TOKEN = (token: any) => {
    const tokenPayload = token.split('.')[1]; /* Extract the payload part of the token */
    const decodedPayload = atob(tokenPayload); /* Decode the base64-encoded payload */
    const tokenData = JSON.parse(decodedPayload); /* Parse the JSON data */
    return tokenData;
};
