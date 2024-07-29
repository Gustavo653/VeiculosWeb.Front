import { NgModule } from '@angular/core';
import { BooleanPipe } from './demo/pipe/BooleanPipe';

@NgModule({
    declarations: [BooleanPipe],
    exports: [BooleanPipe],
})
export class SharedModule {}
