import fs from 'fs';
import { Dropbox } from "dropbox";
import AccessTokenResult from "../../interfaces/Dropbox/AcessTokenResult";
import DownloadResult from '../../interfaces/Dropbox/DownloadResult';
import FileListResult from '../../interfaces/Dropbox/FileListResult';
import ViewLinkResult from "../../interfaces/Dropbox/ViewLinkResult";

// env variables
const myAppKey = process.env.MY_APP_KEY;
const myAppSecret = process.env.MY_APP_SECRET
const redirectUri = process.env.MY_REDIRECT_URI;


export const getAccessToken = async (userGivenCode: string) => {
  try {
    const dbx: any = new Dropbox({
      clientId: myAppKey,
      clientSecret: myAppSecret,
    });

    const res = await dbx.auth.getAccessTokenFromCode(redirectUri, userGivenCode)
    const data: AccessTokenResult = (res && res.result) ? res.result : {};

    return data;
  } catch (error: any) {
    console.log('Error occurred on dropbox while getting code!');
    console.error(error);
    return { error: true, message: error?.error?.error_description || 'Code is expired!' };
  }
}

export const getUserFiles = async (dbx: Dropbox) => {
  try {
    const res = await dbx.filesListFolder({
      path: '',
      recursive: true,
    });

    const data: FileListResult = (res && res.result) ? res.result as FileListResult : {} as FileListResult;
    return data;
  } catch (error) {
    console.log('Error occurred on dropbox while getting files!');
    console.error(error);
    return {} as FileListResult;
  }
}

export const downloadFile = async (dbx: Dropbox, path: string) => {
  try {
    const res = await dbx.filesDownload({ path });
    const data: DownloadResult = (res && res.result) ? res.result as DownloadResult : {} as DownloadResult;
    return data;
  } catch (error) {
    console.log('Error occurred on dropbox while downloading!');
    console.error(error);
    return {} as DownloadResult;
  }
}

export const getViewLink = async (dbx: Dropbox, path: string) => {
  try {
    const res = await dbx.filesGetTemporaryLink({ path });
    const data = (res && res.result) ? res.result as ViewLinkResult : {} as ViewLinkResult;
    return data;
  } catch (error) {
    console.log('Error occurred on dropbox while getting preview link!');
    console.error(error);
    return {} as ViewLinkResult;
  }
}