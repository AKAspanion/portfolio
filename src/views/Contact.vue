<template>
    <div class="contact-container">
        <div class="contact">
            <form id="form">
                <input id="name" type="text" placeholder="NAME" />
                <input id="email" type="text" placeholder="E-MAIL" />
                <textarea
                    id="message"
                    type="text"
                    placeholder="MESSAGE"
                ></textarea>
                <input id="submit" type="submit" value="CONNECT!" />
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SpanionContact',
};
</script>

<style scoped>
.contact-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #3aafa9;
}
.contact {
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
    color: #def2f1;
    border: solid 1px #def2f1;
    border-bottom: none;
    transition: all 0.3s ease-in-out;
}

input:hover {
    background: #17252a;
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
    color: #def2f1;
    font-family: 'Andis', sans-serif;
    font-size: 0.875em;
    border: solid 1px #def2f1;
    transition: all 0.3s ease-in-out;
}

textarea:hover {
    background: #17252a;
    color: #ffffff;
}

#submit {
    max-width: 470px;
    padding: 0;
    margin: -6px 0px 0px 0px;
    font-family: 'Andis';
    font-size: 0.875em;
    color: #def2f1;
    outline: none;
    cursor: pointer;
    border: solid 1px #def2f1;
    border-top: none;
}

#submit:hover {
    color: #def2f1;
}
::placeholder {
    color: #def2f1;
    opacity: 1;
}
@media only screen and (max-width: 600px) {
    #form {
        width: 280px;
    }
    input {
        width: 250px;
    }
    textarea {
        width: 250px;
    }
}
</style>
