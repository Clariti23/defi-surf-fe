import React, { useEffect } from 'react'
import volumes from "../../json/swerve_vol";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default function vol() {
    
    const GenerateChart = () => {
        useEffect(() => {
            
            var wchart = am4core.create("wchart", am4charts.XYChart);
            wchart.dateFormatter.inputDateFormat = "YYYY-MM-DDTHH:mm:sssZ";
            wchart.numberFormatter.numberFormat = "#a";
            wchart.numberFormatter.bigNumberPrefixes = [
            { "number": 1e+3, "suffix": "K" },
            { "number": 1e+6, "suffix": "M" },
            { "number": 1e+9, "suffix": "B" }
            ];
            // Add data
            wchart.data = [{
            "date": volumes[0].date,
            "volume": volumes[0].vol,
            "color": wchart.colors.next()
            }, {
            "date": volumes[1].date,
            "volume": volumes[1].vol,
            "color": wchart.colors.next()
            }, {
            "date": volumes[2].date,
            "volume": volumes[2].vol,
            "color": wchart.colors.next()
            }, {
            "date": volumes[3].date,
            "volume": volumes[3].vol,
            "color": wchart.colors.next()
            }, {
            "date": volumes[4].date,
            "volume": volumes[4].vol,
            "color": wchart.colors.next()
            }, {
            "date": volumes[5].date,
            "volume": volumes[5].vol,
            "color": wchart.colors.next()
            }, {
            "date": volumes[6].date,
            "volume": volumes[6].vol,
            "color": wchart.colors.next()
            }];

            var categoryAxis = wchart.yAxes.push(new am4charts.DateAxis());
            categoryAxis.dataFields.category = "date";
            categoryAxis.renderer.inversed = true;
            categoryAxis.renderer.grid.template.location = 0;

            var valueAxis = wchart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.minGridDistance = 50;
            valueAxis.title.text = "USD";
            valueAxis.min = 0;

            var columnSeries = wchart.series.push(new am4charts.ColumnSeries());
            //columnSeries.dataFields.categoryY = "date";
            columnSeries.dataFields.dateY = "date";
            columnSeries.dataFields.valueX = "volume";
            //columnSeries.dataFields.openValueX = "startTime";
            columnSeries.calculatePercent = true;
            columnSeries.columns.template.tooltipText = "[bold]{categoryY}[/]\n$ {valueX}";

            var columnTemplate = columnSeries.columns.template;
            columnTemplate.strokeOpacity = 0;
            columnTemplate.propertyFields.fill = "color";
            columnTemplate.height = am4core.percent(100);

            // Dispose chart
            return () => {
                if (wchart) {
                    wchart.dispose();
                }
             }
        })
    };
    
    return (
        <div>
            <div> <h5>Last 7 Days of Volume</h5></div>
            <div id="wchart">
                {GenerateChart()}
            </div>
        </div>
    )
}
