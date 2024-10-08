import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const { username, password } = this.loginForm.value;
    this.userService.login({ username, password }).subscribe({
      next: (response: any) => {
        console.log('Login success:', response);
        localStorage.setItem("userId",response.user._id)
        localStorage.setItem("email",response.user.email)
        localStorage.setItem("username",response.user.username)
        this.navCtrl.navigateRoot('/home');
      },
      error: (err: any) => {
        console.error('Login error:', err);
        
        alert(err.error.message || 'Login failed');
      }
    });
  }
} 
