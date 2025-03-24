import 'package:flutter/material.dart';
import 'package:liquid_swipe/liquid_swipe.dart';
import '../widgets/intro_widget.dart';
import 'login_screen.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';


import 'package:flutter/material.dart';
import 'package:liquid_swipe/liquid_swipe.dart';
import 'login_screen.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

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
      icon: Icons.flutter_dash,
      title: 'Benvenuto in Flutter App!',
      description: 'Scopri le funzionalità della nostra app.',
    ),
    IntroPageWidget(
      backgroundColor: Colors.green,
      icon: Icons.security,
      title: 'Sicurezza',
      description: 'Proteggi i tuoi dati con la nostra sicurezza avanzata.',
    ),
    IntroPageWidget(
      backgroundColor: Colors.orange,
      icon: Icons.cloud,
      title: 'Cloud Storage',
      description: 'Accedi ai tuoi file ovunque e in qualsiasi momento.',
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
                  MaterialPageRoute(builder: (context) => LoginScreen()),
                );
              },
              child: Text(
                'Skip',
                style: TextStyle(color: Colors.white, fontSize: 18.sp),
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
                      MaterialPageRoute(builder: (context) => LoginScreen()),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    foregroundColor: Colors.blue, backgroundColor: Colors.white,
                    padding: EdgeInsets.symmetric(horizontal: 46.w, vertical: 12.h),
                    textStyle: TextStyle(fontSize: 18.sp),
                  ),
                  child: Text('Avanti'),
                ),
              ),
            ),
        ],
      ),
    );
  }
}