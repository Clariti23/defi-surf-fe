import React, { useEffect } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// import data
import swerveTVL from "../../json/swerve_tvl";

am4core.useTheme(am4themes_animated);




export default function tvl() {
   const GetData = () => {
    useEffect( () => {
        const mchart = am4core.create("chartdiv", am4charts.XYChart )
        
        // Do not remove valueAxis even though the linter yells at you 
        let valueAxis = mchart.yAxes.push(new am4charts.ValueAxis());    
        mchart.numberFormatter.numberFormat = "$#a";
        mchart.numberFormatter.bigNumberPrefixes = [
        { "number": 1e+3, "suffix": "K" },
        { "number": 1e+6, "suffix": "M" },
        { "number": 1e+9, "suffix": "B" }
        ];

        mchart.data = swerveTVL;

        mchart.dateFormatter.inputDateFormat = "YYYY-MM-DDTHH:mm:ssZ";
        let dateAxis = mchart.xAxes.push(new am4charts.DateAxis());

        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.ticks.template.length = 8;
        dateAxis.renderer.ticks.template.strokeOpacity = 0.1;
        dateAxis.renderer.grid.template.disabled = true;
        dateAxis.renderer.ticks.template.disabled = false;
        dateAxis.renderer.ticks.template.strokeOpacity = 0.2;
        dateAxis.renderer.minLabelPosition = 0.01;
        dateAxis.renderer.maxLabelPosition = 0.99;
        dateAxis.keepSelection = true;

        dateAxis.groupData = true;
        dateAxis.minZoomCount = 5;

            
        // valueAxis.numberFormatter.numberFormat = "$";
        
        
        //USDT
        var series = mchart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.name = "USDT";
        series.dataFields.valueY = "usdt";
        series.tooltipHTML = "<span style='font-size:15px; color:#000000;'><b>USDT</b> {valueY.value.formatNumber('###,###,###,###.')} </span>";
        series.tooltipText = "[#000]{valueY.value}[/]";
        series.tooltip.background.fill = am4core.color("#FFF");
        series.tooltip.color = am4core.color("#000");
        series.tooltip.getStrokeFromObject = true;
        series.tooltip.background.strokeWidth = 3;
        series.bullets.push(new am4charts.CircleBullet());
        series.minBulletDistance = 25;
        series.tooltip.getFillFromObject = false;
        series.fillOpacity = 0.6;
        series.strokeWidth = 2;
        series.stacked = true;

        //USDC
        var series2 = mchart.series.push(new am4charts.LineSeries());
        series2.name = "USDC";
        series2.dataFields.dateX = "date";
        series2.dataFields.valueY = "usdc";
        series2.tooltipHTML = "<span style='font-size:15px; color:#000000;'><b>USDC</b> {valueY.value.formatNumber('###,###,###,###.')} </span>";
        series2.tooltipText = "[#000]{valueY.value}[/]";
        series2.tooltip.background.fill = am4core.color("#FFF");
        series2.tooltip.color = am4core.color("#000");
        series2.tooltip.getFillFromObject = false;
        series2.tooltip.getStrokeFromObject = true;
        series2.tooltip.background.strokeWidth = 3;
        series2.bullets.push(new am4charts.CircleBullet());
        series2.minBulletDistance = 25;
        series2.sequencedInterpolation = true;
        series2.fillOpacity = 0.6;
        series2.stacked = true;
        series2.strokeWidth = 2;
        
        // TUSD
        var series3 = mchart.series.push(new am4charts.LineSeries());
        series3.name = "TUSD";
        series3.dataFields.dateX = "date";
        series3.dataFields.valueY = "tusd";
        series3.tooltipHTML = "<span style='font-size:15px; color:#000000;'><b>TUSD</b> {valueY.value.formatNumber('###,###,###,###.')} </span>";
        series3.tooltipText = "[#000]{valueY.value}[/]";
        series3.tooltip.background.fill = am4core.color("#FFF");
        series3.tooltip.color = am4core.color("#000");
        series3.tooltip.getFillFromObject = false;
        series3.tooltip.getStrokeFromObject = true;
        series3.tooltip.background.strokeWidth = 3;
        series3.bullets.push(new am4charts.CircleBullet());
        series3.minBulletDistance = 25;
        series3.sequencedInterpolation = true;
        series3.fillOpacity = 0.6;
        series3.defaultState.transitionDuration = 1000;
        series3.stacked = true;
        series3.strokeWidth = 2;

        // DAI
        var series4 = mchart.series.push(new am4charts.LineSeries());
        series4.name = "DAI";
        series4.dataFields.dateX = "date";
        series4.dataFields.valueY = "dai";
        series4.tooltipHTML = "<span style='font-size:15px; color:#000000;'><b>DAI</b> {valueY.value.formatNumber('###,###,###,###.')} </span>";
        series4.tooltipText = "[#000]{valueY.value}[/]";
        series4.tooltip.background.fill = am4core.color("#FFF");
        series4.tooltip.color = am4core.color("#000");
        series4.tooltip.getFillFromObject = false;
        series4.tooltip.getStrokeFromObject = true;
        series4.tooltip.background.strokeWidth = 3;
        series4.bullets.push(new am4charts.CircleBullet());
        series4.minBulletDistance = 25;
        series4.sequencedInterpolation = true;
        series4.fillOpacity = 0.6;
        series4.defaultState.transitionDuration = 1000;
        series4.stacked = true;
        series4.strokeWidth = 2;



        mchart.cursor = new am4charts.XYCursor();
        mchart.cursor.xAxis = dateAxis;
        mchart.scrollbarX = new am4core.Scrollbar();

        // Add a legend
        mchart.legend = new am4charts.Legend();
        mchart.legend.position = "bottom";

        //Scrollbar
        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        scrollbarX.marginBottom = 20;
        let sbSeries = scrollbarX.scrollbarChart.series.getIndex(0);
        sbSeries.dataFields.valueYShow = undefined;
        mchart.scrollbarX = scrollbarX;

    })
    }

    GetData()
    return (
        <div>
            <div> <h4>Total Value Locked (TVL)</h4></div>
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        </div>
    )
}
