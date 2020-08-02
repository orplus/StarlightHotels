import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Hotel } from "../../models/hotel.model";
import { SelectionModel } from '@angular/cdk/collections';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelService } from "../../services/hotel.service";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pays } from 'src/app/models/pays.model';
import { HotelCreateComponent } from './hotel-create/hotel-create.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styles: [
  ]
})
export class HotelComponent implements OnInit {
  faPlus = faPlus;
  dataSaved = false;  
  hotelForm: any;  
  allHotels: Hotel[];
  allCountries: Pays[];
  hotelIdUpdate = null;  
  message = null; 
  hotelCountryId;
  hotelCountryName: string; 

  constructor(private formbuilder: FormBuilder, private hotelService : HotelService, private toastr: ToastrService, 
    public dialog: MatDialog) { }
 
  async ngOnInit()
  {
    await this.loadData();
  }

  async loadData()
  { 
    await this.hotelService.getHotelsAsync().then((data) =>{
        this.allHotels = data;
    }).catch(console.log);

    this.hotelService.getCountries().subscribe(
      (data) => {
        this.allCountries = data;
        console.log(this.allCountries);
      }
    )   
  }

  getCountryName(paysId){
        
    let paysName = '';
    if(this.allCountries && this.allCountries.length > 0 && this.allCountries.findIndex(country => country.id == paysId) != -1)
    {
      paysName = this.allCountries.find(country => country.id == paysId).nom;
    }
    return paysName;
  }

  updateHotel(hotel: Hotel)
  {  
    if(hotel.id != 0)
    {  
      this.hotelService.updateHotel().subscribe(() => {
        this.hotelForm.controls['id'].setValue(hotel.id);  
        this.hotelForm.controls['nom'].setValue(hotel.nom);  
        this.hotelForm.controls['nbEtoiles'].setValue(hotel.nbEtoiles);  
        this.hotelForm.controls['nbChambres'].setValue(hotel.nbChambres);  
        this.hotelForm.controls['description'].setValue(hotel.description);  
        this.hotelForm.controls['adresse'].setValue(hotel.adresse);  
        this.hotelForm.controls['codePostal'].setValue(hotel.codePostal);
        this.hotelForm.controls['ville'].setValue(hotel.ville);  
        this.hotelForm.controls['pays'].setValue(hotel.pays.nom); 
        this.hotelForm.controls['telephone'].setValue(hotel.telephone);  
        this.hotelForm.controls['enPromotion'].setValue(hotel.enPromotion); 
        this.hotelForm.controls['topDestination'].setValue(hotel.topDestination);  
        this.hotelForm.controls['actif'].setValue(hotel.actif); 
        this.hotelForm.controls['coefficient'].setValue(hotel.coefficient);
        this.hotelForm.controls['checkIn'].setValue(hotel.checkIn);
        this.hotelForm.controls['checkOut'].setValue(hotel.checkOut);
        this.toastr.success('This hotel is updated with success', 'Update successful !');
      });  
    }  
  }

  editHotel(hotelId: number)
  {  
    this.hotelService.updateHotel().subscribe(hotel => {  
      this.hotelForm.controls['id'].setValue(hotel.id);  
      this.hotelForm.controls['nom'].setValue(hotel.nom);  
      this.hotelForm.controls['nbEtoiles'].setValue(hotel.nbEtoiles);  
      this.hotelForm.controls['nbChambres'].setValue(hotel.nbChambres);  
      this.hotelForm.controls['description'].setValue(hotel.description);  
      this.hotelForm.controls['adresse'].setValue(hotel.adresse);  
      this.hotelForm.controls['codePostal'].setValue(hotel.codePostal);
      this.hotelForm.controls['ville'].setValue(hotel.ville);  
      this.hotelForm.controls['pays'].setValue(hotel.pays.nom); 
      this.hotelForm.controls['telephone'].setValue(hotel.telephone);  
      this.hotelForm.controls['enPromotion'].setValue(hotel.enPromotion); 
      this.hotelForm.controls['topDestination'].setValue(hotel.topDestination);  
      this.hotelForm.controls['actif'].setValue(hotel.actif); 
      this.hotelForm.controls['coefficient'].setValue(hotel.coefficient);
      this.hotelForm.controls['checkIn'].setValue(hotel.checkIn);
      this.hotelForm.controls['checkOut'].setValue(hotel.checkOut);
    });
  }
  
  /* delete(hotelId: number) {  
    if(confirm("Are you sure you want to delete this ?"))
    {   
      this.hotelService.deleteHotel(hotelId).subscribe(() => {  
        this.dataSaved = true;  
        this.toastr.success('This hotel is deleted with success', 'Deletion successful !');
        this.LoadData();  
        this.hotelIdUpdate = null;  
        this.hotelForm.reset();  
      });  
    }  
  } */    

  // A dialog for hotel's details
  openDialogHotelDetail(data)
  {  
    debugger;  
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;  
    dialogConfig.position = {  
        'top': '100px',  
        'left': '500px'  
    };  
    dialogConfig.width = '500px';  
    dialogConfig.height = '500px';  
    dialogConfig.data = {  
        Id: data.Id  
    };  
    this.dialog.open(HotelDetailComponent, dialogConfig);  
  }
  
  // A dialog for hotel's creation
  async openDialogHotelForm()
  {  
    debugger;  
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1000px';  
    dialogConfig.height = '1000px';   
    const dialogRef = this.dialog.open(HotelCreateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async result => {
      if(result === 'ok')
      {
        // refresh table
        await this.loadData()
      } 
    });
  }
}