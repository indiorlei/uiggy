import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(public authService: AuthService, private router: Router) {
	}

	ngOnInit() {
	}

	signInWithFacebook() {
		this.authService.signInWithFacebook()
			.then((res) => {
				this.router.navigate(['']);
			})
			.catch((err) => console.log(err));
	}

	signInWithGoogle() {
		this.authService.signInWithGoogle()
			.then((res) => {
				this.router.navigate(['']);
			})
			.catch((err) => console.log(err));
	}

}