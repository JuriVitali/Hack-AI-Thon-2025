import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import '../config.dart'; // Contiene il baseUrl

class ApiService {
  final String baseUrl = Config.apiUrl;

  // 🔹 Invia messaggio testuale
  Future<String> sendTextMessage(String message) async {
    final response = await http.post(
      Uri.parse('$baseUrl/chat'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'message': message}),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body)['response'];
    } else {
      throw Exception('Errore nella risposta API');
    }
  }

  // 🔹 Invia messaggio audio
  Future<String> sendAudioMessage(File audioFile) async {
    var request = http.MultipartRequest('POST', Uri.parse('$baseUrl/audio'));
    request.files.add(
      await http.MultipartFile.fromPath('file', audioFile.path),
    );

    var streamedResponse = await request.send();
    var response = await http.Response.fromStream(streamedResponse);

    if (response.statusCode == 200) {
      return jsonDecode(response.body)['response'];
    } else {
      throw Exception('Errore nell’invio dell’audio');
    }
  }
}
