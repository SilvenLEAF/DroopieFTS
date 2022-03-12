import textract from 'textract';

export const extractFileText = async (filePath: string) => {
  try {
    return new Promise<string>(resolve => {
      textract.fromFileWithPath(filePath, (error, text) => {
        if (error) {
          console.error(error);
          resolve('');
        } else {
          resolve(text);
        }
      })

    })
  } catch (error) {
    console.error(error);
    return '';
  }
}

export const extractBufferText = async (name: string, buffer: any) => {
  try {
    return new Promise<string>(resolve => {
      textract.fromBufferWithName(name, buffer, (error, text) => {
        if (error) {
          console.error(error);
          resolve('');
        } else {
          resolve(text);
        }
      })

    })
  } catch (error) {
    console.error(error);
    return '';
  }
}