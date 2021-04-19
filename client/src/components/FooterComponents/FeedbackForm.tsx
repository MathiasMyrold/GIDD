import React from 'react';
import emailjs from 'emailjs-com';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { InputLabel, Button } from '@material-ui/core';

const FeedbackForm = () => {
    
    function sendEmail (e:any){
         e.preventDefault();

    emailjs.sendForm('service_xff4aj9', 'template_rc6pxwq', e.target, 'user_BsfvYr9KimVDL5GVUY5kV')
      .then((result:any) => {
          console.log(result.text);
      }, (error:any) => {
          console.log(error.text);
      });
    }


  return (
      <div>
          <div style={{padding:"10px"}}>
              <form onSubmit={sendEmail}>
                  <div id="main" style={{display:"flex"}} >
                    <div id="left">
                        <div style={{padding:"10px"}}>
                            <TextField  label="Navn"
                                variant="outlined"
                                rows={1}
                                multiline  
                                type="text"
                                name="name" />
                        </div>
                        <div style={{padding:"10px"}}>
                            <TextField  label="Email"
                                variant="outlined"
                                rows={1}
                                multiline  
                                type="email" 
                                placeholder="Email" 
                                name="email"/>
                        </div>
                        <div style={{padding:"10px"}}>
                            <TextField 
                                label="Emne"
                                variant="outlined"
                                rows={1}
                                multiline 
                                type="text" 
                                name="subject"/>
                        </div>
                    </div>
                    <div id="right">
                        <div style={{padding:"10px"}}>
                            <TextField 
                                label="Din melding"
                                variant="outlined"
                                multiline
                                type="text"
                                rows={6} 
                                name="message"></TextField>
                        </div>
                        <div>
                            <Button 
                                style={{backgroundColor:"red", marginLeft:"10px", width:"205px"}}
                                type="submit" 
                                >Send melding
                            </Button>
                        </div>
                    </div>
                  </div>
              </form>
          </div>
      </div>

       
  );
}

export default FeedbackForm;