import { Component, OnInit } from '@angular/core';
import {CalculationService} from "../_services/calculation.service";
import {Router} from "@angular/router";
import {Calculation} from "../_models/calculation";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit-Calculation',
  templateUrl: './edit-Calculation.component.html',
  styleUrls: ['./edit-Calculation.component.css']
})
export class EditCalculationComponent implements OnInit {

  calculation: Calculation;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private calculationService: CalculationService) { }

  ngOnInit() {
    let calculationId = localStorage.getItem("editCalculationId");
    if(!calculationId) {
      alert("Invalid action.")
      this.router.navigate(['list-calculations']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.calculationService.getCalculationById(+calculationId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.calculationService.updateCalculation(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-calculations']);
        },
        error => {
          alert(error);
        });
  }

}
