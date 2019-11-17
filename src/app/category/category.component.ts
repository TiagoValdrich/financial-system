import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public categories;

  constructor(
    private categoryService: CategoryService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.categoryService
      .getCategories()
      .then((categories: any) => {
        this.categories = categories;
      })
      .catch((err) => {
        this.toastrService.error('Erro ao buscar categorias');
        console.error('Failed to load categories', err);
      });
  }

  public deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id)
      .then(() => {
        this.categories = this.categories.filter(category => {
          return category.id !== id;
        });
        this.toastrService.success('Categoria excluida com sucesso!');
      })
      .catch((err) => {
        this.toastrService.error('Erro ao excluir categoria!');
        console.error('Error to delete category', err);
      });
  }

}
