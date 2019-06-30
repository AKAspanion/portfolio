<template>
    <div class="contact-container">
        <div class="contact">
            <form id="form">		
                <input id="name" type="text" placeholder="NAME">
                <input id="email" type="text" placeholder="E-MAIL">
                <textarea id="message" type="text" placeholder="MESSAGE"></textarea>
                <input id="submit" type="submit" value="CONNECT!">        
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
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #3AAfA9;
}
.contact{
    margin: 0 auto;
    text-align: center;
}
#form {
    width: 500px;
    margin: 0 auto;
    margin-top: 50px;
}

input {
    font-family: 'Andis';
    font-size: 0.875em;
    width: 470px;
    height: 50px;
    padding: 0px 15px 0px 15px;  
    background: transparent;
    outline: none;
    color: #DEF2F1;  
    border: solid 1px #DEF2F1;
    border-bottom: none;    
    transition: all 0.3s ease-in-out;
}

input:hover {
    background: #17252A;
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
    color: #DEF2F1;
    font-family: 'Andis', sans-serif;
    font-size: 0.875em;    
    border: solid 1px #DEF2F1;    
    transition: all 0.3s ease-in-out;
}

textarea:hover {
    background: #17252A;
    color: #ffffff;
}

#submit {
    max-width: 470px;    
    padding: 0;
    margin: -6px 0px 0px 0px;    
    font-family: 'Andis';
    font-size: 0.875em;
    color: #DEF2F1;    
    outline:none;
    cursor: pointer;    
    border: solid 1px #DEF2F1;
    border-top: none;
}

#submit:hover {
    color: #DEF2F1;
}
::placeholder {
    color: #DEF2F1;
    opacity: 1;
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
}
</style>
