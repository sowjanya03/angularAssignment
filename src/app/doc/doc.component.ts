import { Component, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import { Doctor } from '../shared/doctor.model';
import { NgForm } from '@angular/forms';
import { DoctorService } from '../shared/doctor.service';
import { SortByNamesPipe } from '../shared/sort-by-names.pipe';
import { SortByIdsPipe } from '../shared/sort-by-ids.pipe';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {
 
  constructor(private doctor : Doctor, private doctorService : DoctorService, 
    private sortByNames : SortByNamesPipe, private sortByIDs : SortByIdsPipe) { }

  docName = '';
  docChangeId : number;
  doctors : Doctor[];
  sortNames : boolean = false;
  sortIds : boolean = false;
  currentSortTechnique : string;
  buttonAction : boolean = true;
  nameClass : string = '';
  //currentSortTechnique : Subject<string>;
  @ViewChild('addDoctorsForm') addForm : NgForm;
  @ViewChild('doctorsListForm') listForm : NgForm;
  @ViewChild('changeDocId') tempId : ElementRef;
  @ViewChild('changeDocName') tempName: ElementRef; 

  ngOnInit(): void {
    this.getDoctorsList();
    //Subscribing to the Subject of updatedDoctorsList
    this.doctorService.updatedDoctorsList.subscribe(res => {
      //console.log(res);
      this.doctors = res;
      this.sortById(); 
    })    
  }

  //Add at end method
  onAddLast(name : HTMLInputElement)
  {
    let index = this.doctors.length+1;
    this.doctorService.addDoctor(index, name.value);
    this.addForm.resetForm();
  }

  //add at top method
  onAddFirst(name : HTMLInputElement)
  {
    let index = 1;
    this.doctorService.addDoctor(index, name.value);
    this.addForm.resetForm();
    this.sortById();
  }

  getDoctorsList()
  {
    this.doctorService.getDoctors()
  }

  onStateChange(index : number)
  {    
    this.doctors[index].isSelected = !this.doctors[index].isSelected;
    this.doctors[index].isEnabled = !this.doctors[index].isSelected;
  }

  //Edit and Save Record
  onUpdateRecord(index : number)
  {
      let doc = this.doctors[index];
      doc.doctorId = +this.tempId.nativeElement.value;
      doc.doctorName = this.tempName.nativeElement.value;
      doc.isSelected = false;
      doc.isEnabled = true;
      this.doctorService.updateDoctors(doc)
      .subscribe((res) => 
      {
        //console.log(res)
        this.doctorService.getDoctors();
        //Get the latest records and sort by active sorting method
        this.doctorService.updatedDoctorsList.subscribe(res => {
          //console.log(res);
          this.doctors = res;
          console.log("Current Active Sort " +this.currentSortTechnique)
        if ( this.currentSortTechnique === 'sortNames' )
        { this.sortByName(); }
        else
        { this.sortById(); }
        })
      }
      )
  }

  //Delete Record
  onDeleteRecord(index: number)
  {
    this.doctorService.deleteDoctors(index);
  }

  //Sort By Name using pipe
  sortByName()
  {
      //this.nameClass = 'changedStyle';
      this.currentSortTechnique = 'sortNames';
      this.sortByNames.transform(this.doctors);
  }

  //Sort By Id using pipe
  sortById()
  {
      //this.nameClass = 'changedStyle';
      this.currentSortTechnique = 'sortIds';
      this.sortByIDs.transform(this.doctors);
  }

  //Swap Down Method
  swapDown(index : number)
  {
    if (index != this.doctors.length-1)
    {
      [this.doctors[index], this.doctors[index + 1]] = [this.doctors[index + 1], this.doctors[index]];
    }
  }

  //Swap Up Method
  swapUp(index : number)
  {
    if (index != 0)
    {
      [this.doctors[index], this.doctors[index - 1]] = [this.doctors[index - 1], this.doctors[index]];
    }
  }
}
