import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';
  isIframe = false;

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
  }
}
