import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import '../models/domanda.dart';

class QuizListWidget extends StatelessWidget {
  final Function(Quiz) onQuizSelected; // Callback per selezionare un quiz

  const QuizListWidget({Key? key, required this.onQuizSelected}) : super(key: key);

  Future<List<Quiz>> _loadQuizData() async {
    final String response = await rootBundle.loadString('assets/quiz.json');
    return Quiz.fromJsonList(response);
  }

  Icon _getQuizIcon(Quiz quiz) {
    final DateTime expiryDate = DateTime.parse(quiz.dataDiScadenza);
    final bool isExpired = expiryDate.isBefore(DateTime.now());
    final bool isExpiringSoon = expiryDate.isBefore(DateTime.now().add(const Duration(days: 7))) &&
        !isExpired; // Scadenza entro 7 giorni ma non ancora scaduto
    final bool isCompleted = quiz.quesiti.every((q) => q.rispostaUtente != null);

    if (isCompleted) {
      return const Icon(Icons.check_circle, color: Colors.grey, size: 32); // Grigio per quiz completati
    } else if (isExpired) {
      return const Icon(Icons.cancel, color: Colors.red, size: 32); // Rosso per quiz scaduti
    } else if (isExpiringSoon) {
      return const Icon(Icons.warning, color: Colors.orange, size: 32); // Arancione per quiz in scadenza entro 7 giorni
    } else {
      return const Icon(Icons.check_circle, color: Colors.green, size: 32); // Verde per quiz attivi
    }
  }

  String _getQuizStatus(Quiz quiz) {
    final DateTime expiryDate = DateTime.parse(quiz.dataDiScadenza);
    final bool isExpired = expiryDate.isBefore(DateTime.now());
    final bool isExpiringSoon = expiryDate.isBefore(DateTime.now().add(const Duration(days: 7))) &&
        !isExpired; // Scadenza entro 7 giorni ma non ancora scaduto
    final bool isCompleted = quiz.quesiti.every((q) => q.rispostaUtente != null);

    if (isCompleted) {
      return "Completato";
    } else if (isExpired) {
      return "Scaduto";
    } else if (isExpiringSoon) {
      return "In scadenza";
    } else {
      return "Attivo";
    }
  }

  Color _getQuizStatusColor(Quiz quiz) {
    final DateTime expiryDate = DateTime.parse(quiz.dataDiScadenza);
    final bool isExpired = expiryDate.isBefore(DateTime.now());
    final bool isExpiringSoon = expiryDate.isBefore(DateTime.now().add(const Duration(days: 7))) &&
        !isExpired; // Scadenza entro 7 giorni ma non ancora scaduto
    final bool isCompleted = quiz.quesiti.every((q) => q.rispostaUtente != null);

    if (isCompleted) {
      return Colors.grey;
    } else if (isExpired) {
      return Colors.red;
    } else if (isExpiringSoon) {
      return Colors.orange; // Arancione per quiz in scadenza
    } else {
      return Colors.green;
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Quiz>>(
      future: _loadQuizData(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(
            child: CircularProgressIndicator(
              color: Color(0xFF323554),
            ),
          );
        } else if (snapshot.hasError) {
          return const Center(
            child: Text('Errore nel caricamento dei quiz'),
          );
        } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
          return const Center(
            child: Text('Nessun quiz disponibile'),
          );
        }

        final quizList = snapshot.data!;

        // Ordina i quiz: cliccabili (per data più vicina) -> non cliccabili
        quizList.sort((a, b) {
          final DateTime expiryDateA = DateTime.parse(a.dataDiScadenza);
          final DateTime expiryDateB = DateTime.parse(b.dataDiScadenza);

          final bool isClickableA = expiryDateA.isAfter(DateTime.now()) &&
              !a.quesiti.every((q) => q.rispostaUtente != null);
          final bool isClickableB = expiryDateB.isAfter(DateTime.now()) &&
              !b.quesiti.every((q) => q.rispostaUtente != null);

          // Priorità: cliccabili prima
          if (isClickableA && !isClickableB) return -1;
          if (!isClickableA && isClickableB) return 1;

          // Ordina i cliccabili per data di scadenza più vicina
          if (isClickableA && isClickableB) {
            return expiryDateA.compareTo(expiryDateB);
          }

          // Ordina i non cliccabili per data di scadenza
          return expiryDateA.compareTo(expiryDateB);
        });

        return ListView.builder(
          itemCount: quizList.length,
          itemBuilder: (context, index) {
            final quiz = quizList[index];
            final DateTime expiryDate = DateTime.parse(quiz.dataDiScadenza);
            final bool isClickable = expiryDate.isAfter(DateTime.now()) &&
                !quiz.quesiti.every((q) => q.rispostaUtente != null); // Cliccabile solo se non scaduto e non completato

            return Card(
              elevation: 6,
              margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: InkWell(
                onTap: isClickable
                    ? () {
                        onQuizSelected(quiz); // Chiama il callback con il quiz selezionato
                      }
                    : null, // Disabilita il clic se non è cliccabile
                borderRadius: BorderRadius.circular(16),
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: isClickable
                          ? [const Color.fromARGB(255, 131, 137, 146), Colors.lightBlueAccent]
                          : [Colors.grey[300]!, Colors.grey[400]!],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Titolo del quiz
                      Text(
                        quiz.certificazione,
                        style: GoogleFonts.poppins(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: isClickable ? Colors.white : Colors.grey[800],
                        ),
                      ),
                      const SizedBox(height: 12),
                      // Riga con icona, data di scadenza e stato
                      Row(
                        children: [
                          // Icona del quiz
                          _getQuizIcon(quiz),
                          const SizedBox(width: 16),
                          // Data di scadenza
                          Expanded(
                            child: Text(
                              'Scadenza: ${quiz.dataDiScadenza}',
                              style: GoogleFonts.poppins(
                                fontSize: 13,
                                color: isClickable ? Colors.white70 : Colors.grey[600],
                                fontWeight: FontWeight.bold
                              ),
                            ),
                          ),
                          const SizedBox(width: 16),
                          // Stato del quiz
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                            decoration: BoxDecoration(
                              color: _getQuizStatusColor(quiz), // Colore dinamico per lo stato
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: SizedBox(
                              width: 100, // Imposta una larghezza fissa per uniformare i tasti
                              child: Text(
                                _getQuizStatus(quiz),
                                textAlign: TextAlign.center, // Centra il testo all'interno del tasto
                                style: GoogleFonts.poppins(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                  color: isClickable ? Colors.black : Colors.white,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        );
      },
    );
  }
}