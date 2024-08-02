import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MessageServiceSuccess, TableColumn } from 'src/app/application/api/base';
import { StateService } from 'src/app/application/service/state.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './state.component.html',
})
export class StateComponent implements OnInit {
    loading: boolean = true;
    cols: TableColumn[] = [];
    data: any[] = [];
    constructor(protected layoutService: LayoutService, private stateService: StateService, private messageService: MessageService) {}

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
                field: 'citiesCount',
                header: 'Quantidade de cidades',
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
        this.loading = true;
        this.stateService.getStates().subscribe((x) => {
            this.data = x.object;
            this.loading = false;
        });
    }

    sync() {
        this.stateService.syncStates().subscribe(() => {
            this.messageService.add(MessageServiceSuccess);
            this.loading = true;
            this.fetchData();
        });
    }
}
