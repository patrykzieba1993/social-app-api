const parseHeaders = (request, reply) => {
  let headers = [];
  const dealingWithError = request.response instanceof Error;
  switch (request.method) {
    case 'options':
      headers = [
        'Access-Control-Request-Method',
      ];
      break;
    default:
      headers = [
        'Accept',
        'Authorization',
      ];
      break;
  }
  if (dealingWithError) {
    Object.assign(request.response.output.headers, { vary: headers.join() });
  } else {
    headers.forEach(header => request.response.vary(header));
  }
  reply.continue();
};

module.exports = parseHeaders;
