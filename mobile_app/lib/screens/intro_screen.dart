import 'package:flutter/material.dart';
import 'package:liquid_swipe/liquid_swipe.dart';
import '../widgets/intro_widget.dart';
import 'login_screen.dart';
import 'home_screen.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart'; // Importa Google Fonts

class IntroScreen extends StatefulWidget {
  @override
  _IntroScreenState createState() => _IntroScreenState();
}

class _IntroScreenState extends State<IntroScreen> {
  final LiquidController _liquidController = LiquidController();
  int _currentPage = 0;

  final pages = [
    IntroPageWidget(
      backgroundColor: Colors.blue,
      icon: Icons.explore,
      title: 'Benvenuto in Quirrel!',
      description: 'Scopri le funzionalità della nostra app.',
    ),
    IntroPageWidget(
      backgroundColor: Colors.green,
      icon: Icons.school,
      title: 'Formazione',
      description: 'Potenzia il team con la nostra app di formazione!',
    ),
    IntroPageWidget(
      backgroundColor: Colors.orange,
      icon: Icons.lightbulb,
      title: 'Innovazione formativa!',
      description: 'Porta innovazione al tuo business con l''IA.',
    ),
    IntroPageWidget(
      backgroundColor: Colors.purple,
      icon: Icons.support,
      title: 'Supporto 24/7',
      description: 'Siamo qui per aiutarti, sempre.',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          LiquidSwipe(
            pages: pages,
            fullTransitionValue: 300,
            enableLoop: false,
            waveType: WaveType.liquidReveal,
            liquidController: _liquidController,
            onPageChangeCallback: (index) {
              setState(() {
                _currentPage = index;
              });
            },
          ),
          Positioned(
            top: 30.h,
            right: 20.w,
            child: TextButton(
              onPressed: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => HomeScreen()),
                );
              },
              child: Text(
                'Skip',
                style: GoogleFonts.poppins(
                  color: Colors.white,
                  fontSize: 18.sp,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ),
          if (_currentPage != pages.length - 1)
            Positioned(
              bottom: 32.h,
              left: 0,
              right: 0,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(pages.length, (index) {
                  return Container(
                    margin: EdgeInsets.symmetric(horizontal: 5.w),
                    width: _currentPage == index ? 12.w : 8.w,
                    height: _currentPage == index ? 12.h : 8.h,
                    decoration: BoxDecoration(
                      color: _currentPage == index ? Colors.white : Colors.grey,
                      shape: BoxShape.circle,
                    ),
                  );
                }),
              ),
            ),
          if (_currentPage == pages.length - 1)
            Positioned(
              bottom: 20.h,
              left: 0,
              right: 0,
              child: Center(
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(builder: (context) => HomeScreen()),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    foregroundColor: Colors.blue,
                    backgroundColor: Colors.white,
                    padding: EdgeInsets.symmetric(horizontal: 46.w, vertical: 12.h),
                    textStyle: GoogleFonts.poppins(
                      fontSize: 18.sp,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  child: Text(
                    'Avanti',
                    style: GoogleFonts.poppins(
                      fontSize: 18.sp,
                      fontWeight: FontWeight.w500,
                      color: Colors.blue,
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}