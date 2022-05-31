import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {

  showMenu = false;
  @ViewChild('menu') menu!: ElementRef;
  @ViewChild('logo') logo!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.setEvents();
  }

  switchMenu(){
    this.showMenu = !this.showMenu;
  }

  setEvents(){

    window.addEventListener('scroll', () => {
      this.menu.nativeElement.classList.remove('showMenu')
    });
  
    this.logo.nativeElement.addEventListener('click', () => {
        this.menu.nativeElement.classList.remove('showMenu');
    });
  
    for (const item of this.menu.nativeElement.childNodes){
        item.addEventListener('click', () => {
            this.menu.nativeElement.classList.remove('showMenu');
        });
    }

  }
}
