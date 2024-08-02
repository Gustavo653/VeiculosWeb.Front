import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageServiceSuccess, TableColumn } from 'src/app/application/api/base';
import { BrandService } from 'src/app/application/service/brand.service';
import { ModelService } from 'src/app/application/service/model.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './model.component.html',
})
export class ModelComponent implements OnInit {
    type: string = '';
    loading: boolean = true;
    brands: any[] = [];
    brandId: string = '';
    cols: TableColumn[] = [];
    data: any[] = [];
    constructor(
        protected layoutService: LayoutService,
        private brandService: BrandService,
        private modelService: ModelService,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) { }

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
            }
        ];
        this.route.paramMap.subscribe(params => {
            this.type = params.get('type') ?? '';
            this.fetchBrands();
        });
    }

    fetchBrands() {
        this.loading = true;
        this.brandService.getBrands(this.type).subscribe((x) => {
            this.brands = x.object;
            this.brandChange(null);
            this.loading = false;
        });
    }

    brandChange(event: any) {
        if (event == null) {
            this.data = [];
            return;
        }
        this.fetchModels(event.id);
    }

    fetchModels(brandId: string) {
        this.loading = true;
        this.modelService.getModels(this.type, brandId).subscribe((x) => {
            this.data = x.object;
            this.loading = false;
        });
    }

    sync() {
        this.modelService.syncModels().subscribe(() => {
            this.messageService.add(MessageServiceSuccess);
            this.loading = true;
            this.fetchBrands();
        });
    }
}
