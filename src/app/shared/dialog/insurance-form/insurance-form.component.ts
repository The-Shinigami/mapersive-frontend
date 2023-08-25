import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-insurance-form',
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.css']
})
export class InsuranceFormComponent {
  insuranceForm: FormGroup;
  @ViewChild('regForm', { static: false })
  myForm!: NgForm;
  
  constructor(private fb: FormBuilder,private insuranceService:InsuranceService) {
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

  fuelOptions:string[] = ['Petrol' ,'Diesel', 'CNG']
  vehicleSegmentOptions:string[] = [ 'A','B','C' ]
  binaryOptions:string[] = ['0','1']
  customerGenderOptions:string[] = ['Female', 'Male']
  customerIncomeGroupOptions:string[] =['0- $25K','25K-$50K', '50K-$75K','$25-$70K', '75K-$100K', '>$70K']
  customerRegionOptions:string[] = ['South', 'West', 'North', 'East']
  async onSubmit() {
    if (this.insuranceForm.valid) {

      await this.insuranceService.save(this.insuranceForm.value) 
      this.myForm.resetForm();
    }
    else{
      console.log(this.insuranceForm)
    }
  }
}
