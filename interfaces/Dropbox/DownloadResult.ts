interface DownloadResult {
  name: string,
  path_lower: string,
  path_display: string,
  id: string,
  client_modified: any,
  server_modified: any,
  rev: string,
  size: number,
  is_downloadable: boolean,
  content_hash: string,
  fileBinary: any,
}

export default DownloadResult;