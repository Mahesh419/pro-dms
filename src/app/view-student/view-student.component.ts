import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../classes/location';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import OlVectorLayer from 'ol/layer/Vector';
import OlVectorSource from 'ol/source/Vector';
import OlFeature from 'ol/Feature';
import OlPoint from 'ol/geom/Point';
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon';
import ol from 'openlayers';
import { fromLonLat } from 'ol/proj';
import { AngularFireStorage } from 'angularfire2/storage';  
import { Observable } from 'rxjs';
//import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {

  public locations: Location[];

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  vectorLayer: OlVectorLayer;
  marker: OlFeature;
  vectorSource: OlVectorSource;
  downloadURL: Observable<string>;

  private user: Observable<firebase.User>;
  
  constructor(/*private firebaseAuth: AngularFireAuth,*/ private db : AngularFireDatabase, private firestore : AngularFirestore, private afStorage: AngularFireStorage) {   
    //this.user = firebaseAuth.authState;
    //this.getLocationList(); 
  }

  ngOnInit() {
    
    this.getLocationList(); 
    var credential = firebase.auth.EmailAuthProvider.credential('sithumi@gmail.com', '12345678');
            
    firebase.auth().signInAndRetrieveDataWithCredential(credential);

    /*this.getLocationList().subscribe(data => {
      this.locations = data.map(e => {
        return {          
          ...e.payload.doc.data()
        } as Location;
      })
    });*/

    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });


    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat([80.6337, 7.8]),
      zoom: 7
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view  
    });


  }

  //public locationList: FirebaseListObservable<Location[]>;

  //7.2906° N, 80.6337° E

  //locations = FirebaseListObservable

  public locationList: AngularFireList<Location[]>;

  getLocationList(){
    
    var userId = firebase.auth().currentUser.uid;

    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        console.log(username);
        console.log(snapshot);
    });

   /* this.locationList = this.db.list('/users');
    console.log(this.locationList);
    return this.locationList;*/
    
    // console.log(JSON.stringify(result));
    // let res = this.firestore.collection('users').snapshotChanges();
    // res.subscribe(
    //   data => {
    //     console.log(data);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    // return res;
   
  }

  

  onPanelOpen(curlocations : Location){  
    
    console.log(`image url: ${curlocations.image}`)
    
    this.getProfileImageUrl(curlocations.image);

    this.marker = new OlFeature({
      // Added fromLonLat
      geometry: new OlPoint(fromLonLat([curlocations.latitude, curlocations.longitude]))
    });

    var featureStyle = new Style({
      image: new Icon({
        src: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Red_dot_2.png',
        scale: 0.3
      })
    })

    this.marker.setStyle(featureStyle);

    this.vectorSource = new OlVectorSource({
        features: [this.marker]
    });

    this.vectorLayer = new OlVectorLayer({
        source: this.vectorSource
    });

    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });


    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat([curlocations.latitude, curlocations.longitude]),
      zoom: 11
    });
    
    this.map.getLayers().forEach(layer => this.map.removeLayer(layer));
    this.map.addLayer(this.layer);
    this.map.addLayer(this.vectorLayer);
    this.map.setView(this.view); 
    this.map.getLayers().forEach(layer => layer.getSource().refresh());
  }

  onPanelClose(){
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat([80.6337, 7.8]),
      zoom: 7
    });

    this.map.getLayers().forEach(layer => this.map.removeLayer(layer));
    this.map.addLayer(this.layer);
    this.map.setView(this.view);     
  }

  getProfileImageUrl(url: string) {
    this.downloadURL = this.afStorage.ref(url).getDownloadURL();
  }


}
