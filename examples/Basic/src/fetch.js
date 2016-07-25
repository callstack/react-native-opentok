// Private function extracting response
function status(response) {
  const parseBody = response.json();

  return parseBody
    .catch(() => Promise.reject({
      global: 'There was an network error, try again',
    }))
    .then(body => new Promise((resolve, reject) => {
      if (response.status >= 200 && response.status < 300) {
        return resolve(body, response);
      }
      return reject({
        ...body.errors,
        statusCode: response.status,
      }, response);
    }));
}

export function fetch(url, opts = {}) {
  if (opts.body) {
    opts.body = JSON.stringify(opts.body); // eslint-disable-line no-param-reassign
  }
  return window
    .fetch(url, opts)
    .then(status);
}
