const fileType = require("file-type");
const { Buffer } = require("buffer");

exports.validateFile = async (base64String, allowedTypes = ['image/jpeg', 'image/png']) => {
  try {
    const buffer = Buffer.from(base64String, "base64");
    const type = await fileType.fromBuffer(buffer);

    // If no file type is detected or file type is not in allowed types list
    if (!type || !allowedTypes.includes(type.mime)) {
      return { file_valid: false };
    }

    return {
      file_valid: true,
      file_mime_type: type.mime,
      file_size_kb: (buffer.length / 1024).toFixed(2),
    };
  } catch (err) {
    return { file_valid: false };
  }
};
