import 'dart:convert';
class DomandaSbagliata {
  final String domanda;
  final bool risposte;

  DomandaSbagliata({
    required this.domanda,
    required this.risposte,
  });

  // Metodo per creare un'istanza da un oggetto JSON
  factory DomandaSbagliata.fromJson(Map<String, dynamic> json) {
    return DomandaSbagliata(
      domanda: json['domanda'] as String,
      risposte: json['risposte'] as bool,
    );
  }

  // Metodo per convertire un'istanza in un oggetto JSON
  Map<String, dynamic> toJson() {
    return {
      'domanda': domanda,
      'risposte': risposte,
    };
  }

  // Metodo per creare una lista di DomandaSbagliata da una lista JSON
  static List<DomandaSbagliata> fromJsonList(String jsonString) {
    final List<dynamic> jsonData = json.decode(jsonString);
    return jsonData.map((json) => DomandaSbagliata.fromJson(json)).toList();
  }

  // Metodo per convertire una lista di DomandaSbagliata in una lista JSON
  static String toJsonList(List<DomandaSbagliata> domande) {
    final List<Map<String, dynamic>> jsonData =
        domande.map((domanda) => domanda.toJson()).toList();
    return json.encode(jsonData);
  }
}