const errorMessages = Object.freeze({
    USER: {
        NOT_FOUND: "User not found",
        ALREADY_EXISTS: "User already exists",
        UNAUTHORIZED: "Unauthorized",
    },
    API: {
        INTERNAL_SERVER_ERROR: "Internal server error",
        BAD_REQUEST: "Bad request",
        OPENAI_API_ERROR: "OpenAI API error",
    },
});

export default errorMessages;
