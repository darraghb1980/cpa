//initialise all the variables we use 	
var currentCount=0;
var prevcurrentCount=0;
var initCount=0;
//temp counts
var z=0;
var a=0;
var newCount=0;
var prevCount=0;
//load images into an array called elements
var elements = ["#apDiv3", "#apDiv4", "#apDiv1", "#apDiv2", "#apDiv5", "#apDiv6"];
var currentElement = 0

//search API for No. of tweets containing this URL
    $(document).ready(function() {
        url = "http://www.facebook.com";
        beforecounter = " [<b>";
        aftercounter = "</b>]";
		
// set timeout for our JSON call to the API
var tid = setTimeout(Refresh, 10000);


//this  function moves a pointer up and down the elements array (created above).
//the pointer starts at position 0.
//if the tweet count in the current period is greater than the previous period
//then it increments to the next array element and fades it in corresponding layer.
//if the tweet count in the current period is less than the previous period
//then it decrements to the previous layer and fades that layer out.
function updateImage() {
	if (newCount>prevCount) {
		$(elements[currentElement]).fadeIn(2000);
		currentElement++;
	}else if(newCount<prevCount) {
		$(elements[currentElement-1]).fadeOut(2000);
	if (currentElement>0){
		currentElement--;
 }
 };
};

//declare function called Refresh to make JSON request to API for Tweets that include the URL defined above
// within this function is a function that deals with the data exchange with the API
//once we get a count back from the API we call the updateImage function (created above)

       function Refresh() {

       // Get Number of Tweet Count From Topsy
       $.getJSON('http://api.tweetmeme.com/url_info.jsonc?url='+url+'&callback=?',
				function(data) {
						if (initCount==0){
						//first time its run the initial count is 0
						//therefore give it the tweet count value returned from the API 
							initCount=data.story.url_count;
							
						}
					     	//give currentCount the tweet count value returned from the API 
							currentCount=data.story.url_count;
							
							//z is our tweet Count in a period
							//prevCount is z=0 first time in, after that only this fuction is called so it takes the value 
							//of z whatever it was at the end of the last time we looped this function
							prevCount=z;
							//z is updated here in this line, but we also kept its previous value in the previous line
							z = (currentCount-initCount)-z;
							//append the value of z to the div called #tweetCount in the body
							//(beforecounter and aftercounter are just jQuery formatting)
							$('#tweetCount').append(beforecounter + (z) + aftercounter);
							y = currentCount-initCount;
							newCount=z;
							
						   //call the image array function
							updateImage();
					
							});
//set off timer
tid = setTimeout(Refresh, 10000); 
						}


});


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

