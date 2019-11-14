function ab2str(
  input: ArrayBuffer | Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array,
  outputEncoding: string = 'utf8',
): string {
  const decoder = new TextDecoder(outputEncoding);
  return decoder.decode(input);
}

function str2ab(input: string): ArrayBuffer {
  const view = str2Uint8Array(input);
  return view.buffer;
}

function str2Uint8Array(input: string): Uint8Array {
  const encoder = new TextEncoder();
  const view = encoder.encode(input);
  return view;
}