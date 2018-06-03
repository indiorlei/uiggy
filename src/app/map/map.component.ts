import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Point } from '../classes/point.model';


@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
	points: Observable<any[]>;
	point = new Point(null, null, null, null);

	lat: number;
	lng: number;
	zoom: number;
	icon : string;
	icon2 : string;

	latitude: number = null;
	longitude: number = null;
	name: string = '';
	description: string = '';

	constructor(
		public authService: AuthService,
		private router: Router,
		public firebase: AngularFireDatabase) {
		this.points = firebase.list('points').valueChanges();
	}

	ngOnInit() {
		this.getUserLocation();
		this.zoom = 15;
		this.icon = "data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAeCAMAAAD5ENUgAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABblBMVEX0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0YDb0Yjj0XzTzTB3yQhH0XjT0YzrzVirySBf2e1n4moD2fFrySBjzVin0Wi7zTyD7vq3////7wbDzUCH0WS30YDfyRhX5po75qZL0WzDzUyb92tH93tTzVSj0Wy/0XDDzUiX92c/929LzVCf4noT5oYj0XDHzSxv5rZf6sJvySxz0YznzWi71bkj3jW/1b0nzWS30YTfzUSPyRhbzUCL0YTjhlN99AAAARHRSTlMAKI/O7ffsy4smCKgJIuolEuboFKyvP0OWm8/S7/DW2KCkSUu8wDlHpQ3yGVBdnqsPXGvJPEiwRE/K1HWBMUAOoxsCNkLH718AAAABYktHRFWTBLgzAAAAB3RJTUUH4gYCCRs220xIjgAAAR1JREFUKM9l0FdXwkAQBeCrIhZQFBsqKir23gsqlkEUe4klir037OK/d2chuEnuQ2bmO9mT7ACcrOwcR64zL78ARgpdZMTlTlFRMf3H4WEqKSU13jJh5dxFFqNL0eUItxVAJdfYyura+sbmVoyHKvi4bO/sapq2t39wKIZq1LDpRxrnWOehFk7xjJ+cSjs7v+BPwy+el1fX0m5u42KqQ708eyftXp5tQIDLw+OToOcXfo0a0cQl8aq/vX/onwkemoEg1y/6/knSL7ct4h6tZE4bX9hnona5lw51CZ1dqWV1K9ZjLLU3Q32ZRfd7LSc5A2kbhBL5kzSkEoaljZgMo4KCZsKYsHGLYYImrYQQTdlsmmZsFp6ds9n8gtto/wACA19FxXLqXwAAAABJRU5ErkJggg==";
		this.icon2 = "data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAeCAMAAAD5ENUgAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABaFBMVEU5oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO05oO07oe03n+0hlOsUjukglOs9ou0tmuwakupbsPCBw/RcsfAbkuosmuwxnOwkluuu2Pj///+y2vgll+swnOw6oO0YkOqQyvWUy/UznewpmOzS6fvV6/srmewynew0ne0omOvP6PvT6vsqmewZkeqGxfSJx/QZkOo0nu0ek+qZzvac0PYflOozne08ou1Lqe5xu/JMqe86oe0ml+t7CEcGAAAARHRSTlMAKI/O7ffsy4smCKgJIuolEuboFKyvP0OWm8/S7/DW2KCkSUu8wDlHpQ3yGVBdnqsPXGvJPEiwRE/K1HWBMUAOoxsCNkLH718AAAABYktHRFWTBLgzAAAAB3RJTUUH4gYCCR0YUcDixwAAARpJREFUKM9l0GVbAkEUBeCjIgZYWNiF3d1iDKjY6AquYge2Yv195wwubpwPc+e+z86zMxdgsrJzXLnuvPwCGCn0CCMeb5qKisV/XCWk0jJhjq9cWgV3ofDq2no4xG0lUMUa2djc2t7Z3YuwqYafJbp/oGnaYSx+JJsa1NL0Y4050dnUwS3XxOmZsvOLS/4a9XK9ur5RdnuXkF0DGvl58l7ZwyObJjSzPD2/SHp9e2fTglaWVFT/+PzS4yk2bUCA9Vv8JGNC3bldvqNDWNPJB/st1KXm0m0eQk9velh9Jus3hjqQocHMoId8tpPM8J+NwBR1STFqJowpG7cYJiQFrIRJaVM2w7SYsRNmxZzD5sWCw4KLSw5bXvEa21+gy17zqy9kYAAAAABJRU5ErkJggg==";

	}

	onSubmit() {
		this.firebase.list('/points').push({
			name: this.name,
			description: this.description,
			latitude: this.latitude,
			longitude: this.longitude,
		});

		this.name = "";
		this.description = "";
		this.latitude = null;
		this.longitude = null;
	}

	private getUserLocation() {

		// ini com location da ulbra polo nh
		this.lat = -29.6774951;
		this.lng = -51.1200478;

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				this.lat = position.coords.latitude;
				this.lng = position.coords.longitude;
			})
		}

	}


	onChoseLocation(event) {
		this.lat = event.coords.lat;
		this.lng = event.coords.lng;

		this.latitude = this.lat;
		this.longitude = this.lng;
	}

	getLocation() {
		this.latitude = this.lat;
		this.longitude = this.lng;
	}
}