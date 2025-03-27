import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:provider/provider.dart';
import '../providers/auth_service_provider.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:auto_size_text/auto_size_text.dart';

import 'login_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final authService = Provider.of<AuthService>(context);
    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () {
              authService.signOut();
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => LoginScreen()),
              );
            },
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AutoSizeText(
              'Welcome to the Home Screen!',
              style: TextStyle(fontSize: 24.sp, fontWeight: FontWeight.bold),
              maxLines: 1,
            ).animate().fadeIn(duration: 500.ms).scale(),
            SizedBox(height: 20.h),
            ElevatedButton(
              onPressed: () {
                // Add your action here
              },
              style: ElevatedButton.styleFrom(
                foregroundColor: Colors.white, backgroundColor: Colors.blue,
                padding: EdgeInsets.symmetric(horizontal: 32.w, vertical: 16.h),
                textStyle: TextStyle(fontSize: 18.sp),
              ),
              child: Text('Get Started'),
            ),
          ],
        ),
      ),
    );
  }
}

/*
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final authService = Provider.of<AuthService>(context);
    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () {
              authService.signOut();
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => LoginScreen()),
              );
            },
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Welcome to the Home Screen!',
              style: TextStyle(fontSize: 24.sp, fontWeight: FontWeight.bold),
            ).animate().fadeIn(duration: 500.ms).scale(),
            SizedBox(height: 20.h),
            ElevatedButton(
              onPressed: () {
                // Add your action here
              },
              style: ElevatedButton.styleFrom(
                foregroundColor: Colors.white, backgroundColor: Colors.blue,
                padding: EdgeInsets.symmetric(horizontal: 32.w, vertical: 16.h),
                textStyle: TextStyle(fontSize: 18.sp),
              ),
              child: Text('Get Started'),
            ),
          ],
        ),
      ),
    );
  }
}*/