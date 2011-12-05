
 // highcharts starts 
 
Highcharts.setOptions({
   global: {
      useUTC: false
   }
});
   

$(document).ready(function() {
   chart = new Highcharts.Chart({
      chart: {
         renderTo: 'container',
         defaultSeriesType: 'spline',
         marginRight: 10,
		 events: {
		
            load: 
			
			function() {
   
             // set up the updating of the chart each 8 seconds
              var series = this.series[0];
              setInterval(function() {
              var x1 = (new Date()).getTime(), // current time
              y1 = z;
                series.addPoint([x1, y1], true, true);
            }, 10000);
           }
			
			
         }
      },
      title: {
         text: 'Twitter Count Over Time'
      },
       xAxis: {
			type: 'datetime',
			//tickLength: 20,
            tickPixelInterval: 150,
      },
	  
	  
	  
	   //plotOptions: {
      //  series: {
       //   pointInterval: 8000 // one day
      // }
  //  },
	  
	  
	  
      yAxis: {

	     allowDecimals: false,
		// max: 12,
         startOnTick: false,	 
		 gridLineWidth: 2,
         title: {text: 'Number of Tweets'},
		 
         plotLines: [{
            value: 0,
            width: 1,
			value: 5.5,
            color: '#808080'
         }]
      },
  
	  
      tooltip: {
         enabled: true
      },
      legend: {
         enabled: false
      },
      exporting: {
         enabled: false
      },
      series: [{
	    data: [0,0,0,0,0,0,0,0,0] 
	
    }]
   });
   
   
});


