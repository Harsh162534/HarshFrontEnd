import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('captchaCanvas') captchaCanvas!: ElementRef<HTMLCanvasElement>;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    captcha: new FormControl('', [Validators.required])
  });

  myToken: any = "";
  role: any = "";
  generatedCaptcha: string = "";
  captchaError: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.generateCaptcha();
  }

  generateCaptcha() {
    const canvas = this.captchaCanvas.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Fill background with light color
      context.fillStyle = '#f2f2f2';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Generate random text
      this.generatedCaptcha = this.randomText(6);
      // Set text properties
      context.font = '30px Arial';
      context.fillStyle = '#000';
      context.textBaseline = 'middle';
      context.textAlign = 'center';
      
      // Add some noise lines
      for (let i = 0; i < 5; i++) {
        context.strokeStyle = this.randomColor();
        context.beginPath();
        context.moveTo(this.randomNumber(0, canvas.width), this.randomNumber(0, canvas.height));
        context.lineTo(this.randomNumber(0, canvas.width), this.randomNumber(0, canvas.height));
        context.stroke();
      }

      // Draw the CAPTCHA text
      context.fillText(this.generatedCaptcha, canvas.width / 2, canvas.height / 2);
    }
  }

  randomText(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    for(let i = 0; i < length; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return text;
  }

  randomColor(): string {
    const r = Math.floor(Math.random() * 150);
    const g = Math.floor(Math.random() * 150);
    const b = Math.floor(Math.random() * 150);
    return `rgb(${r}, ${g}, ${b})`; // Corrected syntax
  }
  
  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  logIn() {
    // Reset CAPTCHA error
    this.captchaError = false;

    // Validate CAPTCHA
    const userCaptcha = this.loginForm.get('captcha')?.value;
    if (userCaptcha !== this.generatedCaptcha) {
      this.captchaError = true;
      this.generateCaptcha(); // Refresh CAPTCHA on failure
      return;
    }

    // Proceed with login
    this.loginService.signIn(this.loginForm.value).subscribe({
      next: (response) => {
        this.myToken = response.accessToken; // Local level
        console.log(this.myToken);
        // Store in Local Storage
        localStorage.setItem('token', this.myToken);
        const payload = JSON.parse(atob(this.myToken.split('.')[1]));
        console.log(payload);
        const userRole = payload['role'];
        console.log(userRole[0].authority);
        if (userRole[0].authority === 'ROLE_ADMIN') {
          this.router.navigateByUrl('/adminDashboard');
        } 
        if (userRole[0].authority === 'ROLE_CUSTOMER') {
          this.router.navigateByUrl('/userdashboard');
        } 
        if (userRole[0].authority === 'ROLE_LOANOFFICER') {
          this.router.navigateByUrl('/adminDashboard');
        } else {
          // this.router.navigateByUrl('/userdashboard');
          this.router.navigateByUrl('/loanofficerdashboard');
        }
      },
      error: (err: HttpErrorResponse) => {
        // Handle login errors here
        console.error('Login failed', err);
      }
    });
  }
}

function rgb($: any, arg1: { r: number; }, $1: any, arg3: { g: number; }, $2: any, arg5: { b: number; }): string {
  throw new Error('Function not implemented.');
}
