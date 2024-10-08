import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MessageServiceSuccess, TableColumn } from 'src/app/application/api/base';
import { FeatureService } from 'src/app/application/service/feature.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './feature.component.html',
    providers: [MessageService, ConfirmationService],
})
export class FeatureComponent implements OnInit {
    type: string = '';
    dialog: boolean = false;
    loading: boolean = true;
    cols: TableColumn[] = [];
    data: any[] = [];
    modalDialog: boolean = false;
    selectedRegistry: any = {};
    constructor(
        protected layoutService: LayoutService,
        private featureService: FeatureService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.cols = [
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
            },
            {
                field: '',
                header: 'Editar',
                type: 'edit',
            },
            {
                field: '',
                header: 'Apagar',
                type: 'delete',
            },
        ];
        this.route.paramMap.subscribe(params => {
            this.type = params.get('type') ?? '';
            this.fetchData();
        });
    }

    event(selectedItems: any) {
        if (selectedItems.type == 0) {
        } else if (selectedItems.type == 1) {
            this.editRegistry(selectedItems.data);
        } else if (selectedItems.type == 2) {
            this.deleteRegistry(selectedItems.data);
        } else {
            console.error(selectedItems);
        }
    }

    create() {
        this.selectedRegistry = {};
        this.modalDialog = true;
    }

    editRegistry(registry: any) {
        this.selectedRegistry = { ...registry };
        this.modalDialog = true;
    }

    hideDialog() {
        this.selectedRegistry = {};
        this.modalDialog = false;
    }

    validateData(): boolean {
        if (!this.selectedRegistry.name) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos obrigatórios.' });
            return false;
        }

        return true;
    }

    save() {
        if (this.validateData()) {
            var data = this.selectedRegistry;
            data.VehicleType = this.type;
            this.hideDialog();
            this.loading = true;
            if (data.id) {
                this.featureService.updateFeature(data.id, data).subscribe(() => {
                    this.messageService.add(MessageServiceSuccess);
                    this.fetchData();
                }, () => {
                    this.loading = false;
                });
            } else {
                this.featureService.createFeature(data).subscribe(() => {
                    this.messageService.add(MessageServiceSuccess);
                    this.fetchData();
                }, () => {
                    this.loading = false;
                });
            }
        }
    }

    deleteRegistry(registry: any) {
        this.confirmationService.confirm({
            header: 'Deletar registro',
            message: `Tem certeza que deseja apagar o registro: ${registry.name}`,
            acceptLabel: 'Aceitar',
            rejectLabel: 'Rejeitar',
            accept: () => {
                this.loading = true;
                this.featureService.deleteFeature(registry.id).subscribe(() => {
                    this.messageService.add(MessageServiceSuccess);
                    this.fetchData();
                }, () => {
                    this.loading = false;
                });
            },
        });
    }

    fetchData() {
        this.featureService.getFeatures(this.type).subscribe((x) => {
            this.data = x.object;
            this.loading = false;
        });
    }
}
