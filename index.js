/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var jpdbBaseURL='http://api.login2explore.com:5577'
var jpdbIML='/api/iml'
var jpdbIRL='/api/irl'
var studDBName='SCHOOL_DB'
var studRelName='STUDENT-TABLE'

$('#stdid').focus();

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

function saveData(){
    var jsonStrobj= validateDate();
    if(jsonStrobj === ''){
        return "";
    }
    var putRequest= createPUTRequest(connToken,jsonStrobj,studDBName,studRelName);
    jquery.ajaxSetup({async : False});
    var resJsonObj= executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jquery.ajaxSetup({async : True});
    console.log(resJsonObj);
    resetForm();
    $('#stdid').focus();
    
}
var jsonStrobj={
   id:stuid,
   name:stdname,
   class:c1,
   bdate:bdate,
   edate:edate,
   address:add
};
return JSON.stringify(jsonStrobj);