import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../widgets/chatbot_widget.dart';
import '../widgets/quiz_widget.dart';
import '../widgets/quiz_list_widget.dart';
import '../widgets/historic_widget.dart';
import '../models/domanda.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 1; // Indice iniziale impostato su 1 (Quiz)
  Widget? _currentWidget; // Widget corrente da mostrare
  bool _showQuizNotification = true; // Stato per mostrare il puntino rosso

  @override
  void initState() {
    super.initState();
    _currentWidget = _pages[_selectedIndex]; // Imposta il widget iniziale su Quiz
  }

  // Lista delle pagine
  late final List<Widget> _pages = [
    const HistoricWidget(), // Widget per la sezione "Learn"
    QuizListWidget(
      onQuizSelected: _openQuizWidget, // Passa il callback per aprire il QuizWidget
    ),
    const ChatbotWidget(), // Chatbot come terza scheda
  ];

  // Lista dei titoli corrispondenti alle pagine
  final List<String> _titles = [
    'Learn',
    'Quiz',
    'Chatbot',
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
      _currentWidget = _pages[index]; // Cambia il widget corrente

      // Nascondi il puntino rosso quando si preme sull'icona del quiz
      if (index == 1) {
        _showQuizNotification = false;
      }
    });
  }

  void _openQuizWidget(Quiz quiz) {
    setState(() {
      _currentWidget = QuizWidget(quiz: quiz); // Mostra il QuizWidget
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          _titles[_selectedIndex],
          style: GoogleFonts.poppins(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        backgroundColor: const Color(0xFF323554), // Colore di sfondo dell'AppBar
      ),
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 300),
        child: _currentWidget, // Mostra il widget corrente con animazione
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        backgroundColor: const Color(0xFF323554), // Colore di sfondo della BottomNavigationBar
        selectedItemColor: const Color(0xFFFF7F11), // Colore per l'elemento selezionato
        unselectedItemColor: const Color(0xFFFF7F11), // Colore per gli elementi non selezionati
        selectedLabelStyle: GoogleFonts.poppins(fontSize: 14, fontWeight: FontWeight.w500),
        unselectedLabelStyle: GoogleFonts.poppins(fontSize: 12, fontWeight: FontWeight.w400),
        type: BottomNavigationBarType.fixed,
        items: [
          BottomNavigationBarItem(
            icon: AnimatedScale(
              scale: _selectedIndex == 0 ? 1.2 : 1.0, // Ingrandisce l'icona selezionata
              duration: const Duration(milliseconds: 300), // Durata dell'animazione
              curve: Curves.easeInOut, // Curva dell'animazione
              child: const Icon(Icons.school),
            ),
            label: 'Learn',
          ),
          BottomNavigationBarItem(
            icon: AnimatedScale(
              scale: _selectedIndex == 1 ? 1.2 : 1.0, // Ingrandisce l'icona selezionata
              duration: const Duration(milliseconds: 300), // Durata dell'animazione
              curve: Curves.easeInOut, // Curva dell'animazione
              child: Stack(
                children: [
                  const Icon(Icons.quiz),
                  if (_showQuizNotification)
                    Positioned(
                      right: 0,
                      top: 0,
                      child: Container(
                        width: 8,
                        height: 8,
                        decoration: const BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                        ),
                      ),
                    ),
                ],
              ),
            ),
            label: 'Quiz',
          ),
          BottomNavigationBarItem(
            icon: AnimatedScale(
              scale: _selectedIndex == 2 ? 1.2 : 1.0, // Ingrandisce l'icona selezionata
              duration: const Duration(milliseconds: 300), // Durata dell'animazione
              curve: Curves.easeInOut, // Curva dell'animazione
              child: const Icon(Icons.chat),
            ),
            label: 'Chatbot',
          ),
        ],
      ),
    );
  }
}