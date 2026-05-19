export const getBaseUrl = (ip: string, port: string) => `http://${ip}:${port}`;

export const testConnection = async (ip: string, port: string): Promise<boolean> => {
  try {
    const res = await fetch(getBaseUrl(ip, port) + '/');
    const text = await res.text();
    return text.toLowerCase().includes('success');
    
  } catch {
    return false;
  }
};

export const getModels = async (ip: string, port: string): Promise<string[]> => {
  const res = await fetch(getBaseUrl(ip, port) + '/getmodels');
  return res.json();
};

export const selectModel = async (ip: string, port: string, modelName: string): Promise<string> => {
  const res = await fetch(getBaseUrl(ip, port) + `/selectModel/${modelName}`);
  return res.text();
};

export const uploadAudio = async (ip: string, port: string, uri: string): Promise<string> => {
  const formData = new FormData();
  formData.append('file', {
    uri,
    name: 'input.wav',
    type: 'audio/wav',
  } as any);

  const res = await fetch(getBaseUrl(ip, port) + '/upload', {
    method: 'POST',
    body: formData,
  });

  return res.text();
};
