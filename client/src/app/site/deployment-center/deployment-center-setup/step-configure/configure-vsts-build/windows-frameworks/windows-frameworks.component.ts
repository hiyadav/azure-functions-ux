import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeploymentCenterStateManager } from '../../../wizard-logic/deployment-center-state-manager';
import { Subject } from 'rxjs/Subject';
import { DropDownElement } from '../../../../../../shared/models/drop-down-element';
import { CacheService } from 'app/shared/services/cache.service';
import { PythonFrameworkType } from '../../../wizard-logic/deployment-center-setup-models';

export const TaskRunner = {
  None: 'None',
  Gulp: 'Gulp',
  Grunt: 'Grunt',
};

export const WebAppFramework = {
  AspNetWap: 'AspNetWap',
  AspNetCore: 'AspNetCore',
  Node: 'Node',
  PHP: 'PHP',
  Python: 'Python',
  StaticWebapp: 'StaticWebapp',
};

const siteExtensionApiUri = 'https://api-v2v3search-0.nuget.org/query?q=Tags%3AAzureSiteExtension&prerelease=true&take=500';
interface SiteExtensionDef {
  id: string;
  title: string;
}
@Component({
  selector: 'app-windows-frameworks',
  templateUrl: './windows-frameworks.component.html',
  styleUrls: [
    './windows-frameworks.component.scss',
    '../../step-configure.component.scss',
    '../../../deployment-center-setup.component.scss',
  ],
})
export class WindowsFramworksComponent implements OnInit, OnDestroy {
  defaultNodeTaskRunner = 'none';
  nodeJsTaskRunners: DropDownElement<string>[] = [
    { value: 'gulp', displayLabel: 'Gulp' },
    { value: 'grunt', displayLabel: 'Grunt' },
    { value: 'none', displayLabel: 'None' },
  ];

  pythonVersionList: DropDownElement<string>[] = [];

  defaultPythonFramework = 'Bottle';
  pythonFrameworkList: DropDownElement<PythonFrameworkType>[] = [
    { value: PythonFrameworkType.Bottle, displayLabel: 'Bottle' },
    { value: PythonFrameworkType.Django, displayLabel: 'Django' },
    { value: PythonFrameworkType.Flask, displayLabel: 'Flask' },
  ];

  pythonLoading = false;
  webApplicationFrameworks: DropDownElement<string>[] = [
    {
      displayLabel: 'ASP.NET',
      value: WebAppFramework.AspNetWap,
    },
    {
      displayLabel: 'ASP.NET Core',
      value: WebAppFramework.AspNetCore,
    },
    {
      displayLabel: 'Node.JS',
      value: WebAppFramework.Node,
    },
    {
      displayLabel: 'PHP',
      value: WebAppFramework.PHP,
    },
    {
      displayLabel: 'Python',
      value: WebAppFramework.Python,
    },
    {
      displayLabel: 'Static Webapp',
      value: WebAppFramework.StaticWebapp,
    },
  ];

  private _ngUnsubscribe$ = new Subject();
  selectedPythonVersion = '';
  selectedFramework = WebAppFramework.AspNetWap;
  selectedPythonFramework = this.defaultPythonFramework;
  selectedTaskRunner = this.defaultNodeTaskRunner;

  constructor(public wizard: DeploymentCenterStateManager, private _cacheService: CacheService) {}

  get getFramework() {
    return this.selectedPythonFramework;
  }

  ngOnInit(): void {
    this.pythonLoading = true;
    this._cacheService.get(siteExtensionApiUri).subscribe(res => {
      const siteExtensionData: SiteExtensionDef[] = res.json().data;
      const pythonObjs = siteExtensionData.filter(r => r.id.includes('azureappservice-python'));
      this.pythonVersionList = pythonObjs.map(x => ({ displayLabel: x.title, value: x.id.split('-')[1] }));
      this.selectedPythonVersion = this.pythonVersionList[0].value;
      this.pythonLoading = false;
    });
  }
  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
  }
}
