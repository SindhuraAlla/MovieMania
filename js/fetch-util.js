function getSearchParams(params) {
  let searchParams = new URLSearchParams(params).toString();

  return searchParams;
}

export function getURL(path, options) {
  option=options.toString
  const searchParams = getSearchParams(options);

  if (searchParams != null && searchParams != "") {
    return path + "?" + searchParams;
  }
  return path;
}
