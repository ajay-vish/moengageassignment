import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "app-redirect-url",
	templateUrl: "./redirect-url.component.html",
	styleUrls: ["./redirect-url.component.css"],
})
export class RedirectUrlComponent implements OnInit {
	currentRoute: any;
	constructor(private router: Router, private activatedRoute: ActivatedRoute) {
	}

	ngOnInit(): void {
		if(this.router.url){
			let authlist = this.router.url.split('=');
			let auth = authlist[1];
			if(auth){
				localStorage.setItem('oauthToken', auth);
				this.router.navigate([''])
			}
			else{
				this.router.navigate(['404'])
			}
		}
		console.log(this.router.url);
  }
}
