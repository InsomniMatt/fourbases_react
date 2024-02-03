const fourBases = (path, query={}) => {
  let url = new URL(process.env.REACT_APP_FOURBASES_HOSTNAME + path);
  url.search = new URLSearchParams(query).toString();
  let headers = new Headers({'Authorization': 'Token token="' + process.env.REACT_APP_FOURBASES_TOKEN + '"'});
  return fetch(url, {headers: headers})
      .then((response) => {
        if (response.status !== 200) {
          throw response.statusText;
        }
        return response.json();
      })
      .then((payload) => {
        return payload;
      });
}

export default fourBases;