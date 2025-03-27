import 'package:flutter_sound/flutter_sound.dart';
import 'dart:io';
import 'package:path_provider/path_provider.dart';

class AudioService {
  final FlutterSoundRecorder _recorder = FlutterSoundRecorder();
  bool isRecording = false;

  Future<void> initRecorder() async {
    await _recorder.openRecorder();
  }

  Future<String> startRecording() async {
    Directory tempDir = await getTemporaryDirectory();
    String filePath = '${tempDir.path}/audio.mp3';

    await _recorder.startRecorder(toFile: filePath);
    isRecording = true;
    return filePath;
  }

  Future<File> stopRecording() async {
    String? path = await _recorder.stopRecorder();
    isRecording = false;
    return File(path!);
  }
}
