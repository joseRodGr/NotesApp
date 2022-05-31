import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  shorten(text: string, numOfWords: number){
    const words = text.split(' ');
    if(words.length <= numOfWords) return text;
    return words.slice(0,numOfWords).join(' ') + '...';
  }

  limitLetters(text: string, numLetters: number){
    if(text.length <= numLetters) return text;
    return text.substring(0,numLetters) + '...';
  }


}
