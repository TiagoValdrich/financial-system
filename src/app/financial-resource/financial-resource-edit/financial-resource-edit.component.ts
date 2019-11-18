import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FinancialResourceService } from 'src/app/services/financial-resource.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-financial-resource-edit',
  templateUrl: './financial-resource-edit.component.html',
  styleUrls: ['./financial-resource-edit.component.scss']
})
export class FinancialResourceEditComponent implements OnInit {

  public isEdit = false;
  public financialResourceId: number;
  public form: FormGroup = new FormGroup({
    title: new FormControl(null, [])
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private financialResourceService: FinancialResourceService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.financialResourceId = params.id;
        this.isEdit = true;
        this.financialResourceService.getFinancialResource(params.id)
          .then((financialResource) => {
            this.form.get('title').setValue(financialResource.title);
          })
          .catch((err) => {
            this.toastrService.error('Erro ao obter recurso financeiro.');
            console.error('Error to fetch financial resource', err);
          });
      }
    });
  }

  public save(): void {
    const data = this.form.value;

    if (this.financialResourceId) {
      data.id = this.financialResourceId;
    }

    this.financialResourceService.saveFinancialResource(data)
      .then((response) => {
        this.toastrService.success('Recurso financeiro salvo com sucesso!');
        this.router.navigate(['financial-resource']);
      })
      .catch((err) => {
        this.toastrService.error('Erro ao salvar recurso financeiro');
        console.error('Error to save financial resource', err);
      });
  }

}
