import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctor } from './doctor.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient : HttpClient, private doctor : Doctor) { }

  updatedDoctorsList = new Subject<Doctor[]>();
  tempArray : Doctor[];
  readonly firebaseUrl = "https://doctorssheet-534c4.firebaseio.com/doctors.json";

  addDoctor( id: number, name: string)
  {
    this.doctor.doctorId = id;
    this.doctor.doctorName = name;
    //console.log(this.doctor);
    this.httpClient.post(this.firebaseUrl, this.doctor)
    .pipe(
      map(responseData => {
        const docsArray = [];
        for (var key in responseData)
        {
          if (responseData.hasOwnProperty(key))
            docsArray.push({...responseData[key], id: key})
        }
        return docsArray;
      })
    )
    .subscribe((res) => {
      //console.log(res);
      this.getDoctors();
    },
    error => console.log(error.error)
    )
  }

  getDoctors()
  {
    return this.httpClient.get<{[key:string] : Doctor}>(this.firebaseUrl)
    .pipe(
      map(responseData => {
        const docsArray = [];
        for (var key in responseData)
        {
          if (responseData.hasOwnProperty(key))
            docsArray.push({...responseData[key], id: key})
        }
        return docsArray;
      })
    )
    .subscribe((res) => {
      this.updatedDoctorsList.next(res);
        this.tempArray = res;
        console.log(res);
      }
    )
  }



  //Update Doctors List Put Service
  updateDoctors(doc : Doctor)
  {
    return this.httpClient.put("https://doctorssheet-534c4.firebaseio.com/doctors/" +doc.id+".json", doc)
  }

  deleteDoctors(index: number)
  {
    //console.log(this.tempArray)
    let tempId : string;
    tempId = this.tempArray[index].id;
    this.httpClient.delete("https://doctorssheet-534c4.firebaseio.com/doctors/" +tempId +".json").subscribe(
       (res) => {
         //console.log(res)
         this.getDoctors();
       }
     )
  }
}
