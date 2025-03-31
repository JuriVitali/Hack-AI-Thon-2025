import 'package:flutter/material.dart';
import 'package:animated_splash_screen/animated_splash_screen.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/svg.dart';
import 'package:google_fonts/google_fonts.dart'; // Importa Google Fonts
import 'login_screen.dart';
import 'package:liquid_swipe/liquid_swipe.dart';

import 'intro_screen.dart';
import 'login_screen.dart';
import 'home_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SplashScreen extends StatelessWidget {
  Future<bool> checkFirstSeen() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    bool seen = (prefs.getBool('seen') ?? false);

    if (seen) {
      return true;
    } else {
      await prefs.setBool('seen', true);
      return false;
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
      future: checkFirstSeen(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Scaffold(
            body: Center(
              child: CircularProgressIndicator(),
            ),
          );
        } else {
          return AnimatedSplashScreen(
            splash: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Icon(Icons.flutter_dash, size: 100, color: Colors.white),
                SizedBox(height: 20.h),
                Text(
                  'Quirrel',
                  style: GoogleFonts.poppins( // Utilizza Google Fonts
                    fontSize: 24.sp,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
            nextScreen: snapshot.data == true ? HomeScreen() : IntroScreen(),
            splashTransition: SplashTransition.fadeTransition,
            backgroundColor: Color(0xFF323554),
            duration: 3000,
          );
        }
      },
    );
  }
}