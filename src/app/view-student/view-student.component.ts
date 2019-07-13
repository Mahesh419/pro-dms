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
import { fromLonLat } from 'ol/proj'

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

  //7.2906° N, 80.6337° E

  getLocationList(){
    return this.firestore.collection('location').snapshotChanges();
  }

  onPanelOpen(curlocations : Location){   
    this.marker = new OlFeature({
      // Added fromLonLat
      geometry: new OlPoint(fromLonLat([curlocations.lat, curlocations.lng]))
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
      center: fromLonLat([curlocations.lat, curlocations.lng]),
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


}
