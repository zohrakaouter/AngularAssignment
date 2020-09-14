import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CalculationService} from "../_services/calculation.service";
import {Calculation} from "../_models/calculation";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-calculations',
  templateUrl: './list-calculations.component.html',
  styleUrls: ['./list-calculations.component.css']
})
export class ListCalculationsComponent implements OnInit {
  calculations: Calculation[];

  constructor(private router: Router, private calculationService: CalculationService) { }

  ngOnInit() {
    this.calculationService.getCalculations() 
    
      .subscribe( data => {
        console.log(" nchoufo calcs  "+JSON.stringify( data['data']));
       this.calculations = data['data'];
       // this.calculationService.calcsLength=this.calculations.length.toString();
        
      });
      
  }
  deleteCalculation(calculation: Calculation): void {
    this.calculationService.deleteCalculation(calculation.id)
      .subscribe( data => {
        this.calculations = this.calculations.filter(u => u !== calculation);
        this.calculationService.calcsLength=this.calculations.length.toString();
      })
  };

  editCalculation(calculation: Calculation): void {
    localStorage.removeItem("editCalculationId");
    localStorage.setItem("editCalculationId", calculation.id.toString());
    this.router.navigate(['edit-calculation']);
  };

  addCalculation(): void {
    this.calculationService.calcsLength=this.calculations.length.toString();
    this.router.navigate(['add-calculation']);
    
  };

}
