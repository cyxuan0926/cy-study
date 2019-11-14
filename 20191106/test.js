function ab2str(input, outputEncoding) {
    if (outputEncoding === void 0) { outputEncoding = 'utf8'; }
    var decoder = new TextDecoder(outputEncoding);
    return decoder.decode(input);
}
function str2ab(input) {
    var view = str2Uint8Array(input);
    return view.buffer;
}
function str2Uint8Array(input) {
    var encoder = new TextEncoder();
    var view = encoder.encode(input);
    return view;
}
