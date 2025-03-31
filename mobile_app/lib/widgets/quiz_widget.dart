import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../models/domanda.dart';

class QuizWidget extends StatefulWidget {
  final Quiz quiz; // Quiz selezionato

  const QuizWidget({Key? key, required this.quiz}) : super(key: key);

  @override
  _QuizWidgetState createState() => _QuizWidgetState();
}

class _QuizWidgetState extends State<QuizWidget> {
  late List<Domanda> _domande;
  int _currentIndex = 0;
  int _correctAnswers = 0; // Contatore delle risposte corrette
  bool _quizFinished = false; // Stato per verificare se il quiz è terminato
  double _dragOffset = 0.0; // Offset per il movimento della card
  double _opacity = 1.0; // Opacità della card

  @override
  void initState() {
    super.initState();
    _domande = widget.quiz.quesiti; // Carica le domande dal quiz selezionato
  }

  void _handleSwipe(bool isTrue) {
    final currentQuestion = _domande[_currentIndex];
    final isCorrect = currentQuestion.rispostaCorretta == isTrue;

    // Mostra una SnackBar con il risultato
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          isCorrect ? 'Risposta corretta!' : 'Risposta sbagliata!',
          style: const TextStyle(fontSize: 16),
        ),
        backgroundColor: isCorrect ? Colors.green : Colors.red,
        duration: const Duration(seconds: 1),
      ),
    );

    setState(() {
      if (isCorrect) {
        _correctAnswers++; // Incrementa il contatore delle risposte corrette
      }
    });

    // Passa alla domanda successiva o termina il quiz
    Future.delayed(const Duration(milliseconds: 300), () {
      if (_currentIndex < _domande.length - 1) {
        setState(() {
          _currentIndex++; // Passa alla domanda successiva
          _dragOffset = 0.0; // Resetta l'offset
          _opacity = 1.0; // Resetta l'opacità
        });
      } else {
        setState(() {
          _quizFinished = true; // Mostra la schermata dei risultati
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_quizFinished) {
      return Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Quiz completato!',
                style: GoogleFonts.poppins(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              Text(
                'Hai risposto correttamente a $_correctAnswers su ${_domande.length} domande.',
                style: GoogleFonts.poppins(
                  fontSize: 16,
                  color: Colors.grey[800],
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: () {
                  Navigator.pop(context); // Torna alla lista dei quiz
                },
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  backgroundColor: const Color.fromARGB(255, 131, 137, 146), // Colore del tasto
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: Text(
                  'Torna ai Quiz',
                  style: GoogleFonts.poppins(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    }

    final currentQuestion = _domande[_currentIndex];

    return Scaffold(
      body: Column(
        children: [
          // Spazio iniziale superiore
          const SizedBox(height: 32),
          // Barra di avanzamento
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
            child: LinearProgressIndicator(
              value: (_currentIndex) / _domande.length,
              backgroundColor: Colors.grey[300],
              color: Colors.blueAccent,
              minHeight: 8,
            ),
          ),
          Expanded(
            child: Stack(
              children: [
                // Indicatore "Vero" (Swipe a destra)
                Positioned(
                  left: 20,
                  top: 100,
                  child: Opacity(
                    opacity: _dragOffset > 0 ? (_dragOffset / 100).clamp(0.0, 1.0) : 0.0,
                    child: Text(
                      'Vero',
                      style: GoogleFonts.poppins(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.green,
                      ),
                    ),
                  ),
                ),
                // Indicatore "Falso" (Swipe a sinistra)
                Positioned(
                  right: 20,
                  top: 100,
                  child: Opacity(
                    opacity: _dragOffset < 0 ? (_dragOffset.abs() / 100).clamp(0.0, 1.0) : 0.0,
                    child: Text(
                      'Falso',
                      style: GoogleFonts.poppins(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.red,
                      ),
                    ),
                  ),
                ),
                GestureDetector(
                  onHorizontalDragUpdate: (details) {
                    setState(() {
                      _dragOffset += details.delta.dx; // Aggiorna l'offset durante il drag
                      _opacity = 1.0 - (_dragOffset.abs() / 200).clamp(0.0, 1.0); // Riduce l'opacità
                    });
                  },
                  onHorizontalDragEnd: (details) {
                    if (_dragOffset > 100) {
                      // Swipe a destra
                      setState(() {
                        _opacity = 0.0; // Rende la card invisibile
                      });
                      _handleSwipe(true);
                    } else if (_dragOffset < -100) {
                      // Swipe a sinistra
                      setState(() {
                        _opacity = 0.0; // Rende la card invisibile
                      });
                      _handleSwipe(false);
                    } else {
                      // Ritorna alla posizione iniziale se lo swipe non è sufficiente
                      setState(() {
                        _dragOffset = 0.0;
                        _opacity = 1.0; // Resetta l'opacità
                      });
                    }
                  },
                  child: Transform.translate(
                    offset: Offset(_dragOffset, 0), // Applica l'offset alla card
                    child: Opacity(
                      opacity: _opacity, // Applica l'opacità alla card
                      child: Container(
                        padding: const EdgeInsets.all(20),
                        child: Card(
                          elevation: 8,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Container(
                            padding: const EdgeInsets.all(24),
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                              gradient: const LinearGradient(
                                colors: [Colors.blueAccent, Colors.lightBlueAccent],
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                              ),
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  currentQuestion.domanda,
                                  style: GoogleFonts.poppins(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}