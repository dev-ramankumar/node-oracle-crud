export const success = (res, data, message = "OK") => res.status(200).json({ success: true, message, data });
export const error = (res, message = "Error", status = 500) => res.status(status).json({ success: false, message });
