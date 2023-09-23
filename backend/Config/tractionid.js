exports.generateUniqueTransactionId = async function () {
  // Implement your logic to generate a unique transaction ID
  // You can use a library like uuid to generate a unique ID

  // Example using uuid:
  const { v4: uuidv4 } = require("uuid");
  const transactionId = uuidv4();

  return transactionId;
};

exports.calculateXVerify = async function (
  payload,
  saltKey,
  saltIndex,
  endpoint
) {
  const dataToHash = `${Buffer.from(payload).toString(
    "base64"
  )}${endpoint}${saltKey}`;
  const hash = crypto.createHash("sha256").update(dataToHash).digest("hex");
  const xVerify = `${hash}###${saltIndex}`;
  return xVerify;
};
