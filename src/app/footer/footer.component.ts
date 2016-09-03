import {Component} from '@angular/core';

@Component({
    selector: 'as-footer',
    templateUrl: 'app/footer/footer.html',
    styles: [`
        footer {
            position: fixed;
            bottom:0;
            width: 100%;
            background: rgba(26,32,38,0.9);
            color: #fff;
            height: 30px;
            text-align: center;
            line-height: 30px;
        }

        a {
            color: #FFF;
            margin: 0 10px;
        }
    `]
})
export class FooterComponent {
    
}
