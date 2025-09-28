import stream from "stream";

/**
 * Transform stream that removes empty lines
 * @extends stream.Transform
 */
class RemoveEmptyLines extends stream.Transform {
  /**
   * Transform implementation
   * @param {Object} chunk - Data chunk
   * @param {string} encoding - Encoding
   * @param {Function} callback - Callback function
   */
  _transform(chunk, encoding, callback) {
    let rv = chunk.contents.toString(encoding);
    rv = rv.replace(/^\s*[\r\n]/gm, "");
    chunk.contents = Buffer.from(rv, encoding);
    callback(null, chunk);
  }
}

/**
 * Create a remove empty lines transform stream
 * @returns {RemoveEmptyLines} Transform stream
 */
export function removeEmptyLines() {
  return new RemoveEmptyLines({
    objectMode: true,
  });
}
