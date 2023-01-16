/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var jpdbBaseURL='http://api.login2explore.com:5577';
var jpdbIML='/api/iml';
var jpdbIRL='/api/irl';
var studDBName='SCHOOL_DB';
var studRelName='STUDENT_TABLE';
var connToken = '90932420|-31949269709508499|90955709';

$('#stdid').focus();

function saveRecNo2LS(resJsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);

}

function getStdIdAsJsonObj(){
    var stdid = $('#stdid').val();
    var jsonStr = {
        id: stdid
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#stdname').val(record.name);
    $('#class').val(record.class);
    $('#bdate').val(record.bdate);
    $('#address').val(record.address);
    $('#edate').val(record.edate); 
}

function resetForm(){
    $('#stdid').val("");
    $('#stdname').val("");
    $('#class').val("");
    $('#bdate').val("");
    $('#address').val("");
    $('#edate').val("");
    $('#stdid').prop('disabled',false);
    $('#save').prop('disabled',true);
    $('#change').prop('disabled',true);
    $('#reset').prop('disabled',true);
    $('#stdid').focus();
}

function validateData(){
    var stdid,stdname,cl,bdate,add,edate;
    stdid=$('#stdid').val();
    stdname=$('#stdname').val();
    cl=$('#class').val();
    bdate=$('#bdate').val();
    add=$('#address').val();
    edate=$('#edate').val();
    if(stdid === ''){
        alert('Student Roll No Missing');
        $('#stdid').focus();
        return "";
    }       
    if(stdname === ''){
        alert('Student Name Missing');
        $('#empid').focus();
        return "";
               
    }
    if(cl === ''){
        alert("Student's class Missing");
        $('#cl').focus();
        return "";
    }
    if(bdate === ''){
        alert('Student Birth Date Missing');
        $('$bdate').focus();
        return "";
    }
    if(add === ''){
        alert('Student Address Missing');
        $('#address').focus();
        return "";
    }
    if(edate === ''){
        alert('Student Enrollment Date Missing');
        $('#edate').focus();
        return "";
    }
    
}

function getStud(){
    var stdIdJsonObj = getStdIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, stdDBName, stdRelationName, stdIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var getRequest = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async : true});
    if(resJsonObj.status === 400) {
        $('#save').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#stdname').focus();
    }
    else if (resJsonObj.status === 200){

        $('#stdid').prop('disabled',true);
        fillData(resJsonObj);

        $('#change').prop('disabled',false);
        $('#reset').prop('disabled', false);
        $('#stdid').focus();
    }
}

function saveData(){
    var jsonStrobj = validateDate();
    if(jsonStrobj === ''){
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrobj,studDBName,studRelName);
    jquery.ajaxSetup({async : False});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jquery.ajaxSetup({async : True});
    console.log(resJsonObj);
    resetForm();
    $('#stdid').focus();
    
}
var jsonStrobj = {
   id:stuid,
   name:stdname,
   class:c1,
   bdate:bdate,
   edate:edate,
   address:add
};
return JSON.stringify(jsonStrobj);