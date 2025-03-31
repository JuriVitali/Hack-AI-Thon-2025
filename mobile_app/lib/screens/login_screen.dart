import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_service_provider.dart';
import 'home_screen.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:animations/animations.dart';
import 'package:google_fonts/google_fonts.dart'; // Importa Google Fonts

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  bool isLogin = true;
  String errorMessage = '';

  @override
  Widget build(BuildContext context) {
    final authService = Provider.of<AuthService>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(
          isLogin ? 'Login' : 'Registrazione',
          style: GoogleFonts.poppins(
            fontSize: 20.sp,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: PageTransitionSwitcher(
          duration: Duration(milliseconds: 300),
          transitionBuilder: (Widget child, Animation<double> animation, Animation<double> secondaryAnimation) {
            return SharedAxisTransition(
              child: child,
              animation: animation,
              secondaryAnimation: secondaryAnimation,
              transitionType: SharedAxisTransitionType.horizontal,
            );
          },
          child: isLogin ? buildLogin(authService) : buildSignUp(authService),
        ),
      ),
    );
  }

  Widget buildLogin(AuthService authService) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        TextField(
          controller: emailController,
          decoration: InputDecoration(
            labelText: 'Email',
            labelStyle: GoogleFonts.poppins(fontSize: 16.sp),
            border: OutlineInputBorder(),
          ),
        ),
        SizedBox(height: 16.h),
        TextField(
          controller: passwordController,
          decoration: InputDecoration(
            labelText: 'Password',
            labelStyle: GoogleFonts.poppins(fontSize: 16.sp),
            border: OutlineInputBorder(),
          ),
          obscureText: true,
        ),
        SizedBox(height: 16.h),
        ElevatedButton(
          onPressed: () async {
            try {
              await authService.signIn(
                emailController.text,
                passwordController.text,
              );
              if (!context.mounted) return;
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => HomeScreen()),
              );
            } catch (e) {
              setState(() {
                errorMessage = 'Login fallito. Controlla le tue credenziali.';
              });
            }
          },
          child: Text(
            'Login',
            style: GoogleFonts.poppins(fontSize: 16.sp),
          ),
        ),
        ElevatedButton(
          onPressed: () async {
            try {
              await authService.signInWithGoogle();
              if (!context.mounted) return;
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => HomeScreen()),
              );
            } catch (e) {
              setState(() {
                errorMessage = 'Accesso con Google fallito. Riprova.';
              });
            }
          },
          child: Text(
            'Login con Google',
            style: GoogleFonts.poppins(fontSize: 16.sp),
          ),
        ),
        TextButton(
          onPressed: () {
            setState(() {
              isLogin = false;
            });
          },
          child: Text(
            'Non hai un account? Registrati',
            style: GoogleFonts.poppins(fontSize: 14.sp),
          ),
        ),
        if (errorMessage.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: 16.0),
            child: Text(
              errorMessage,
              style: GoogleFonts.poppins(fontSize: 14.sp, color: Colors.red),
            ),
          ),
      ],
    );
  }

  Widget buildSignUp(AuthService authService) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        TextField(
          controller: emailController,
          decoration: InputDecoration(
            labelText: 'Email',
            labelStyle: GoogleFonts.poppins(fontSize: 16.sp),
            border: OutlineInputBorder(),
          ),
        ),
        SizedBox(height: 16.h),
        TextField(
          controller: passwordController,
          decoration: InputDecoration(
            labelText: 'Password',
            labelStyle: GoogleFonts.poppins(fontSize: 16.sp),
            border: OutlineInputBorder(),
          ),
          obscureText: true,
        ),
        SizedBox(height: 16.h),
        ElevatedButton(
          onPressed: () async {
            try {
              await authService.signUp(
                emailController.text,
                passwordController.text,
              );
              if (!context.mounted) return;
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => HomeScreen()),
              );
            } catch (e) {
              setState(() {
                errorMessage = 'Registrazione fallita. Riprova.';
              });
            }
          },
          child: Text(
            'Registrati',
            style: GoogleFonts.poppins(fontSize: 16.sp),
          ),
        ),
        TextButton(
          onPressed: () {
            setState(() {
              isLogin = true;
            });
          },
          child: Text(
            'Hai già un account? Accedi',
            style: GoogleFonts.poppins(fontSize: 14.sp),
          ),
        ),
        if (errorMessage.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: 16.0),
            child: Text(
              errorMessage,
              style: GoogleFonts.poppins(fontSize: 14.sp, color: Colors.red),
            ),
          ),
      ],
    );
  }
}

