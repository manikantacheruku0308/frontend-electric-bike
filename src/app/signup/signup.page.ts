import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]], 
    });
  }

  onSignup() {
    if (this.signupForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const { username, password, email } = this.signupForm.value;
    this.userService.signup({ username, password, email }).subscribe({
      next: (response: any) => {
        console.log('Signup success:', response);
        this.navCtrl.navigateRoot('/login'); 
      },
      error: (error: any) => {
        console.error('Signup error:', error);
        
      }
    });
  }
}
