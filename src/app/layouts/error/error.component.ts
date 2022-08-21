import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cpp-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent implements OnInit {
  errorMessage?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      // @ts-ignore
      if (routeData.errorMessage) {
        // @ts-ignore
        this.errorMessage = routeData.errorMessage;
      }
    });
  }
}
