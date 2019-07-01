import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ADMINROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'View All',  icon:'dashboard', class: '' },
   
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems = ADMINROUTES.filter(menuItem => menuItem);    


  constructor() { }


  ngOnInit() {    
    //this.menuItems = ADMINROUTES.filter(menuItem => menuItem);    
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
