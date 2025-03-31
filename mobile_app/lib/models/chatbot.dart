import 'dart:convert';

class ChatbotResponse {
  final String argomentazione;

  ChatbotResponse({required this.argomentazione});

  // Factory per creare un oggetto ChatbotResponse da una mappa JSON
  factory ChatbotResponse.fromJson(Map<String, dynamic> json) {
    return ChatbotResponse(
      argomentazione: json['argomentazione'] as String,
    );
  }

  // Metodo per convertire una stringa JSON in una lista di ChatbotResponse
  static List<ChatbotResponse> fromJsonList(String jsonString) {
    final Map<String, dynamic> jsonData = json.decode(jsonString);
    return jsonData.values
        .map((value) => ChatbotResponse.fromJson(value))
        .toList();
  }
}