import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MessageServiceSuccess, TableColumn } from 'src/app/application/api/base';
import { CityService } from 'src/app/application/service/city.service';
import { StateService } from 'src/app/application/service/state.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './city.component.html',
})
export class CityComponent implements OnInit {
    loading: boolean = true;
    states: any[] = [];
    stateId: string = '';
    cols: TableColumn[] = [];
    data: any[] = [];
    constructor(protected layoutService: LayoutService, private stateService: StateService, private cityService: CityService, private messageService: MessageService) {}

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
            },
        ];
        this.fetchStates();
    }

    fetchStates() {
        this.loading = true;
        this.stateService.getStates().subscribe((x) => {
            this.states = x.object;
            this.stateChange(null);
            this.loading = false;
        });
    }

    stateChange(event: any) {
        if (event == null) {
            this.data = [];
            return;
        }
        this.fetchCitys(event.id);
    }

    fetchCitys(stateId: string) {
        this.loading = true;
        this.cityService.getCitys(stateId).subscribe((x) => {
            this.data = x.object;
            this.loading = false;
        });
    }

    sync() {
        this.cityService.syncCitys().subscribe(() => {
            this.messageService.add(MessageServiceSuccess);
            this.loading = true;
            this.fetchStates();
        });
    }
}
