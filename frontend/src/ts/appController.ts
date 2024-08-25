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
import "ojs/ojinputtext";
import * as Bootstrap from "ojs/ojbootstrap";
import { ojButton } from "ojs/ojbutton";
import "ojs/ojbutton";
import "ojs/ojcheckboxset";
import "ojs/ojtable";
import { ojTable } from "ojs/ojtable";
import "ojs/ojknockout";
import "ojs/ojbutton";
import "ojs/ojoption";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import * as empData from "text!./employee_data.json";
import * as deptData from "text!./departmentData.json";


import { ojMenuEventMap } from "ojs/ojmenu";
import "ojs/ojmenu";

interface EmployeeData {
  EmployeeId: number;
  EmpName: string;
  Revenue: number;
  Rating: number;
  Status: string;
}

interface TodoData {
  id: number;
  title: string;
  status: boolean;
}

interface DepartmentData {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
}


class RootViewModel {
  smScreen: ko.Observable<boolean> | undefined;
  value: ko.Observable<string>;
  checkValue: ko.ObservableArray<string>;

  private readonly empArray = ko.observableArray(JSON.parse(empData));

  private readonly todoArray = ko.observableArray();

  

  readonly dataprovider = new ArrayDataProvider<
    EmployeeData["EmployeeId"],
    EmployeeData
  >(this.empArray, {
    keyAttributes: "EmployeeId",
  });

  readonly todoDataProvider= new ArrayDataProvider<TodoData["id"],TodoData>(this.todoArray,{
    keyAttributes:"id"
  })
  

  menuListener = (
    event: ojMenuEventMap["ojMenuAction"],
    context: ojTable.CellTemplateContext<
      EmployeeData["EmployeeId"],
      EmployeeData
    >
  ) => {
    const rowIndex = this.empArray.indexOf(context.item.data);
    if (event.detail.selectedValue === "delete") {
      this.empArray.splice(rowIndex, 1);
    } else if (event.detail.selectedValue === "approve") {
      const rowData = context.item.data;
      rowData.Status = "Approved";
      this.empArray.splice(rowIndex, 1, rowData);
    }
  };

  

  constructor() {
    // media queries for responsive layouts
    let smQuery: string | null = ResponsiveUtils.getFrameworkQuery("sm-only");
    if (smQuery) {
      this.smScreen =
        ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
    }

    console.log(this.todoDataProvider)

    // header

    // application Name used in Branding Area
    this.value = ko.observable("");

    // user Info used in Global Navigation area
    this.checkValue = ko.observableArray();

    fetch("http://localhost:8080/api/todos", {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        console.log("Below is the array");

        console.log(res);

        console.log("Now i am setting value to variable");

        this.todoArray(res);
        console.log(this.todoArray());

        // return console.log(res);
      });

    // console.log(this.todoArray);

    Context.getPageContext().getBusyContext().applicationBootstrapComplete();
  }
}

export default new RootViewModel();
