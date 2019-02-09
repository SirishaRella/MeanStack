import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'firebase/storage';
import {HomePageModule} from "./home.module";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private img1: any;
  public static uid: any;
  private static jsonData: { imageUrl: any };

  constructor(private afStorage: AngularFireStorage, private fdb: AngularFireDatabase,
    private afAuth: AngularFireAuth, private Toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data =>{
      HomePage.uid = data.uid;
      if(data.email && data.uid)
      {
        this.Toast.create({
          message:'Welcome to '+ data.email,
          duration: 5000
        }).present();
      }
        else{
        this.Toast.create({
          message:"Could not find authentication",
          duration: 5000
        }).present();
      }
      this.fdb.list(HomePage.uid);
  });

    console.log('ionViewDidLoad HomePage');
  }

  fileChange(event) : AngularFireUploadTask{
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.img1 = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
      let fileList: FileList = event.target.files;
      let file: File = fileList[0];
      const storageRef: AngularFireStorageReference = this.afStorage
        .ref('/' + HomePage.uid + '/' +file.name);

        storageRef.put(file).then(snapshot => {
        firebase.storage().ref('/' + HomePage.uid + '/' +file.name).getDownloadURL().then(function(url){
          console.log(url);
          firebase.database().ref(HomePage.uid).push(url);
        }).catch(function(error){
          console.log(error);
        });


        });
    return storageRef.put(file);
    }

    display(){
      firebase.database().ref(HomePage.uid).once('value', function(snapshot){
        let resData = snapshot.val();
        let keys = Object.keys(snapshot.val());
        var htmlData = "";
        for(var i =0;i<keys.length;i++) {
          htmlData += "<img src="+resData[keys[i]]+" class='imgStyle'>";
        }
      console.log(snapshot.val());
        document.getElementById('dataContainer').innerHTML = htmlData;
      });

    }


}
