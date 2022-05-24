export const getTheVeryBaseUrl = (url) => {
  const urlParts = url.match(/^((http[s]?|ftp):\/\/)?\/?([^:\/\s]+)(:([^\/]*))?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(\?([^#]*))?(#(.*))?$/)
  return `${urlParts[1]}${urlParts[3]}`
}