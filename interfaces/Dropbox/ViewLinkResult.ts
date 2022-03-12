interface ViewLinkResult {
  metadata: {
    name: string,
    path_lower: string,
    path_display: string,
    id: string,
    client_modified: string,
    server_modified: string,
    rev: string,
    content_hash: string,
    size: number,
    is_downloadable: boolean,
  },
  link: string,
}

export default ViewLinkResult;