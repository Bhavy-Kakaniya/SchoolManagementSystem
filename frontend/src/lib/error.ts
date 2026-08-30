// any will allow anything and not check datatype, unknown will verify what is it and will block custom errors
export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return "Something went wrong";
};