/*import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_service_provider.dart';
import 'home_screen.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:animations/animations.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  bool isLogin = true;
  String errorMessage = '';

  @override
  Widget build(BuildContext context) {
    final authService = Provider.of<AuthService>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(isLogin ? 'Login' : 'Registrazione'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: PageTransitionSwitcher(
          duration: Duration(milliseconds: 300),
          transitionBuilder: (Widget child, Animation<double> animation, Animation<double> secondaryAnimation) {
            return SharedAxisTransition(
              child: child,
              animation: animation,
              secondaryAnimation: secondaryAnimation,
              transitionType: SharedAxisTransitionType.horizontal,
            );
          },
          child: isLogin ? buildLogin(authService) : buildSignUp(authService),
        ),
      ),
    );
  }

  Widget buildLogin(AuthService authService) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        TextField(
          controller: emailController,
          decoration: InputDecoration(
            labelText: 'Email',
            border: OutlineInputBorder(),
          ),
        ),
        SizedBox(height: 16.h),
        TextField(
          controller: passwordController,
          decoration: InputDecoration(
            labelText: 'Password',
            border: OutlineInputBorder(),
          ),
          obscureText: true,
        ),
        SizedBox(height: 16.h),
        ElevatedButton(
          onPressed: () async {
            try {
              await authService.signIn(
                emailController.text,
                passwordController.text,
              );
              if (!context.mounted) return;
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => HomeScreen()),
              );
            } catch (e) {
              setState(() {
                errorMessage = 'Login failed. Please check your credentials.';
              });
            }
          },
          child: Text('Login'),
        ),
        ElevatedButton(
          onPressed: () async {
            try {
              await authService.signInWithGoogle();
              if (!context.mounted) return;
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => HomeScreen()),
              );
            } catch (e) {
              setState(() {
                errorMessage = 'Google sign-in failed. Please try again.';
              });
            }
          },
          child: Text('Login with Google'),
        ),
        TextButton(
          onPressed: () {
            setState(() {
              isLogin = false;
            });
          },
          child: Text('Non hai un account? Registrati'),
        ),
        /*TextButton(
          onPressed: () async {
            try {
              await authService.sendPasswordResetEmail(emailController.text);
              setState(() {
                errorMessage = 'Password reset email sent. Check your inbox.';
              });
            } catch (e) {
              setState(() {
                errorMessage = 'Failed to send password reset email. Please try again.';
              });
            }
          },
          child: Text('Forgot Password?'),
        ),*/
        if (errorMessage.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: 16.0),
            child: Text(
              errorMessage,
              style: TextStyle(color: Colors.red),
            ),
          ),
      ],
    );
  }

  Widget buildSignUp(AuthService authService) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        TextField(
          controller: emailController,
          decoration: InputDecoration(
            labelText: 'Email',
            border: OutlineInputBorder(),
          ),
        ),
        SizedBox(height: 16.h),
        TextField(
          controller: passwordController,
          decoration: InputDecoration(
            labelText: 'Password',
            border: OutlineInputBorder(),
          ),
          obscureText: true,
        ),
        SizedBox(height: 16.h),
        ElevatedButton(
          onPressed: () async {
            try {
              await authService.signUp(
                emailController.text,
                passwordController.text,
              );
              if (!context.mounted) return;
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => HomeScreen()),
              );
            } catch (e) {
              setState(() {
                errorMessage = 'Registration failed. Please try again.';
              });
            }
          },
          child: Text('Registrati'),
        ),
        TextButton(
          onPressed: () {
            setState(() {
              isLogin = true;
            });
          },
          child: Text('Hai già un account? Accedi'),
        ),
        if (errorMessage.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: 16.0),
            child: Text(
              errorMessage,
              style: TextStyle(color: Colors.red),
            ),
          ),
      ],
    );
  }
}*/