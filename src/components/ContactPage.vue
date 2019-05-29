<template>
    <div class="container">
        <div class="contact-container">
            <form id="form">		
                <input id="name" type="text" placeholder="NAME">
                <input id="email" type="text" placeholder="E-MAIL">
                <textarea id="message" type="text" placeholder="MESSAGE"></textarea>
                <input id="submit" type="submit" value="GO!">        
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContactPage'
}
</script>

<style scoped>
.contact-container{
    height: 60vh;
    width: 80vw;
    margin: 0 auto;
    text-align: center;
}
#form {
    width: 500px;
    margin: 50px auto;
}

input {
    font-family: 'Andis';
    font-size: 0.875em;
    width: 470px;
    height: 50px;
    padding: 0px 15px 0px 15px;  
    background: transparent;
    outline: none;
    color: rgb(65, 65, 65);  
    border: solid 1px #b3aca7;
    border-bottom: none;    
    transition: all 0.3s ease-in-out;
}

input:hover {
    background: rgb(65, 65, 65);
    color: #ffffff;
}

textarea {
    width: 470px;
    max-width: 470px;
    height: 110px;
    max-height: 110px;
    padding: 15px;    
    background: transparent;
    outline: none;    
    color: rgb(65, 65, 65);
    font-family: 'Andis', sans-serif;
    font-size: 0.875em;    
    border: solid 1px #b3aca7;    
    transition: all 0.3s ease-in-out;
}

textarea:hover {
    background: rgb(65, 65, 65);
    color: #ffffff;
}

#submit {
    width: 502px;    
    padding: 0;
    margin: -5px 0px 0px 0px;    
    font-family: 'Andis';
    font-size: 0.875em;
    color: #b3aca7;    
    outline:none;
    cursor: pointer;    
    border: solid 1px #b3aca7;
    border-top: none;
}

#submit:hover {
    color: #e2dedb;
}
@media only screen and (max-width: 600px) {
    
    #form{
        width: 280px;
    }
    input{
        width: 250px;
    }
    textarea{
        width: 250px;
    }
    #submit{
        width: 282px;
    }
}
</style>
