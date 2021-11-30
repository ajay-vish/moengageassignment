import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: AuthService) { }
  name: string = '';
  isLoading =  true;
  ngOnInit(): void {
    this.userService.getUserDetails().subscribe((res: any) => {
      console.log(res);
      this.name = res.data.username;
      this.isLoading = false;
    })
  }

}
