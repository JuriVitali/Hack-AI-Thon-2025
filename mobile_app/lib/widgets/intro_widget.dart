import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart'; // Importa Google Fonts

class IntroPageWidget extends StatelessWidget {
  final Color backgroundColor;
  final IconData icon;
  final String title;
  final String description;

  const IntroPageWidget({
    super.key,
    required this.backgroundColor,
    required this.icon,
    required this.title,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      color: backgroundColor,
      padding: EdgeInsets.symmetric(horizontal: 20.w),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 100.h, color: Colors.white),
            SizedBox(height: 20.h),
            Text(
              title,
              style: GoogleFonts.poppins(
                fontSize: 24.sp,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            SizedBox(height: 10.h),
            Text(
              description,
              style: GoogleFonts.poppins(
                fontSize: 18.sp,
                color: Colors.white,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}