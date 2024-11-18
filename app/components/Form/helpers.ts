const formatSizeUnits = (bytes: number) => {
  let result = bytes.toString();

  if (bytes >= 1073741824) {
    result = (bytes / 1073741824).toFixed(2) + " GB";
  } else if (bytes >= 1048576) {
    result = (bytes / 1048576).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    result = (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes > 1) {
    result = bytes + " bytes";
  } else if (bytes == 1) {
    result = bytes + " byte";
  } else {
    result = "0 bytes";
  }
  return result;
};

export { formatSizeUnits };
