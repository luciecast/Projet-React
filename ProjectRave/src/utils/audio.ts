import { Audio, AVPlaybackSource } from 'expo-av';

export const startRecording = async (): Promise<Audio.Recording> => {
  await Audio.requestPermissionsAsync();
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  });

  const RECORDING_OPTIONS: any = Audio.RecordingOptionsPresets.HIGH_QUALITY;

  const recording = new Audio.Recording();
  await recording.prepareToRecordAsync(RECORDING_OPTIONS);
  await recording.startAsync();

  return recording; // ← tu avais oublié ce return
};

export const stopRecording = async (
  recording: Audio.Recording
): Promise<string | null> => {
  await recording.stopAndUnloadAsync();
  return recording.getURI();
};

export const playSound = async (uri: string) => {
  const { sound } = await Audio.Sound.createAsync({ uri } as AVPlaybackSource);
  await sound.playAsync();
  return sound;
};
