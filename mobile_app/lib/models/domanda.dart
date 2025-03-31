import 'dart:convert';

class Domanda {
  final int id;
  final String domanda;
  final bool rispostaCorretta;
  final bool? rispostaUtente; // Campo opzionale per la risposta dell'utente

  Domanda({
    required this.id,
    required this.domanda,
    required this.rispostaCorretta,
    this.rispostaUtente, // Campo opzionale
  });

  factory Domanda.fromJson(Map<String, dynamic> json) {
    return Domanda(
      id: json['id'] ?? 0, // Imposta un valore predefinito se l'id non è presente
      domanda: json['domanda'] ?? '',
      rispostaCorretta: json['risposta_corretta'] ?? false,
      rispostaUtente: json['risposta_utente'], // Può essere null
    );
  }

  static List<Domanda> fromJsonList(List<dynamic> jsonList) {
    return jsonList.map((json) => Domanda.fromJson(json)).toList();
  }
}

class Quiz {
  final int id;
  final String certificazione;
  final String dataDiScadenza;
  final List<Domanda> quesiti;

  Quiz({
    required this.id,
    required this.certificazione,
    required this.dataDiScadenza,
    required this.quesiti,
  });

  factory Quiz.fromJson(Map<String, dynamic> json) {
    return Quiz(
      id: json['id'],
      certificazione: json['certificazione'],
      dataDiScadenza: json['data_di_scadenza'],
      quesiti: Domanda.fromJsonList(json['quesiti']),
    );
  }

  static List<Quiz> fromJsonList(String jsonString) {
    final List<dynamic> jsonData = json.decode(jsonString);
    return jsonData.map((json) => Quiz.fromJson(json)).toList();
  }
}