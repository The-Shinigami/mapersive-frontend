import { Component, ViewChild,Input,OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { InsuranceService } from 'src/app/services/insurance.service';
import Insurance from '../model/insurance';
import ResponseHandler from '../model/response';
import { MatSnackBarConfig,MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insurance-form',
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.css']
})
export class InsuranceFormComponent implements OnInit{
  insuranceForm: FormGroup;
  @ViewChild('regForm', { static: false })
  myForm!: NgForm;

  @Input() insuranceToUpdate: Insurance | undefined;
  @Output() closeUpdateDialog = new EventEmitter<Insurance>();
  @Output() cancelDialog = new EventEmitter();

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  customPrimaryColor = ''

  constructor(private fb: FormBuilder,private insuranceService:InsuranceService,private _snackBar: MatSnackBar) {
    this.insuranceForm = this.fb.group({
      insuranceId: [null],
      policyId: [null, Validators.required],
      dateOfPurchase: [null, Validators.required],
      customerId: [null, Validators.required],
      fuel: [null, Validators.required],
      vehicleSegment: [null, Validators.required],
      premium: [null, Validators.required],
      bodilyInjuryLiability: [null, Validators.required],
      personalInjuryProtection: [null, Validators.required],
      propertyDamageLiability: [null, Validators.required],
      collision: [null, Validators.required],
      comprehensive: [null, Validators.required],
      customerGender: [null, Validators.required],
      customerIncomeGroup: [null, Validators.required],
      customerRegion: [null, Validators.required],
      customerMaritalStatus: [null, Validators.required]
    });
  }
  ngOnInit(): void {
    if(this.insuranceToUpdate != undefined){
      this.insuranceForm.setValue(this.insuranceToUpdate);
    }
  }

  fuelOptions:string[] = ['Petrol' ,'Diesel', 'CNG']
  vehicleSegmentOptions:string[] = [ 'A','B','C' ]
  binaryOptions:string[] = ['0','1']
  customerGenderOptions:string[] = ['Female', 'Male']
  customerIncomeGroupOptions:string[] =['0- $25K','25K-$50K', '50K-$75K','$25-$70K', '75K-$100K', '>$70K']
  customerRegionOptions:string[] = ['South', 'West', 'North', 'East']
  async onSubmit() {
    if (this.insuranceForm.valid) {
     let res: ResponseHandler;

     
      if(this.insuranceToUpdate != undefined){
      res =  await this.insuranceService.saveUpdate(this.insuranceForm.value) 
        this.closeUpdateDialog.emit();
      }else{
      res =  await this.insuranceService.saveInsert(this.insuranceForm.value) 
       
      }


      let config = new MatSnackBarConfig();
      config.duration = 1000;
      config.horizontalPosition = this.horizontalPosition;
      config.verticalPosition = this.verticalPosition;

      this._snackBar.open(res.payload, 'Close',config);

     
      this.myForm.resetForm();
    }
    
  }

  cancel(){
    this.myForm.resetForm();

    if(this.insuranceToUpdate != undefined){
      this.cancelDialog.emit();
    }
    
  }
}
