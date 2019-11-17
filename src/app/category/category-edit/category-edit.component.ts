import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  public isEdit = false;
  public categoryId: number;
  public form: FormGroup = new FormGroup({
    title: new FormControl(null, [])
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.categoryId = params.id;
        this.isEdit = true;
        this.categoryService.getCategory(params.id)
          .then((revenue) => {
            this.form.get('title').setValue(revenue.title);
          })
          .catch((err) => {
            this.toastrService.error('Erro ao obter categoria.');
            console.error('Error to fetch category', err);
          });
      }
    });
  }

  public save(): void {
    const data = this.form.value;

    if (this.categoryId) {
      data.id = this.categoryId;
    }

    this.categoryService.saveCategory(data)
      .then((response) => {
        this.toastrService.success('Categoria salva com sucesso!');
        this.router.navigate(['category']);
      })
      .catch((err) => {
        this.toastrService.error('Erro ao salvar categoria');
        console.error('Error to save category', err);
      });
  }

}
