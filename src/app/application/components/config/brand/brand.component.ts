import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageServiceSuccess, TableColumn } from 'src/app/application/api/base';
import { BrandService } from 'src/app/application/service/brand.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './brand.component.html',
})
export class BrandComponent implements OnInit {
    type: string = '';
    loading: boolean = true;
    cols: TableColumn[] = [];
    data: any[] = [];
    constructor(protected layoutService: LayoutService, private brandService: BrandService, private route: ActivatedRoute, private messageService: MessageService) {}

    ngOnInit() {
        this.cols = [
            {
                field: 'code',
                header: 'Código',
                type: 'text',
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
        this.route.paramMap.subscribe((params) => {
            this.type = params.get('type') ?? '';
            this.fetchData();
        });
    }

    fetchData() {
        this.loading = true;
        this.brandService.getBrands(this.type).subscribe((x) => {
            this.data = x.object;
            this.loading = false;
        });
    }

    sync() {
        this.brandService.syncBrands().subscribe(() => {
            this.messageService.add(MessageServiceSuccess);
            this.loading = true;
            this.fetchData();
        });
    }
}
