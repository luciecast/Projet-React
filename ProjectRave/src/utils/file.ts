import * as FileSystem from 'expo-file-system/legacy';

const DOCUMENT_DIR = (FileSystem as any).documentDirectory as string;

export const ensureRecordsDir = async (): Promise<string> => {
  const dir = DOCUMENT_DIR + "records/";

  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }

  return dir;
};

export const saveRecordingFile = async (sourceUri: string, name: string) => {
  const dir = await ensureRecordsDir();
  const id = Date.now().toString();
  const dest = `${dir}${id}_${name}.m4a`;

  await FileSystem.copyAsync({ from: sourceUri, to: dest });

  return { id, uri: dest };
};
