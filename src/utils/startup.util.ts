export const startup: (
  PROTOCOL: string,
  HOSTNAME: string,
  PORT: number
) => void = (PROTOCOL, HOSTNAME, PORT) => {
  console.log(
    `Server started and listening on ${PROTOCOL}://${HOSTNAME}:${PORT}`
  );
  console.log("To quit press Ctrl+C");
};

// Node's environment
export const { NODE_ENV } = process.env;

// Brypt hashing strength (12-15)
export const saltStrength = 12;

// Keyword for hashing
export const serverKeyword = "AvEmArIa";

// Cookie options related to the type of development in question
export const cookieOptions = {
  httpOnly: true,
  sameSite: NODE_ENV === "development" ? false : true,
  secure: NODE_ENV === "development" ? false : true,
};
