/**
 * Composable for handling API errors consistently
 */
export const useErrorHandler = () => {
    const getErrorMessage = (error: any): string => {
        if (typeof error === 'string') return error;

        // Handle Nuxt/fetch errors
        if (error?.data?.message) return error.data.message;
        if (error?.message) return error.message;

        // Handle HTTP status codes
        if (error?.status) {
            switch (error.status) {
                case 401:
                    return "Authentication failed. Please log in again.";
                case 403:
                    return "Access denied. Check your permissions.";
                case 404:
                    return "Resource not found.";
                case 429:
                    return "Too many requests. Please try again later.";
                case 500:
                    return "Server error. Please try again later.";
                default:
                    return `Request failed with status ${error.status}`;
            }
        }

        return "An unexpected error occurred";
    };

    const isUnauthorizedError = (error: any): boolean => {
        return error?.status === 401;
    };

    const shouldRetry = (error: any): boolean => {
        // Retry on network errors or 5xx server errors
        return !error?.status || (error.status >= 500 && error.status < 600);
    };

    return {
        getErrorMessage,
        isUnauthorizedError,
        shouldRetry,
    };
};
