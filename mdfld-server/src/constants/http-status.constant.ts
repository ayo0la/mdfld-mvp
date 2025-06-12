export const HTTP_STATUS = {
  SUCCESS: {
    status: "success",
    statusCode: 200,
  },
  BAD_REQUEST: {
    status: "bad request",
    statusCode: 400,
  },
  UNAUTHORIZED: {
    status: "unauthorized",
    statusCode: 401,
  },
  PAYMENT_REQUIRED: {
    status: "payment required",
    statusCode: 402,
  },
  FORBIDDEN: {
    status: "forbidden",
    statusCode: 403,
  },
  NOT_FOUND: {
    status: "not found",
    statusCode: 404,
  },
  CONFLICT: {
    status: "conflict",
    statusCode: 409,
  },
  VALIDATION_ERROR: {
    status: "validation error",
    statusCode: 422,
  },
  INTERNAL_SERVER_ERROR: {
    status: "internal server error",
    statusCode: 500,
  },
};
