import 'dart:convert';

class ChatbotResponse {
  final String argomentazione;

  ChatbotResponse({required this.argomentazione});

  // Metodo per creare un oggetto ChatbotResponse da una mappa JSON
  factory ChatbotResponse.fromJson(Map<String, dynamic> json) {
    return ChatbotResponse(
      argomentazione: json['argomentazione'] as String,
    );
  }

  // Metodo per convertire un oggetto ChatbotResponse in una mappa JSON
  Map<String, dynamic> toJson() {
    return {
      'argomentazione': argomentazione,
    };
  }

  // Metodo per creare una lista di ChatbotResponse da una stringa JSON
  static Map<String, ChatbotResponse> fromJsonMap(String jsonString) {
    final Map<String, dynamic> jsonMap = json.decode(jsonString);
    return jsonMap.map((key, value) => MapEntry(
          key,
          ChatbotResponse.fromJson(value as Map<String, dynamic>),
        ));
  }
}