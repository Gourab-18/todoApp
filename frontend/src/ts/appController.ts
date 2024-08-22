/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import * as ko from "knockout";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import * as ResponsiveKnockoutUtils from "ojs/ojresponsiveknockoututils";
import Context = require("ojs/ojcontext");
import 'ojs/ojinputtext';
import * as Bootstrap from 'ojs/ojbootstrap';
import { ojButton } from 'ojs/ojbutton';
import 'ojs/ojbutton';
import 'ojs/ojcheckboxset';
  import 'ojs/ojtable';
  import { ojTable } from 'ojs/ojtable';
  import 'ojs/ojknockout';
  import 'ojs/ojbutton';
  import 'ojs/ojoption';
  import ArrayDataProvider = require('ojs/ojarraydataprovider');
  import * as empData from "text!./employee_data.json"
  import { ojMenuEventMap } from 'ojs/ojmenu';
  import 'ojs/ojmenu';

  interface EmployeeData {
    EmployeeId: number;
    EmpName: string;
    Revenue: number;
    Rating: number;
    Status: string;
  }
  

class RootViewModel {
  smScreen: ko.Observable<boolean>|undefined;
  appName: ko.Observable<string>;
  userLogin: ko.Observable<string>;
  footerLinks: Array<object>;
  value: ko.Observable<string>;
  checkValue: ko.ObservableArray<string>;

    private readonly empArray = ko.observableArray(JSON.parse(empData));
  
    readonly dataprovider = new ArrayDataProvider<EmployeeData['EmployeeId'], EmployeeData>(
      this.empArray,
      {
        keyAttributes: 'EmployeeId'
      }
    );

    menuListener = (
      event: ojMenuEventMap['ojMenuAction'],
      context: ojTable.CellTemplateContext<EmployeeData['EmployeeId'], EmployeeData>
    ) => {
      const rowIndex = this.empArray.indexOf(context.item.data);
      if (event.detail.selectedValue === 'delete') {
        this.empArray.splice(rowIndex, 1);
      } else if (event.detail.selectedValue === 'approve') {
        const rowData = context.item.data;
        rowData.Status = 'Approved';
        this.empArray.splice(rowIndex, 1, rowData);
      }
    };

    


  constructor() {
    // media queries for responsive layouts
    let smQuery: string | null = ResponsiveUtils.getFrameworkQuery("sm-only");
    if (smQuery) {
      this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
    }
console.log("Hii")
    // header

    // application Name used in Branding Area
    this.appName = ko.observable("App Name");
    this.value = ko.observable('');


    // user Info used in Global Navigation area
    this.userLogin = ko.observable("john.hancock@oracle.com");

    console.log("Hii")
    this.checkValue = ko.observableArray();
 

    // footer
    this.footerLinks = [
      {name: 'About Oracle', linkId: 'aboutOracle', linkTarget:'http://www.oracle.com/us/corporate/index.html#menu-about'},
      { name: "Contact Us", id: "contactUs", linkTarget: "http://www.oracle.com/us/corporate/contact/index.html" },
      { name: "Legal Notices", id: "legalNotices", linkTarget: "http://www.oracle.com/us/legal/index.html" },
      { name: "Terms Of Use", id: "termsOfUse", linkTarget: "http://www.oracle.com/us/legal/terms/index.html" },
      { name: "Your Privacy Rights", id: "yourPrivacyRights", linkTarget: "http://www.oracle.com/us/legal/privacy/index.html" },
    ];

    // release the application bootstrap busy state
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();        
  }
  // menuListener = (
  //     event: ojMenuEventMap['ojMenuAction'],
  //     context: ojTable.CellTemplateContext<EmployeeData['EmployeeId'], EmployeeData>
  //   ) => {
  //     const rowIndex = this.empArray.indexOf(context.item.data);
  //     if (event.detail.selectedValue === 'delete') {
  //       this.empArray.splice(rowIndex, 1);
  //     } else if (event.detail.selectedValue === 'approve') {
  //       const rowData = context.item.data;
  //       rowData.Status = 'Approved';
  //       this.empArray.splice(rowIndex, 1, rowData);
  //     }
  //   };
  // }
  
}

export default new RootViewModel();