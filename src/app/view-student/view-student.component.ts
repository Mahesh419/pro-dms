import { Component, OnInit } from '@angular/core';
import { Location } from '../classes/location';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {

  public locations: Location[];
  
  constructor(private db : AngularFireDatabase, private firestore : AngularFirestore) {   
    
  }

  ngOnInit() {
    this.getLocationList().subscribe(data => {
      this.locations = data.map(e => {
        return {          
          ...e.payload.doc.data()
        } as Location;
      })
    });
    console.log(this.locations);
  }

  getLocationList(){
    return this.firestore.collection('location').snapshotChanges();
  }

  onPanelOpen(index : string){
    let location: Location = this.locations[0];
    let count = 0;
    while(location.username !== index){
      location = this.locations[count];
      count++;
    }
  }


  onSubmit(){
    
  }


}
