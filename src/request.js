const fourBases = (path, query={}) => {
  let url = new URL(process.env.REACT_APP_FOURBASES_HOSTNAME + path);
  url.search = new URLSearchParams(query).toString();
  let headers = new Headers({'Authorization': 'Token token="' + process.env.REACT_APP_FOURBASES_TOKEN + '"'});
  return fetch(url, {headers: headers});
}

export default fourBases;