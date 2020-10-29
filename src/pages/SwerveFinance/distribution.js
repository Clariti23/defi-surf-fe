import React, { useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// import data
import data from "../../json/swerve_tvl";


export default function distribution() {
    
    const GeneratePieChart = () => {
            var chart = am4core.create("durationpie", am4charts.PieChart3D);
            chart.data = data;

            let lastNum = chart.data.length-1;
            let last = chart.data[lastNum];
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

            chart.legend = new am4charts.Legend();
            

            chart.data = [
            {
                asset: "USDT",
                value: last.usdt
            },
            {
                asset: "USDC",
                value: last.usdc
            },
            {
                asset: "TUSD",
                value: last.tusd
            },
            {
                asset: "DAI",
                value: last.dai
            }
            ];

            var series = chart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "value";
            series.dataFields.category = "asset";
            //series.ticks.template.disabled = true;
            series.labels.template.text = "{category}";
            series.slices.template.tooltipHTML = "{category}<br><span style='font-size:14px'><b>$ {value.value.formatNumber('###,###,###,###.')}</b> ({value.percent.formatNumber('##.00')}%)</span>";

    }
    
    
    return (
        <div>
            <div> <h4>Distribution</h4> </div>
            <div id="durationpie" style={{ width: "100%", height: "350px" }}>{GeneratePieChart()} </div>
        </div>
    )
}
