import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../models/domanda_sbagliata.dart';
import '../models/chatbot.dart'; // Importa la classe ChatbotResponse

class HistoricWidget extends StatefulWidget {
  const HistoricWidget({Key? key}) : super(key: key);

  @override
  State<HistoricWidget> createState() => _HistoricWidgetState();
}

class _HistoricWidgetState extends State<HistoricWidget> {
  // Mappa per tenere traccia dello stato di espansione delle card
  final Map<int, bool> _expandedCards = {};
  late Future<List<ChatbotResponse>> _chatbotResponsesFuture;

  @override
  void initState() {
    super.initState();
    _chatbotResponsesFuture = _loadChatbotResponses(); // Carica le risposte del chatbot
  }

  Future<List<DomandaSbagliata>> _loadWrongAnswers() async {
    // Carica il file JSON
    final String response = await rootBundle.loadString('assets/sbagliate.json');
    // Converte il JSON in una lista di DomandaSbagliata
    return DomandaSbagliata.fromJsonList(response);
  }

  Future<List<ChatbotResponse>> _loadChatbotResponses() async {
    // Carica il file JSON delle risposte del chatbot
    final String response = await rootBundle.loadString('assets/chatbot.json');
    return ChatbotResponse.fromJsonList(response);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Domande Sbagliate',
          style: GoogleFonts.poppins(
            fontSize: 22,
            fontWeight: FontWeight.bold,
            color: Colors.red[600],
          ),
        ),
        backgroundColor: Colors.grey[100],
      ),
      body: FutureBuilder<List<DomandaSbagliata>>(
        future: _loadWrongAnswers(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(
                color: Colors.blueAccent,
              ),
            );
          } else if (snapshot.hasError) {
            return const Center(
              child: Text('Errore nel caricamento delle domande sbagliate'),
            );
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(
              child: Text('Nessuna domanda sbagliata trovata'),
            );
          }

          final wrongAnswers = snapshot.data!;

          return FutureBuilder<List<ChatbotResponse>>(
            future: _chatbotResponsesFuture,
            builder: (context, chatbotSnapshot) {
              if (chatbotSnapshot.connectionState == ConnectionState.waiting) {
                return const Center(
                  child: CircularProgressIndicator(
                    color: Colors.blueAccent,
                  ),
                );
              } else if (chatbotSnapshot.hasError) {
                return const Center(
                  child: Text('Errore nel caricamento delle risposte del chatbot'),
                );
              } else if (!chatbotSnapshot.hasData || chatbotSnapshot.data!.isEmpty) {
                return const Center(
                  child: Text('Nessuna risposta del chatbot trovata'),
                );
              }

              final chatbotResponses = chatbotSnapshot.data!;

              return Padding(
                padding: const EdgeInsets.all(16.0),
                child: ListView.builder(
                  itemCount: wrongAnswers.length,
                  itemBuilder: (context, index) {
                    final domanda = wrongAnswers[index];
                    final isExpanded = _expandedCards[index] ?? false;

                    // Ottieni la risposta del chatbot corrispondente
                    final chatbotResponse = chatbotResponses[index % chatbotResponses.length];

                    return AnimatedContainer(
                      duration: const Duration(milliseconds: 400),
                      curve: Curves.easeInOut,
                      margin: const EdgeInsets.symmetric(vertical: 8),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: isExpanded
                              ? [const Color.fromARGB(255, 131, 137, 146), Colors.lightBlueAccent]
                              : [Colors.grey[300]!, Colors.grey[400]!], // Gradiente dinamico
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(12),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.1),
                            blurRadius: 6,
                            offset: const Offset(0, 2),
                          ),
                        ],
                      ),
                      child: Column(
                        children: [
                          ListTile(
                            contentPadding: const EdgeInsets.all(16),
                            title: Text(
                              domanda.domanda,
                              style: GoogleFonts.poppins(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                color: isExpanded ? Colors.white : Colors.grey[800], // Testo dinamico
                              ),
                            ),
                            leading: const Icon(
                              Icons.error,
                              color: Colors.redAccent,
                              size: 30,
                            ),
                            trailing: IconButton(
                              icon: const Icon(
                                Icons.smart_toy,
                                color: Colors.blueAccent,
                              ),
                              onPressed: () {
                                setState(() {
                                  _expandedCards[index] = !isExpanded;
                                });
                              },
                            ),
                          ),
                          if (isExpanded)
                            Animate(
                              effects: const [
                                SlideEffect(
                                  begin: Offset(0, -0.1),
                                  end: Offset(0, 0),
                                  curve: Curves.easeInOut,
                                  duration: Duration(milliseconds: 400),
                                ),
                                FadeEffect(
                                  duration: Duration(milliseconds: 400),
                                  curve: Curves.easeInOut,
                                ),
                              ],
                              child: Padding(
                                padding: const EdgeInsets.all(16.0),
                                child: Container(
                                  decoration: BoxDecoration(
                                    color: Colors.blue[50],
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  padding: const EdgeInsets.all(16),
                                  child: Text(
                                    '${chatbotResponse.argomentazione}',
                                    style: GoogleFonts.poppins(
                                      fontSize: 14,
                                      color: Colors.black87,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                        ],
                      ),
                    );
                  },
                ),
              );
            },
          );
        },
      ),
    );
  }
}