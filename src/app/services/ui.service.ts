import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }

  isLargeScreen(element?: HTMLElement): boolean {
    const screenWidth = window.innerWidth || element.clientWidth;
    const mobileScreen = 600;
    if (screenWidth >= mobileScreen) {
      return true;
    } else {
      return false;
    }
  }
}
