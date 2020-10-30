import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import topHolders from "../../json/swerve_top_holders";


export default function TopChart() {

            
    const GenerateTop = () => {
            var topchart = am4core.create("top20", am4charts.XYChart);
            topchart.numberFormatter.numberFormat = "#a";
            topchart.numberFormatter.bigNumberPrefixes = [
            { "number": 1e+3, "suffix": "K" },
            { "number": 1e+6, "suffix": "M" },
            { "number": 1e+9, "suffix": "B" }
            ];

            topchart.data = topHolders;

            var topcategoryAxis = topchart.xAxes.push(new am4charts.CategoryAxis());
            topcategoryAxis.renderer.grid.template.location = 0;
            topcategoryAxis.dataFields.category = "address";
            topcategoryAxis.renderer.minGridDistance = 10;
            topcategoryAxis.renderer.grid.template.location = 0.5;
            topcategoryAxis.renderer.grid.template.strokeDasharray = "1,3";
            topcategoryAxis.renderer.labels.template.rotation = -90;
            topcategoryAxis.renderer.labels.template.horizontalCenter = "left";
            topcategoryAxis.renderer.labels.template.location = 0.5;
            topcategoryAxis.renderer.labels.template.disabled = true;

            topcategoryAxis.renderer.labels.template.adapter.add("dx", function(dx, target) {
                return -target.maxRight / 2;
            })

            var topvalueAxis = topchart.yAxes.push(new am4charts.ValueAxis());
            topvalueAxis.tooltip.disabled = true;
            topvalueAxis.renderer.ticks.template.disabled = true;
            topvalueAxis.renderer.axisFills.template.disabled = true;
            topvalueAxis.title.text = "SWRV";

            var topseries = topchart.series.push(new am4charts.ColumnSeries());
            topseries.dataFields.categoryX = "address";
            topseries.dataFields.valueY = "balance";
            topseries.tooltipText = "{valueY.value.formatNumber('###,###,###,###.00')} SWRV";
            topseries.sequencedInterpolation = true;
            topseries.fillOpacity = 0;
            topseries.strokeOpacity = 1;
            topseries.strokeDashArray = "1,3";
            topseries.columns.template.width = 0.01;
            topseries.tooltip.pointerOrientation = "vertical";

            var topbullet = topseries.bullets.create(am4charts.CircleBullet);

            topchart.cursor = new am4charts.XYCursor();

            topchart.scrollbarX = new am4core.Scrollbar();
            //topchart.scrollbarY = new am4core.Scrollbar();
            // Enable export
            topchart.exporting.menu = new am4core.ExportMenu();
            topchart.exporting.menu.align = "left";
        }        
    return (
        <div>
            <div> <h5>Top Holders</h5></div>
            <div id="top20" style={{ width: "100%", height: "350px" }}>{GenerateTop()} </div>
        </div>
    )
}
