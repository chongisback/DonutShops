var DonutMaster = function(){
  this.donutShops = [];
  this.addShop = function( toppotshop ){
    this.donutShops.push( toppotshop );
  };
  this.generateReport = function(){
    for( var index = 0; index < this.donutShops.length; index++ ){
      $( ".Report" ).append( this.donutShops[index].getTableRow() );
    }
  };
  this.generateLocation = function(){
    for( var index = 0; index < this.donutShops.length; index++ ){
      $( ".Location" ).append( "<p><b>" + this.donutShops[index].location +
        ":</b> " + this.donutShops[index].address + "</p>" );
    }
  };
};//test

var TopPot = function( location, minph, maxph, avgpc, address ){
  this.location = location;
  this.minCustomerPerHour = minph;
  this.maxCustomerPerHour = maxph;
  this.avgDonutsPerCustomer = avgpc;
  this.open = 5;
  this.close = 17;
  this.customerRange = maxph - minph;
  this.address = address;
  this.donutsPerHour = [];
  //returns a object global array which stores donuts per hour.
  this.getDonutsPerHour = function(){
    var randomCustomerCount;
    for( var index = 0; index < ( this.close - this.open ); index++ ){
      randomCustomerCount = Math.random() * this.customerRange + this.minCustomerPerHour;
      this.donutsPerHour.push( Math.floor( randomCustomerCount * this.avgDonutsPerCustomer ) + 1);
    }
    return this.donutsPerHour;
  };
  //uses the previously stored donutsPerHour to get the total donuts per day.
  this.getDonutsPerDay = function (){
    var dayDonuts = 0;
    for( var index = 0; index < this.donutsPerHour.length; index++ ){
      dayDonuts += this.donutsPerHour[index];
    }
    return dayDonuts;
  };
  //gets html code for the row in the table
  this.getTableRow = function (){
    var table="";
    var average=Math.round( this.getDonutsPerDay() / ( this.close - this.open ));
    table += "<tr>";
    table += "<th>" + this.location + "</th>";
    //table data for the per hour
    for (var index = 0; index < this.donutsPerHour.length; index++ ){
      table += "<td style=\"display: none\">" + this.donutsPerHour[index] + "</td>";
    }
    table += "<td style=\"display: none\">" + this.getDonutsPerDay() + "</td>";
    table += "<td style=\"display: none\">" + average + "</td>";
    table += "</tr>";
    return table;
  };
  this.getDonutsPerHour();
};

var downtown = new TopPot( "Downtown", 8, 43, 4.5, "720 3rd Ave Suite 100, Seattle" ),
    caphill = new TopPot( "Capitol Hill", 4, 37, 2, "1206 Madison St, Seattle" ),
    slu = new TopPot( "South Lake Union", 9, 23, 6.33, "590 Terry Ave N, Seattle" ),
    wedgewood = new TopPot( "Wedgewood", 2, 28, 1.25, "6855 35th Ave NE Seattle" ),
    ballard = new TopPot( "Ballard", 8, 58, 3.75, "1416 Northwest 46th Street #102, Seattle" );

var donutMaster = new DonutMaster();
donutMaster.addShop(downtown);
donutMaster.addShop(caphill);
donutMaster.addShop(slu);
donutMaster.addShop(wedgewood);
donutMaster.addShop(ballard);
donutMaster.generateReport();
donutMaster.generateLocation();

//toggles on and off for data in the table when you click on the location
$( "tr > th" ).on("click", function(){
  $( this ).nextAll( "td" ).fadeToggle(2000);
});
//changes color of navigation
$( "article" ).hover(
  function() {
    $( this ).addClass( "hover" );
  },
  function() {
    $( this ).removeClass( "hover" );
  }
);

//gameboard creator
var loadDonuts = function(){
  var gameboard = "";
  gameboard += "<section class=\"gameResult\">";
  for ( var index = 0; index < 25; index++ ){
    gameboard += "<article>";
    gameboard += "<img class=\"game\" src=\"donuticon.gif\"/>";
    gameboard += "</article>";
  }
  gameboard += "</section>";
  $( ".gameboard" ).append( gameboard );
};
loadDonuts();
//resets the board if button "play again!" is clicked
$( "body" ).on( "click", ":button", function() {
  loadDonuts();
  $( this ).parent().remove();
  $( this ).remove();
});
//calculates time and reports.
var last, first, diff;
$( "body" ).on( "click", ".game", function( event ) {
  if($( ".game" ).length === 25){
    first = event.timeStamp;
  }
  $ ( this ).remove();
  if($( ".game" ).length === 0){
    last = event.timeStamp;
    diff = ( last - first )/1000;
    $( ".gameResult" ).append( "<p class=\"result\">It took you " + diff + " seconds!</p>" );
    $( ".gameResult" ).append( "<button type=\"button\">Play Again!</button>" );
  }
});
