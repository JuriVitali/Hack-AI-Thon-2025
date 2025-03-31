import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart'; // Importa Google Fonts
import '../services/audio_service.dart';
import '../services/api_service.dart';
import 'dart:io';

class ChatbotWidget extends StatefulWidget {
  const ChatbotWidget({super.key});

  @override
  State<ChatbotWidget> createState() => _ChatbotWidgetState();
}

class _ChatbotWidgetState extends State<ChatbotWidget> {
  final TextEditingController _textController = TextEditingController();
  final List<Map<String, String>> _messages = []; // Lista di messaggi (utente/bot)
  final ScrollController _scrollController = ScrollController(); // Per lo scroll automatico
  final AudioService _audioService = AudioService();
  final ApiService _apiService = ApiService();
  bool _isRecording = false;

  List<String> _responses = []; // Lista di risposte dal file JSON
  int _responseIndex = 0; // Contatore esterno che parte da zero

  @override
  void initState() {
    super.initState();
    _audioService.initRecorder();
    _loadResponses(); // Carica le risposte dal file JSON all'avvio
  }

  @override
  void dispose() {
    _audioService.closeRecorder();
    _scrollController.dispose();
    super.dispose();
  }

  // Metodo per caricare le risposte dal file JSON
  Future<void> _loadResponses() async {
    final String jsonString = await rootBundle.loadString('assets/chatbot.json');
    final Map<String, dynamic> jsonMap = json.decode(jsonString);
    setState(() {
      _responses = jsonMap.values
          .map((value) => value['argomentazione'] as String)
          .toList(); // Salva le risposte nella lista _responses
    });
  }

  Future<void> _sendMessage() async {
    if (_textController.text.isNotEmpty) {
      final userMessage = _textController.text;
      setState(() {
        _messages.add({'sender': 'user', 'message': userMessage});
        _textController.clear();
      });

      // Scroll automatico verso il basso
      _scrollToBottom();

      try {
        // Ritarda la risposta del bot di 400 millisecondi
        await Future.delayed(const Duration(milliseconds: 400));

        // Usa l'API per ottenere una risposta
        final botResponse = await _apiService.sendTextMessage(userMessage);
        setState(() {
          _messages.add({'sender': 'bot', 'message': botResponse});
        });

        // Scroll automatico verso il basso
        _scrollToBottom();
      } catch (e) {
        // Ritarda la risposta del bot di 400 millisecondi
        await Future.delayed(const Duration(milliseconds: 400));

        setState(() {
          if (_responses.isNotEmpty) {
            // Usa il primo messaggio dalla lista _responses
            final predefinedResponse = _responses.removeAt(0); // Rimuove e ottiene il primo elemento
            _messages.add({'sender': 'bot', 'message': predefinedResponse});
          } else {
            // Se non ci sono più risposte predefinite, usa un messaggio di fallback
            _messages.add({'sender': 'bot', 'message': 'Non ho altre risposte disponibili al momento.'});
          }
        });

        // Scroll automatico verso il basso
        _scrollToBottom();
      }
    }
  }

