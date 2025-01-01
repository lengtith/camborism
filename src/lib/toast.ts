import toast from "react-hot-toast";

// Handle popup toast message
export const displayToast = (message: string, type: string) => {
  if (type === "success") {
    return toast.success(message);
  } else {
    return toast.error(message);
  }
};
