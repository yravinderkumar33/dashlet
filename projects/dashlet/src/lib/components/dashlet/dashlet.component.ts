import { Component, ComponentFactoryResolver, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ReportWrapperDirective } from '../../directives';
import { IBase } from '../../types';
import TYPE_TO_COMPONENT_MAPPING from './type_to_component_mapping';

type componentInstanceType = Pick<IBase, "initialize">;
@Component({
  selector: 'sb-dashlet',
  templateUrl: './dashlet.component.html',
  styleUrls: ['./dashlet.component.css']
})
export class DashletComponent implements OnInit {

  @Input() type: string;
  @Input() config: object;
  @Input() data: object;
  @Input() width = '100%';
  @Input() height = '100%';

  @ViewChild(ReportWrapperDirective, { static: true }) reportWrapper: ReportWrapperDirective;
  private readonly _typeToComponentMapping = Object.freeze(TYPE_TO_COMPONENT_MAPPING);
  @ContentChild('headerTemplate') headerTemplate: TemplateRef<any>;
  @ContentChild('footerTemplate') footerTemplate: TemplateRef<any>;

  private _componentInstance;
  get instance() {
    return this._componentInstance;
  }
  set instance(componentInstance) {
    this._componentInstance = componentInstance;
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    if (!this.type && !this.config && !this.data) {
      throw new SyntaxError('Syntax Error. Please check configuration');
    }
    this.loadComponent(this.type).catch(err => {
      console.error(err);
      throw err;
    });
  }

  async loadComponent(type: string) {
    const componentResolver = this._typeToComponentMapping[type];
    if (!componentResolver) { throw new Error('Given Type not supported'); }
    const component = await componentResolver();
    this.reportWrapper.viewContainerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<componentInstanceType>(component);
    const componentRef = this.reportWrapper.viewContainerRef.createComponent(componentFactory);
    this.instance = componentRef.instance;
    componentRef.instance.initialize({ config: this.config, type: this.type, data: this.data });
  }
}