  Future<void> _sendAudio(File audioFile) async {
    setState(() {
      _messages.add({'sender': 'user', 'message': 'Audio inviato...'});
    });

    // Scroll automatico verso il basso
    _scrollToBottom();

    try {
      final botResponse = await _apiService.sendAudioMessage(audioFile);
      setState(() {
        _messages.add({'sender': 'bot', 'message': botResponse});
      });

      // Scroll automatico verso il basso
      _scrollToBottom();
    } catch (e) {
      setState(() {
        if (_responses.isNotEmpty) {
          // Usa il primo messaggio dalla lista _responses
          final predefinedResponse = _responses.removeAt(0); // Rimuove e ottiene il primo elemento
          _messages.add({'sender': 'bot', 'message': predefinedResponse});
        } else {
          // Se non ci sono più risposte predefinite, mostra un messaggio di fallback
          _messages.add({'sender': 'bot', 'message': 'Errore: impossibile elaborare l’audio.'});
        }
      });

      // Scroll automatico verso il basso
      _scrollToBottom();
    }
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF3F4F7),
      body: Stack(
        children: [
          Column(
            children: [
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(16),
                  child: ListView.builder(
                    controller: _scrollController,
                    itemCount: _messages.length,
                    itemBuilder: (context, index) {
                      final message = _messages[index];
                      final isUser = message['sender'] == 'user';
                      return Row(
                        mainAxisAlignment:
                            isUser ? MainAxisAlignment.end : MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          if (!isUser)
                            CircleAvatar(
                              radius: 20,
                              backgroundColor: Colors.green[200],
                              child: const Icon(
                                Icons.android, // Icona per il bot
                                color: Colors.white,
                              ),
                            ),
                          const SizedBox(width: 8),
                          Flexible(
                            child: Container(
                              margin: const EdgeInsets.symmetric(vertical: 5),
                              padding: const EdgeInsets.all(12),
                              decoration: BoxDecoration(
                                color: isUser ? Colors.blue[100] : Colors.green[100],
                                borderRadius: BorderRadius.only(
                                  topLeft: const Radius.circular(10),
                                  topRight: const Radius.circular(10),
                                  bottomLeft: isUser ? const Radius.circular(10) : Radius.zero,
                                  bottomRight: isUser ? Radius.zero : const Radius.circular(10),
                                ),
                              ),
                              child: Text(
                                message['message']!,
                                style: GoogleFonts.poppins(fontSize: 16),
                              ),
                            ),
                          ),
                          const SizedBox(width: 8),
                          if (isUser)
                            CircleAvatar(
                              radius: 20,
                              backgroundColor: const Color(0xFF56A3A6),
                              child: const Icon(
                                Icons.person, // Icona per l'utente
                                color: Colors.white,
                              ),
                            ),
                        ],
                      );
                    },
                  ),
                ),
              ),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.1),
                      blurRadius: 10,
                      offset: const Offset(0, -2),
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _textController,
                        decoration: InputDecoration(
                          hintText: 'Scrivi un messaggio...',
                          hintStyle: GoogleFonts.poppins(fontSize: 14, color: Colors.grey),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          filled: true,
                          fillColor: Colors.grey[100],
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    GestureDetector(
                      onLongPress: () async {
                        await _audioService.startRecording();
                        setState(() {
                          _isRecording = true; // Aggiorna lo stato per avviare l'animazione
                        });
                      },
                      onLongPressUp: () async {
                        final audioFile = await _audioService.stopRecording();
                        setState(() {
                          _isRecording = false; // Aggiorna lo stato per fermare l'animazione
                        });
                        await _sendAudio(audioFile);
                      },
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        curve: Curves.easeInOut,
                        width: _isRecording ? 60 : 50,
                        height: _isRecording ? 60 : 50,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: _isRecording ? Colors.red : Colors.blue,
                            width: _isRecording ? 4 : 2,
                          ),
                          boxShadow: _isRecording
                              ? [
                                  BoxShadow(
                                    color: Colors.red.withOpacity(0.5),
                                    spreadRadius: 10,
                                    blurRadius: 20,
                                  ),
                                ]
                              : [],
                        ),
                        child: Icon(
                          _isRecording ? Icons.stop : Icons.mic,
                          color: _isRecording ? Colors.red : Color.fromARGB(255, 131, 137, 146),
                          size: 30,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    ElevatedButton(
                      onPressed: _sendMessage,
                      style: ElevatedButton.styleFrom(
                        shape: const CircleBorder(),
                        padding: const EdgeInsets.all(12),
                        backgroundColor: Colors.blueAccent,
                      ),
                      child: const Icon(Icons.send, color: Colors.white),
                    ),
                  ],
                ),
              ),
            ],
          ),
          if (_messages.isEmpty)
            Center(
              child: Opacity(
                opacity: 0.5,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.chat_bubble_outline,
                      size: 100,
                      color: Color.fromARGB(255, 55, 105, 107),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      'In cosa posso aiutarti?',
                      style: GoogleFonts.poppins(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: const Color.fromARGB(255, 55, 105, 107),
                      ),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}