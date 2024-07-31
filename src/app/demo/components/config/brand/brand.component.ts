import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/demo/api/base';
import { BrandService } from 'src/app/demo/service/brand.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './brand.component.html',
})
export class BrandComponent implements OnInit {
    loading: boolean = true;
    cols: TableColumn[] = [];
    data: any[] = [];
    constructor(protected layoutService: LayoutService, private brandService: BrandService) {}

    ngOnInit() {
        this.cols = [
            {
                field: 'code',
                header: 'Código',
                type: 'number',
            },
            {
                field: 'name',
                header: 'Nome',
                type: 'text',
            },
            {
                field: 'modelsCount',
                header: 'Quantidade de modelos',
                type: 'number',
            },
            {
                field: 'createdAt',
                header: 'Criado em',
                type: 'date',
                format: 'dd/MM/yy HH:mm:ss',
            },
            {
                field: 'updatedAt',
                header: 'Atualizado em',
                type: 'date',
                format: 'dd/MM/yy HH:mm:ss',
            },
        ];
        this.fetchData();
    }

    fetchData() {
        this.brandService.getBrands().subscribe((x) => {
            this.data = x.object;
            this.loading = false;
        });
    }

    sync() {
        this.brandService.syncBrands().subscribe(() => {
            this.loading = true;
            this.fetchData();
        });
    }
}
