'use strict';
angular.module('softvFrostApp')
//.controller('ReportesCtrl', ['$http','uiGridConstants', 'reportesFactory', function ( $http, uiGridConstants, reportesFactory)
.controller('Reportes_PlantaCtrl', ['$http', 'reportesFactory','$timeout', 'ngNotify','$state', function ( $http, reportesFactory, $timeout,ngNotify, $state){
//function ReportesCtrl(reportesFactory) {
 
    var vm = this;  
    vm.filename = "Reporte_de_terminales";
    var reportHeaderPdf = "Reporte de Terminales";
    vm.csvUnoHide = true; //Button no mostrar
    vm.csvDosHide = true; //Button no mostrar
    var img = new Image();
    img.crossOrigin = "";  
    //vm.src = reportesFactory.obtenerRutaOriginal(); //url = '../images/StarGo_png.png';
//----------------------------------------------

    this.$onInit = function() {

        getImageDataURL();             

        var arrayPlanta = [];   
        vm.ReportePlanta = ReportePlanta;
        function ReportePlanta()
        {           
            reportesFactory.mostrarReportePlanta().then(function(data) {       
                arrayPlanta = data.GetReportes_PlantaListResult; //console.log(data);
                vm.itemsByPage = 5;      
                vm.rowCollection4 = arrayPlanta;   //  vm.myDataPlanta = arrayPlanta;
                // usar el array displayedCollection4 para llenar los csv dinamicamente, solo agregar los encabezados
               // vm.getArrayPlanta = arrayPlanta; // Llenar el array del CSV         
            });
        }
        ReportePlanta();
    }
    //---------------------------------------
    function reloadRoute() {
        $state.reload(); // refresh page
    };
                   
    vm.limpiarFiltros = limpiarFiltros;
    function limpiarFiltros(){
        reloadRoute();
    }


    function getImageDataURL() // Obtiene la ruta de la imagen, convierte en url para usarla en pdf
    {             
        //var url = vm.src; 
        var url = document.getElementById("pdflogoimage").src;  
     
        var data, canvas, ctx;

        img.onload = function()
        {
            // Create the canvas element.
            canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            // Get '2d' context and draw the image.
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            // Get canvas data URL
            data = canvas.toDataURL();   
          
        }
            // Load image URL.    
        img.src = url;  
        
    }



//---------------------
    //CSV 
    vm.order = [ 'SAN', 'IdSuscriptor', 'Cliente', 'Suscriptor', 'PlanDeServicio', 'Hub', 'Beam', 'Pais',
    'ESN', 'Estatus', 'EstTecnico', 'Latitud', 'Longitud', 'FechaActivacion', 'FechaAlta','FechaCancelacion',
    'FechaSuspension', 'ConsumoAnytime','ConsumoBonus','TokenDisp'];


// CREAR CSV VISIBLE DATA -- filters
vm.crearVisibleAsCsv = crearVisibleAsCsv;
function crearVisibleAsCsv() {
    $timeout(function() {

    // Elimina las propiedades que no se usan
    for (var i = 0; i < vm.displayedCollection4.length; i++) //todos los distribuidores de la tabla
        { 
            delete vm.displayedCollection4[i].BaseIdUser;
            delete vm.displayedCollection4[i].BaseRemoteIp;
            delete vm.displayedCollection4[i].$$hashKey;
        } 

    // Posición 0 del arrayReporte (ENCABEZADOS)
        initArray();

      for (var i = 0; i < vm.displayedCollection4.length; i++) 
        {   //copia cada objeto del array de la tabla en el arry del reporte
            vm.arrayReporte.push(vm.displayedCollection4[i]); // Copia array de tabla displayedCollection4  
        } 
       //FIN DE PROPIEDADES
    angular.element('#csvUno').triggerHandler('click'); //llama al botón para crear csv del arrayReporte
  });
};



    function initArray (){
      vm.arrayReporte = []; //array vacío   
         // Posición 0 del arrayReporte (ENCABEZADOS)
        vm.arrayReporte =     [{
            "Beam": "Beam",
            "Cliente": "Cliente",
            "ConsumoAnytime": "Consumo Anytime (Gb)",
            "ConsumoBonus": "Consumo Bonus (Gb)",
            "ESN": "Nro. de Serie",
            "EstTecnico": "Est. Técnico",
            "Estatus": "Est. Comercial",
            "FechaActivacion": "Fecha Activación",
            "FechaAlta": "Fecha Alta",
            "FechaCancelacion": "Fecha Cancelación",
            "FechaSuspension": "Fecha Suspensión",
            "Hub": "Hub",
            "IdSuscriptor": "Cod Suscriptor",
            "Latitud": "Latitud",
            "Longitud": "Longitud", 
            "Pais": 'País',           
            "PlanDeServicio": "Plan de Servicio",
            "SAN": "Site Id",
            "Suscriptor": "Suscriptor",
            "TokenDisp": "Token Disp (Gb)"
                }];
    } 


// CREAR CSV ALL DATA 
vm.crearTodoAsCsv = crearTodoAsCsv;
function crearTodoAsCsv() {
  $timeout(function() {

    // Elimina las propiedades que no se usan
    for (var i = 0; i < vm.rowCollection4.length; i++) //table total
        { 
            delete vm.rowCollection4[i].BaseIdUser;
            delete vm.rowCollection4[i].BaseRemoteIp;
            delete vm.rowCollection4[i].$$hashKey;
        } 

        initArray();

      for (var i = 0; i < vm.rowCollection4.length; i++) 
        {   //copia cada objeto del array de la tabla en el arry del reporte
            vm.arrayReporte.push(vm.rowCollection4[i]); // Copia array de tabla displayedCollection4  
        } 
       //FIN DE PROPIEDADES
    angular.element('#csvDos').triggerHandler('click'); //llama al botón para crear csv del arrayReporte
  });
};



/* // ORIGINAL
vm.clickOnUpload = clickOnUpload;
function clickOnUpload() {
  $timeout(function() {
    angular.element('#myselector').triggerHandler('click');
  });
};*/



// Create TABLE PDF -- All / Visible 
vm.createPdfTodo = createPdfTodo;
function createPdfTodo(pdfAcrear){


    var rows = [ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ]; // no. column
    // rows 0
    var r = 1; //start from rows 1
    var c = 0; //start from col 5


    var ro = 0; // length array of objects
      if ( pdfAcrear =='todo')
        { ro = vm.rowCollection4.length; }
        else 
        { ro = vm.displayedCollection4.length; }


    var cols = 20; // column number
    var columns = ["Site Id", "Cod Suscriptor", "Cliente", "Suscriptor", "Plan de Servicio", "Hub", "Beam","País", "No. de Serie", "Est. Comercial", 
                    "Est. Técnico", "Latitud", "Longitud","Fecha Activación", "Fecha Alta", "Fecha Cancelación", "Fecha Suspensión",  "Consumo Anytime (Gb)",  "Consumo Bonus (Gb)", "Token Disp (Gb)"];

    // expand to have the correct amount or rows
    for( var i=r; i<ro; i++ ) {         
      rows.push( [] );
    }

    // expand all rows to have the correct amount of cols
    for (var i = 0; i < ro; i++)
    {    
        if ( pdfAcrear =='todo') // ALL DATA
        {   //replace row 0
            rows[i][0] = vm.rowCollection4[i].SAN;
            rows[i][1] = vm.rowCollection4[i].IdSuscriptor;
            rows[i][2] = vm.rowCollection4[i].Cliente;
            rows[i][3] = vm.rowCollection4[i].Suscriptor;
            rows[i][4] = vm.rowCollection4[i].PlanDeServicio;
            rows[i][5] = vm.rowCollection4[i].Hub;
            rows[i][6] = vm.rowCollection4[i].Beam;
            rows[i][7] = vm.rowCollection4[i].Pais;
            rows[i][8] = vm.rowCollection4[i].ESN;
            rows[i][9] = vm.rowCollection4[i].Estatus;
            rows[i][10] = vm.rowCollection4[i].EstTecnico;
            rows[i][11] = vm.rowCollection4[i].Latitud;
            rows[i][12] = vm.rowCollection4[i].Longitud;
            rows[i][13] = vm.rowCollection4[i].FechaActivacion;
            rows[i][14] = vm.rowCollection4[i].FechaAlta;
            rows[i][15] = vm.rowCollection4[i].FechaCancelacion;
            rows[i][16] = vm.rowCollection4[i].FechaSuspension;
            rows[i][17] = vm.rowCollection4[i].ConsumoAnytime;
            rows[i][18] = vm.rowCollection4[i].ConsumoBonus;
            rows[i][19] = vm.rowCollection4[i].TokenDisp;    
        }else //VISIBLE DATA
        {           
            rows[i][0] = vm.displayedCollection4[i].SAN;
            rows[i][1] = vm.displayedCollection4[i].IdSuscriptor;
            rows[i][2] = vm.displayedCollection4[i].Cliente;
            rows[i][3] = vm.displayedCollection4[i].Suscriptor;
            rows[i][4] = vm.displayedCollection4[i].PlanDeServicio;
            rows[i][5] = vm.displayedCollection4[i].Hub;
            rows[i][6] = vm.displayedCollection4[i].Beam;
            rows[i][7] = vm.displayedCollection4[i].Pais;
            rows[i][8] = vm.displayedCollection4[i].ESN;
            rows[i][9] = vm.displayedCollection4[i].Estatus;
            rows[i][10] = vm.displayedCollection4[i].EstTecnico;
            rows[i][11] = vm.displayedCollection4[i].Latitud;
            rows[i][12] = vm.displayedCollection4[i].Longitud;
            rows[i][13] = vm.displayedCollection4[i].FechaActivacion;
            rows[i][14] = vm.displayedCollection4[i].FechaAlta;
            rows[i][15] = vm.displayedCollection4[i].FechaCancelacion;
            rows[i][16] = vm.displayedCollection4[i].FechaSuspension;
            rows[i][17] = vm.displayedCollection4[i].ConsumoAnytime;
            rows[i][18] = vm.displayedCollection4[i].ConsumoBonus;
            rows[i][19] = vm.displayedCollection4[i].TokenDisp;  
        } 
    } 


   // Create document
    var doc = new jsPDF({
    orientation: 'landscape',
    format: 'A4'
    });

     //Page number 
    var totalPagesExp = "{total_pages_count_string}";
    var pageContent = function (data) {    
            // FOOTER
            var str = "Page " + data.pageCount;
            // Total page number plugin only available in jspdf v1.0+
            if (typeof doc.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp;
            }
            doc.setFontSize(9);
            //x , y 
            doc.text(doc.internal.pageSize.width - 28 , doc.internal.pageSize.height - 10, str); 
          //  doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 10);
        };
     

        // Añadir logo StarGo
        //   var img = reportesFactory.obtenerImagen();
        //  console.log( 'img'+img);
        //  doc.addImage(img, 'jpg', 5, 5, 40, 15); // x, y width, height   //37% 
        doc.addImage(img, 'jpeg', 5, 5, 40, 15); // x, y width, height   //37% 

        // Encabezado reporte CENTRADO
        doc.setFontSize(14); 
        doc.setFontType("bold");
        var fontSize = doc.internal.getFontSize(); // Get current font size
        var pageWidth = doc.internal.pageSize.width; // Get page width
        var txtWidth = doc.getStringUnitWidth(reportHeaderPdf) * fontSize / doc.internal.scaleFactor;
        var x = ( pageWidth - txtWidth ) / 2;    // Calculate text's x coordinate    
        doc.text(reportHeaderPdf, x, 14);   // Posición text at x,y

        // Fecha de hoy
        var laFechaHoy = reportesFactory.obtenerFechaHoy();
        doc.setFontSize(11);   
        doc.setFontType("normal");
        doc.text(doc.internal.pageSize.width - 45 , 20, laFechaHoy);   //  Posición  text at x,y
        
        doc.setPage(1); // importante


       // doc.setLineWidth(0.5);  doc.line(20, 25, 60, 25); //x1 y1, x2 y2

        // Custom table 
        jsPDF.autoTableSetDefaults({
            headerStyles: 
            {   
                fontSize: 7.3,       
            },
            bodyStyles: {        
                fontSize: 6.5 
            }
        });

        doc.autoTable( columns, rows, {
            startY:27, //draw table here     
            theme: 'plain',//'grid', //
         //   headerStyles:{lineWidth: 1, lineColor: [0, 0, 0]},
         //   bodyStyles: {lineColor: [0, 0, 0]},
            styles:{
                overflow: 'linebreak', // visible, hidden, ellipsize or linebreak  
            },
            columnStyles: { 
                  1: {columnWidth: 12} //width 
                ,17: {columnWidth: 14} //width 
            },
             margin: {top: 16, right: 5, bottom: 16, left: 5},
             addPageContent: pageContent //page number
        });
           // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages( totalPagesExp);
        }

        doc.save(vm.filename+'.pdf');    
      }

        //-------------------------------------------

    }



]);