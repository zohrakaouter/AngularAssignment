import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CalculationService} from "../_services/calculation.service";
import {Calculation} from "../_models/calculation";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-calculation',
  templateUrl: './add-calculation.component.html',
  styleUrls: ['./add-calculation.component.css']
})
export class AddCalculationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private calculationService: CalculationService) { }

  addForm: FormGroup;
  selectedOperation: string = '';
  result:any;
  calculation_num:number=0;
 
 
  ngOnInit() {
   
    this.addForm = this.formBuilder.group({
      calculationid: [this.calculation_num],
      calculation_values: this.formBuilder.group({
      number1: ['', Validators.required],
      number2: ['', Validators.required],
      }),
      operation: ['', Validators.required]
   
    });
  }
  selectChangeHandler (event: any) {
  
    this.selectedOperation = event.target.value;
    switch (this.selectedOperation) {
      case 'addition':

      this.result=Number(this.addForm.get('calculation_values').get('number1').value)+Number(this.addForm.get('calculation_values').get('number2').value);
       console.log( this.result)  ;
        
          break;
      case 'substraction':
        this.result=Number(this.addForm.get('calculation_values').get('number1').value)-Number(this.addForm.get('calculation_values').get('number2').value);
        console.log( this.result)  ;
          break;
      case 'multiplication':
        this.result=Number(this.addForm.get('calculation_values').get('number1').value)*Number(this.addForm.get('calculation_values').get('number2').value);
        console.log( this.result)  ;
          break;
      case 'division':
        this.result=Number(this.addForm.get('calculation_values').get('number1').value)/Number(this.addForm.get('calculation_values').get('number2').value);
        console.log( this.result)  ;
          break;
    }
  
  }
  onSubmit() {
  
    this.calculationService.createCalculation(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-calculations']);
      });
  }

}
