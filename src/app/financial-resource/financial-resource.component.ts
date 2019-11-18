import { Component, OnInit } from '@angular/core';
import { FinancialResourceService } from '../services/financial-resource.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-financial-resource',
  templateUrl: './financial-resource.component.html',
  styleUrls: ['./financial-resource.component.scss']
})
export class FinancialResourceComponent implements OnInit {

  public financialResources;

  constructor(
    private financialResourceService: FinancialResourceService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.financialResourceService
      .getFinancialResources()
      .then((financialResources: any) => {
        this.financialResources = financialResources;
      })
      .catch((err) => {
        this.toastrService.error('Erro ao buscar recursos financeiros');
        console.error('Failed to load financial resources', err);
      });
  }

  public deleteFinancialResource(id: number): void {
    this.financialResourceService.deleteFinancialResource(id)
      .then(() => {
        this.financialResources = this.financialResources.filter(financialResource => {
          return financialResource.id !== id;
        });
        this.toastrService.success('Recurso financeiro excluído com sucesso!');
      })
      .catch((err) => {
        this.toastrService.error('Erro ao excluir recurso financeiro!');
        console.error('Error to delete financial resource', err);
      });
  }

}
