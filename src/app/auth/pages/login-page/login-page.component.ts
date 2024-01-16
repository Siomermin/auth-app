import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);

  public isLoading: boolean = false;

  public myForm: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getErrorByField(field: string) {
    return this.validatorsService.getErrorByField(this.myForm, field);
  }

  login() {
    this.isLoading = true;
    const { email, password } = this.myForm.value;
    this.authService.login(email, password).then(() => {
      this.isLoading = false;
    });
  }

  onSubmit() {
    this.login();
  }
}
