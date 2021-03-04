import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ButtonService {
  processing: boolean = false;

  constructor() {}
}
